import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import userReducer from "./useReducer";
import messageReducer from "./messageReducer";

const rootReducer = combineReducers({
  user: userReducer,
  message: messageReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))