import React from 'react';
import MovieCard from './MovieCard';

const MovieGrid = ({ movies, ratingType }) => {
  // Function to determine which ratings to display based on the page
  const getRatingsForMovie = (movie) => {
    switch (ratingType) {
      case 'personal':
        return [{ person: 'me', score: movie.myRating, review: movie.myReview }];
      case 'partner':
        return [{ person: 'anya', score: movie.herRating, review: movie.herReview }];
      case 'both':
        return [
          { person: 'me', score: movie.myRating, review: movie.myReview },
          { person: 'anya', score: movie.herRating, review: movie.herReview }
        ];
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
          />
        </div>
      ))}
    </div>
  );
};

export default MovieGrid; 