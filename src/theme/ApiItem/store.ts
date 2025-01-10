import { configureStore, combineReducers } from "@reduxjs/toolkit";
import accept from "@theme/ApiExplorer/Accept/slice";
import auth from "@theme/ApiExplorer/Authorization/slice";
import body from "@theme/ApiExplorer/Body/slice";
import contentType from "@theme/ApiExplorer/ContentType/slice";
import params from "@theme/ApiExplorer/ParamOptions/slice";
import response from "@theme/ApiExplorer/Response/slice";
import server from "@theme/ApiExplorer/Server/slice";

const rootReducer = combineReducers({
  accept,
  contentType,
  response,
  server,
  body,
  params,
  auth,
});

export type RootState = ReturnType<typeof rootReducer>;

export const createStoreWithState = (
  preloadedState: RootState,
  middlewares: any[]
) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(...middlewares),
  });

export const createStoreWithoutState = (
  preloadedState: {},
  middlewares: any[]
) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(...middlewares),
  });

export type AppDispatch = ReturnType<typeof createStoreWithState>["dispatch"];
