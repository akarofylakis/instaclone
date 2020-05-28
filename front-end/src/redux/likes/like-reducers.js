import LikeActionTypes from './like-types';

const INITIAL_STATE = {
  error: null,
  userLikes: [],
};

const likeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LikeActionTypes.LIKE_POST_START:
      return {
        ...state,
        error: null,
      };
    case LikeActionTypes.LIKE_POST_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case LikeActionTypes.LIKE_POST_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case LikeActionTypes.UNLIKE_POST_START:
      return {
        ...state,
        error: null,
      };
    case LikeActionTypes.UNLIKE_POST_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case LikeActionTypes.UNLIKE_POST_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case LikeActionTypes.FETCH_USER_LIKES_START:
      return {
        ...state,
        error: null,
        userLikes: [],
      };
    case LikeActionTypes.FETCH_USER_LIKES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case LikeActionTypes.FETCH_USER_LIKES_SUCCESS:
      return {
        ...state,
        error: null,
        userLikes: action.payload,
      };
    default:
      return state;
  }
};

export default likeReducer;
