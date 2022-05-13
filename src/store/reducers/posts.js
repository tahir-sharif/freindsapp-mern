import { createSlice } from "@reduxjs/toolkit";
import { getAllposts, getPostsById, uploadPost } from "../actions/post";

const posts = createSlice({
  name: "auth",
  initialState: {
    getposts: {
      status: null,
      loading: false,
      error: null,
      postsData: [],
    },
    uploadPost: {
      status: null,
      loading: false,
      error: null,
    },
    getPostsById: {
      loading: false,
      error: null,
      status: null,
      postsData: [],
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllposts.pending, (state) => {
      state.getposts.loading = true;
    });

    builder.addCase(getAllposts.fulfilled, (state, action) => {
      state.getposts.loading = false;
      state.getposts.postsData = action.payload;
    });

    builder.addCase(getAllposts.rejected, (state) => {
      state.getposts.loading = false;
    });

    builder.addCase(uploadPost.pending, (state) => {
      state.status = "pending";
      state.uploadPost.loading = true;
      state.uploadPost.error = null;
    });

    builder.addCase(uploadPost.fulfilled, (state) => {
      state.uploadPost.status = "fulfilled";
      state.uploadPost.loading = false;
      state.uploadPost.error = null;
    });

    builder.addCase(uploadPost.rejected, (state, action) => {
      state.uploadPost.status = "rejected";
      state.uploadPost.loading = false;
      state.uploadPost.error = action.payload;
    });

    builder.addCase(getPostsById.pending, (state) => {
      state.status = "pending";
      state.getPostsById.loading = true;
      state.getPostsById.error = null;
    });

    builder.addCase(getPostsById.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.getPostsById.loading = false;
      state.getPostsById.postsData = action.payload;
      state.getPostsById.error = null;
    });

    builder.addCase(getPostsById.rejected, (state, action) => {
      state.status = "rejected";
      state.getPostsById.loading = false;
      state.getPostsById.error = action.payload;
    });
  },
  reducers: {
    resetUpload: (state) => {
      state.uploadPost.status = null;
      state.uploadPost.loading = false;
      state.uploadPost.error = null;
    },
  },
});
export default posts.reducer;
export const { resetUpload } = posts.actions;
