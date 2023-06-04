import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../reducers/authReducer.js";
import playerReducer from "../reducers/playerReducer.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
