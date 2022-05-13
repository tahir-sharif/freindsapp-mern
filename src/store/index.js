import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./reducers/users";
import authSlice from "./reducers/auth";
import postsSlice from "./reducers/posts";
const store = configureStore({
  reducer: {
    auth: authSlice,
    user: usersSlice,
    posts: postsSlice,
  },
});
export default store;
  