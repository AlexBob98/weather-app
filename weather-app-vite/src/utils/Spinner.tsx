import spinner from '../assets/svg/load.gif';

function Loader(): JSX.Element {
  return (
    <img
      src={spinner}
      alt="loading..."
      style={{ width: '5rem', margin: '0 auto', display: 'flex', paddingTop: '2rem' }}
    />
  );
}

export default Loader;
