import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "types";

export interface usersState {
  list: User[];
  status: string;
  jwtToken: string | null;
  isAdmin: boolean;
  picture: string;
}

const initialState: usersState = {
  list: [],
  status: "",
  jwtToken: null,
  isAdmin: false,
  picture: "",
};

interface asyncObject {
  searchBy?: string;
  body: object;
  url: string;
  header: object;
}

// export const getUsers = createAsyncThunk(
//   "users/getUsers",
//   async ({ url }: asyncObject) => {
//     return axios.get(url).then((response) => response.data);
//   }
// );

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
  },
});

export default slice.reducer;
