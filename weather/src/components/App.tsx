import '../assets/styles/app.scss';
import '../assets/styles/weather.scss';
import React from 'react';
import GetWeather from './GetWeather';
import Layout from 'layout/Layout';

function App() {
  return (
    <Layout>
      <GetWeather />
    </Layout>
  );
}

export default App;
