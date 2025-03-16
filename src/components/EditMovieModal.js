import React, { useState, useEffect, useRef } from 'react';

const EditMovieModal = ({ movie, formType, onSave, onClose }) => {
  const [title, setTitle] = useState('');
  const [poster, setPoster] = useState('');
  const [myRating, setMyRating] = useState(5);
  const [myReview, setMyReview] = useState('');
  const [herRating, setHerRating] = useState(5);
  const [herReview, setHerReview] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef(null);

  // Initialize form with movie data when component mounts
  useEffect(() => {
    if (movie) {
      setTitle(movie.title || '');
      setPoster(movie.poster || '');
      setMyRating(Math.round(movie.myRating || 5));
      setMyReview(movie.myReview || '');
      setHerRating(Math.round(movie.herRating || 5));
      setHerReview(movie.herReview || '');
    }
    
    // Trigger animation after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, [movie]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Ensure integers for ratings
    const updatedMyRating = Math.round(Number(myRating));
    const updatedHerRating = Math.round(Number(herRating));
    
    const updatedMovie = {
      ...movie,
      title,
      poster,
      myRating: formType === 'personal' || formType === 'both' ? updatedMyRating : movie.myRating,
      myReview: formType === 'personal' || formType === 'both' ? myReview : movie.myReview,
      herRating: formType === 'partner' || formType === 'both' ? updatedHerRating : movie.herRating,
      herReview: formType === 'partner' || formType === 'both' ? herReview : movie.herReview,
    };
    
    onSave(updatedMovie);
  };

  const getFormColor = () => {
    if (formType === 'personal') return '#000080'; // Navy blue
    if (formType === 'partner') return '#C8A2C8'; // Lilac
    if (formType === 'both' || formType === 'combined') return '#9370DB'; // Lavender
    return '#333';
  };

  const renderRatingInputs = () => {
    if (formType === 'personal') {
      return (
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-medium">His Rating (1-10)</label>
          <input 
            type="number" 
            min="1" 
            max="10"
            value={myRating} 
            onChange={(e) => setMyRating(Math.round(Number(e.target.value)))}
            className="w-full p-2 border border-gray-300 rounded" 
            style={{borderColor: getFormColor()}}
            step="1"
          />
          <div className="flex flex-wrap mt-2 mb-4">
            {[...Array(10)].map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setMyRating(i + 1)}
                className="w-8 h-8 rounded-full mr-1 mb-1 flex items-center justify-center transition-all transform hover:scale-110"
                style={{
                  backgroundColor: i < myRating ? '#FFD700' : '#e5e7eb',
                  color: i < myRating ? '#333' : '#4b5563'
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <label className="block text-gray-700 mt-2 mb-2 font-medium">His Review</label>
          <textarea 
            value={myReview} 
            onChange={(e) => setMyReview(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded" 
            rows="3"
            style={{borderColor: getFormColor()}}
          />
        </div>
      );
    } else if (formType === 'partner') {
      return (
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-medium">Her Rating (1-10)</label>
          <input 
            type="number" 
            min="1" 
            max="10"
            value={herRating} 
            onChange={(e) => setHerRating(Math.round(Number(e.target.value)))}
            className="w-full p-2 border border-gray-300 rounded" 
            style={{borderColor: getFormColor()}}
            step="1"
          />
          <div className="flex flex-wrap mt-2 mb-4">
            {[...Array(10)].map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setHerRating(i + 1)}
                className="w-8 h-8 rounded-full mr-1 mb-1 flex items-center justify-center transition-all transform hover:scale-110"
                style={{
                  backgroundColor: i < herRating ? '#FFD700' : '#e5e7eb',
                  color: i < herRating ? '#333' : '#4b5563'
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <label className="block text-gray-700 mt-2 mb-2 font-medium">Her Review</label>
          <textarea 
            value={herReview} 
            onChange={(e) => setHerReview(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded" 
            rows="3"
            style={{borderColor: getFormColor()}}
          />
        </div>
      );
    } else if (formType === 'both' || formType === 'combined') {
      return (
        <div className="mb-4">
          <div className="mb-4 p-4 bg-gray-50 rounded-lg" style={{borderLeft: `4px solid ${getFormColor()}`}}>
            <h3 className="font-medium text-lg mb-3" style={{color: getFormColor()}}>Our Rating</h3>
            <label className="block text-gray-700 mb-2">His Rating (1-10)</label>
            <input 
              type="number" 
              min="1" 
              max="10"
              value={myRating} 
              onChange={(e) => setMyRating(Math.round(Number(e.target.value)))}
              className="w-full p-2 border border-gray-300 rounded" 
              style={{borderColor: getFormColor()}}
              step="1"
            />
            <div className="flex flex-wrap mt-2 mb-4">
              {[...Array(10)].map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setMyRating(i + 1)}
                  className="w-8 h-8 rounded-full mr-1 mb-1 flex items-center justify-center transition-all transform hover:scale-110"
                  style={{
                    backgroundColor: i < myRating ? '#FFD700' : '#e5e7eb',
                    color: i < myRating ? '#333' : '#4b5563'
                  }}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <label className="block text-gray-700 mt-2 mb-2">His Review</label>
            <textarea 
              value={myReview} 
              onChange={(e) => setMyReview(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded" 
              rows="3"
              style={{borderColor: getFormColor()}}
            />
            
            <label className="block text-gray-700 mt-5 mb-2">Her Rating (1-10)</label>
            <input 
              type="number" 
              min="1" 
              max="10"
              value={herRating} 
              onChange={(e) => setHerRating(Math.round(Number(e.target.value)))}
              className="w-full p-2 border border-gray-300 rounded" 
              style={{borderColor: getFormColor()}}
              step="1"
            />
            <div className="flex flex-wrap mt-2 mb-4">
              {[...Array(10)].map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setHerRating(i + 1)}
                  className="w-8 h-8 rounded-full mr-1 mb-1 flex items-center justify-center transition-all transform hover:scale-110"
                  style={{
                    backgroundColor: i < herRating ? '#FFD700' : '#e5e7eb',
                    color: i < herRating ? '#333' : '#4b5563'
                  }}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <label className="block text-gray-700 mt-2 mb-2">Her Review</label>
            <textarea 
              value={herReview} 
              onChange={(e) => setHerReview(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded" 
              rows="3"
              style={{borderColor: getFormColor()}}
            />
          </div>
        </div>
      );
    }
  };

  // Modal backdrop with click outside to close
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 transition-all duration-300 overflow-y-auto">
      <div 
        className="absolute inset-0" 
        onClick={onClose}
        aria-label="Close modal"
      ></div>
      
      <div 
        ref={modalRef}
        className={`bg-white rounded-lg shadow-xl p-4 sm:p-6 w-full max-w-md relative z-10 max-h-[95vh] overflow-y-auto transition-all duration-500 transform ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold" style={{color: getFormColor()}}>Edit Movie</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors transform hover:rotate-90 duration-300 p-2"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">Movie Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:border-transparent transition-all" 
              required 
              style={{borderColor: getFormColor()}}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">Poster URL (optional)</label>
            <input 
              type="text" 
              value={poster} 
              onChange={(e) => setPoster(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:border-transparent transition-all" 
              style={{borderColor: getFormColor()}}
            />
            {poster && (
              <div className="mt-2 h-32 flex justify-center">
                <img 
                  src={poster} 
                  alt={title || 'Movie poster preview'} 
                  className="h-full object-contain transition-all duration-300 transform hover:scale-110" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/150x225?text=Invalid+URL';
                  }}
                />
              </div>
            )}
          </div>
          
          {renderRatingInputs()}
          
          <div className="flex justify-end space-x-2 mt-6">
            <button 
              type="button"
              onClick={onClose}
              className="px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-3 text-white rounded-lg transition-all transform hover:scale-105"
              style={{backgroundColor: getFormColor()}}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMovieModal; 