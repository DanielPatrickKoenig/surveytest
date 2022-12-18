import './App.css';
import { getAPIBase, load } from './api';
import { useState } from 'react';
import ExampleComponent from './components/ExampleComponent';
function App() {
  const [content, setContent] = useState(null);
  const loadData = async () => {
    const data = await load();
    setContent(data.content);
  }
  loadData();
  return (
    <div className="App">
      <header className="App-header">
        <img src={`${getAPIBase()}static/images/logo.svg`} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {
          content 
            ? <ExampleComponent content={content} /> 
            : <div>Loading...</div>
        }
        
      </header>
    </div>
  );
}

export default App;
