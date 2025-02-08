import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    setVideos: (state, action) => {
      return action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setVideos } = videosSlice.actions;

export default videosSlice.reducer;
