import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Navigation from './Components/Navigation';
import Mastermind from './Screens/Mastermind';
import Puissance4 from './Screens/Puissance4';
import Puissance4Reducer from './Screens/Puissance4Reducer';

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <div className="App-body">
          <Route path="/" exact component={Puissance4} />
          <Route path="/P4reducer" exact component={Puissance4Reducer} />
          <Route path="/Mastermind" exact component={Mastermind} />
        </div>
      </Router>
    </div>
  );
}

export default App;
