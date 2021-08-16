import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './components/navigation/Navigation';
import GlobalStyle from './components/styles/globalStyles';
import Routes from './Routes';

function App() {
  return (
    <div>
      <GlobalStyle />
      <Router>
        <Navigation />
        <Routes />
      </Router>
    </div>
  );
}

export default App;
