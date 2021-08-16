import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Routes from './Routes';

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <div className="App-body">
          <Routes />
        </div>
      </Router>
    </div>
  );
}

export default App;
