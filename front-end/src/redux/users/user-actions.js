import UserActionTypes from "./user-types";

export const signUpStart = (userCredentials) => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: userCredentials,
});

export const signUpFailure = (error) => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error,
});

export const signUpSuccess = (userCredentials) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: userCredentials,
});

export const signUpAsync = (userCredentials) => {
  return (dispatch) => {
    dispatch(signUpStart(userCredentials));

    return fetch(`${process.env.REACT_APP_API_URL}/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.token) {
          dispatch(signUpSuccess(json));
          localStorage.setItem("user", JSON.stringify(json));
        } else {
          dispatch(signUpFailure(json.message));
        }
      });
  };
};

export const signInStart = (userCredentials) => ({
  type: UserActionTypes.SIGN_IN_START,
  payload: userCredentials,
});

export const signInFailure = (error) => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error,
});

export const signInSuccess = (userCredentials) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: userCredentials,
});

export const signInAsync = (userCredentials) => {
  return (dispatch) => {
    dispatch(signInStart(userCredentials));

    return fetch(`${process.env.REACT_APP_API_URL}/users/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.token) {
          dispatch(signInSuccess(json));
          localStorage.setItem("user", JSON.stringify(json));
        } else {
          dispatch(signInFailure(json.message));
        }
      });
  };
};

export const signOut = () => ({
  type: UserActionTypes.SIGN_OUT,
});

export const signOutAsync = () => {
  return (dispatch) => {
    dispatch(signOut());
    localStorage.removeItem("user");
  };
};

export const searchUsersStart = () => ({
  type: UserActionTypes.SEARCH_USERS_START,
});

export const searchUsersFailure = (errorMessage) => ({
  type: UserActionTypes.SEARCH_USERS_START,
  payload: errorMessage,
});

export const searchUsersSuccess = (users) => ({
  type: UserActionTypes.SEARCH_USERS_SUCCESS,
  payload: users,
});

export const searchUsersAsync = (searchString) => {
  return (dispatch) => {
    dispatch(searchUsersStart());

    return fetch(`${process.env.REACT_APP_API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const data = json.data.filter((user) =>
          user.username.toLowerCase().includes(searchString.toLowerCase())
        );

        dispatch(searchUsersSuccess(data));
      })
      .catch((e) => dispatch(searchUsersFailure(e.message)));
  };
};

export const fetchUserSuccess = (user) => ({
  type: UserActionTypes.FETCH_USER,
  payload: user,
});

export const fetchUserAsync = (userId) => {
  return (dispatch) => {
    return fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchUserSuccess(json.data));
      });
  };
};
