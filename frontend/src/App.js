import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddEditPortfolio from './pages/AddPortfolioItem/AddEditPortfolio';  // Import AddPortfolio component
import PortfolioList from './pages/PortfolioList/PortfolioList';           // Import PortfolioList component
import Layout from './components/Layout/Layout';                           // Import Layout component
import Dashboard from './pages/Dashboard/Dashboard';                       // Import the Dashboard component        
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/portfolio/add" element={<AddEditPortfolio />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<PortfolioList />} />  {/* Default route */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
