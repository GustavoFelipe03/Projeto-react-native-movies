import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';


const API_KEY = '3c202efc87676971040b20467d711465';

interface Movie {
  id: number;
  poster_path: string;
  title: string;
}

const HomeScreen: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
      setMovies(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async (query: string) => {
    setSearch(query);
    if (query) {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}`);
        setMovies(response.data.results);
      } catch (error) {
        console.error(error);
      }
    } else {
      fetchMovies();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Movies</Text>
      <SearchBar onSearch={handleSearch} />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard movie={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingLeft: 10,
    
  },
});

export default HomeScreen;