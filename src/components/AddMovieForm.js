import React, { useState } from 'react';

const AddMovieForm = ({ onAddMovie, formType }) => {
  const [title, setTitle] = useState('');
  const [poster, setPoster] = useState('');
  const [myRating, setMyRating] = useState(5);
  const [myReview, setMyReview] = useState('');
  const [herRating, setHerRating] = useState(5);
  const [herReview, setHerReview] = useState('');
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
    setIsFormVisible(false);
  };

  const renderRatingInputs = () => {
    if (formType === 'personal') {
      return (
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">My Rating (1-10)</label>
          <input 
            type="number" 
            min="1" 
            max="10"
            value={myRating} 
            onChange={(e) => setMyRating(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded" 
          />
          <label className="block text-gray-700 mt-2 mb-2">My Review</label>
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
            <label className="block text-gray-700 mb-2">My Rating (1-10)</label>
            <input 
              type="number" 
              min="1" 
              max="10"
              value={myRating} 
              onChange={(e) => setMyRating(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded" 
            />
            <label className="block text-gray-700 mt-2 mb-2">My Review</label>
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

  return (
    <div className="mb-8">
      <button 
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-blue-600"
      >
        {isFormVisible ? 'Cancel' : 'Add New Movie'}
      </button>
      
      {isFormVisible && (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
          <h2 className="text-xl font-bold mb-4">Add New Movie</h2>
          
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
          </div>
          
          {renderRatingInputs()}
          
          <button 
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Add Movie
          </button>
        </form>
      )}
    </div>
  );
};

export default AddMovieForm; 