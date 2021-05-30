import logo from './logo.svg';
import './App.css';
import World from './World';
import ProvStats from './ProvStats';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
         <World />
         <ProvStats />
      </header>
    </div>
  );
}

export default App;
