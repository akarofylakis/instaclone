import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';

import Header from '../../UI/Header/Header';
import Footer from '../../UI/Button/Footer/Footer';
import LeftNav from '../../UI/LeftNav/LeftNav';
import HomeFeed from '../../../pages/Homepage/HomeFeed/HomeFeed';
import StoryFeed from '../../../pages/Homepage/StoryFeed/StoryFeed';
import User from '../../../pages/User/User';
import Post from '../../../pages/Post/Post';
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
            <Route path={`/user`} exact>
              <User />
            </Route>
            <Route path={`/post`} exact>
              <Post />
            </Route>
          </Switch>
        </Content>
      </div>
      <Footer />
    </Router>
  );
};

export default withRouter(SignedIn);
