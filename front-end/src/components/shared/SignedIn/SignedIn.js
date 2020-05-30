import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Header from '../../UI/Header/Header';
import Footer from '../../UI/Footer/Footer';
import LeftNav from '../../UI/LeftNav/LeftNav';
import HomeFeed from '../../../pages/Homepage/HomeFeed/HomeFeed';
import StoryFeed from '../../../pages/Homepage/StoryFeed/StoryFeed';
import User from '../../../pages/User/User';
import Post from '../../../pages/Post/Post';
import Search from '../../../pages/Search/Search';
import Content from '../Content/Content';

const SignedIn = () => {
  return (
    <Router>
      <div className='page-container signed-in-container'>
        <LeftNav />
        <Content>
          <Header />
          <Switch>
            <Route path={`/`} exact>
              <StoryFeed />
              <HomeFeed />
            </Route>
            <Route path={`/user/:userId`}>
              <User />
            </Route>
            <Route path={`/post/:postId`}>
              <Post />
            </Route>
            <Route path={`/search`} exact>
              <Search />
            </Route>
            <Route render={() => <Redirect to='/' />} />
          </Switch>
        </Content>
      </div>
      <Footer />
    </Router>
  );
};

export default SignedIn;