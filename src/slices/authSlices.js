import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  loginStaff,
  postCustomerLogin,
  refreshuser,
} from "../services/authServices";
import { RsetFormErrors, RsetUser } from "./mainSlices";
import { SuccessMessage, errorMessage, successMessage } from "../utils/toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const initialState = {
  isLoggedIn: false,
  username: "",
  password: "",
  user: "",
};

export const parseJwt = (token) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
};

export const handleUsetInfo = createAsyncThunk(
  "authSlices/handleUsetInfo",
  async ({ dispatch }) => {
    try {
      const userInfoRes = await refreshuser(localStorage.getItem("id"));

      if (userInfoRes.data.code === 200) {
        dispatch(Rsetuser(userInfoRes.data.user));
        SuccessMessage("ورود موفق");
      } else {
        Swal.fire({
          icon: "error",
          title: "   عدم دريافت اطلاعات  ",
        });
      }
    } catch (ex) {
      Swal.fire({
        icon: "error",
        title: "     عدم دريافت اطلاعات از سرور  ",
      });
    }
  }
);

const authSlices = createSlice({
  name: "auth",
  initialState,
  reducers: {
    RsetIsLoggedIn: (state, { payload }) => {
      return { ...state, isLoggedIn: payload };
    },
    Rsetusername: (state, { payload }) => {
      return { ...state, username: payload };
    },
    RsetPassword: (state, { payload }) => {
      return { ...state, password: payload };
    },
    Rsetuser: (state, { payload }) => {
      return { ...state, user: payload };
    },
  },
});

export const { RsetIsLoggedIn, Rsetusername, RsetPassword, Rsetuser } =
  authSlices.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUsername = (state) => state.auth.username;
export const selectPassword = (state) => state.auth.password;
export const selectuser = (state) => state.auth.user;
export default authSlices.reducer;
