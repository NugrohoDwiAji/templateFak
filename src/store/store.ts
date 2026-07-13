import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { baseApi } from "./api/baseApi";
import languageReducer from "./slices/languageSlice";
import uiReducer from "./slices/uiSlice";
import themeReducer from "./slices/themeSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      language: languageReducer,
      ui: uiReducer,
      theme: themeReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
    devTools: process.env.NODE_ENV !== "production",
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
