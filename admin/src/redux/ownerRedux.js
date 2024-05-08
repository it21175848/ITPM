import { createSlice } from "@reduxjs/toolkit";

const ownerSlice = createSlice({
  name: "owner",
  initialState: {
    owners: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    // Get all owners
    getOwnerStart: (state) => {
      state.isFetching = true;
    },
    getOwnerSuccess: (state, action) => {
      state.isFetching = false;
      state.owners = action.payload;
    },
    getOwnerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // Delete owner
    deleteOwnerStart: (state) => {
      state.isFetching = true;
    },
    deleteOwnerSuccess: (state, action) => {
      state.isFetching = false;
      state.owners = state.owners.filter(
        (owner) => owner._id !== action.payload
      );
    },
    deleteOwnerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // Update owner
    updateOwnerStart: (state) => {
      state.isFetching = true;
    },
    updateOwnerSuccess: (state, action) => {
      state.isFetching = false;
      const index = state.owners.findIndex(
        (owner) => owner._id === action.payload.id
      );
      if (index !== -1) {
        state.owners[index] = action.payload.owner;
      }
    },
    updateOwnerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // Add owner
    addOwnerStart: (state) => {
      state.isFetching = true;
    },
    addOwnerSuccess: (state, action) => {
      state.isFetching = false;
      state.owners.push(action.payload);
    },
    addOwnerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getOwnerStart,
  getOwnerSuccess,
  getOwnerFailure,
  deleteOwnerStart,
  deleteOwnerSuccess,
  deleteOwnerFailure,
  updateOwnerStart,
  updateOwnerSuccess,
  updateOwnerFailure,
  addOwnerStart,
  addOwnerSuccess,
  addOwnerFailure,
} = ownerSlice.actions;

export default ownerSlice.reducer;
