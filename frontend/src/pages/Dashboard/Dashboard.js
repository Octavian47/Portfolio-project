import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortfolioItem from '../../components/PortfolioItem/PortfolioItem';
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';
import { getPortfolioItems, deletePortfolioItem } from '../../services/api';
import Sidebar from '../../components/SideBar/Sidebar';
import './Dashboard.css';

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false); // State to manage sidebar visibility
  const navigate = useNavigate();
  const [portfolioItems, setPortfolioItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const items = await getPortfolioItems();
        const updatedItems = items.map(item => ({ ...item, visible: true }));
        setPortfolioItems(updatedItems);
      } catch (error) {
        console.error('Failed to fetch portfolio items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleEdit = (id) => {
    navigate(`/portfolio/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await deletePortfolioItem(id);
      setPortfolioItems(portfolioItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Failed to delete portfolio item:', error);
    }
  };

  const toggleVisibility = (id) => {
    setPortfolioItems(portfolioItems.map(item =>
      item.id === id ? { ...item, visible: !item.visible } : item
    ));
  };

  return (
    <div className="dashboard-container">
      <div 
        className={`hamburger-menu ${isSidebarOpen ? 'open' : ''}`} 
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
      
      <Sidebar className={isSidebarOpen ? 'open' : 'closed'} />
      
      <div className="dashboard-content">
        <div className="portfolio-list">
          {portfolioItems.map((item) => (
            <div key={item.id} className="dashboard-item">
              <PortfolioItem
                title={item.title}
                description={item.description}
                imageFilename={item.imageFilename}
                clientUrl={item.clientUrl}
                status={item.status}
              />
              <div className="dashboard-buttons">
                <button onClick={() => handleEdit(item.id)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
                <ToggleSwitch
                  id={item.id}
                  isOn={item.visible}
                  handleToggle={() => toggleVisibility(item.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
