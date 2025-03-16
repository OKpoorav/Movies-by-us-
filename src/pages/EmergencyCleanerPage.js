import React, { useState } from 'react';
import { useMovies } from '../context/MovieContext';
import { db, collection, getDocs, deleteDoc, doc } from '../firebase';

// Collection name in Firestore
const COLLECTION_NAME = 'movies';

const EmergencyCleanerPage = () => {
  const { movies, clearAllMovies } = useMovies();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [deletedCount, setDeletedCount] = useState(0);

  // Direct Firebase purge function that bypasses the context
  const purgeFirebaseDirectly = async () => {
    if (!window.confirm('⚠️ EMERGENCY DATABASE PURGE ⚠️\n\nThis will directly delete ALL movies from Firebase.\nThis action CANNOT be undone!\n\nAre you absolutely sure?')) {
      return;
    }
    
    setIsLoading(true);
    setMessage('🔥 EMERGENCY PURGE: Directly accessing Firebase...');
    
    try {
      // Get all documents from the collection
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      const totalDocs = querySnapshot.docs.length;
      
      if (totalDocs === 0) {
        setMessage('Database is already empty. No documents to delete.');
        setIsLoading(false);
        return;
      }
      
      setMessage(`Found ${totalDocs} documents. Starting deletion...`);
      let count = 0;
      
      // Delete each document one by one
      for (const docSnapshot of querySnapshot.docs) {
        await deleteDoc(doc(db, COLLECTION_NAME, docSnapshot.id));
        count++;
        setDeletedCount(count);
        setMessage(`Deleting... ${count}/${totalDocs} documents removed`);
      }
      
      // Clear localStorage
      localStorage.clear();
      
      setMessage(`✅ PURGE COMPLETE: Successfully deleted all ${count} documents from Firebase and cleared localStorage!`);
      
      // Force reload the page after 2 seconds
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      
    } catch (error) {
      console.error('Emergency purge failed:', error);
      setMessage(`❌ PURGE FAILED: ${error.message}\nCheck the console for more details.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStandardClear = async () => {
    setIsLoading(true);
    setMessage('Attempting to clear all movies using the standard method...');
    
    try {
      await clearAllMovies();
      setMessage('✅ Standard clearing process completed. The page will reload.');
    } catch (error) {
      setMessage(`❌ Standard clearing failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const resetLocalStorage = () => {
    if (window.confirm('This will clear all localStorage data. Continue?')) {
      localStorage.clear();
      setMessage('✅ LocalStorage cleared! Reloading page...');
      setTimeout(() => window.location.reload(), 1000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-red-600 mb-2">⚠️ EMERGENCY DATABASE CLEANER ⚠️</h1>
        <p className="text-gray-600">Use this page ONLY if your database is stuck with unwanted movies.</p>
      </div>
      
      <div className="p-4 bg-red-50 border-l-4 border-red-500 mb-8">
        <h2 className="text-xl font-bold text-red-700 mb-2">Database Status</h2>
        <p className="mb-2">Current movie count in state: <strong>{movies.length}</strong></p>
        <p className="mb-4">If this number is not zero after trying the other methods, try the emergency purge.</p>
      </div>
      
      <div className="grid gap-6 mb-8">
        <div className="p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Option 1: Standard Clear</h3>
          <p className="mb-4">Try the standard method first to clear all movies from the database.</p>
          <button
            onClick={handleStandardClear}
            disabled={isLoading}
            className="w-full py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : 'Standard Clear (Safe)'}
          </button>
        </div>
        
        <div className="p-4 bg-orange-50 border border-orange-300 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Option 2: Clear LocalStorage</h3>
          <p className="mb-4">Clear browser storage to prevent data re-synchronization with Firebase.</p>
          <button
            onClick={resetLocalStorage}
            disabled={isLoading}
            className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
          >
            Clear LocalStorage
          </button>
        </div>
        
        <div className="p-4 bg-red-50 border-2 border-red-500 rounded-lg">
          <h3 className="text-lg font-bold text-red-700 mb-2">Option 3: EMERGENCY PURGE</h3>
          <p className="mb-4 text-red-700">⚠️ LAST RESORT: This will directly access Firebase and delete ALL movies.</p>
          <button
            onClick={purgeFirebaseDirectly}
            disabled={isLoading}
            className="w-full py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 font-bold"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing... {deletedCount > 0 ? `(${deletedCount} removed)` : ''}
              </span>
            ) : (
              'EMERGENCY DATABASE PURGE'
            )}
          </button>
        </div>
      </div>
      
      {message && (
        <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-lg overflow-auto max-h-60">
          <p className="whitespace-pre-line">{message}</p>
        </div>
      )}
      
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Troubleshooting Tips:</h3>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li>After using any option, <strong>refresh your browser</strong> to see if the movies are gone.</li>
          <li>Check your browser console for any error messages.</li>
          <li>If the emergency purge doesn't work, you may need to manage your Firebase database directly through the Firebase console.</li>
          <li>Once your database is clean, you can start adding movies again.</li>
        </ul>
      </div>
    </div>
  );
};

export default EmergencyCleanerPage; 