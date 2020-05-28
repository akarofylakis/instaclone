import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './users/user-reducers';
import postReducer from './posts/post-reducers';
import storyReducer from './stories/story-reducers';
import likeReducer from './likes/like-reducers';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
  story: storyReducer,
  like: likeReducer,
});

export default persistReducer(persistConfig, rootReducer);
