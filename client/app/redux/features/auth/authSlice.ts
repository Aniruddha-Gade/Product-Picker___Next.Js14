"use client"

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const parseJSON = (value: string | null) => {
  try {
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
};

const token = parseJSON(localStorage.getItem("token"));
const user = parseJSON(localStorage.getItem("user"));

// If either token or user is null, clear both from localStorage and state
if (!token || !user) {
  console.log("run here")
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

const initialState = {
  token: token ? token : null,
  user: user ? user : null,
};


console.log("token from authslice = ",localStorage.getItem("token"))
console.log("token from authslice = ",token)
console.log("user from authslice = ",user)

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
      console.log("removing tokens from local storage")
      state.token = "";
      state.user = "";
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    },
  },
});

export const { userRegistration, userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice.reducer