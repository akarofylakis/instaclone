import UserActionTypes from './user-types';

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

    console.log(userCredentials);

    return fetch(`${process.env.REACT_APP_API_URL}/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCredentials),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        dispatch(signUpSuccess(json));
      })
      .catch((e) => dispatch(signUpFailure(e.message)));
  };
};
