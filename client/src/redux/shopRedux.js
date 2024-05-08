import { createSlice } from "@reduxjs/toolkit";

const shopSlice = createSlice({
  name: "shop",
  initialState: {
    shops: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    // Get all shops
    getShopStart: (state) => {
      state.isFetching = true;
    },
    getShopSuccess: (state, action) => {
      state.isFetching = false;
      state.shops = action.payload;
    },
    getShopFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { getShopStart, getShopSuccess, getShopFailure } =
  shopSlice.actions;

export default shopSlice.reducer;
