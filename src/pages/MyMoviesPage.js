import React, { useState } from 'react';
import { useMovies } from '../context/MovieContext';
import MovieGrid from '../components/MovieGrid';
import AddMovieForm from '../components/AddMovieForm';
import EditMovieModal from '../components/EditMovieModal';

const HisMoviesPage = () => {
  const { getHisMovies, addMovie, editMovie, deleteMovie } = useMovies();
  const hisMovies = getHisMovies();
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [movieToEdit, setMovieToEdit] = useState(null);
  
  const handleEdit = (movie) => {
    setMovieToEdit(movie);
    setIsEditModalOpen(true);
  };

  const handleDelete = (movieId) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      deleteMovie(movieId);
    }
  };

  return (
    <div className="max-w-6xl mx-auto page-enter">
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h1 className="text-3xl font-bold mb-4 text-center font-satisfy">His Movie Ratings</h1>
        <div className="w-16 h-1 bg-yellow-400 mx-auto mb-6"></div>
        <p className="text-lg mb-8 text-center text-gray-600">
          These are the movies he's watched and his personal ratings for each one.
        </p>
        
        <AddMovieForm onAddMovie={addMovie} formType="personal" />
        
        {hisMovies.length > 0 ? (
          <MovieGrid 
            movies={hisMovies} 
            ratingType="personal"
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <div className="text-center p-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-5xl mb-4">🎬</div>
            <p className="text-lg text-gray-600 mb-2">No movies added yet.</p>
            <p className="text-gray-500">Add your first movie using the form above!</p>
          </div>
        )}
      </div>
      
      {isEditModalOpen && movieToEdit && (
        <EditMovieModal 
          movie={movieToEdit}
          formType="personal" 
          onSave={(updatedMovie) => {
            editMovie(updatedMovie);
            setIsEditModalOpen(false);
          }}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default HisMoviesPage; 