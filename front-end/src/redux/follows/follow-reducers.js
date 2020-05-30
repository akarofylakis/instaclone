import FollowActionTypes from './follow-types';

const INITIAL_STATE = {
  following: [],
  isFetching: false,
  error: null,
};

const followReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FollowActionTypes.FOLLOW_USER_SUCCESS:
      return {
        ...state,
      };
    case FollowActionTypes.UNFOLLOW_USER_SUCCESS:
      return {
        ...state,
      };
    case FollowActionTypes.FETCH_FOLLOWS_SUCESS:
      return {
        ...state,
        following: action.payload,
      };
    default:
      return state;
  }
};

export default followReducer;
