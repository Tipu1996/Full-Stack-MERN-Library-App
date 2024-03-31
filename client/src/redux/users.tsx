import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "types";

const url = "http://localhost:4000/api/v1";

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
  url?: string;
  header?: object;
  userId?: string;
}

axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("jwtToken");
    if (token) config.headers!["Authorization"] = "Bearer " + token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  return axios.get(`${url}/users`).then((response) => response.data);
});

export const getUser = createAsyncThunk(
  "users/getUser",
  async ({ userId }: { userId: string }) => {
    return axios
      .get(`${url}/users/user/${userId}`)
      .then((response) => response.data);
  }
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async ({ header, body }: asyncObject) => {
    return axios
      .post(`${url}/users/login`, body, header)
      .then((response) => response.data);
  }
);

export const signUpUser = createAsyncThunk(
  "users/signUpUser",
  async (
    body: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    },
    { rejectWithValue }
  ) => {
    return axios
      .post(`${url}/users/signup`, body)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const setCodeForPasswordReset = createAsyncThunk(
  "users/SetCodeForPasswordReset",
  async (
    body: {
      email: string;
    },
    { rejectWithValue }
  ) => {
    return axios
      .post(`${url}/users/user/setCodeForPasswordReset`, body)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const resetPassword = createAsyncThunk(
  "users/resetPassword",
  async (
    body: {
      email: string;
      code: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    return axios
      .post(`${url}/users/user/resetPassword`, body)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const signInUser = createAsyncThunk(
  "users/SignInUser",
  async (
    body: {
      email: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    return axios
      .post(`${url}/users/signin`, body)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const verifyUser = createAsyncThunk(
  "users/verifyUser",
  async (
    body: {
      email: string;
      code: string;
    },
    { rejectWithValue }
  ) => {
    return axios
      .post(`${url}/users/verify`, body)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const removeUser = createAsyncThunk(
  "books/removeUser",
  async ({ userId }: asyncObject) => {
    return axios
      .delete(`${url}/users/${userId}`, {})
      .then((response) => response.data);
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
    builder.addCase(signUpUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(signUpUser.fulfilled, (state) => {
      state.status = "success";
    });
    builder.addCase(signUpUser.rejected, (state) => {
      console.log("Something went wrong");
      state.status = "failed";
    });
    builder.addCase(setCodeForPasswordReset.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(setCodeForPasswordReset.fulfilled, (state) => {
      state.status = "success";
    });
    builder.addCase(setCodeForPasswordReset.rejected, (state) => {
      console.log("Something went wrong");
      state.status = "failed";
    });
    builder.addCase(resetPassword.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.status = "success";
    });
    builder.addCase(resetPassword.rejected, (state) => {
      console.log("Something went wrong");
      state.status = "failed";
    });
    builder.addCase(signInUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.jwtToken = action.payload.token;
      state.isAdmin = action.payload.user.isAdmin;
      state.picture = action.payload.user.picture;
      localStorage.setItem("jwtToken", action.payload.token);
      localStorage.setItem("isAdmin", action.payload.user.isAdmin);
      localStorage.setItem("picture", action.payload.user.picture);
      localStorage.setItem("signedIn", "true");
      localStorage.setItem("userId", JSON.stringify(action.payload.user._id));
      state.status = "success";
    });
    builder.addCase(signInUser.rejected, (state) => {
      console.log("Something went wrong");
      state.status = "failed";
    });
    builder.addCase(verifyUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(verifyUser.fulfilled, (state, action) => {
      state.status = "success";
    });
    builder.addCase(verifyUser.rejected, (state) => {
      console.log("Something went wrong");
      state.status = "failed";
    });
    builder.addCase(removeUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(removeUser.fulfilled, (state, action) => {
      let index = state.list.indexOf(action.payload);
      if (index !== -1) {
        state.list.splice(index, 1);
      }
      state.status = "success";
    });
    builder.addCase(removeUser.rejected, (state) => {
      console.log("Something went wrong");
      state.status = "failed";
    });
  },
});

export default slice.reducer;
