import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Credentials } from "../interfaces/credentials.interface";
import { User } from "../interfaces/user.interface";
import { FetchStatus } from "../types/fetchStatus.type";
import { RootState } from "./store";
import { loginRequest } from "./userAPI";

export interface UserState {
  user: User;
  userLoggedIn: boolean;
  fetchStatus: FetchStatus;
}

const initialState: UserState = {
  user: {
    id: JSON.parse(localStorage.getItem("user") || "{}").id,
    token: JSON.parse(localStorage.getItem("user") || "{}").token,
  },
  userLoggedIn: false,
  fetchStatus: "loading",
};

export const login = createAsyncThunk(
  "login",
  async (credentials: Credentials) => {
    const response = await loginRequest(credentials);
    return response;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        if (typeof action.payload?.id !== "undefined") {
          state.user = action.payload;
          state.userLoggedIn = true;
          state.fetchStatus = "idle";
          localStorage.setItem(
            "user",
            JSON.stringify({
              token: action.payload.token,
              id: action.payload.id,
              expiry: new Date().setMinutes(new Date().getMinutes() + 60), // TODO: This should come from the BE to avoid sync issues
            })
          );
        }
      })
      .addCase(login.rejected, (state) => {
        state.fetchStatus = "failed";
      });
  },
});

export const {} = userSlice.actions;

export const selectUserDetails = (state: RootState) => state.user.user;
export const isUserLoggedIn = (state: RootState) => {
  const persistedUser = JSON.parse(localStorage.getItem("user") || "{}");
  return state.user.userLoggedIn || new Date(persistedUser.expiry) > new Date();
};

export default userSlice.reducer;
