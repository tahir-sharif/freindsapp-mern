import { createSlice } from "@reduxjs/toolkit";
import { getUserByToken, login, register } from "../actions/auth";
import cookie from "react-cookies";

const initialState = {
  isLoggedIn: !!cookie.load("user"),
  getUserLoading: false,
  loading: false,
  user: {},
  regStatus: null,
  loginStatus: null,
  regError: null,
  loginError: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
      state.loginStatus = "pending";
      state.loginError = null;
    },
    [login.fulfilled]: (state, action) => {
      const { token } = action.payload;
      cookie.save("user", token);
      state.isLoggedIn = true;
      state.loading = false;
      state.loginStatus = "fulfilled";
      state.loginError = null;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.loading = false;
      state.loginError = action.payload;
      state.loginStatus = "rejected";
    },
    [register.pending]: (state, action) => {
      state.loading = true;
      state.regStatus = "pending";
      state.regError = null;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.regStatus = "fulfilled";
      state.regError = null;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.regStatus = "rejected";
      state.regError = action.payload;
    },

    [getUserByToken.pending]: (state, action) => {
      state.getUserLoading = true;
    },
    [getUserByToken.fulfilled]: (state, action) => {
      state.getUserLoading = false;
      state.user = action.payload.user;
    },
    [getUserByToken.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.getUserLoading = false;
    },
  },
  reducers: {
    logout: (state) => {
      cookie.remove("user");
      state.isLoggedIn = false;
      state.user = {};
    },
    resetState: (state) => {
      if (state.regStatus) {
        state.regStatus = null;
      }
    },
  },
});
export default authSlice.reducer;
export const { logout, resetState } = authSlice.actions;
