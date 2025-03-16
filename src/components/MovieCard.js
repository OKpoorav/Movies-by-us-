import React, { useState, useEffect, useRef } from 'react';

const MovieCard = ({ movie, ratings, onEdit, onDelete }) => {
  // If there's no movie poster, use a placeholder
  const posterUrl = movie.poster || 'https://via.placeholder.com/150x225?text=No+Poster';
  
  const [showOptions, setShowOptions] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  
  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showOptions &&
        menuRef.current && 
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showOptions]);
  
  // Function to render star ratings
  const renderStars = (ratingObj) => {
    // Extract the score from the rating object and ensure it's an integer
    const score = Math.round(ratingObj.score);
    
    return (
      <div className="flex mt-2">
        {[...Array(5)].map((_, i) => (
          <span 
            key={i} 
            className={`text-xl ${i < Math.ceil(score / 2) ? 'text-yellow-400' : 'text-gray-300'} star`}
          >
            ★
          </span>
        ))}
        <span className="ml-2 font-bold" style={{color: getPersonColor(ratingObj.person)}}>
          {score}/10
        </span>
      </div>
    );
  };

  // Function to render a single line for review
  const renderLine = () => (
    <div className="w-full h-px bg-gray-300 my-2"></div>
  );
  
  // Function to get person-specific color
  const getPersonColor = (person) => {
    if (person === 'him') return '#000080'; // Navy blue
    if (person === 'her') return '#C8A2C8'; // Lilac
    if (person === 'us') return '#9370DB';  // Lavender
    return '#333';
  };

  return (
    <div 
      className={`bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 movie-card relative transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{transformStyle: 'preserve-3d'}}
    >
      {(onEdit || onDelete) && (
        <div className="absolute top-3 right-3 z-20">
          <button 
            ref={buttonRef}
            className="bg-gray-800 bg-opacity-70 rounded-full p-2 text-white hover:bg-opacity-100 transition-all"
            aria-label="Options"
            onClick={(e) => {
              e.stopPropagation();
              setShowOptions(!showOptions);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </button>
          
          {showOptions && (
            <div 
              ref={menuRef}
              className="absolute right-0 top-full mt-1 w-36 bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden z-30 transform-gpu"
            >
              {onEdit && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(movie);
                    setShowOptions(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-500 hover:text-white transition-colors"
                >
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </span>
                </button>
              )}
              {onDelete && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(movie.id);
                    setShowOptions(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-red-500 hover:text-white transition-colors"
                >
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </span>
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
            className="h-full object-cover w-full transform transition-transform duration-700 hover:scale-110"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/150x225?text=No+Poster';
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 text-white py-2 px-3">
            <h3 className="font-medium text-center font-satisfy text-lg">{movie.title}</h3>
          </div>
        </div>
        
        {/* Rating section */}
        <div className="p-4 flex-1 flex flex-col">
          {ratings.map((rating, index) => (
            <div key={index} className="mb-4 animate-fadeIn" style={{animationDelay: `${index * 150}ms`}}>
              <p className="text-sm italic font-script" style={{color: getPersonColor(rating.person)}}>
                RATING: by {rating.person}
              </p>
              {renderLine()}
              {renderStars(rating)}
              {rating.review && (
                <div className="mt-3 text-sm text-gray-700 bg-yellow-50 p-3 rounded-md border-l-2 transition-all duration-300 hover:border-l-4 hover:shadow-md" style={{borderLeftColor: getPersonColor(rating.person)}}>
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