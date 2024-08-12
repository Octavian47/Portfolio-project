import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddEditPortfolio from './pages/AddPortfolioItem/AddEditPortfolio';  // Import AddPortfolio component
import PortfolioList from './pages/PortfolioList/PortfolioList';  // Import PortfolioList component
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Portfolio Management</h1>
        </header>
        <Routes>
          <Route path="/portfolio/add" element={<AddEditPortfolio />} />
          <Route path="/" element={<PortfolioList />} />  {/* Default route to PortfolioList */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
