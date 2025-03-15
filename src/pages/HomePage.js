import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMovies } from '../context/MovieContext';
import himImage from '../img/him.jpeg';
import herImage from '../img/her.jpeg';
import usImage from '../img/us.jpeg';

const HomePage = () => {
  const { getHisMovies, getHerMovies, getOurMovies } = useMovies();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setAnimate(true);
  }, []);

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
            className={`w-24 h-24 transition-all duration-1000 ${animate ? 'rotate-12' : ''}`}
          />
        </div>
        
        <h1 className="text-4xl font-bold mb-4 font-satisfy text-center">Movie Ratings By Us</h1>
        <div className="w-24 h-1 bg-yellow-400 mx-auto mb-8"></div>
        
        <p className="text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
        Welcome to Our Little Movie Universe! 🎬💙
        This is where we keep track of our movie adventures, rating and remembering every film we watch—together or apart. 🍿✨
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div 
            className={`bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-500 transform ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} 
            style={{borderColor: '#000080', transitionDelay: '100ms'}}
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md overflow-hidden">
              <img src={himImage} alt="Him" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
            </div>
            <h2 className="text-xl font-bold mb-2" style={{color: '#000080'}}>His Movies</h2>
            <p className="mb-3 text-gray-600">Movies he's watched and rated</p>
            <p className="text-3xl font-bold mb-4" style={{color: '#000080'}}>{hisMoviesCount}</p>
            <Link 
              to="/his-movies" 
              className="inline-block px-6 py-2 rounded-full shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              style={{backgroundColor: '#000080', color: 'white'}}
            >
              View His Movies
            </Link>
          </div>
          
          <div 
            className={`bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-500 transform ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            style={{borderColor: '#C8A2C8', transitionDelay: '300ms'}}
          >
            <div className="bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md overflow-hidden">
              <img src={herImage} alt="Her" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
            </div>
            <h2 className="text-xl font-bold mb-2" style={{color: '#C8A2C8'}}>Her Movies</h2>
            <p className="mb-3 text-gray-600">Movies she's watched and rated</p>
            <p className="text-3xl font-bold mb-4" style={{color: '#C8A2C8'}}>{herMoviesCount}</p>
            <Link 
              to="/her-movies" 
              className="inline-block px-6 py-2 rounded-full shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              style={{backgroundColor: '#C8A2C8', color: 'white'}}
            >
              View Her Movies
            </Link>
          </div>
          
          <div 
            className={`bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-500 transform ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            style={{borderColor: '#E6E6FA', transitionDelay: '500ms'}}
          >
            <div className="bg-gradient-to-r from-purple-400 to-indigo-400 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md overflow-hidden">
              <img src={usImage} alt="Us" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
            </div>
            <h2 className="text-xl font-bold mb-2" style={{color: '#9370DB'}}>Our Movies</h2>
            <p className="mb-3 text-gray-600">Movies we've watched together</p>
            <p className="text-3xl font-bold mb-4" style={{color: '#9370DB'}}>{ourMoviesCount}</p>
            <Link 
              to="/our-movies" 
              className="inline-block px-6 py-2 rounded-full shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              style={{backgroundColor: '#9370DB', color: 'white'}}
            >
              View Our Movies
            </Link>
          </div>
        </div>
        
        <div className={`mt-8 bg-gray-50 p-6 rounded-lg text-center transition-all duration-1000 ${animate ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="text-3xl mb-3 flex items-center justify-center">
            <span className="animate-pulse mr-3">🎬</span> 
            {totalMovies} Movies Total 
            <span className="animate-pulse ml-3">🎬</span>
          </div>
          <p className="text-gray-600">Keep track of all your favorite films and your thoughts about them!</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 