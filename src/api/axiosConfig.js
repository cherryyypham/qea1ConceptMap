import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_CANVAS_BASE_URL,
  headers: {
    'Authorization': `Bearer ${import.meta.env.VITE_CANVAS_API_TOKEN}`,
  },
});

export default axiosInstance;
