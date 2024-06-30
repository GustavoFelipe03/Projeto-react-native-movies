import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

interface Movie {
  id: number;
  poster_path: string;
  title: string;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();


  const navigateToDetails = () => {
    navigation.navigate('Details', { movie_id: movie.id });
  };

  return (
    <TouchableOpacity onPress={navigateToDetails}>
      <View style={styles.card}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          style={styles.image}
        />
        <Text style={styles.title}>{movie.title}</Text>
      </View>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 300,
  },
  title: {
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MovieCard;