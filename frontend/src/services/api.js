import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Function to create a new portfolio item
export const createPortfolioItem = async (itemData, imageFile) => {
    try {
      const formData = new FormData();
      formData.append('title', itemData.title);
      formData.append('description', itemData.description);
      formData.append('clientUrl', itemData.clientUrl);
      formData.append('status', itemData.status);
      if (imageFile) {
        formData.append('image', imageFile);
      }
  
      const response = await axios.post(`${API_BASE_URL}/portfolio`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      return response.data;  // Return the full response object
    } catch (error) {
      console.error('Error creating portfolio item:', error);
      throw error;
    }
  };

// Function to get all portfolio items
export const getPortfolioItems = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/portfolio`);
    return response.data.data; // Accessing the data from the response structure
  } catch (error) {
    console.error('Error fetching portfolio items:', error);
    throw error;
  }
};

// Function to get a single portfolio item by ID
export const getPortfolioItemById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/portfolio/${id}`);
    return response.data.data; // Accessing the data from the response structure
  } catch (error) {
    console.error(`Error fetching portfolio item with ID ${id}:`, error);
    throw error;
  }
};

// Function to update an existing portfolio item
export const updatePortfolioItem = async (id, itemData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/portfolio/${id}`, itemData);
    return response.data;
  } catch (error) {
    console.error(`Error updating portfolio item with ID ${id}:`, error);
    throw error;
  }
};

// Function to delete a portfolio item
export const deletePortfolioItem = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/portfolio/${id}`);
  } catch (error) {
    console.error(`Error deleting portfolio item with ID ${id}:`, error);
    throw error;
  }
};
