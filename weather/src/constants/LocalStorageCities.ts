const localStorageCities = () => {
  const data = localStorage.getItem('cities');
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

export default localStorageCities;