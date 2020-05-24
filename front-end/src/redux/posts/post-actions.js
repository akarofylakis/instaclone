import PostActionTypes from './post-types';

export const fetchPostsStart = () => ({
  type: PostActionTypes.FETCH_POSTS_START,
});

export const fetchPostsFailure = (errorMessage) => ({
  type: PostActionTypes.FETCH_POSTS_FAILURE,
  payload: errorMessage,
});

export const fetchPostsSuccess = (posts) => ({
  type: PostActionTypes.FETCH_POSTS_SUCCESS,
  payload: posts,
});

export const fetchPostsAsync = () => {
  return (dispatch) => {
    dispatch(fetchPostsStart());

    return fetch(`${process.env.REACT_APP_API_URL}/posts`)
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchPostsSuccess(json.data));
      })
      .catch((e) => dispatch(fetchPostsFailure(e.message)));
  };
};
