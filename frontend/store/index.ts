import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage

import authReducer from "./slices/authSlice";
import chatReducer from "./slices/chatSlice";

// Persist config for auth slice (persist everything)
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token"], // or just "auth" slice fully
};

// Persist config for chat slice (only selectedUser)
const chatPersistConfig = {
  key: "chat",
  storage,
  whitelist: ["selectedUser"],
};

// Wrap reducers with persistReducer
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedChatReducer = persistReducer(chatPersistConfig, chatReducer);

// Combine reducers
const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  chat: persistedChatReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
