import React, { useState } from 'react';

const MovieCard = ({ movie, ratings, onEdit, onDelete }) => {
  // If there's no movie poster, use a placeholder
  const posterUrl = movie.poster || 'https://via.placeholder.com/150x225?text=No+Poster';
  
  const [showOptions, setShowOptions] = useState(false);
  
  // Function to render star ratings
  const renderStars = (rating) => {
    return (
      <div className="flex mt-2">
        {[...Array(5)].map((_, i) => (
          <span 
            key={i} 
            className={`text-xl ${i < Math.round(rating / 2) ? 'text-yellow-400' : 'text-gray-300'} star`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  // Function to render a single line for review
  const renderLine = () => (
    <div className="w-full h-px bg-gray-300 my-2"></div>
  );

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 movie-card relative">
      {(onEdit || onDelete) && (
        <div 
          className="absolute top-3 right-3 z-20"
          onMouseEnter={() => setShowOptions(true)}
          onMouseLeave={() => setShowOptions(false)}
        >
          <button 
            className="bg-gray-800 bg-opacity-70 rounded-full p-1 text-white hover:bg-opacity-100 transition-all"
            aria-label="Options"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </button>
          
          {showOptions && (
            <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden z-30">
              {onEdit && (
                <button 
                  onClick={() => onEdit(movie)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
                >
                  Edit
                </button>
              )}
              {onDelete && (
                <button 
                  onClick={() => onDelete(movie.id)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white"
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      )}
      
      <div className="flex flex-col h-full">
        {/* Movie poster */}
        <div className="relative bg-black flex items-center justify-center h-48 overflow-hidden">
          <img 
            src={posterUrl} 
            alt={movie.title} 
            className="h-full object-cover w-full transform transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 text-white py-2 px-3">
            <h3 className="font-medium text-center font-satisfy text-lg">{movie.title}</h3>
          </div>
        </div>
        
        {/* Rating section */}
        <div className="p-4 flex-1 flex flex-col">
          {ratings.map((rating, index) => (
            <div key={index} className="mb-4">
              <p className="text-sm italic font-script">RATING: by {rating.person}</p>
              {renderLine()}
              {renderLine()}
              {renderLine()}
              {renderLine()}
              {renderStars(rating.score)}
              {rating.review && (
                <div className="mt-3 text-sm text-gray-700 bg-yellow-50 p-3 rounded-md border-l-2 border-yellow-300">
                  {rating.review.split('\n').map((line, i) => (
                    <p key={i} className="mb-1 font-script text-base">{line}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard; 