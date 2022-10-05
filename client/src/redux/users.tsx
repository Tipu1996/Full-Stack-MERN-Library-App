import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import mongoose from "mongoose";
import { User } from "types";

export interface usersState {
  list: User[];
  user: User | null;
  status: string;
  jwtToken: string | null;
  isAdmin: boolean;
  picture: string;
}

const initialState: usersState = {
  list: [],
  user: null,
  status: "",
  jwtToken: null,
  isAdmin: false,
  picture: "",
};

interface asyncObject {
  searchBy?: string;
  body?: object;
  url: string;
  header?: object;
  jwtToken?: string | null;
}

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async ({ url, jwtToken }: asyncObject) => {
    return axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => response.data);
  }
);

export const getUser = createAsyncThunk(
  "users/getUser",
  async ({
    url,
    jwtToken,
    userId,
  }: {
    url: string;
    userId: mongoose.Schema.Types.ObjectId;
    jwtToken: string;
  }) => {
    return axios
      .get(`${url}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => response.data);
  }
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async ({ url, header, body }: asyncObject) => {
    return axios.post(url, body, header).then((response) => response.data);
  }
);

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.jwtToken = action.payload.token;
      state.isAdmin = action.payload.isAdmin;
      state.picture = action.payload.picture;
      localStorage.setItem("jwtToken", action.payload.token);
      localStorage.setItem("isAdmin", action.payload.isAdmin);
      localStorage.setItem("picture", action.payload.picture);
      state.status = "success";
    });
    builder.addCase(loginUser.rejected, (state) => {
      console.log("Something went wrong");
      state.status = "failed";
    });
    builder.addCase(getUsers.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.list = action.payload;
      state.status = "success";
    });
    builder.addCase(getUsers.rejected, (state) => {
      console.log("Something went wrong");
      state.status = "failed";
    });
    builder.addCase(getUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.status = "success";
    });
    builder.addCase(getUser.rejected, (state) => {
      console.log("Something went wrong");
      state.status = "failed";
    });
  },
});

export default slice.reducer;
