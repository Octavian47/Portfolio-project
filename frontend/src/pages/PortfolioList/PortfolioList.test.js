import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import PortfolioList from './PortfolioList';
import { getPortfolioItems } from '../../services/api';

// Mock the getPortfolioItems API call
jest.mock('../../services/api');

describe('PortfolioList Component', () => {
  const mockItems = [
    {
      id: 1,
      title: 'Visible Item 1',
      description: 'Description 1',
      imageFilename: 'image1.jpg',
      clientUrl: 'https://example.com/1',
      status: 'visible',
    },
    {
      id: 2,
      title: 'Hidden Item',
      description: 'Description 2',
      imageFilename: 'image2.jpg',
      clientUrl: 'https://example.com/2',
      status: 'hidden',
    },
    {
      id: 3,
      title: 'Visible Item 2',
      description: 'Description 3',
      imageFilename: 'image3.jpg',
      clientUrl: 'https://example.com/3',
      status: 'visible',
    },
  ];

  beforeEach(() => {
    // Reset the mock before each test
    getPortfolioItems.mockResolvedValue(mockItems);
  });

  it('renders without crashing', async () => {
    render(<PortfolioList />);
    await waitFor(() => expect(screen.getByText('Visible Item 1')).toBeInTheDocument());
    expect(screen.getByText('Visible Item 2')).toBeInTheDocument();
  });

  it('only displays items with a status of "visible"', async () => {
    render(<PortfolioList />);
    await waitFor(() => {
      expect(screen.queryByText('Hidden Item')).not.toBeInTheDocument();
      expect(screen.getByText('Visible Item 1')).toBeInTheDocument();
      expect(screen.getByText('Visible Item 2')).toBeInTheDocument();
    });
  });

  it('displays the correct number of visible items', async () => {
    render(<PortfolioList />);
    const items = await waitFor(() => screen.getAllByRole('img')); // Assuming each PortfolioItem has an image element
    expect(items.length).toBe(2);
  });

  it('handles API errors gracefully', async () => {
    // Mock the API to throw an error
    getPortfolioItems.mockRejectedValue(new Error('API error'));
    console.error = jest.fn(); // Silence error logging in test output
    render(<PortfolioList />);
    await waitFor(() => expect(console.error).toHaveBeenCalledWith('Failed to fetch portfolio items:', expect.any(Error)));
  });
});
