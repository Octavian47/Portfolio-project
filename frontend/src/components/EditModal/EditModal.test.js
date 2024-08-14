import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EditModal from './EditModal';
import PortfolioForm from '../PortfolioForm/PortfolioForm';

// Mock the PortfolioForm component to isolate testing for EditModal
jest.mock('../PortfolioForm/PortfolioForm', () => ({ onSubmit }) => (
  <form onSubmit={(e) => { e.preventDefault(); onSubmit({ title: 'New Title' }); }}>
    <input type="text" name="title" defaultValue="Existing Title" />
    <button type="submit">Save</button>
  </form>
));

describe('EditModal Component', () => {

  const mockItem = {
    id: '1',
    title: 'Existing Title',
    description: 'Existing Description',
    imageFilename: '/path/to/image.jpg',
    clientUrl: 'https://www.example.com',
    status: 'visible',
  };

  it('does not render when isOpen is false', () => {
    const { queryByText } = render(
      <EditModal isOpen={false} onClose={jest.fn()} item={mockItem} onSave={jest.fn()} />
    );

    // Check that the modal content is not rendered
    expect(queryByText('Edit Portfolio Item')).not.toBeInTheDocument();
  });

  it('renders correctly when isOpen is true', () => {
    const { getByText } = render(
      <EditModal isOpen={true} onClose={jest.fn()} item={mockItem} onSave={jest.fn()} />
    );

    // Check that the modal content is rendered
    expect(getByText('Edit Portfolio Item')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
  });

  it('calls onSave with the correct data when the form is submitted', () => {
    const handleSave = jest.fn();
    const handleClose = jest.fn();

    const { getByText } = render(
      <EditModal isOpen={true} onClose={handleClose} item={mockItem} onSave={handleSave} />
    );

    // Simulate form submission
    fireEvent.click(getByText('Save'));

    // Check that onSave is called with the updated item data
    expect(handleSave).toHaveBeenCalledWith({
      ...mockItem,
      title: 'New Title',
    });

    // Check that onClose is called after saving
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when the Cancel button is clicked', () => {
    const handleClose = jest.fn();

    const { getByText } = render(
      <EditModal isOpen={true} onClose={handleClose} item={mockItem} onSave={jest.fn()} />
    );

    // Simulate click on Cancel button
    fireEvent.click(getByText('Cancel'));

    // Check that onClose is called
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('matches the snapshot', () => {
    const { asFragment } = render(
      <EditModal isOpen={true} onClose={jest.fn()} item={mockItem} onSave={jest.fn()} />
    );

    // Match the component against the snapshot
    expect(asFragment()).toMatchSnapshot();
  });

});
