import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';  // Import the Header component
import './Layout.css';  // Import CSS for layout

function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="App">
      {/* Conditionally render the Header based on the current route */}
      {location.pathname !== '/dashboard' && <Header />}
      <main>
        {children}
      </main>
    </div>
  );
}

export default Layout;
