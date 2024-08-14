import React from 'react';
import PortfolioForm from '../PortfolioForm/PortfolioForm';
import './EditModal.css';

const EditModal = ({ isOpen, onClose, item, onSave }) => {
  if (!isOpen) {
    return null;
  }

  const handleFormSubmit = (formData) => {
    onSave({ ...item, ...formData });
    onClose(); // Close the modal after saving
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Portfolio Item</h2>
        <PortfolioForm initialData={item} onSubmit={handleFormSubmit} />
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditModal;
