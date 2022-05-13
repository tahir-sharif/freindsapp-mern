import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import cookie from "react-cookies";

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${cookie.load("user")}`,
});

export const login = createAsyncThunk("login", async (data, thunkApi) => {
  try {
    const response = await axios[api.login().method](api.login().url, data);
    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(
      (!!e.response && e.response.data.error) || e.message
    );
  }
});

export const register = createAsyncThunk("register", async (data, thunkApi) => {
  try {
    const response = await axios[api.register().method](
      api.register().url,
      data
    );
    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(
      (!!e.response && e.response.data.error) || e.message
    );
  }
});

export const getUserByToken = createAsyncThunk(
  "getuser",
  async (data, thunkApi) => {
    try {
      const response = await axios[api.getuser().method](api.getuser().url, {
        body: data,
        headers: headers(),
      });
      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue(
        (!!e.response && e.response.data.error) || e.message
      );
    }
  }
);
