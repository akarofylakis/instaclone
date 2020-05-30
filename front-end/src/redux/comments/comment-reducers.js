import CommentActionTypes from './comment-types';

const INITIAL_STATE = {
  comment: null,
  postComments: [],
  error: null,
  isFetching: false,
};

const commentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CommentActionTypes.FETCH_POST_COMMENTS_START:
      return {
        ...state,
        error: null,
        isFetching: true,
      };
    case CommentActionTypes.FETCH_POST_COMMENTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case CommentActionTypes.FETCH_POST_COMMENTS_SUCCESS:
      return {
        ...state,
        error: null,
        isFetching: false,
        postComments: action.payload,
      };
    case CommentActionTypes.CREATE_COMMENT_START:
      return {
        ...state,
        error: null,
        isFetching: true,
      };
    case CommentActionTypes.CREATE_COMMENT_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case CommentActionTypes.CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        error: null,
        isFetching: false,
        comment: action.payload,
      };
    case CommentActionTypes.DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        error: null,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default commentReducer;
