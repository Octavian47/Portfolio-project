// src/App.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Test that checks if the default route renders the PortfolioList component
test('renders PortfolioList on default route ("/")', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  const portfolioListElement = screen.getByText(/Portfolio/i); // Adjust based on what PortfolioList renders
  expect(portfolioListElement).toBeInTheDocument();
});

// Test that checks if the "/dashboard" route renders the Dashboard component
test('renders Dashboard on "/dashboard" route', () => {
  render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <App />
    </MemoryRouter>
  );
  const dashboardElement = screen.getByText(/Dashboard/i); // Adjust based on what Dashboard renders
  expect(dashboardElement).toBeInTheDocument();
});

// Test that checks if the "/portfolio/add" route renders the AddEditPortfolio component
test('renders AddEditPortfolio on "/portfolio/add" route', () => {
  render(
    <MemoryRouter initialEntries={['/portfolio/add']}>
      <App />
    </MemoryRouter>
  );
  const addPortfolioElement = screen.getByText(/Add Portfolio Item/i); // Adjust based on what AddPortfolio renders
  expect(addPortfolioElement).toBeInTheDocument();
});
