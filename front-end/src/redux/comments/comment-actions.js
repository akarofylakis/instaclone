import CommentActionTypes from "./comment-types";
import useFetch from "../../utils/hooks/useFetch";

export const fetchPostCommentsStart = () => ({
  type: CommentActionTypes.FETCH_POST_COMMENTS_START,
});

export const fetchPostCommentsFailure = (error) => ({
  type: CommentActionTypes.FETCH_POST_COMMENTS_FAILURE,
  payload: error,
});

export const fetchPostCommentsSuccess = (comments) => ({
  type: CommentActionTypes.FETCH_POST_COMMENTS_SUCCESS,
  payload: comments,
});

export const fetchPostCommentsAsync = (postId) => {
  return (dispatch) => {
    dispatch(fetchPostCommentsStart());

    return useFetch(
      `${process.env.REACT_APP_API_URL}/posts/${postId}/comments`,
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      }
    )
      .then((json) => {
        dispatch(fetchPostCommentsSuccess(json.data));
      })
      .catch((json) => dispatch(fetchPostCommentsFailure(json.message)));
  };
};

export const createCommentStart = () => ({
  type: CommentActionTypes.CREATE_COMMENT_START,
});

export const createCommentFailure = (error) => ({
  type: CommentActionTypes.CREATE_COMMENT_FAILURE,
  payload: error,
});

export const createCommentSuccess = (comment) => ({
  type: CommentActionTypes.CREATE_COMMENT_SUCCESS,
  payload: comment,
});

export const createCommentAsync = (postId, userId, body) => {
  return (dispatch) => {
    dispatch(createCommentStart());

    return useFetch(
      `${process.env.REACT_APP_API_URL}/posts/${postId}/comment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
        body: JSON.stringify({ body, userId }),
      }
    )
      .then((json) => {
        dispatch(createCommentSuccess(json.comment));
      })
      .catch((json) => dispatch(createCommentFailure(json.message)));
  };
};

export const deleteCommentSuccess = () => ({
  type: CommentActionTypes.DELETE_COMMENT_SUCCESS,
});

export const deleteCommentAsync = (commentId, postId, userId) => {
  return (dispatch) => {
    return useFetch(
      `${process.env.REACT_APP_API_URL}/posts/comment/${commentId}/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
        body: JSON.stringify({ postId, userId }),
      }
    ).then((json) => {
      dispatch(deleteCommentSuccess(json.data));
    });
  };
};
