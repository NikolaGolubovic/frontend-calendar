import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import notificationReducer from "./reducers/notificationReducer";

// const reducer = combineReducers({ notifications: notificationReducer });

const store = createStore(notificationReducer);

export default store;
