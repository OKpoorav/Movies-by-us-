import React, { useState } from 'react';

const AddMovieForm = ({ onAddMovie, formType }) => {
  const [title, setTitle] = useState('');
  const [poster, setPoster] = useState('');
  const [myRating, setMyRating] = useState(5);
  const [myReview, setMyReview] = useState('');
  const [herRating, setHerRating] = useState(5);
  const [herReview, setHerReview] = useState('');
  const [combinedRating, setCombinedRating] = useState(5);
  const [combinedReview, setCombinedReview] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newMovie = {
      id: Date.now(), // Simple ID generation
      title,
      poster,
      myRating: formType === 'personal' || formType === 'both' ? myRating : 0,
      myReview: formType === 'personal' || formType === 'both' ? myReview : '',
      herRating: formType === 'partner' || formType === 'both' ? herRating : 0,
      herReview: formType === 'partner' || formType === 'both' ? herReview : '',
    };
    
    onAddMovie(newMovie);
    
    // Reset form
    setTitle('');
    setPoster('');
    setMyRating(5);
    setMyReview('');
    setHerRating(5);
    setHerReview('');
    setCombinedRating(5);
    setCombinedReview('');
    setIsFormVisible(false);
  };

  const getFormColor = () => {
    if (formType === 'personal') return '#000080'; // Navy blue
    if (formType === 'partner') return '#C8A2C8'; // Lilac
    if (formType === 'both') return '#9370DB'; // Lavender
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
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:border-transparent transition-all" 
            style={{borderColor: '#000080'}}
            step="1"
          />
          <div className="flex mt-2 mb-4">
            {[...Array(10)].map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setMyRating(i + 1)}
                className={`w-8 h-8 rounded-full mr-1 flex items-center justify-center transition-colors transform hover:scale-110`}
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
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:border-transparent transition-all" 
            rows="3"
            placeholder="What did he think about this movie?"
            style={{borderColor: '#000080'}}
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
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:border-transparent transition-all" 
            style={{borderColor: '#C8A2C8'}}
            step="1"
          />
          <div className="flex mt-2 mb-4">
            {[...Array(10)].map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setHerRating(i + 1)}
                className={`w-8 h-8 rounded-full mr-1 flex items-center justify-center transition-colors transform hover:scale-110`}
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
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:border-transparent transition-all" 
            rows="3"
            placeholder="What did she think about this movie?"
            style={{borderColor: '#C8A2C8'}}
          />
        </div>
      );
    } else if (formType === 'both') {
      return (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border" style={{borderColor: '#9370DB'}}>
          <h3 className="font-medium text-lg mb-3" style={{color: '#9370DB'}}>Our Combined Rating</h3>
          <label className="block text-gray-700 mb-2">Rating (1-10)</label>
          <input 
            type="number" 
            min="1" 
            max="10"
            value={myRating} 
            onChange={(e) => setMyRating(Math.round(Number(e.target.value)))}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:border-transparent transition-all" 
            style={{borderColor: '#9370DB'}}
            step="1"
          />
          <div className="flex mt-2 mb-4">
            {[...Array(10)].map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setMyRating(i + 1)}
                className={`w-8 h-8 rounded-full mr-1 flex items-center justify-center transition-colors transform hover:scale-110`}
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
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:border-transparent transition-all" 
            rows="3"
            placeholder="What did he think about this movie?"
            style={{borderColor: '#9370DB'}}
          />
          
          <label className="block text-gray-700 mt-2 mb-2">Her Review</label>
          <textarea 
            value={herReview} 
            onChange={(e) => setHerReview(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:border-transparent transition-all" 
            rows="3"
            placeholder="What did she think about this movie?"
            style={{borderColor: '#9370DB'}}
          />
        </div>
      );
    }
  };

  return (
    <div className="mb-8">
      <button 
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="shadow-md flex items-center justify-center mx-auto transition-all duration-300 transform hover:scale-105 px-6 py-3 rounded-lg mb-6 text-white"
        style={{background: `linear-gradient(to right, ${getFormColor()}, ${getFormColor()}dd)`}}
      >
        <span className="mr-2">{isFormVisible ? 'Cancel' : 'Add New Movie'}</span>
        {!isFormVisible && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        )}
      </button>
      
      {isFormVisible && (
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 transition-all duration-300 animate-fadeIn">
          <h2 className="text-2xl font-satisfy text-center mb-6">Add New Movie</h2>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">Movie Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:border-transparent transition-all" 
              required 
              placeholder="Enter movie title"
              style={{borderColor: getFormColor()}}
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium">Poster URL (optional)</label>
            <input 
              type="text" 
              value={poster} 
              onChange={(e) => setPoster(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:border-transparent transition-all" 
              placeholder="https://example.com/movie-poster.jpg"
              style={{borderColor: getFormColor()}}
            />
            {poster && (
              <div className="mt-3 h-40 flex justify-center bg-gray-100 p-2 rounded">
                <img 
                  src={poster} 
                  alt={title} 
                  className="h-full object-contain transition-all duration-300 transform hover:scale-105" 
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = 'https://via.placeholder.com/150x225?text=Invalid+URL';
                  }}
                />
              </div>
            )}
          </div>
          
          {renderRatingInputs()}
          
          <button 
            type="submit"
            className="w-full text-white py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 font-medium shadow-md"
            style={{background: `linear-gradient(to right, ${getFormColor()}, ${getFormColor()}dd)`}}
          >
            Add Movie
          </button>
        </form>
      )}
    </div>
  );
};

export default AddMovieForm; 