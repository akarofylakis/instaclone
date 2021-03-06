import PostActionTypes from "./post-types";
import useFetch from "../../utils/hooks/useFetch";

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

export const fetchPostsAsync = (userId) => {
  return (dispatch) => {
    dispatch(fetchPostsStart());

    return useFetch(`${process.env.REACT_APP_API_URL}/posts/feed/${userId}`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((json) => {
        dispatch(fetchPostsSuccess(json.feed));
      })
      .catch((e) => dispatch(fetchPostsFailure(e.message)));
  };
};

export const fetchPostStart = () => ({
  type: PostActionTypes.FETCH_POST_START,
});

export const fetchPostFailure = (errorMessage) => ({
  type: PostActionTypes.FETCH_POST_FAILURE,
  payload: errorMessage,
});

export const fetchPostSuccess = (post) => ({
  type: PostActionTypes.FETCH_POST_SUCCESS,
  payload: post,
});

export const fetchPostAsync = (postId) => {
  return (dispatch) => {
    dispatch(fetchPostStart());

    return useFetch(`${process.env.REACT_APP_API_URL}/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((json) => {
        dispatch(fetchPostSuccess(json.data));
      })
      .catch((e) => dispatch(fetchPostFailure(e.message)));
  };
};

export const fetchUserPostsStart = () => ({
  type: PostActionTypes.FETCH_USER_POSTS_START,
});

export const fetchUserPostsFailure = (errorMessage) => ({
  type: PostActionTypes.FETCH_USER_POSTS_FAILURE,
  payload: errorMessage,
});

export const fetchUserPostsSuccess = (posts) => ({
  type: PostActionTypes.FETCH_USER_POSTS_SUCCESS,
  payload: posts,
});

export const fetchUserPostsAsync = (userId) => {
  return (dispatch) => {
    dispatch(fetchUserPostsStart());

    return useFetch(
      `${process.env.REACT_APP_API_URL}/posts/user/${userId}/posts`,
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      }
    )
      .then((json) => {
        if (json) {
          dispatch(fetchUserPostsSuccess(json.data));
        } else {
          dispatch(fetchUserPostsFailure(json));
        }
      })
      .catch((e) => dispatch(fetchUserPostsFailure(e.message)));
  };
};

export const createPostStart = () => ({
  type: PostActionTypes.CREATE_POST_START,
});

export const createPostFailure = (errorMessage) => ({
  type: PostActionTypes.CREATE_POST_FAILURE,
  payload: errorMessage,
});

export const createPostSuccess = (createdPost) => ({
  type: PostActionTypes.CREATE_POST_SUCCESS,
  payload: createdPost,
});

export const createPostAsync = (post) => {
  return (dispatch) => {
    dispatch(createPostStart());

    return useFetch(`${process.env.REACT_APP_API_URL}/posts/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
      body: JSON.stringify(post),
    })
      .then((json) => {
        dispatch(createPostSuccess(json.data));
      })
      .catch((e) => dispatch(createPostFailure(e.message)));
  };
};
