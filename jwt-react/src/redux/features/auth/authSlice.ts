import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { token } from "../../../intefaces";

const initialState: token = {
  token: null,
  expiresIn: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<token>) => {
      state.token = action.payload.token;
      if (action.payload.expiresIn) {
        state.expiresIn = Date.now() + action.payload.expiresIn;
      }
    },
    logOut: (state) => {
      state.token = null;
      state.expiresIn = null;
    },
  },
});

export const { setToken, logOut } = authSlice.actions;
export default authSlice.reducer;
export const selectToken = (state: RootState) => state.auth.token;
export const selectExpiresIn = (state: RootState) => state.auth.expiresIn;
