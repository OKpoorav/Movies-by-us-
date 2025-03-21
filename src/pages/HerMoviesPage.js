import React, { useState } from 'react';
import { useMovies } from '../context/MovieContext';
import MovieGrid from '../components/MovieGrid';
import AddMovieForm from '../components/AddMovieForm';
import EditMovieModal from '../components/EditMovieModal';
import herImage from '../img/her.jpeg';

const HerMoviesPage = () => {
  const { getHerMovies, addMovie, editMovie, deleteMovie } = useMovies();
  const herMovies = getHerMovies();
  
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
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
          <img src={herImage} alt="Her" className="w-full h-full object-cover rounded-full animate-pulse" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4 text-center font-satisfy" style={{color: '#C8A2C8'}}>Her Movie Ratings</h1>
        <div className="w-16 h-1 mx-auto mb-6" style={{backgroundColor: '#C8A2C8'}}></div>
        <p className="text-lg mb-8 text-center text-gray-600">
          These are the movies she's watched and her personal ratings for each one.
        </p>
        
        <AddMovieForm onAddMovie={addMovie} formType="partner" />
        
        {herMovies.length > 0 ? (
          <MovieGrid 
            movies={herMovies} 
            ratingType="partner"
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <div className="text-center p-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-5xl mb-4">🎬</div>
            <p className="text-lg text-gray-600 mb-2">No movies added yet.</p>
            <p className="text-gray-500">Add her first movie using the form above!</p>
          </div>
        )}
      </div>
      
      {isEditModalOpen && movieToEdit && (
        <EditMovieModal 
          movie={movieToEdit}
          formType="partner" 
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

export default HerMoviesPage; 