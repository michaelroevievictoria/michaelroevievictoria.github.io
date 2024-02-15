import { configureStore } from "@reduxjs/toolkit";

import reducer from "store/slices";

const store = configureStore({
  reducer,
});

if (module.hot) {
  module.hot.accept("store/slices", () => {
    const reducers = require("store/slices").default;

    store.replaceReducers(reducers);
  });
}

export default store;
