import React from 'react';
import { Link } from 'react-router-dom';
import { useMovies } from '../context/MovieContext';

const HomePage = () => {
  const { getMyMovies, getHerMovies, getOurMovies } = useMovies();

  const myMoviesCount = getMyMovies().length;
  const herMoviesCount = getHerMovies().length;
  const ourMoviesCount = getOurMovies().length;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <span className="text-2xl mr-2">🐀</span>
          <span>Movie Ratings By Us</span>
        </h1>
        
        <p className="text-lg mb-6">
          Welcome to our movie rating website! This is where we document and share our thoughts 
          on the movies we've watched individually and together.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-2">My Movies</h2>
            <p className="mb-3">Movies I've watched and rated</p>
            <p className="text-2xl font-bold mb-4">{myMoviesCount} movies</p>
            <Link 
              to="/my-movies" 
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              View My Movies
            </Link>
          </div>
          
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-2">Her Movies</h2>
            <p className="mb-3">Movies she's watched and rated</p>
            <p className="text-2xl font-bold mb-4">{herMoviesCount} movies</p>
            <Link 
              to="/her-movies" 
              className="inline-block bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
            >
              View Her Movies
            </Link>
          </div>
          
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-2">Our Movies</h2>
            <p className="mb-3">Movies we've watched together</p>
            <p className="text-2xl font-bold mb-4">{ourMoviesCount} movies</p>
            <Link 
              to="/our-movies" 
              className="inline-block bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            >
              View Our Movies
            </Link>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-2xl font-bold mb-4">About This Project</h2>
          <p className="mb-3">
            This website allows us to document and rate the movies we have watched individually and together.
            We can add new movies, rate them on a scale of 1-10, and write our thoughts about them.
          </p>
          <p>
            The design is inspired by the movie rating sheet we used to use on paper, now digitized for convenience
            and better organization.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 