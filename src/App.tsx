import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navigation from './Components/Navigation';
import MastermindPage from './Screens/MastermindPage';
import Puissance4Page from './Screens/Puissance4Page';
import Puissance4ReducerPage from './Screens/Puissance4ReducerPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <div className="App-body">
          <Switch>
            <Route path="/" exact component={Puissance4Page} />
            <Route path="/P4reducer" exact component={Puissance4ReducerPage} />
            <Route path="/Mastermind" exact component={MastermindPage} />
            <Route path="/" component={() => <h1>You don&apos;t have to be here!</h1>} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
