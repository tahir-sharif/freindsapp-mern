import { createSlice } from "@reduxjs/toolkit";
import { getUserById, updateUser } from "../actions/user";

const common = { loading: false, error: null, status: null };

const usersSlice = createSlice({
  name: "users",
  initialState: {
    getUserById: {
      user: {},
      ...common,
    },
    updateUser: {
      ...common,
    },
  },
  extraReducers: (builder) => {
    // Getting user by id
    builder.addCase(getUserById.pending, (state, action) => {
      state.getUserById.status = "pending";
      state.getUserById.error = null;
      state.getUserById.loading = true;
    });
    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.getUserById.status = "fulfilled";
      state.getUserById.error = null;
      state.getUserById.loading = false;
      state.getUserById.user = action.payload.user;
    });
    builder.addCase(getUserById.rejected, (state, action) => {
      state.getUserById.status = "rejected";
      state.getUserById.error = action.payload;
      state.getUserById.loading = false;
    });
    // Updating User Data
    builder.addCase(updateUser.pending, (state, action) => {
      state.updateUser.status = "pending";
      state.updateUser.error = null;
      state.updateUser.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.updateUser.status = "fulfilled";
      state.updateUser.error = null;
      state.updateUser.loading = false;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.updateUser.status = "rejected";
      state.updateUser.error = action.payload;
      state.updateUser.loading = false;
    });
  },
  reducers: {
    clearUserUpdateState: (state) => {
      state.updateUser.status = null;
      state.updateUser.error = null;
      state.updateUser.loading = false;
    },
  },
});
export default usersSlice.reducer;
export const { clearUserUpdateState } = usersSlice.actions;
