import React from 'react';
import { useMovies } from '../context/MovieContext';
import MovieGrid from '../components/MovieGrid';
import AddMovieForm from '../components/AddMovieForm';

const MyMoviesPage = () => {
  const { getMyMovies, addMovie } = useMovies();
  const myMovies = getMyMovies();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h1 className="text-3xl font-bold mb-6">My Movie Ratings</h1>
        <p className="text-lg mb-8">
          These are the movies I've watched and my personal ratings for each one.
        </p>
        
        <AddMovieForm onAddMovie={addMovie} formType="personal" />
        
        {myMovies.length > 0 ? (
          <MovieGrid movies={myMovies} ratingType="personal" />
        ) : (
          <div className="text-center p-8 bg-gray-100 rounded-lg">
            <p className="text-lg text-gray-600">No movies added yet. Add your first movie above!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyMoviesPage; 