import React, { useEffect, useState } from 'react';
import PortfolioItem from '../../components/PortfolioItem/PortfolioItem';
import { getPortfolioItems } from '../../services/api';
import './PortfolioList.css';

const PortfolioList = () => {
  const [portfolioItems, setPortfolioItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const items = await getPortfolioItems();
        // Filter items to only show those that are 'visible'
        const visibleItems = items.filter(item => item.status === 'visible');
        setPortfolioItems(visibleItems);
      } catch (error) {
        console.error('Failed to fetch portfolio items:', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="portfolio-list">
      {portfolioItems.map((item) => (
        <PortfolioItem
          key={item.id}
          title={item.title}
          description={item.description}
          imageFilename={item.imageFilename}
          clientUrl={item.clientUrl}
          status={item.status}
        />
      ))}
    </div>
  );
};

export default PortfolioList;
