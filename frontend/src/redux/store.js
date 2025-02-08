import { configureStore } from "@reduxjs/toolkit";
import configsReducer from "./slices/configsSlice";
import filtersReducer from "./slices/filtersSlice";
import videosReducer from "./slices/videosSlice";

export const store = configureStore({
  reducer: {
    configs: configsReducer,
    filters: filtersReducer,
    videos: videosReducer,
  },
});
