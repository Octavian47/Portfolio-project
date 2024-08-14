import React from 'react';
import { render } from '@testing-library/react';
import PortfolioItem from './PortfolioItem';

describe('PortfolioItem Component', () => {

  it('renders the PortfolioItem with the correct title, description, and link', () => {
    const { getByText } = render(
      <PortfolioItem 
        title="Test Title"
        description="Test Description"
        imageFilename="/path/to/image.jpg"
        clientUrl="https://www.example.com"
        status="visible"
      />
    );

    // Check if the title, description, and link text are rendered correctly
    expect(getByText('Test Title')).toBeInTheDocument();
    expect(getByText('Test Description')).toBeInTheDocument();
    expect(getByText("Visit Client's Site")).toBeInTheDocument();
  });

  it('renders the image with the correct src and alt attributes', () => {
    const { getByAltText } = render(
      <PortfolioItem 
        title="Test Title"
        description="Test Description"
        imageFilename="/path/to/image.jpg"
        clientUrl="https://www.example.com"
        status="visible"
      />
    );

    // Check if the image has the correct src and alt attributes
    const image = getByAltText('Test Title');
    expect(image).toHaveAttribute('src', '/path/to/image.jpg');
    expect(image).toHaveAttribute('alt', 'Test Title');
  });

  it('renders the link with the correct href attribute', () => {
    const { getByText } = render(
      <PortfolioItem 
        title="Test Title"
        description="Test Description"
        imageFilename="/path/to/image.jpg"
        clientUrl="https://www.example.com"
        status="visible"
      />
    );

    // Check if the link has the correct href attribute
    const link = getByText("Visit Client's Site").closest('a');
    expect(link).toHaveAttribute('href', 'https://www.example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('matches the snapshot', () => {
    const { asFragment } = render(
      <PortfolioItem 
        title="Test Title"
        description="Test Description"
        imageFilename="/path/to/image.jpg"
        clientUrl="https://www.example.com"
        status="visible"
      />
    );

    // Match the component against the snapshot
    expect(asFragment()).toMatchSnapshot();
  });

});
