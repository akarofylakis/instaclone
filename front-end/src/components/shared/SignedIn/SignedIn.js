import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Header from "../../UI/Header/Header";
import Footer from "../../UI/Footer/Footer";
import Content from "../Content/Content";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";
const LeftNav = lazy(() => import("../../UI/LeftNav/LeftNav"));
const MobileNav = lazy(() => import("../MobileNav/MobileNav"));
const NotFound = lazy(() => import("../NotFound/NotFound"));
const Search = lazy(() => import("../../../pages/Search/Search"));
const Post = lazy(() => import("../../../pages/Post/Post"));
const User = lazy(() => import("../../../pages/User/User"));
const HomeFeed = lazy(() =>
  import("../../../pages/Homepage/HomeFeed/HomeFeed")
);

const SignedIn = () => {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="loading">
            <LoadingSpinner />
          </div>
        }
      >
        <div className="page-container signed-in-container">
          <LeftNav />
          <Content>
            <MobileNav />
            <Header />
            <Switch>
              <Route path={`/`} exact>
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
              <Route path={`/signin`} render={() => <Redirect to="/" />} />
              <Route path={`/signup`} render={() => <Redirect to="/" />} />
              <Route render={() => <NotFound />} />
            </Switch>
          </Content>
        </div>
        <Footer />
      </Suspense>
    </Router>
  );
};

export default SignedIn;
