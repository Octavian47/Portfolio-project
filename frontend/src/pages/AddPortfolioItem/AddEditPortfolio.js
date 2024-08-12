import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortfolioItem } from '../../services/api';
import PortfolioForm from '../../components/PortfolioForm/PortfolioForm';

const AddEditPortfolio = () => {
  const navigate = useNavigate();
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
          //navigate('/portfolio');
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
  

  return (
    <div>
      <h1>Add New Portfolio Item</h1>
      {message && (
        <div className={`message ${status}`}>
          <p>{message}</p>
        </div>
      )}
      <PortfolioForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default AddEditPortfolio;
