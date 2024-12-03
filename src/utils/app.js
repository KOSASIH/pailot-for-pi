import axios from 'axios';
import { API_BASE_URL } from './constants'; // Importing base URL from constants

// Function to make GET requests
export const get = async (endpoint) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('API GET Error:', error);
    throw error; // Rethrow the error for further handling
  }
};

// Function to make POST requests
export const post = async (endpoint, data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error('API POST Error:', error);
    throw error; // Rethrow the error for further handling
  }
};

// Function to make PUT requests
export const put = async (endpoint, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error('API PUT Error:', error);
    throw error; // Rethrow the error for further handling
  }
};

// Function to make DELETE requests
export const del = async (endpoint) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('API DELETE Error:', error);
    throw error; // Rethrow the error for further handling
  }
};
