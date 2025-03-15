import React, { useState } from 'react';
import { useMovies } from '../context/MovieContext';
import MovieGrid from '../components/MovieGrid';
import AddMovieForm from '../components/AddMovieForm';
import EditMovieModal from '../components/EditMovieModal';
import usImage from '../img/us.jpeg';

const OurMoviesPage = () => {
  const { getOurMovies, addMovie, editMovie, deleteMovie } = useMovies();
  const ourMovies = getOurMovies();
  
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
          <img src={usImage} alt="Us" className="w-full h-full object-cover rounded-full animate-pulse" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4 text-center font-satisfy" style={{color: '#9370DB'}}>Our Movie Ratings</h1>
        <div className="w-16 h-1 bg-lavender mx-auto mb-6" style={{backgroundColor: '#E6E6FA'}}></div>
        <p className="text-lg mb-8 text-center text-gray-600">
          These are the movies we've watched together, with our combined rating.
        </p>
        
        <AddMovieForm onAddMovie={addMovie} formType="both" />
        
        {ourMovies.length > 0 ? (
          <MovieGrid 
            movies={ourMovies} 
            ratingType="combined"
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <div className="text-center p-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-5xl mb-4">🎬</div>
            <p className="text-lg text-gray-600 mb-2">No movies added yet.</p>
            <p className="text-gray-500">Add a movie you've watched together using the form above!</p>
          </div>
        )}
      </div>
      
      {isEditModalOpen && movieToEdit && (
        <EditMovieModal 
          movie={movieToEdit}
          formType="both" 
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

export default OurMoviesPage; 