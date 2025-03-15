import React, { useState, useEffect } from 'react';

const EditMovieModal = ({ movie, formType, onSave, onClose }) => {
  const [title, setTitle] = useState('');
  const [poster, setPoster] = useState('');
  const [myRating, setMyRating] = useState(5);
  const [myReview, setMyReview] = useState('');
  const [herRating, setHerRating] = useState(5);
  const [herReview, setHerReview] = useState('');

  // Initialize form with movie data when component mounts
  useEffect(() => {
    if (movie) {
      setTitle(movie.title || '');
      setPoster(movie.poster || '');
      setMyRating(movie.myRating || 5);
      setMyReview(movie.myReview || '');
      setHerRating(movie.herRating || 5);
      setHerReview(movie.herReview || '');
    }
  }, [movie]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedMovie = {
      ...movie,
      title,
      poster,
      myRating: formType === 'personal' || formType === 'both' ? myRating : movie.myRating,
      myReview: formType === 'personal' || formType === 'both' ? myReview : movie.myReview,
      herRating: formType === 'partner' || formType === 'both' ? herRating : movie.herRating,
      herReview: formType === 'partner' || formType === 'both' ? herReview : movie.herReview,
    };
    
    onSave(updatedMovie);
  };

  const renderRatingInputs = () => {
    if (formType === 'personal') {
      return (
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">His Rating (1-10)</label>
          <input 
            type="number" 
            min="1" 
            max="10"
            value={myRating} 
            onChange={(e) => setMyRating(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded" 
          />
          <label className="block text-gray-700 mt-2 mb-2">His Review</label>
          <textarea 
            value={myReview} 
            onChange={(e) => setMyReview(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded" 
            rows="3"
          />
        </div>
      );
    } else if (formType === 'partner') {
      return (
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Her Rating (1-10)</label>
          <input 
            type="number" 
            min="1" 
            max="10"
            value={herRating} 
            onChange={(e) => setHerRating(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded" 
          />
          <label className="block text-gray-700 mt-2 mb-2">Her Review</label>
          <textarea 
            value={herReview} 
            onChange={(e) => setHerReview(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded" 
            rows="3"
          />
        </div>
      );
    } else if (formType === 'both') {
      return (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">His Rating (1-10)</label>
            <input 
              type="number" 
              min="1" 
              max="10"
              value={myRating} 
              onChange={(e) => setMyRating(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded" 
            />
            <label className="block text-gray-700 mt-2 mb-2">His Review</label>
            <textarea 
              value={myReview} 
              onChange={(e) => setMyReview(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded" 
              rows="3"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Her Rating (1-10)</label>
            <input 
              type="number" 
              min="1" 
              max="10"
              value={herRating} 
              onChange={(e) => setHerRating(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded" 
            />
            <label className="block text-gray-700 mt-2 mb-2">Her Review</label>
            <textarea 
              value={herReview} 
              onChange={(e) => setHerReview(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded" 
              rows="3"
            />
          </div>
        </>
      );
    }
  };

  // Modal backdrop with click outside to close
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0" 
        onClick={onClose}
        aria-label="Close modal"
      ></div>
      
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative z-10 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Movie</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Movie Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded" 
              required 
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Poster URL (optional)</label>
            <input 
              type="text" 
              value={poster} 
              onChange={(e) => setPoster(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded" 
            />
            {poster && (
              <div className="mt-2 h-32 flex justify-center">
                <img 
                  src={poster} 
                  alt={title} 
                  className="h-full object-contain" 
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
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
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