import React, { createContext, useState, useEffect, useContext } from 'react';

// Empty initial data
const initialMovies = [];

// Create the context
const MovieContext = createContext();

// Create a provider component
export const MovieProvider = ({ children }) => {
  // Initialize state with data from local storage or empty array
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

  // Edit a movie
  const editMovie = (updatedMovie) => {
    setMovies(movies.map(movie => 
      movie.id === updatedMovie.id ? updatedMovie : movie
    ));
  };

  // Delete a movie
  const deleteMovie = (movieId) => {
    setMovies(movies.filter(movie => movie.id !== movieId));
  };

  // Filter movies for specific pages
  const getHisMovies = () => {
    return movies.filter(movie => movie.myRating > 0);
  };

  const getHerMovies = () => {
    return movies.filter(movie => movie.herRating > 0);
  };

  const getOurMovies = () => {
    return movies.filter(movie => movie.myRating > 0 && movie.herRating > 0);
  };

  // Get a specific movie by id
  const getMovieById = (id) => {
    return movies.find(movie => movie.id === id);
  };

  // Values to be provided to consuming components
  const value = {
    movies,
    addMovie,
    editMovie,
    deleteMovie,
    getHisMovies,
    getHerMovies,
    getOurMovies,
    getMovieById
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