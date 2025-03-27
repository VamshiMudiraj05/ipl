import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:8080';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Accept': 'application/json'
  }
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      Cookies.remove('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Property API methods
export const propertyApi = {
  createProperty: async (formData) => {
    try {
      console.log('Sending request to create property');
      const response = await api.post('/api/properties', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Property creation response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating property:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server response:', error.response.data);
        // Extract the actual error message from the response
        const message = error.response.data?.message || 
                       error.response.data?.error || 
                       'Failed to create property';
        throw new Error(message);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        throw new Error('No response received from server');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Request setup error:', error.message);
        throw new Error('Error setting up the request');
      }
    }
  },

  updateProperty: async (id, formData) => {
    try {
      const response = await api.put(`/api/properties/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getProperty: async (id) => {
    try {
      const response = await api.get(`/api/properties/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getAllProperties: async () => {
    try {
      const response = await api.get('/api/properties');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  deleteProperty: async (id) => {
    try {
      await api.delete(`/api/properties/${id}`);
    } catch (error) {
      throw handleApiError(error);
    }
  }
};

// Error handling helper
const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const message = error.response.data?.message || 'An error occurred';
    return new Error(message);
  } else if (error.request) {
    // The request was made but no response was received
    return new Error('No response received from server');
  } else {
    // Something happened in setting up the request that triggered an Error
    return new Error('Error setting up the request');
  }
}; 