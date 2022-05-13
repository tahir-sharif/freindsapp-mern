import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import cookie from "react-cookies";
import axios from "axios";

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${cookie.load("user")}`,
});

export const getAllposts = createAsyncThunk("getposts", async (thunkApi) => {
  try {
    const response = await axios[api.getAllposts().method](
      api.getAllposts().url,
      {
        headers: headers(),
      }
    );
    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(
      (!!e.response && e.response.data.error) || e.message
    );
  }
});

export const uploadPost = createAsyncThunk(
  "uploadPost",
  async (data, thunkApi) => {
    try {
      const response = await axios[api.uploadPost().method](
        api.uploadPost().url,
        data,
        {
          headers: headers(),
        }
      );
      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue(
        (!!e.response && e.response.data.error) || e.message
      );
    }
  }
);

export const getPostsById = createAsyncThunk(
  "getPostsById",
  async (id, thunkApi) => {
    try {
      const response = await axios[api.getPostsById().method](
        api.getPostsById(id).url,
        {
          headers: headers(),
        }
      );
      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue(
        (!!e.response && e.response.data.error) || e.message
      );
    }
  }
);
