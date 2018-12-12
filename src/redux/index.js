import { createStore, applyMiddleware, compose } from "redux";
import gallery from './gallery';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(gallery, composeEnhancers(applyMiddleware(thunk)))
export default store;