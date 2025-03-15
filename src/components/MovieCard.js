import React from 'react';

const MovieCard = ({ movie, ratings }) => {
  // If there's no movie poster, use a placeholder
  const posterUrl = movie.poster || 'https://via.placeholder.com/150x225?text=No+Poster';
  
  // Function to render star ratings
  const renderStars = (rating) => {
    return (
      <div className="flex mt-2">
        {[...Array(5)].map((_, i) => (
          <span 
            key={i} 
            className={`text-xl ${i < Math.round(rating / 2) ? 'text-yellow-500' : 'text-gray-300'}`}
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
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="flex flex-col h-full">
        {/* Movie poster */}
        <div className="relative bg-black flex items-center justify-center h-48">
          <img 
            src={posterUrl} 
            alt={movie.title} 
            className="h-full object-contain"
          />
          <div className="absolute bottom-0 left-0 bg-black bg-opacity-70 text-white text-xs px-2 py-1">
            {movie.title}
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
                <div className="mt-2 text-sm text-gray-700">
                  {rating.review.split('\n').map((line, i) => (
                    <p key={i} className="mb-1">{line}</p>
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