import React from 'react';
import { Link } from 'react-router-dom';
import { useMovies } from '../context/MovieContext';

const HomePage = () => {
  const { getHisMovies, getHerMovies, getOurMovies } = useMovies();

  const hisMoviesCount = getHisMovies().length;
  const herMoviesCount = getHerMovies().length;
  const ourMoviesCount = getOurMovies().length;
  
  const totalMovies = hisMoviesCount + herMoviesCount + ourMoviesCount;

  return (
    <div className="max-w-4xl mx-auto page-enter">
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8 text-center">
        <div className="flex justify-center mb-8">
          <img 
            src="https://img.icons8.com/fluency/96/movie-projector.png" 
            alt="Movie projector" 
            className="w-24 h-24"
          />
        </div>
        
        <h1 className="text-4xl font-bold mb-4 font-satisfy text-center">Movie Ratings By Us</h1>
        <div className="w-24 h-1 bg-yellow-400 mx-auto mb-8"></div>
        
        <p className="text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
          Welcome to our movie rating collection! This is where we document and share our thoughts 
          on the movies we've watched individually and together.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 border border-blue-200">
            <div className="bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
              <span className="text-2xl">👨</span>
            </div>
            <h2 className="text-xl font-bold mb-2 text-blue-800">His Movies</h2>
            <p className="mb-3 text-gray-600">Movies he's watched and rated</p>
            <p className="text-3xl font-bold mb-4 text-blue-700">{hisMoviesCount}</p>
            <Link 
              to="/his-movies" 
              className="inline-block bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 shadow-md transition-colors btn"
            >
              View His Movies
            </Link>
          </div>
          
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 border border-pink-200">
            <div className="bg-pink-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
              <span className="text-2xl">👩</span>
            </div>
            <h2 className="text-xl font-bold mb-2 text-pink-800">Her Movies</h2>
            <p className="mb-3 text-gray-600">Movies she's watched and rated</p>
            <p className="text-3xl font-bold mb-4 text-pink-700">{herMoviesCount}</p>
            <Link 
              to="/her-movies" 
              className="inline-block bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 shadow-md transition-colors btn"
            >
              View Her Movies
            </Link>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 border border-purple-200">
            <div className="bg-purple-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
              <span className="text-2xl">👫</span>
            </div>
            <h2 className="text-xl font-bold mb-2 text-purple-800">Our Movies</h2>
            <p className="mb-3 text-gray-600">Movies we've watched together</p>
            <p className="text-3xl font-bold mb-4 text-purple-700">{ourMoviesCount}</p>
            <Link 
              to="/our-movies" 
              className="inline-block bg-purple-500 text-white px-6 py-2 rounded-full hover:bg-purple-600 shadow-md transition-colors btn"
            >
              View Our Movies
            </Link>
          </div>
        </div>
        
        <div className="mt-8 bg-gray-50 p-6 rounded-lg text-center">
          <div className="text-3xl mb-3">🎬 {totalMovies} Movies Total 🎬</div>
          <p className="text-gray-600">Keep track of all your favorite films and your thoughts about them!</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 