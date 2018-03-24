import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/root.reducer';

const middleware = applyMiddleware(thunk);

const store = createStore(
  rootReducer,
  compose(middleware, window.devToolsExtension ? window.devToolsExtension() : f => f),
);

export default store;
