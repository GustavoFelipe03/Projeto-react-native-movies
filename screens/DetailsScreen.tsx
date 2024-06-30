import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { TMDB_API_KEY } from '@env'; 
import { AirbnbRating } from 'react-native-ratings'; 

const API_KEY = TMDB_API_KEY;

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;

interface DetailsScreenProps {
  route: DetailsScreenRouteProp;
  navigation: DetailsScreenNavigationProp;
}

interface MovieDetails {
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  genres: { id: number; name: string }[];
}

const DetailsScreen: React.FC<DetailsScreenProps> = ({ route }) => {
  const { movie_id } = route.params;
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userRating, setUserRating] = useState<number | null>(null); // Estado para armazenar a avaliação do usuário

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${TMDB_API_KEY}&language=pt-BR`);
      setMovieDetails(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  
  const handleRating = (rating: number) => {
    setUserRating(rating);
    console.log(`Usuário avaliou o filme com ${rating} estrelas.`);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!movieDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Erro ao carregar detalhes do filme.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}` }}
        style={styles.image}
      />
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingTitle}>Avaliação:</Text>
        <AirbnbRating
          count={5}
          reviews={['Terrível', 'Ruim', 'Ok', 'Bom', 'Excelente']}
          defaultRating={userRating || 0}
          onFinishRating={handleRating}
          size={20}
        />
        {userRating && <Text style={styles.ratingText}>Você avaliou com {userRating} estrelas.</Text>}
      </View>
      <Text style={styles.releaseDate}>Data de Lançamento: {movieDetails.release_date}</Text>
      <Text style={styles.overview}>{movieDetails.overview}</Text>
      <View style={styles.genresContainer}>
        {movieDetails.genres.map(genre => (
          <Text key={genre.id} style={styles.genre}>
            {genre.name}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  image: {
    width: '100%',
    height: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  releaseDate: {
    fontSize: 16,
    marginVertical: 10,
  },
  overview: {
    fontSize: 16,
    marginVertical: 10,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  genre: {
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 15,
    marginVertical: 5,
  },
  ratingContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  ratingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 0,
  },
  ratingText: {
    marginTop: 10,
    fontSize: 16,
    
  },
});

export default DetailsScreen;