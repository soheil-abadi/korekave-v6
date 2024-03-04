import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginStaff, postCustomerLogin } from "../services/authServices";
import { RsetFormErrors, RsetUser } from "./mainSlices";
import { errorMessage, successMessage } from "../utils/toast";

const initialState = {
  loading: false,
  smallNav: false,
};

const mainSlices = createSlice({
  name: "main",
  initialState,
  reducers: {
    RsetLoading: (state, { payload }) => {
      return { ...state, loading: payload };
    },
    RsetSmallNav: (state, { payload }) => {
      return { ...state, smallNav: payload };
    },
  },
});

export const { RsetLoading, RsetSmallNav } = mainSlices.actions;

export const selectSmallNav = (state) => state.main.smallNav;
export const selectLoading = (state) => state.main.loading;

export default mainSlices.reducer;
