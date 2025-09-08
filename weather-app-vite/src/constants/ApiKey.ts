const api = {
  key: import.meta.env.VITE_API_KEY || '',
  base: import.meta.env.REACT_APP_API_BASE_URL || 'https://api.openweathermap.org/data/2.5/'
};

export default api;
