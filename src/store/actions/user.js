import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import cookie from "react-cookies";
import { api } from "../../api/api";

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${cookie.load("user")}`,
});

export const getUserById = createAsyncThunk(
  "getUserById",
  async (id, thunkApi) => {
    try {
      const response = await axios[api.getUserById().method](
        api.getUserById(id).url,
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

export const updateUser = createAsyncThunk(
  "updateUser",
  async (data, thunkApi) => {
    try {
      const response = await axios[api.updateUser().method](
        api.updateUser().url,
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
