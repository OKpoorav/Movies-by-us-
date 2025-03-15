import React, { createContext, useState, useEffect, useContext } from 'react';

// Sample initial data
const initialMovies = [
  {
    id: 1,
    title: 'Life of Pi',
    poster: 'https://via.placeholder.com/150x225?text=Life+Of+Pi',
    myRating: 8,
    myReview: 'Visually stunning adventure with deep philosophical themes.',
    herRating: 7,
    herReview: 'Beautiful cinematography but a bit slow at times.',
  },
  {
    id: 2,
    title: 'The Shawshank Redemption',
    poster: 'https://via.placeholder.com/150x225?text=Shawshank',
    myRating: 10,
    myReview: 'A timeless classic about hope and perseverance.',
    herRating: 9,
    herReview: 'Powerful storytelling and incredible performances.',
  },
  {
    id: 3,
    title: 'Inception',
    poster: 'https://via.placeholder.com/150x225?text=Inception',
    myRating: 9,
    myReview: 'Mind-bending thriller with amazing visuals.',
    herRating: 8,
    herReview: 'Complex but rewarding, great soundtrack.',
  }
];

// Create the context
const MovieContext = createContext();

// Create a provider component
export const MovieProvider = ({ children }) => {
  // Initialize state with sample data or data from local storage
  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem('movies');
    return savedMovies ? JSON.parse(savedMovies) : initialMovies;
  });

  // Save movies to local storage whenever the state changes
  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);

  // Add a new movie
  const addMovie = (newMovie) => {
    setMovies([...movies, newMovie]);
  };

  // Filter movies for specific pages
  const getMyMovies = () => {
    return movies.filter(movie => movie.myRating > 0);
  };

  const getHerMovies = () => {
    return movies.filter(movie => movie.herRating > 0);
  };

  const getOurMovies = () => {
    return movies.filter(movie => movie.myRating > 0 && movie.herRating > 0);
  };

  // Values to be provided to consuming components
  const value = {
    movies,
    addMovie,
    getMyMovies,
    getHerMovies,
    getOurMovies
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};

// Custom hook for consuming the context
export const useMovies = () => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
}; 