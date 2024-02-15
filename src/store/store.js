import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import mainSlices from "../slices/mainSlices";
import authSlices from "../slices/authSlices";
import userManagmentSlices from "../slices/userManagmentSlices";
import fireProofSlices from "../slices/fireProofSlices";
import essentialGoodsSlices from "../slices/essentialGoodsSlices";

const rootReducer = {
  auth: authSlices,
  main: mainSlices,
  userManagment: userManagmentSlices,
  fireProof: fireProofSlices,
  essentialGoods: essentialGoodsSlices,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
