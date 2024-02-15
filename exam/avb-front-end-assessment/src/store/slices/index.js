import { combineReducers } from "@reduxjs/toolkit";

import viewReducer, { name as viewName } from "store/slices/view";
import commentsReducer from "store/slices/commentsSlice";

const rootReducer = combineReducers({
  comments: commentsReducer, // Include comments reducer
  [viewName]: viewReducer,
});

export default rootReducer;
