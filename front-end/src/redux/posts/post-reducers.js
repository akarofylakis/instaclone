import PostActionTypes from './post-types';

const INITIAL_STATE = {
  posts: [],
  isFetching: false,
  error: null,
};

const postReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PostActionTypes.FETCH_POSTS_START:
      return {
        ...state,
        isFetching: true,
      };
    case PostActionTypes.FETCH_POSTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case PostActionTypes.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        posts: action.payload,
      };
    default:
      return state;
  }
};

export default postReducer;
