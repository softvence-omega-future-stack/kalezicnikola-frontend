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

    updateUser: (state, action: PayloadAction<Partial<TUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    logout: (state) => {
      state.accessToken = null;
      state.user = null;
    },
    
  },
});

export const { setUser, updateUser, logout } = authSlice.actions;
export default authSlice.reducer;
