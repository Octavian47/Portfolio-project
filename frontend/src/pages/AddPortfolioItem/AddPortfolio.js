import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortfolioItem } from '../../services/api';
import PortfolioForm from '../../components/PortfolioForm/PortfolioForm';
import Sidebar from '../../components/SideBar/Sidebar';
import './AddPortfolio.css';

const AddPortfolio = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false); // State to manage sidebar visibility
  const [message, setMessage] = useState('');  // State to hold the message
  const [status, setStatus] = useState('');    // State to hold the status

  const handleFormSubmit = async (formData, imageFile) => {
    try {
      const response = await createPortfolioItem(formData, imageFile);
      
      // Check if the response indicates success
      if (response.status === 'success') {
        setStatus(response.status);
        setMessage(response.message);
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        // Handle unexpected status
        setStatus('error');
        setMessage(response.message || 'Unexpected error occurred.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to create portfolio item. Please try again.');
      console.error('Error in form submission:', error);
    }
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility state
  };
  

  return (
    <div className="add-portfolio-container">
      <div 
        className={`hamburger-menu ${isSidebarOpen ? 'open' : ''}`} 
        onClick={handleSidebarToggle} // Toggle sidebar on hamburger click
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
      
      <Sidebar 
        className={isSidebarOpen ? 'open' : ''} 
        onClose={() => setSidebarOpen(false)} // Pass the close function to Sidebar 
      />
      
      <div className="content">
        <h1>Add New Portfolio Item</h1>
        {message && (
          <div className={`message ${status}`}>
            <p>{message}</p>
          </div>
        )}
        <PortfolioForm onSubmit={handleFormSubmit} />
      </div>
    </div>
  );
};

export default AddPortfolio;
