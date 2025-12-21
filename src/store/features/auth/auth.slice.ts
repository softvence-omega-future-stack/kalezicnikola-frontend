import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TUser } from "../storeTypes/user";

export interface AuthState {
  accessToken: string | null;
  user: TUser | null;
}

const initialState: AuthState = {
  accessToken: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ accessToken: string; user: TUser }>) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
    },
    
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
