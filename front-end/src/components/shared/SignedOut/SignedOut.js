import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';

import SignUp from '../../../pages/SignUp/SignUp';
import SignIn from '../../../pages/SignIn/SignIn';
import LeftContainer from '../../UI/LeftContainer/LeftContainer';
import Content from '../Content/Content';

const SignedOut = ({ match }) => {
  console.log(match);
  return (
    <Router>
      <div className='page-container signed-out-container'>
        <LeftContainer />
        <Content>
          <Switch>
            <Route path={`${match.path}/signup`}>
              <SignUp />
            </Route>
            <Route path={`${match.path}/signin`}>
              <SignIn />
            </Route>
          </Switch>
        </Content>
      </div>
    </Router>
  );
};

export default withRouter(SignedOut);
