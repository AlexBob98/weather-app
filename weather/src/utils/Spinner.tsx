import React from 'react';
import spinner from '../assets/svg/load.gif';

function Loader(): JSX.Element {
  return (
    <img
      src={spinner}
      alt="loading..."
      style={{ width: '50px', margin: '0 auto', display: 'flex', paddingTop: '2em'}}
    />
  );
}

export default Loader;
