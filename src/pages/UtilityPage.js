import React, { useState, useEffect } from 'react';
import { useMovies } from '../context/MovieContext';
import { Link } from 'react-router-dom';

const UtilityPage = () => {
  const { movies, clearAllMovies } = useMovies();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [autoCleared, setAutoCleared] = useState(false);
  const [clearAttempts, setClearAttempts] = useState(0);

  // Auto-clear all movies when the page loads (one time only)
  useEffect(() => {
    const performAutoClear = async () => {
      if (!autoCleared && clearAttempts < 3) {
        setIsLoading(true);
        setMessage('Automatically clearing all movies from database...');
        
        try {
          await clearAllMovies();
          setMessage('✅ Successfully cleared all movies! Your database is now empty.');
          setAutoCleared(true);
        } catch (error) {
          setMessage(`❌ Error clearing movies: ${error.message}`);
          setClearAttempts(prev => prev + 1);
        } finally {
          setIsLoading(false);
        }
      }
    };

    performAutoClear();
  }, [clearAllMovies, autoCleared, clearAttempts]);

  const handleClearAllMovies = async () => {
    if (window.confirm('Are you sure you want to delete ALL movies? This cannot be undone!')) {
      setIsLoading(true);
      setMessage('Clearing all movies...');
      
      try {
        await clearAllMovies();
        setMessage('✅ All movies cleared successfully! The page will reload.');
        
        // Force reload after 2 seconds
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        setMessage(`❌ Error: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleMigrateFromLocalStorage = () => {
    if (window.confirm('This will attempt to migrate data from localStorage to Firebase. Continue?')) {
      // Set the migration flag to true
      localStorage.setItem('shouldMigrateToFirebase', 'true');
      setMessage('Migration flag set. Please refresh the page.');
    }
  };

  const handleFixCSSIssues = () => {
    // Add a class to the body that will override any problematic CSS
    document.body.classList.add('ui-fix-applied');
    
    // Add CSS fixes
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .ui-fix-applied .container {
        max-width: 100%;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        box-sizing: border-box;
      }
      
      .ui-fix-applied main {
        padding-left: 16px !important;
        padding-right: 16px !important;
        box-sizing: border-box;
      }
      
      .ui-fix-applied .page-enter {
        max-width: 100% !important;
        margin-left: auto !important;
        margin-right: auto !important;
      }
      
      @media (min-width: 640px) {
        .ui-fix-applied .container {
          max-width: 640px;
        }
      }
      
      @media (min-width: 768px) {
        .ui-fix-applied .container {
          max-width: 768px;
        }
      }
      
      @media (min-width: 1024px) {
        .ui-fix-applied .container {
          max-width: 1024px;
        }
      }
      
      @media (min-width: 1280px) {
        .ui-fix-applied .container {
          max-width: 1280px;
        }
      }
    `;
    document.head.appendChild(styleElement);
    
    setMessage('CSS fixes applied! The layout should now be properly centered to the viewport.');
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Utilities & Troubleshooting</h1>
      
      <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Database Status</h2>
        <p className="mb-2">Current movie count: <strong>{movies.length}</strong></p>
        {movies.length > 0 && (
          <p className="text-red-700 font-semibold mb-4">⚠️ Your database still contains movies! Use the button below to clear them.</p>
        )}
        {movies.length === 0 && (
          <p className="text-green-700 font-semibold mb-4">✅ Database is clear. You can now add new movies.</p>
        )}
        
        <div className="grid gap-4 mt-4">
          <button
            onClick={handleClearAllMovies}
            disabled={isLoading || movies.length === 0}
            className="w-full py-3 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 font-bold text-lg flex items-center justify-center"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : '🗑️ Clear ALL Movies'}
          </button>
          
          {movies.length > 0 && (
            <Link 
              to="/emergency-cleaner"
              className="w-full py-3 px-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-bold text-lg text-center flex items-center justify-center"
            >
              🧨 Go to Emergency Database Cleaner
            </Link>
          )}
        </div>
      </div>
      
      <div className="mb-8 p-4 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Advanced Operations</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleMigrateFromLocalStorage}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Migrate from localStorage
          </button>
          
          <button
            onClick={handleFixCSSIssues}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Fix Centering Issues
          </button>
        </div>
      </div>
      
      {message && (
        <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
          <p className="text-yellow-800">{message}</p>
        </div>
      )}
      
      <div className="mt-8 text-sm text-gray-600">
        <h3 className="font-semibold mb-2">Troubleshooting Tips:</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>If you're having issues with data, try clearing all movies first.</li>
          <li>If the standard clear button doesn't work, use the Emergency Database Cleaner for a more direct approach.</li>
          <li>If the UI looks off-center, use the "Fix Centering Issues" button.</li>
          <li>After applying changes, you may need to refresh the page.</li>
          <li>If problems persist, check the browser console for errors.</li>
        </ul>
      </div>
    </div>
  );
};

export default UtilityPage;