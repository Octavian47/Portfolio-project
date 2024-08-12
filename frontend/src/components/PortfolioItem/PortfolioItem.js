import React from 'react';
import './PortfolioItem.css';

const PortfolioItem = ({ title, description, imageFilename, clientUrl, status }) => {
  // Do not render the component if the status is 'hidden'
  if (status === 'hidden') {
    return null;
  }

  return (
    <div className="portfolio-item">
      <img src={imageFilename} alt={title} className="portfolio-image" />
      <h3>{title}</h3>
      <p>{description}</p>
      <a href={clientUrl} target="_blank" rel="noopener noreferrer">
        Visit Client's Site
      </a>
    </div>
  );
};

export default PortfolioItem;
