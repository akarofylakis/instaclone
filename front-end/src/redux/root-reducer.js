import { combineReducers } from 'redux';

import userReducer from './users/user-reducers';
import postReducer from './posts/post-reducers';

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
});

export default rootReducer;
