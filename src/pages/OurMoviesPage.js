import React from 'react';
import { useMovies } from '../context/MovieContext';
import MovieGrid from '../components/MovieGrid';
import AddMovieForm from '../components/AddMovieForm';

const OurMoviesPage = () => {
  const { getOurMovies, addMovie } = useMovies();
  const ourMovies = getOurMovies();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h1 className="text-3xl font-bold mb-6">Our Movie Ratings</h1>
        <p className="text-lg mb-8">
          These are the movies we've watched together, with both of our ratings side by side.
        </p>
        
        <AddMovieForm onAddMovie={addMovie} formType="both" />
        
        {ourMovies.length > 0 ? (
          <MovieGrid movies={ourMovies} ratingType="both" />
        ) : (
          <div className="text-center p-8 bg-gray-100 rounded-lg">
            <p className="text-lg text-gray-600">No movies added yet. Add a movie you've watched together above!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OurMoviesPage; 