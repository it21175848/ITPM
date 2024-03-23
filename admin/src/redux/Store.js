// Import necessary functions and modules from Redux Toolkit and redux-persist
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userRedux"; // Import user reducer
import productReducer from "./productRedux"; // Import product reducer
import shopReducer from "./shopRedux"; // Import shop reducer (changed import name)
import ownerRedux from "./ownerRedux"; // Import shop reducer (changed import name)
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"; // Import necessary functions for state persistence
import storage from "redux-persist/lib/storage"; // Import storage engine (localStorage by default)

// Configuration for state persistence
const persistConfig = {
  key: "root", // Key for the persisted state
  version: 1, // Version of the persisted state
  storage, // Storage engine for persisting the state (localStorage by default)
};

// Combine multiple reducers into one root reducer
const rootReducer = combineReducers({
  user: userReducer, // Add user reducer
  product: productReducer, // Add product reducer
  shop: shopReducer, // Add shop reducer (changed to shopReducer)
  owner: ownerRedux, // Add shop reducer (changed to ownerRedux)
});

// Wrap the root reducer with state persistence configuration
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Redux store with persisted state and middleware configuration
export const store = configureStore({
  reducer: persistedReducer, // Set persisted reducer as the root reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignore certain actions for state serialization check
      },
    }),
});

// Create a persistor object to persist the Redux store
export const persistor = persistStore(store);
