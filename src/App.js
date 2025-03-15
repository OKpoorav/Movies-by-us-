import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Import pages
import HomePage from './pages/HomePage';
import MyMoviesPage from './pages/MyMoviesPage';
import HerMoviesPage from './pages/HerMoviesPage';
import OurMoviesPage from './pages/OurMoviesPage';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="bg-black text-white shadow-lg">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-4xl font-bold flex items-center justify-center">
              <span className="text-3xl mr-2">🐀</span>
              <span className="font-satisfy tracking-wider">THINGS BY US</span>
            </h1>
            <nav className="mt-4">
              <ul className="flex space-x-6 justify-center">
                <li>
                  <Link to="/" className="hover:text-gray-300">Home</Link>
                </li>
                <li>
                  <Link to="/my-movies" className="hover:text-gray-300">My Movies</Link>
                </li>
                <li>
                  <Link to="/her-movies" className="hover:text-gray-300">Her Movies</Link>
                </li>
                <li>
                  <Link to="/our-movies" className="hover:text-gray-300">Our Movies</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        
        <main className="container mx-auto px-16 py-8 z-10 relative">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/my-movies" element={<MyMoviesPage />} />
            <Route path="/her-movies" element={<HerMoviesPage />} />
            <Route path="/our-movies" element={<OurMoviesPage />} />
          </Routes>
        </main>
        
        <footer className="bg-black text-white py-4 z-10 relative">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; {new Date().getFullYear()} Movie Ratings by Us</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
