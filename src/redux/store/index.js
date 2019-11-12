import reducer from '../reducers'
import thunk from "redux-thunk";
import { createStore,applyMiddleware } from 'redux'
import { composeWithDevTools } from "redux-devtools-extension";

const middlewares = [thunk];

const composeWithEnhancer = composeWithDevTools(
        applyMiddleware(...middlewares)
      )


export const configureStore = createStore(
    reducer,
    composeWithEnhancer
  );
  export default configureStore;
  