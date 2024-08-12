import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddEditPortfolio from './pages/AddEditPortfolio';  // Ensure this is correctly implemented
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
