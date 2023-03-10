const getLocalStorage = () => {
  const data = localStorage.getItem('data_weather');
  if (data) {
    return JSON.parse(data);
  }
  
};

export default getLocalStorage;