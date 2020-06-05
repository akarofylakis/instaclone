import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./users/user-reducers";
import postReducer from "./posts/post-reducers";
import likeReducer from "./likes/like-reducers";
import followReducer from "./follows/follow-reducers";
import commentReducer from "./comments/comment-reducers";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
  like: likeReducer,
  follow: followReducer,
  comment: commentReducer,
});

export default persistReducer(persistConfig, rootReducer);
