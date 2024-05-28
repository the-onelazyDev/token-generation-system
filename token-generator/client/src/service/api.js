import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const generateTokens = async (name, slot, count) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/generate-tokens`, {
      name,
      slot,
      count,
    });
    return response.data;
  } catch (error) {
    console.error('Error generating tokens:', error);
    throw error;
  }
};

export const verifyToken = async (token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/verify-token`, {
      token,
    });
    return response.data;
  } catch (error) {
    console.error('Error verifying token:', error);
    throw error;
  }
};