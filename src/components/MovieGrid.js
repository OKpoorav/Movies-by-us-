import React from 'react';
import MovieCard from './MovieCard';

const MovieGrid = ({ movies, ratingType, onEdit, onDelete }) => {
  // Function to determine which ratings to display based on the page
  const getRatingsForMovie = (movie) => {
    switch (ratingType) {
      case 'personal':
        return [{ person: 'him', score: movie.myRating, review: movie.myReview }];
      case 'partner':
        return [{ person: 'her', score: movie.herRating, review: movie.herReview }];
      case 'both':
        return [
          { person: 'him', score: movie.myRating, review: movie.myReview },
          { person: 'her', score: movie.herRating, review: movie.herReview }
        ];
      case 'combined':
        const combinedScore = Math.round((movie.myRating + movie.herRating) / 2);
        return [{ person: 'us', score: combinedScore, review: `${movie.myReview}\n\n${movie.herReview}` }];
      default:
        return [];
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {movies.map(movie => (
        <div key={movie.id} className="h-full">
          <MovieCard 
            movie={movie} 
            ratings={getRatingsForMovie(movie)}
            onEdit={onEdit ? () => onEdit(movie) : null}
            onDelete={onDelete ? () => onDelete(movie.id) : null}
          />
        </div>
      ))}
    </div>
  );
};

export default MovieGrid; 