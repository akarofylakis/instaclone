import StoryActionTypes from './story-types';

const INITIAL_STATE = {
  stories: [],
  isFetching: false,
  error: null,
};

const storyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case StoryActionTypes.FETCH_STORIES_START:
      return {
        ...state,
        isFetching: true,
      };
    case StoryActionTypes.FETCH_STORIES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case StoryActionTypes.FETCH_STORIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        stories: action.payload,
      };
    default:
      return state;
  }
};

export default storyReducer;
