import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchPostsAsync } from '../../../redux/posts/post-actions';
import { fetchUserLikesAsync } from '../../../redux/likes/like-actions';
import {
  selectPosts,
  selectPostsIsFetching,
} from '../../../redux/posts/post-selectors';
import { selectCurrentUser } from '../../../redux/users/user-selectors';
import { selectUserLikes } from '../../../redux/likes/like-selectors';

import Item from '../../../components/UI/Item/Item';
import LoadingSpinner from '../../../components/UI/LoadingSpinner/LoadingSpinner';

import './HomeFeed.scss';

const HomeFeed = ({
  fetchPosts,
  posts,
  postsIsFetching,
  userLikes,
  fetchUserLikes,
  currentUser,
}) => {
  useEffect(() => {
    fetchPosts();
    fetchUserLikes(currentUser.userId);
  }, [fetchPosts, fetchUserLikes, currentUser.userId]);

  return (
    <div className='homeFeed'>
      <h2>Feed</h2>
      <div className='list-container'>
        {postsIsFetching && <LoadingSpinner />}
        <ul className='feed-list'>
          {posts.map((post) => (
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
          ))}
        </ul>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: () => dispatch(fetchPostsAsync()),
  fetchUserLikes: (userId) => dispatch(fetchUserLikesAsync(userId)),
});

const mapStateToProps = (state) => ({
  posts: selectPosts(state),
  currentUser: selectCurrentUser(state),
  postsIsFetching: selectPostsIsFetching(state),
  userLikes: selectUserLikes(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeFeed);
