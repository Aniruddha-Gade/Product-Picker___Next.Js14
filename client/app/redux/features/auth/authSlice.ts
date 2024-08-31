'use client';

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Helper function to parse JSON
const parseJSON = (value: string | null) => {
  try {
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
};


// Initializing token and user from localStorage only if window is defined
let token = null;
let user = null;

if (typeof window !== 'undefined') {
  token = parseJSON(localStorage.getItem("token"));
  user = parseJSON(localStorage.getItem("user"));

  // If either token or user is null, clear both from localStorage
  if (!token || !user) {
    console.log("Clearing invalid localStorage data");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
}

const initialState = {
  token: token ? token : null,
  user: user ? user : null,
};




const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      if (typeof window !== 'undefined') {
        localStorage.setItem("token", JSON.stringify(action.payload.token));
      }
    },
    userLoggedIn: (state, action: PayloadAction<{ accessToken: string, user: string }>) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
      if (typeof window !== 'undefined') {
        localStorage.setItem("token", JSON.stringify(action.payload.accessToken));
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      }
    },
    userLoggedOut: (state) => {
      state.token = "";
      state.user = "";
      if (typeof window !== 'undefined') {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    },
  },
});

export const { userRegistration, userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice.reducer;
