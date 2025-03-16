import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import { MovieProvider, useMovies } from './context/MovieContext';

// Import pages
import HomePage from './pages/HomePage';
import HisMoviesPage from './pages/HisMoviesPage';
import HerMoviesPage from './pages/HerMoviesPage';
import OurMoviesPage from './pages/OurMoviesPage';

// Loading spinner component
const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-5 rounded-lg shadow-lg flex flex-col items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mb-3"></div>
      <p className="text-gray-700">Loading movies...</p>
    </div>
  </div>
);

// Main app content component
const AppContent = () => {
  const { loading } = useMovies();
  
  return (
    <div className="App">
      {loading && <LoadingSpinner />}
      
      <header className="bg-black text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold flex items-center justify-center">
            <span className="text-3xl mr-2">🎬</span>
            <span className="font-satisfy tracking-wider">MOVIES BY US</span>
          </h1>
          <nav className="mt-6">
            <ul className="flex space-x-8 justify-center">
              <li>
                <NavLink 
                  to="/" 
                  className={({ isActive }) => 
                    isActive 
                      ? "text-yellow-300 font-bold border-b-2 border-yellow-300 pb-1" 
                      : "hover:text-yellow-300 transition-colors"
                  }
                  end
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/his-movies" 
                  className={({ isActive }) => 
                    isActive 
                      ? "text-yellow-300 font-bold border-b-2 border-yellow-300 pb-1" 
                      : "hover:text-yellow-300 transition-colors"
                  }
                >
                  His Movies
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/her-movies" 
                  className={({ isActive }) => 
                    isActive 
                      ? "text-yellow-300 font-bold border-b-2 border-yellow-300 pb-1" 
                      : "hover:text-yellow-300 transition-colors"
                  }
                >
                  Her Movies
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/our-movies" 
                  className={({ isActive }) => 
                    isActive 
                      ? "text-yellow-300 font-bold border-b-2 border-yellow-300 pb-1" 
                      : "hover:text-yellow-300 transition-colors"
                  }
                >
                  Our Movies
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main className="container mx-auto px-4 md:px-16 py-8 z-10 relative">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/his-movies" element={<HisMoviesPage />} />
          <Route path="/her-movies" element={<HerMoviesPage />} />
          <Route path="/our-movies" element={<OurMoviesPage />} />
        </Routes>
      </main>
      
      <footer className="bg-black text-white py-4 z-10 relative">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-satisfy tracking-wide">Movie Ratings by Us &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <Router>
      <MovieProvider>
        <AppContent />
      </MovieProvider>
    </Router>
  );
}

export default App;
