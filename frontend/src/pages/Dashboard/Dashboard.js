import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortfolioItem from '../../components/PortfolioItem/PortfolioItem';
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';
import { getPortfolioItems, deletePortfolioItem,updatePortfolioItem } from '../../services/api';
import Sidebar from '../../components/SideBar/Sidebar';
import EditModal from '../../components/EditModal/EditModal';
import './Dashboard.css';

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false); // State to manage sidebar visibility
  const navigate = useNavigate();
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false); // State to manage modal visibility
  const [selectedItem, setSelectedItem] = useState(null); // State to store the item to be edited

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const items = await getPortfolioItems();
        setPortfolioItems(items);
      } catch (error) {
        console.error('Failed to fetch portfolio items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleSave = async (updatedItem) => {
    try {
      await updatePortfolioItem(updatedItem.id, updatedItem);
      setPortfolioItems(portfolioItems.map(item => item.id === updatedItem.id ? updatedItem : item));
      setModalOpen(false); // Close the modal after saving
    } catch (error) {
      console.error('Failed to update portfolio item:', error);
    }
  };

  const handleEdit = (id) => {
    const item = portfolioItems.find(item => item.id === id);
    setSelectedItem(item); // Set the selected item to be edited
    setModalOpen(true); // Open the modal
  };

  const handleDelete = async (id) => {
    try {
      await deletePortfolioItem(id);
      setPortfolioItems(portfolioItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Failed to delete portfolio item:', error);
    }
  };

  const toggleVisibility = async (id) => {
    try {
      const item = portfolioItems.find(item => item.id === id);
      const updatedStatus = item.status === 'visible' ? 'hidden' : 'visible';
  
      // Update the status in the database
      await updatePortfolioItem(id, { status: updatedStatus });
  
      // Update the UI to reflect the new status
      setPortfolioItems(portfolioItems.map(item =>
        item.id === id ? { ...item, status: updatedStatus } : item
      ));
    } catch (error) {
      console.error('Failed to update portfolio item status:', error);
    }
  };
  

  return (
    <div className="dashboard-container">
     <div 
        className={`hamburger-menu ${isSidebarOpen ? 'open' : ''}`} 
        onClick={() => {
          console.log('Hamburger clicked');
          setSidebarOpen(!isSidebarOpen);
        }}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
      
      <Sidebar className={isSidebarOpen ? 'open' : 'closed'} /> {/* Pass the open class to Sidebar based on state */}
      
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
                  isOn={item.status === 'visible'}
                  handleToggle={() => toggleVisibility(item.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
       {/* Integrate the EditModal */}
       <EditModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)} // Function to close the modal
        item={selectedItem} // Pass the selected item to the modal
        onSave={handleSave} // Function to handle saving the edited item
      />
    </div>
  );
};

export default Dashboard;
