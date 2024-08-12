import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Add styles for the sidebar

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/dashboard">List of Portfolio Items</Link>
        </li>
        <li>
          <Link to="/portfolio/add" className="add-button">Add Portfolio Item</Link>
        </li>
        <li>
          <a href="/" target="_blank" rel="noopener noreferrer">Live Portfolio</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
