import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "types";

export interface usersState {
  list: User[];
  status: string;
  jwtToken: string | null;
}

const initialState: usersState = {
  list: [],
  status: "",
  jwtToken: null,
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
      console.log("action.payload is : ", action.payload.token);
      state.status = "success";
    });
    builder.addCase(loginUser.rejected, (state) => {
      console.log("Something went wrong");
      state.status = "failed";
    });
  },
});

export default slice.reducer;
