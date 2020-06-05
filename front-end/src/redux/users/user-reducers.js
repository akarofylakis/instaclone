import UserActionTypes from "./user-types";

const INITIAL_STATE = {
  currentUser: null,
  user: null,
  searchResults: [],
  isFetching: false,
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_UP_START:
      return {
        ...state,
        error: null,
        user: null,
        isFetching: true,
      };
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      };
    case UserActionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        isFetching: false,
      };
    case UserActionTypes.SIGN_IN_START:
      return {
        ...state,
        error: null,
        user: null,
        isFetching: true,
      };
    case UserActionTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      };
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        isFetching: false,
      };
    case UserActionTypes.SIGN_IN_GOOGLE_START:
      return {
        ...state,
        error: null,
        user: null,
        isFetching: true,
      };
    case UserActionTypes.SIGN_IN_GOOGLE_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      };
    case UserActionTypes.SIGN_IN_GOOGLE_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        isFetching: false,
      };
    case UserActionTypes.SIGN_OUT:
      return {
        ...state,
        error: null,
        currentUser: null,
      };
    case UserActionTypes.SEARCH_USERS_START:
      return {
        ...state,
        error: null,
        isFetching: true,
      };
    case UserActionTypes.SEARCH_USERS_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      };
    case UserActionTypes.SEARCH_USERS_SUCCESS:
      return {
        ...state,
        searchResults: action.payload,
        isFetching: false,
      };
    case UserActionTypes.FETCH_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
