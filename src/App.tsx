import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import Puissance4Page from './components/fourInARow/Puissance4Page';
import Puissance4ReducerPage from './components/fourInARow/Puissance4ReducerPage';
import TestPage from './components/TestPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <div className="App-body">
          <Switch>
            <Route path="/" exact component={Puissance4Page} />
            <Route path="/P4reducer" exact component={Puissance4ReducerPage} />
            <Route path="/Test" exact component={TestPage} />
            <Route path="/" component={() => <h1>You don&apos;t have to be here!</h1>} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
