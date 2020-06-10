import React from "react";
import { connect } from "react-redux";

import { selectCurrentUser } from "./redux/users/user-selectors";

import SignedIn from "./components/shared/SignedIn/SignedIn";
import SignedOut from "./components/shared/SignedOut/SignedOut";

import "./App.css";

const App = ({ currentUser }) => {
  return (
    <div className="app">
      {currentUser === null ? <SignedOut /> : <SignedIn />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
});

export default connect(mapStateToProps)(App);
