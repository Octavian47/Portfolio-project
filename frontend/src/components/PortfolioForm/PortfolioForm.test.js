import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PortfolioForm from './PortfolioForm';

describe('PortfolioForm Component', () => {

  const initialData = {
    title: 'Initial Title',
    description: 'Initial Description',
    clientUrl: 'https://www.example.com',
    status: 'visible',
    imageFilename: 'initialImage.jpg'
  };

  it('renders the form with all fields', () => {
    const { getByLabelText, getByText } = render(<PortfolioForm onSubmit={jest.fn()} />);

    expect(getByLabelText('Title:')).toBeInTheDocument();
    expect(getByLabelText('Description:')).toBeInTheDocument();
    expect(getByLabelText('Client URL:')).toBeInTheDocument();
    expect(getByLabelText('Status:')).toBeInTheDocument();
    expect(getByText('Save')).toBeInTheDocument();
  });

  it('updates the title field when typed into', () => {
    const { getByLabelText } = render(<PortfolioForm onSubmit={jest.fn()} />);
    
    const titleInput = getByLabelText('Title:');
    fireEvent.change(titleInput, { target: { value: 'New Title' } });
    
    expect(titleInput.value).toBe('New Title');
  });

  it('updates the description field when typed into', () => {
    const { getByLabelText } = render(<PortfolioForm onSubmit={jest.fn()} />);
    
    const descriptionInput = getByLabelText('Description:');
    fireEvent.change(descriptionInput, { target: { value: 'New Description' } });
    
    expect(descriptionInput.value).toBe('New Description');
  });

  it('updates the client URL field when typed into', () => {
    const { getByLabelText } = render(<PortfolioForm onSubmit={jest.fn()} />);
    
    const urlInput = getByLabelText('Client URL:');
    fireEvent.change(urlInput, { target: { value: 'https://www.new-url.com' } });
    
    expect(urlInput.value).toBe('https://www.new-url.com');
  });

  it('updates the status field when changed', () => {
    const { getByLabelText } = render(<PortfolioForm onSubmit={jest.fn()} />);
    
    const statusSelect = getByLabelText('Status:');
    fireEvent.change(statusSelect, { target: { value: 'hidden' } });
    
    expect(statusSelect.value).toBe('hidden');
  });

  it('handles file input correctly', () => {
    const { getByLabelText } = render(<PortfolioForm onSubmit={jest.fn()} />);
    
    const fileInput = getByLabelText('Image:');
    const file = new File(['dummy content'], 'example.png', { type: 'image/png' });
    
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    expect(fileInput.files[0]).toBe(file);
  });

  it('calls onSubmit with correct data when form is submitted', () => {
    const handleSubmit = jest.fn();
    const { getByText, getByLabelText } = render(<PortfolioForm onSubmit={handleSubmit} />);
    
    fireEvent.change(getByLabelText('Title:'), { target: { value: 'New Title' } });
    fireEvent.change(getByLabelText('Description:'), { target: { value: 'New Description' } });
    fireEvent.change(getByLabelText('Client URL:'), { target: { value: 'https://www.new-url.com' } });
    fireEvent.change(getByLabelText('Status:'), { target: { value: 'hidden' } });

    const file = new File(['dummy content'], 'example.png', { type: 'image/png' });
    fireEvent.change(getByLabelText('Image:'), { target: { files: [file] } });

    fireEvent.click(getByText('Save'));

    expect(handleSubmit).toHaveBeenCalledWith({
      title: 'New Title',
      description: 'New Description',
      clientUrl: 'https://www.new-url.com',
      status: 'hidden',
      imageFile: file
    });
  });

  it('populates fields correctly when initialData is provided', () => {
    const { getByLabelText } = render(<PortfolioForm initialData={initialData} onSubmit={jest.fn()} />);
    
    expect(getByLabelText('Title:').value).toBe('Initial Title');
    expect(getByLabelText('Description:').value).toBe('Initial Description');
    expect(getByLabelText('Client URL:').value).toBe('https://www.example.com');
    expect(getByLabelText('Status:').value).toBe('visible');
  });

  it('matches the snapshot', () => {
    const { asFragment } = render(<PortfolioForm initialData={initialData} onSubmit={jest.fn()} />);
    expect(asFragment()).toMatchSnapshot();
  });

});
