import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/UI/Header';
import LeftNav from './components/UI/LeftNav';
import HomeFeed from './components/UI/HomeFeed';
import StoryFeed from './components/UI/StoryFeed';
import Content from './components/UI/Content';

import './App.css';

const App = () => {
  return (
    <Router>
      <LeftNav />
      <Content>
        <Header />
        <Switch>
          <Route path='/'>
            <StoryFeed />
            <HomeFeed />
          </Route>
        </Switch>
      </Content>
    </Router>
  );
};

export default App;
