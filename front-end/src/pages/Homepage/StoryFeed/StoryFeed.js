import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchStoriesAsync } from '../../../redux/stories/story-actions';
import {
  selectStories,
  selectStoriesIsFetching,
} from '../../../redux/stories/story-selectors';

import Avatar from '../../../components/UI/Avatar/Avatar';
import LoadingSpinner from '../../../components/UI/LoadingSpinner/LoadingSpinner';

import './StoryFeed.scss';

const StoryFeed = ({ fetchStories, stories, storiesIsFetching }) => {
  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  return (
    <div className='story-feed'>
      <h2>Stories</h2>
      <div className='list-container'>
        <ul className='feed-list'>
          {storiesIsFetching && <LoadingSpinner />}
          {stories.map((story) => (
            <li key={story.id}>
              <Avatar source={story.source_url} size={50} />
              <Link to='profile'>
                <h5>amanda1992_</h5>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchStories: () => dispatch(fetchStoriesAsync()),
});

const mapStateToProps = (state) => ({
  stories: selectStories(state),
  storiesIsFetching: selectStoriesIsFetching(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(StoryFeed);
