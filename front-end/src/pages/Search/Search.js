import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  selectSearchResults,
  selectSearchIsFetching,
} from "../../redux/users/user-selectors";

import Avatar from "../../components/UI/Avatar/Avatar";
import Button from "../../components/UI/Button/Button";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";

import "./Search.scss";

const Search = ({ searchResults, searchIsFetching }) => {
  return (
    <div className="search">
      <ul className="search-list">
        {searchIsFetching && <LoadingSpinner />}
        {searchResults.reverse().map((item) => (
          <li key={item.id} className="search-item">
            <Avatar size={60} source={item.user_info.avatar_url} />
            <div className="search-item__user-info">
              <h3 className="name">{item.user_info.fullname}</h3>
              <h3 className="username"> {item.username} </h3>
            </div>
            <div className="search-item__user-follows">
              <h3>Followers: {item.followers_count} </h3>
              <h3>Following: {item.following_count} </h3>
              <h3>Posts: {item.posts_count} </h3>
            </div>
            <div className="search-item__user-cta">
              <Link to={`/user/${item.id}`}>
                <Button text="Show Profile" primary />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  searchResults: selectSearchResults(state),
  searchIsFetching: selectSearchIsFetching(state),
});

export default connect(mapStateToProps)(Search);
