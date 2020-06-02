import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchPostsAsync } from "../../../redux/posts/post-actions";
import { fetchUserLikesAsync } from "../../../redux/likes/like-actions";

import {
  selectPosts,
  selectPostsIsFetching,
} from "../../../redux/posts/post-selectors";
import { selectCurrentUser } from "../../../redux/users/user-selectors";
import { selectUserLikes } from "../../../redux/likes/like-selectors";

import Item from "../../../components/UI/Item/Item";
import LoadingSpinner from "../../../components/UI/LoadingSpinner/LoadingSpinner";

import "./HomeFeed.scss";

const DEFAULT_USER = {
  avatar_url: "",
  userId: "",
  email: "",
  posts_count: 0,
  followers_count: 0,
  following_count: 0,
  username: "",
  fullname: "",
  id: "",
  summary: "",
  token: "",
};

const DEFAULT_POSTS = [
  {
    image_url: "",
    caption: "",
    createdAt: "",
    likes_count: 0,
    comments_count: 0,
    user: {
      username: "",
      id: "",
      user_info: {
        avatar_url: "defaulturl.com",
        summary: "",
      },
    },
  },
];

const HomeFeed = ({
  fetchPosts,
  posts,
  postsIsFetching,
  userLikes,
  fetchUserLikes,
  currentUser,
}) => {
  if (!currentUser) {
    currentUser = DEFAULT_USER;
  }

  if (!userLikes) {
    userLikes = [];
  }

  useEffect(() => {
    fetchPosts(currentUser.userId);
    fetchUserLikes(currentUser.userId);
  }, [fetchPosts, fetchUserLikes, currentUser.userId]);

  if (!posts) {
    posts = DEFAULT_POSTS;
  }

  return (
    <div className="homeFeed">
      <h2>Feed</h2>
      <div className="list-container">
        {postsIsFetching && <LoadingSpinner />}
        <ul className="feed-list">
          {posts[0] ? (
            posts
              .reverse()
              .map((post) => (
                <Item
                  key={post.id}
                  postId={post.id}
                  source={post.image_url}
                  likes={post.likes_count}
                  comments={post.comments_count}
                  userAvatar={post.user.user_info.avatar_url}
                  userId={post.user.id}
                  username={post.user.username}
                  likedByCurrentUser={
                    userLikes.filter((userLike) => userLike.post === post.id)[0]
                      ? true
                      : false
                  }
                />
              ))
          ) : (
            <h5 className="no-data">No posts</h5>
          )}
        </ul>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: (userId) => dispatch(fetchPostsAsync(userId)),
  fetchUserLikes: (userId) => dispatch(fetchUserLikesAsync(userId)),
});

const mapStateToProps = (state) => ({
  posts: selectPosts(state),
  currentUser: selectCurrentUser(state),
  postsIsFetching: selectPostsIsFetching(state),
  userLikes: selectUserLikes(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeFeed);
