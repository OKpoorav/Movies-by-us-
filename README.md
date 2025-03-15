# Movie Ratings By Us

A personal movie rating website for documenting and comparing movie ratings between partners, inspired by the design from the provided image.

## Overview

This website allows a couple to document and rate the movies they have watched individually and together. It provides three main sections:

1. **My Movies** - Movies watched and rated by one partner
2. **Her Movies** - Movies watched and rated by the other partner
3. **Our Movies** - Movies watched together with side-by-side ratings from both partners

## Features

- **Movie Listings**: Display movies in a card/grid format
- **Rating System**: Star ratings from 1 to 10, with optional short reviews
- **Image Upload**: Include movie posters via URL
- **Local Storage**: Movie data is saved in local storage for persistence
- **Film Strip Design**: Visual design inspired by classic film strips

## Tech Stack

- **Frontend**: React.js with React Router for navigation
- **Styling**: Tailwind CSS for UI styling
- **State Management**: React Context API for global state
- **Storage**: LocalStorage for persistently storing movie data

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/movie-ratings.git
   cd movie-ratings
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Adding a New Movie

1. Navigate to the appropriate section (My Movies, Her Movies, or Our Movies)
2. Click the "Add New Movie" button
3. Fill in the movie details and your rating(s)
4. Click "Add Movie" to save

### Viewing Movies

- Movies are displayed in a grid format with movie posters and ratings
- Each card shows the movie title, poster, and respective ratings

## Project Structure

```
movie-ratings/
├── public/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── AddMovieForm.js
│   │   ├── MovieCard.js
│   │   └── MovieGrid.js
│   ├── context/          # Global state management
│   │   └── MovieContext.js
│   ├── pages/            # Page components
│   │   ├── HomePage.js
│   │   ├── MyMoviesPage.js
│   │   ├── HerMoviesPage.js
│   │   └── OurMoviesPage.js
│   ├── App.js            # Main app component with routing
│   ├── App.css           # App styles
│   ├── index.js          # Entry point
│   └── index.css         # Global styles
└── README.md
```

## Future Enhancements

- User authentication for separate user data
- Backend server and database for persistent storage
- Advanced sorting and filtering options
- Movie search functionality
- Integration with movie databases for auto-populating movie details

## License

This project is licensed under the MIT License.
