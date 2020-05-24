import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchPostsAsync } from '../../../redux/posts/post-actions';
import {
  selectPosts,
  selectPostsIsFetching,
} from '../../../redux/posts/post-selectors';

import Item from '../../../components/UI/Item/Item';

import './HomeFeed.scss';

const HomeFeed = ({ fetchPosts, posts, postsIsFetching }) => {
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className='homeFeed'>
      <h2>Feed</h2>
      <div className='list-container'>
        {postsIsFetching && <h2>Loading...</h2>}
        <ul className='feed-list'>
          {posts.map((post) => (
            <Item
              key={post.id}
              source={post.image_url}
              likes={122}
              comments={3}
              user={{
                img: post.image_url,
                username: post.user,
              }}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: () => dispatch(fetchPostsAsync()),
});

const mapStateToProps = (state) => ({
  posts: selectPosts(state),
  postsIsFetching: selectPostsIsFetching(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeFeed);
