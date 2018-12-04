import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import { applyMiddleware, createStore, compose } from 'redux';
import { loadState, saveState } from './localStorage';
import rootReducer from './reducers';

const logger = loggerMiddleware;

const initialState = loadState();
const enhancers = []
const middleware = [
    thunkMiddleware,
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

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
