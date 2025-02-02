import axios from 'axios';

interface User {
  id: number;
  email: string;
  name: string;
  created_at: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export const auth = {
  register: async (data: RegisterData) => {
    const response = await api.post<User>('/register', data);
    return response.data;
  },

  login: async (credentials: LoginCredentials) => {
    // Create form data for OAuth2 password flow
    const formData = new FormData();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);
    
    const response = await api.post<{ access_token: string; token_type: string }>(
      '/token',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    
    const { access_token } = response.data;
    localStorage.setItem('token', access_token);
    
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/'; // Force a full page reload
  },

  getCurrentUser: async (): Promise<User | null> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;

      const response = await api.get<User>('/me');
      return response.data;
    } catch (error) {
      auth.logout();
      return null;
    }
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};