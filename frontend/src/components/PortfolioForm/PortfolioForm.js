// src/components/PortfolioForm/PortfolioForm.js
import React, { useState, useEffect } from 'react';
import './PortfolioForm.css';

const PortfolioForm = ({ initialData = {}, onSubmit }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [clientUrl, setClientUrl] = useState(initialData.clientUrl || 'https://');
  const [status, setStatus] = useState(initialData.status || 'visible');
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (initialData.imageFilename) {
      setImageFile(initialData.imageFilename);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, clientUrl, status, imageFile });
  };

  return (
    <form onSubmit={handleSubmit} className="portfolio-form">
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Client URL:</label>
        <input
          type="url"
          value={clientUrl}
          onChange={(e) => setClientUrl(e.target.value)}
          placeholder="https://www.example.com"
          required
        />
        <small>Please include "https://" or "http://" in the URL.</small>
      </div>
      <div>
        <label>Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="visible">Display</option>
          <option value="hidden">Hidden</option>
        </select>
      </div>
      <div>
        <label>Image:</label>
        <input
          type="file"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default PortfolioForm;
