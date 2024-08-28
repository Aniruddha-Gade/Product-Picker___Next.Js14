import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      localStorage.setItem("token", JSON.stringify(action.payload.token));
    },
    userLoggedIn: (state, action: PayloadAction<{ accessToken: string, user: string }>) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
      // store in local storage
      localStorage.setItem("token", JSON.stringify(action.payload.accessToken))
      localStorage.setItem("user", JSON.stringify(action.payload.user))
    },
    userLoggedOut: (state) => {
      state.token = "";
      state.user = "";
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    },
  },
});

export const { userRegistration, userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice.reducer