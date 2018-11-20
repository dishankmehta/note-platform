import thunkMiddleware from 'redux-thunk';
// import createSagaMiddleware from 'redux-saga';
import loggerMiddleware from 'redux-logger';
import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from './reducers';

// const sagaMiddleware = createSagaMiddleware;
const logger = loggerMiddleware;

const initialState = {}
const enhancers = []
const middleware = [
    thunkMiddleware,
    // sagaMiddleware
]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
  middleware.push(logger);
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)

export default store;
