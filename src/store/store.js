import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import mainSlices from "../slices/mainSlices";
import authSlices from "../slices/authSlices";
import userManagmentSlices from "../slices/userManagmentSlices";
import fireProofSlices from "../slices/fireProofSlices";
import essentialGoodsSlices from "../slices/essentialGoodsSlices";
import FurnaceDistributeSlices from "../slices/FurnaceDistribute";
import FactoryManagmenttSlices from "../slices/FactoryManagment";
import DashboardSlices from "../slices/Dashboard";
import factorySlices from "../slices/factory";
import FurnaceObservationSlices from "../slices/FurnaceObservationSlices";

const rootReducer = {
  auth: authSlices,
  main: mainSlices,
  userManagment: userManagmentSlices,
  fireProof: fireProofSlices,
  essentialGoods: essentialGoodsSlices,
  FurnaceDistribute: FurnaceDistributeSlices,
  FactoryManagment: FactoryManagmenttSlices,
  Dashboard: DashboardSlices,
  Factory: factorySlices,
  FurnaceObservation: FurnaceObservationSlices,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
