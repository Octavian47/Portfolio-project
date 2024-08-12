import React from 'react';
import Header from './Header';  // Import the Header component
import './Layout.css';  // Import CSS for layout

function Layout({ children }) {
  return (
    <div className="App">
      <Header />  {/* Render the Header component */}
      <main>
        {children}
      </main>
    </div>
  );
}

export default Layout;
