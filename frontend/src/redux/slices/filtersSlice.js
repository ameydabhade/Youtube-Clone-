import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchText: "",
  selectedGenre: "All",
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setSelectedGenre: (state, action) => {
      state.selectedGenre = action.payload;
    },
    clearFilters: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { setSearchText, setSelectedGenre, clearFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;
