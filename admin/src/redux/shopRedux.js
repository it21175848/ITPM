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

    // Delete a shop
    deleteShopStart: (state) => {
      state.isFetching = true;
    },
    deleteShopSuccess: (state, action) => {
      state.isFetching = false;
      state.shops = state.shops.filter((shop) => shop._id !== action.payload);
    },
    deleteShopFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // Update a shop
    updateShopStart: (state) => {
      state.isFetching = true;
    },
    updateShopSuccess: (state, action) => {
      state.isFetching = false;
      const updatedShopIndex = state.shops.findIndex(
        (shop) => shop._id === action.payload.id
      );
      if (updatedShopIndex !== -1) {
        state.shops = [
          ...state.shops.slice(0, updatedShopIndex),
          action.payload.shop,
          ...state.shops.slice(updatedShopIndex + 1),
        ];
      }
    },

    updateShopFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // Add a new shop
    addShopStart: (state) => {
      state.isFetching = true;
    },
    addShopSuccess: (state, action) => {
      state.isFetching = false;
      state.shops.push(action.payload);
    },
    addShopFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getShopStart,
  getShopSuccess,
  getShopFailure,
  deleteShopStart,
  deleteShopSuccess,
  deleteShopFailure,
  updateShopStart,
  updateShopSuccess,
  updateShopFailure,
  addShopStart,
  addShopSuccess,
  addShopFailure,
} = shopSlice.actions;

export default shopSlice.reducer;
