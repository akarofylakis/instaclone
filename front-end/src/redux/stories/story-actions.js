import StoryActionTypes from './story-types';

export const fetchStoriesStart = () => ({
  type: StoryActionTypes.FETCH_STORIES_START,
});

export const fetchStoriesFailure = (errorMessage) => ({
  type: StoryActionTypes.FETCH_STORIES_FAILURE,
  payload: errorMessage,
});

export const fetchStoriesSuccess = (posts) => ({
  type: StoryActionTypes.FETCH_STORIES_SUCCESS,
  payload: posts,
});

export const fetchStoriesAsync = () => {
  return (dispatch) => {
    dispatch(fetchStoriesStart());

    return fetch(`${process.env.REACT_APP_API_URL}/stories`)
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchStoriesSuccess(json.data));
      })
      .catch((e) => dispatch(fetchStoriesFailure(e.message)));
  };
};
