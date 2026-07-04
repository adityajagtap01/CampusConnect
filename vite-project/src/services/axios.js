

import axios from 'axios';
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 600000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export { api };