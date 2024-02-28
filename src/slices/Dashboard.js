import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { errorMessage, successMessage } from "../utils/toast";
import {
  dashboardfurances,
  dashboardget,
  getsinglefurances,
} from "../services/authServices";
import {
  useNavigate,
  Navigate,
  redirect,
  unstable_HistoryRouter,
} from "react-router-dom";

const initialState = {
  DashboardList: [],
  furances: [],
  singlefurances: [],
};

// export const handleStaffLogin = createAsyncThunk(
//   "main/handleStaffLogin",
//   async (obj, { dispatch, getState }) => {
//     const { staffCodeMeli, staffPassword } = getState().auth;
//     const user = {
//       username: staffCodeMeli,
//       password: staffPassword,
//     };
//     try {
//       const loginStaffRes = await loginStaff(user);
//       console.log(loginStaffRes);
//       if (loginStaffRes.data.code === 415) {
//         const userInfo = parseJwt(loginStaffRes.data.token);
//         dispatch(RsetUser(userInfo));
//         dispatch(RsetIsLoggedIn(true));
//         localStorage.setItem("token", loginStaffRes.data.token);
//         dispatch(RsetStaffCodeMeli(""));
//         dispatch(RsetStaffPassword(""));
//         dispatch(RsetFormErrors(""));
//         successMessage("ورود با موفقیت انجام شد");
//       } else {
//         errorMessage("کد ملی یا رمز عبور اشتباه است!");
//       }
//     } catch (ex) {
//       console.log(ex);
//     }
//   }
// );

const DashboardSlices = createSlice({
  name: "Dashboard",
  initialState,
  reducers: {
    RsetDashboardList: (state, { payload }) => {
      return { ...state, DashboardList: payload };
    },
    Rsetfurances: (state, { payload }) => {
      return { ...state, furances: payload };
    },
    Rsetsinglefurances: (state, { payload }) => {
      return { ...state, singlefurances: payload };
    },
  },
});

export const { RsetDashboardList, Rsetfurances, Rsetsinglefurances } =
  DashboardSlices.actions;

export const selectDashboardList = (state) => state.Dashboard.DashboardList;
export const selectfurances = (state) => state.Dashboard.furances;
export const selectsinglefurances = (state) => state.Dashboard.singlefurances;

export default DashboardSlices.reducer;
// -----------------------------api handle
export const fetchedashboard = createAsyncThunk(
  "Dashboard/fetchessentialgoodlist",

  async (obj, { dispatch }) => {
    try {
      const getuser = await dashboardget();

      if (getuser.status === 200) {
        dispatch(RsetDashboardList(getuser.data.data));
      } else {
        errorMessage("عدم دريافت اطلاعات");
      }
    } catch (ex) {
      console.log(ex);
    }
  }
);

export const dashboardgetfurances = createAsyncThunk(
  "Dashboard/dashboardgetfurances",

  async (value, { dispatch }) => {
    try {
      console.log(value);
      const getfurances = await dashboardfurances(value);

      console.log(getfurances);

      if (getfurances.status === 200) {
        dispatch(Rsetfurances(getfurances.data.data));
      } else {
        errorMessage("عدم دريافت اطلاعات");
      }
    } catch (ex) {
      console.log(ex);
    }
  }
);

export const getsinglefurance = createAsyncThunk(
  "Dashboard/getsinglefurance",

  async (value, { dispatch }) => {
    try {
      const getfurances = await getsinglefurances(value);
      console.log(getfurances);
      if (getfurances.status === 200) {
        dispatch(Rsetsinglefurances(getfurances.data.list));
      } else {
        errorMessage("عدم دريافت اطلاعات");
      }
    } catch (ex) {
      console.log(ex);
    }
  }
);
