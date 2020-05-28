import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import SignUp from '../../../pages/SignUp/SignUp';
import SignIn from '../../../pages/SignIn/SignIn';
import LeftContainer from '../../UI/LeftContainer/LeftContainer';
import Content from '../Content/Content';

const SignedOut = ({ match }) => {
  return (
    <Router>
      <div className='page-container signed-out-container'>
        <LeftContainer />
        <Content>
          <Switch>
            <Route path={`/signup`}>
              <SignUp />
            </Route>
            <Route path={`/signin`}>
              <SignIn />
            </Route>
            <Route render={() => <Redirect to='/signin' />} />
          </Switch>
        </Content>
      </div>
    </Router>
  );
};

export default SignedOut;
