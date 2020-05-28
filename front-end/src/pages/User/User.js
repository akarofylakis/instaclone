import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { selectCurrentUser } from '../../redux/users/user-selectors';
import {
  selectUserPosts,
  selectPostsIsFetching,
} from '../../redux/posts/post-selectors';
import { selectUserLikes } from '../../redux/likes/like-selectors';
import { fetchUserLikesAsync } from '../../redux/likes/like-actions';
import { fetchUserPostsAsync } from '../../redux/posts/post-actions';

import Item from '../../components/UI/Item/Item';
import Avatar from '../../components/UI/Avatar/Avatar';
import Button from '../../components/UI/Button/Button';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';

import './User.scss';

const User = ({
  match,
  currentUser,
  userPosts,
  postsIsFetching,
  fetchUserPosts,
  userLikes,
  fetchUserLikes,
}) => {
  useEffect(() => {
    fetchUserPosts(match.params.userId);
    fetchUserLikes(currentUser.userId);
  }, [fetchUserPosts, fetchUserLikes, match.params.userId, currentUser.userId]);

  if (!userPosts) {
    userPosts = [];
  }

  return (
    <div className='user'>
      <div className='user__profile-container'>
        <Avatar size={100} source={currentUser.avatar_url} />
        <h3>{currentUser.fullname}</h3>
        <h6>{currentUser.username}</h6>
        {currentUser.userId !== match.params.userId && (
          <Button text='Follow' primary>
            <img
              alt='follow-user'
              src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAACwElEQVRoge2YTUtVURSG351mg7ImRZkG5qw0gqAmNWhQVHZT+gGNCsom/YD+QJMiMfowmgQSDa1wkBX9gUYKEfQBGY4CE52E5/o0uOfqdeP52vscj8R94Aw2Z++13nXv2uusvaUmTZo0+a8AjgDDwDSwGD7TwH2gr2x9kQDbgIdAlWgC4AHQVrbeNYTiP8QIt3m/qYIAHmUQX2ekbN2SVnI+Lm2iCIBeX/9bcojhmqOdFklXfZ3nEcAZj7VnfZ0bXwPAgqQdjssXjDE7ffzn8Q9Q0lpJ+QQw47H2p6/zPAKY9Fj7Ngf/fgB9YUl0KaOHy9YvSaLWHmRluGzdKwBtwLsM4ieBrWXrXkMYxAjx6RRQ61Q3l/hGgF7gHjAFLITPFHCXzZLzTXLEu5XwAeiSNCipIqlb0oHw1YykH5LeSHpljPlVisAogD3hZl5KUbGqwHOgo2zdkiSgAsxnKLl15oH+ssXfTCizSQTAUKPNPNrpFkmHJB2XdExST/jqkjFmuWFeRdK4/PuvqqQBY8yEswWgHbgCvAB+r/NLXbfm78ctbaL4A+xzEX4UeErt4xTFIrDdWjeapGgdX0k8ziK8Gxgj3eH9pbW2ixTVxiGAJaCzNYX4i5LGJO1KGe9Ha3xZUqIfB1olDcZuKOCWpNdKL16SPlnjCxmFZSG6rAInU6aMTYdl50ualEkiwtfnuH/gttxK3pw1LvIL2hkn8JSj0eXkKblBXADtjkbt/TLraCcNs3ncStj0WONv601K2hMp98zXIgI4YY3dP/nJTBQRQMUaj0sKCvATSBovIoDTwMr+CQ8jzwrwM2qMKXJ/rQJ0UGvA8mIO2Lsh4huCOIffWaBOlVprvvEAQ55BBMCNUsQ3BNGPWzrNAedLFV8H2A3cAf6mEL4EPCHiAFP2tUqnpAHVSu9Brb1W+a7Va5XIavMPuUIyg2epZ5MAAAAASUVORK5CYII='
            />
          </Button>
        )}
      </div>
      <div className='user__user-info-container'>
        <div className='user__user-info-posts'>
          <h5>{currentUser.posts_count}</h5> <h6>Posts</h6>
        </div>
        <div className='user__user-info-followers'>
          <h5>{currentUser.followers_count}</h5> <h6>Followers</h6>
        </div>
        <div className='user__user-info-following'>
          <h5>{currentUser.following_count}</h5> <h6>Following</h6>
        </div>
      </div>
      <div className='user__user-summary'>
        <h5>{currentUser.summary}</h5>
      </div>
      <div className='list-container'>
        {postsIsFetching && <LoadingSpinner />}
        <ul className='feed-list'>
          {userPosts.map((post) => (
            <Item
              key={post.id}
              postId={post.id}
              source={post.image_url}
              likes={post.likes_count}
              comments={post.comments_count}
              likedByCurrentUser={
                userLikes.filter((userLike) => userLike.post === post.id)[0]
                  ? true
                  : false
              }
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchUserPosts: (userId) => dispatch(fetchUserPostsAsync(userId)),
  fetchUserLikes: (userId) => dispatch(fetchUserLikesAsync(userId)),
});

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
  userPosts: selectUserPosts(state),
  postsIsFetching: selectPostsIsFetching(state),
  userLikes: selectUserLikes(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(User));
