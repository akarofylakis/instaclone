import PostActionTypes from './post-types';

const INITIAL_STATE = {
  posts: [],
  post: null,
  userPosts: [],
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
    case PostActionTypes.FETCH_POST_START:
      return {
        ...state,
        isFetching: true,
      };
    case PostActionTypes.FETCH_POST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case PostActionTypes.FETCH_POST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        post: action.payload,
      };
    case PostActionTypes.FETCH_USER_POSTS_START:
      return {
        ...state,
        userPosts: [],
        isFetching: true,
      };
    case PostActionTypes.FETCH_USER_POSTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case PostActionTypes.FETCH_USER_POSTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        userPosts: action.payload,
      };
    case PostActionTypes.CREATE_POST_START:
      return {
        ...state,
      };
    case PostActionTypes.CREATE_POST_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case PostActionTypes.CREATE_POST_SUCCESS:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default postReducer;
