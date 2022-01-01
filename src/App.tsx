import logo from './logo.svg';
import './App.scss';
import SignIn from './containers/SignIn';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload 2.
        </p>
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          Learn React
        </a>
        <SignIn />
      </header>
      <SignIn />
    </div>
  );
}

export default App;
