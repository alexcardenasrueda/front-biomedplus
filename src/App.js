import logo from './logo.svg';
import './App.css';

function App() {
  console.log('entradaaaaa')
  return (
    <div className="App">
      <div>holaaaaaaaaaaaaaaaaaaaaa</div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button type="button" class="btn btn-info">Info</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
