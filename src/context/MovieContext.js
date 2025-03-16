import React, { createContext, useState, useEffect, useContext } from 'react';
import { db, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from '../firebase';

// Empty initial data
const initialMovies = [];

// Create the context
const MovieContext = createContext();

// Collection name in Firestore
const COLLECTION_NAME = 'movies';

// Create a provider component
export const MovieProvider = ({ children }) => {
  // State to hold movies
  const [movies, setMovies] = useState(initialMovies);
  const [loading, setLoading] = useState(true);

  // Fetch movies from Firebase on component mount
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
        const moviesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Set movies data (will be empty if database is empty)
        console.log(`Loaded ${moviesData.length} movies from Firebase`);
        setMovies(moviesData);
        
      } catch (error) {
        console.error("Error fetching movies: ", error);
        // Fallback to localStorage if Firebase fails
        const savedMovies = localStorage.getItem('movies');
        if (savedMovies) {
          setMovies(JSON.parse(savedMovies));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Save movies to localStorage as a backup
  useEffect(() => {
    if (movies.length > 0) {
      localStorage.setItem('movies', JSON.stringify(movies));
    } else {
      // Clear localStorage when no movies exist
      localStorage.removeItem('movies');
    }
  }, [movies]);

  // Add a new movie
  const addMovie = async (newMovie) => {
    try {
      // Remove any existing id to let Firestore generate a new one
      const { id, ...movieWithoutId } = newMovie;
      
      // Add the movie to Firestore
      const docRef = await addDoc(collection(db, COLLECTION_NAME), movieWithoutId);
      
      // Update the movie object with the Firestore document ID
      const movieWithId = { ...movieWithoutId, id: docRef.id };
      
      // Update local state
      setMovies(prevMovies => [...prevMovies, movieWithId]);
      
      console.log(`Added movie: ${movieWithId.title} with ID: ${movieWithId.id}`);
      return movieWithId;
    } catch (error) {
      console.error("Error adding movie: ", error);
      
      // Fallback to local state only if Firebase fails
      const movieWithId = { ...newMovie, id: Date.now().toString() };
      setMovies(prevMovies => [...prevMovies, movieWithId]);
      
      return movieWithId;
    }
  };

  // Edit a movie
  const editMovie = async (updatedMovie) => {
    try {
      if (!updatedMovie || !updatedMovie.id) {
        throw new Error("Movie or movie ID is missing");
      }
      
      // Get the Firestore document reference
      const movieRef = doc(db, COLLECTION_NAME, updatedMovie.id);
      
      // Make a copy without the ID for Firestore
      const { id, ...movieDataWithoutId } = updatedMovie;
      
      // Update the document in Firestore
      await updateDoc(movieRef, movieDataWithoutId);
      
      // Update local state
      setMovies(prevMovies => 
        prevMovies.map(movie => 
          movie.id === updatedMovie.id ? updatedMovie : movie
        )
      );
      
      console.log(`Updated movie: ${updatedMovie.title} with ID: ${updatedMovie.id}`);
      return updatedMovie;
    } catch (error) {
      console.error("Error updating movie: ", error);
      
      // Fallback to local state update only
      setMovies(prevMovies => 
        prevMovies.map(movie => 
          movie.id === updatedMovie.id ? updatedMovie : movie
        )
      );
      
      return updatedMovie;
    }
  };

  // Delete a movie
  const deleteMovie = async (movieId) => {
    try {
      if (!movieId) {
        throw new Error("Movie ID is missing");
      }
      
      // Get the Firestore document reference
      const movieRef = doc(db, COLLECTION_NAME, movieId);
      
      // Delete the document from Firestore
      await deleteDoc(movieRef);
      
      // Update local state
      setMovies(prevMovies => prevMovies.filter(movie => movie.id !== movieId));
      
      console.log(`Deleted movie with ID: ${movieId}`);
      return true;
    } catch (error) {
      console.error("Error deleting movie: ", error);
      
      // Fallback to local state update only
      setMovies(prevMovies => prevMovies.filter(movie => movie.id !== movieId));
      
      return false;
    }
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
    loading,
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