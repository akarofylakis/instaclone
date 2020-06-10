import React, { useEffect } from "react";

import { connect } from "react-redux";

import { fetchPostsAsync } from "../../../redux/posts/post-actions";
import { fetchUserLikesAsync } from "../../../redux/likes/like-actions";

import {
  DEFAULT_POSTS,
  DEFAULT_USER,
  DEFAULT_USER_PROFILE,
} from "../../../utils/constants";

import {
  selectPosts,
  selectPostsIsFetching,
} from "../../../redux/posts/post-selectors";
import { selectCurrentUser } from "../../../redux/users/user-selectors";
import { selectUserLikes } from "../../../redux/likes/like-selectors";

import Item from "../../../components/UI/Item/Item";
import LoadingSpinner from "../../../components/UI/LoadingSpinner/LoadingSpinner";

import "./HomeFeed.scss";

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
      <div className="text-container">
        <h6>
          Welcome to <span>folllowr!</span> This is social network clone app
          that is made just for self-learning reasons. Upon signing up, you
          automatically get to follow some fictional users and have some
          pre-existing activity (likes/comments) for demonstration purposes.
          Icons used are property of icons8.
          <br />
          <span>
            Every post image used is property of Unsplash and their respecting
            creators/photographers.
          </span>
        </h6>
      </div>
      <h2>Feed</h2>
      <div className="list-container">
        {postsIsFetching && <LoadingSpinner />}
        <ul className="feed-list">
          {posts[0] ? (
            posts.map((post) => {
              if (!post.user) {
                post.user = DEFAULT_USER_PROFILE;
              }
              return (
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
              );
            })
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
