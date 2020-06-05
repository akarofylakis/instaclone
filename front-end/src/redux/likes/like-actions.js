import LikeActionTypes from "./like-types";
import useFetch from "../../utils/hooks/useFetch";

export const likePostStart = () => ({
  type: LikeActionTypes.LIKE_POST_START,
});

export const likePostFailure = (error) => ({
  type: LikeActionTypes.LIKE_POST_FAILURE,
  payload: error.message,
});

export const likePostSuccess = (like) => ({
  type: LikeActionTypes.LIKE_POST_SUCCESS,
  payload: like,
});

export const likePostAsync = (postId, userId) => {
  return (dispatch) => {
    dispatch(likePostStart);

    return useFetch(`${process.env.REACT_APP_API_URL}/posts/${postId}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
      body: JSON.stringify({ userId }),
    })
      .then((json) => {
        dispatch(likePostSuccess(json.like));
      })
      .catch((e) => dispatch(likePostFailure(e.message)));
  };
};

export const unlikePostStart = () => ({
  type: LikeActionTypes.UNLIKE_POST_START,
});

export const unlikePostFailure = (error) => ({
  type: LikeActionTypes.UNLIKE_POST_FAILURE,
  payload: error.message,
});

export const unlikePostSuccess = (like) => ({
  type: LikeActionTypes.UNLIKE_POST_SUCCESS,
  payload: like,
});

export const unlikePostAsync = (postId, userId) => {
  return (dispatch) => {
    dispatch(unlikePostStart);

    return useFetch(`${process.env.REACT_APP_API_URL}/posts/${postId}/unlike`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
      body: JSON.stringify({ userId }),
    })
      .then((json) => {
        dispatch(unlikePostSuccess(json.like));
      })
      .catch((e) => dispatch(unlikePostFailure(e.message)));
  };
};

export const fetchUserLikesStart = () => ({
  type: LikeActionTypes.FETCH_USER_LIKES_START,
});

export const fetchUserLikesFailure = (error) => ({
  type: LikeActionTypes.FETCH_USER_LIKES_FAILURE,
  payload: error.message,
});

export const fetchUserLikesSuccess = (likes) => ({
  type: LikeActionTypes.FETCH_USER_LIKES_SUCCESS,
  payload: likes,
});

export const fetchUserLikesAsync = (userId) => {
  return (dispatch) => {
    dispatch(fetchUserLikesStart);

    return useFetch(`${process.env.REACT_APP_API_URL}/users/${userId}/likes`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((json) => {
        dispatch(fetchUserLikesSuccess(json.data));
      })
      .catch((e) => dispatch(fetchUserLikesFailure(e.message)));
  };
};
