import { createStore, applyMiddleware, compose } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from '../reducers/index.js';

const store = createStore(rootReducer, compose(applyMiddleware(thunk))); // para que se puedan unar los devtools

export default store;