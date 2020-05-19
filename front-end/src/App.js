import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SignedIn from './components/shared/SignedIn/SignedIn';
import SignedOut from './components/shared/SignedOut/SignedOut';

import './App.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/signedout'>
          <SignedOut />
        </Route>
        <Route path='/'>
          <SignedIn />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
