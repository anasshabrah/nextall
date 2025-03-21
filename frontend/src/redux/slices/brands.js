// File: C:\Users\hanos\nextall\frontend\src\redux\slices\brands.js
import { createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

const initialState = {
  brands: [],
  isLoading: true
};

const slice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    setBrands(state, action) {
      state.brands = action.payload;
      state.isLoading = false;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { setBrands } = slice.actions;

// ----------------------------------------------------------------------
