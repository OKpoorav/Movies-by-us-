import React from 'react';
import { useMovies } from '../context/MovieContext';
import MovieGrid from '../components/MovieGrid';
import AddMovieForm from '../components/AddMovieForm';

const HerMoviesPage = () => {
  const { getHerMovies, addMovie } = useMovies();
  const herMovies = getHerMovies();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h1 className="text-3xl font-bold mb-6">Her Movie Ratings</h1>
        <p className="text-lg mb-8">
          These are the movies she's watched and her personal ratings for each one.
        </p>
        
        <AddMovieForm onAddMovie={addMovie} formType="partner" />
        
        {herMovies.length > 0 ? (
          <MovieGrid movies={herMovies} ratingType="partner" />
        ) : (
          <div className="text-center p-8 bg-gray-100 rounded-lg">
            <p className="text-lg text-gray-600">No movies added yet. Add her first movie above!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HerMoviesPage; 