import { applyMiddleware, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';

import rootReducer from './root-reducer';

const loggerMiddleware = createLogger();

const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(loggerMiddleware);
}

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);

export default { persistor, store };
