import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import './Layout.css';

function Layout({ children }) {
  const location = useLocation();

  // Define locations where the header won't appear
  const hideHeaderPaths = ['/dashboard', '/portfolio/add'];

  // Log the current pathname for debugging purposes
  console.log('Current Path:', location.pathname);

  return (
    <div className="App">
      {/* Conditionally render the Header based on the current route */}
      {!hideHeaderPaths.includes(location.pathname) && <Header />}
      <main>
        {children}
      </main>
    </div>
  );
}

export default Layout;
