import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: {
    name: "",
    email: "",
    token: "",
    userId: "",
  },
  sideBarOpen: false,
};

export const configsSlice = createSlice({
  name: "configs",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
    logout: () => initialState,
    toggleSideBar: (state) => {
      state.sideBarOpen = !state.sideBarOpen;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth, logout, toggleSideBar } = configsSlice.actions;

export default configsSlice.reducer;
