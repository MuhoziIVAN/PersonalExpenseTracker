import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8082';

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }, // Set content type to JSON
});

const handleApiError = (error) => {
  const errorMessage = error.response?.data?.message || error.message || 'Unknown error occurred';
  throw new Error(errorMessage);
};

const authService = {
  login: async (username, password) => {
    try {
      console.log('Login attempt:', { username, password });
      const response = await axiosInstance.post('/login', {
        username: username,
        password: password,
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  signup: async (userData) => {
    try {
      const response = await axiosInstance.post('/signup', userData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  logout: async () => {
    try {
      const response = await axiosInstance.post('/logout');
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  profile:async function getUserProfile() {
    const response = await fetch('http://localhost:8080/profile', {
        credentials: 'include', // Include cookies for authentication
    });
    if (!response.ok) {
        throw new Error('Failed to fetch profile');
    }
    return await response.json();
}
};

export default authService;
