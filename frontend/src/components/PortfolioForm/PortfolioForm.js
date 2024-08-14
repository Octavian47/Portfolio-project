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
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="clientUrl">Client URL:</label>
        <input
          id="clientUrl"
          type="url"
          value={clientUrl}
          onChange={(e) => setClientUrl(e.target.value)}
          placeholder="https://www.example.com"
          required
        />
        <small>Please include "https://" or "http://" in the URL.</small>
      </div>
      <div>
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="visible">Display</option>
          <option value="hidden">Hidden</option>
        </select>
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input
          id="image"
          type="file"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default PortfolioForm;
