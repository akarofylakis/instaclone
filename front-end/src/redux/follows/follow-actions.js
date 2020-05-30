import FollowActionTypes from './follow-types';

export const followUserSuccess = () => ({
  type: FollowActionTypes.FOLLOW_USER_SUCCESS,
});

export const followUserAsync = (userIdToFollow, followerId) => {
  return (dispatch) => {
    return fetch(
      `${process.env.REACT_APP_API_URL}/users/${userIdToFollow}/follow`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ followerId }),
      }
    )
      .then((res) => res.json())
      .then((json) => {
        dispatch(followUserSuccess());
      });
  };
};

export const unfollowUserSuccess = () => ({
  type: FollowActionTypes.UNFOLLOW_USER_SUCCESS,
});

export const unfollowUserAsync = (userIdToUnfollow, followerId) => {
  return (dispatch) => {
    return fetch(
      `${process.env.REACT_APP_API_URL}/users/${userIdToUnfollow}/unfollow`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ followerId }),
      }
    )
      .then((res) => res.json())
      .then((json) => {
        dispatch(unfollowUserSuccess());
      });
  };
};

export const fetchFollowsSuccess = (follows) => ({
  type: FollowActionTypes.FETCH_FOLLOWS_SUCESS,
  payload: follows,
});

export const fetchFollowsAsync = (userId) => {
  return (dispatch) => {
    return fetch(`${process.env.REACT_APP_API_URL}/follows/${userId}/follows`)
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchFollowsSuccess(json.data));
      });
  };
};
