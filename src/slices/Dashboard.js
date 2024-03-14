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
import Swal from "sweetalert2";

const initialState = {
  DashboardList: [],
  furances: [],
  singlefurances: [],
  loading: false,
  loadingFurnace: false,
  loadingSingleFurnace: false,
  error: false,
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

    Rseterror: (state, { payload }) => {
      return { ...state, error: payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchedashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchedashboard.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchedashboard.rejected, (state) => {
        state.loading = false;
        // Handle rejection if needed
      })
      .addCase(dashboardgetfurances.pending, (state) => {
        state.loadingFurnace = true;
      })
      .addCase(dashboardgetfurances.fulfilled, (state, action) => {
        state.loadingFurnace = false;
      })
      .addCase(dashboardgetfurances.rejected, (state) => {
        state.loadingFurnace = false;
        // Handle rejection if needed
      })
      .addCase(getsinglefurance.pending, (state) => {
        state.loadingSingleFurnace = true;
      })
      .addCase(getsinglefurance.fulfilled, (state, action) => {
        state.loadingSingleFurnace = false;
      })
      .addCase(getsinglefurance.rejected, (state) => {
        state.loadingSingleFurnace = false;
        // Handle rejection if needed
      });
  },
});

export const {
  RsetDashboardList,
  Rsetfurances,
  Rsetsinglefurances,
  Rseterror,
} = DashboardSlices.actions;

export const selectDashboardList = (state) => state.Dashboard.DashboardList;
export const selectfurances = (state) => state.Dashboard.furances;
export const selectsinglefurances = (state) => state.Dashboard.singlefurances;
export const selectloading = (state) => state.Dashboard.loading;
export const selectloadingFurnace = (state) => state.Dashboard.loadingFurnace;
export const selectloadingSingleFurnace = (state) =>
  state.Dashboard.loadingSingleFurnace;

export const selecterror = (state) => state.Dashboard.error;

export default DashboardSlices.reducer;
// -----------------------------api handle
export const fetchedashboard = createAsyncThunk(
  "Dashboard/fetchessentialgoodlist",

  async (token, { dispatch }) => {
    try {
      const getuser = await dashboardget(token);

      if (getuser.data.code === 200) {
        dispatch(RsetDashboardList(getuser.data.data));
      } else {
        dispatch(Rseterror(true));
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "   عدم دريافت اطلاعات  ",
      });
    }
  }
);

export const dashboardgetfurances = createAsyncThunk(
  "Dashboard/dashboardgetfurances",

  async (value, { dispatch }) => {
    try {
      const getfurances = await dashboardfurances(value);
      if (getfurances.status === 200) {
        dispatch(Rsetfurances(getfurances.data.data));
      } else {
        Swal.fire({
          icon: "error",
          title: "   عدم دريافت اطلاعات  ",
        });
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "   عدم دريافت اطلاعات  ",
      });
    }
  }
);

export const getsinglefurance = createAsyncThunk(
  "Dashboard/getsinglefurance",

  async (value, { dispatch }) => {
    try {
      const getfurances = await getsinglefurances(value);

      if (getfurances.status === 200) {
        dispatch(Rsetsinglefurances(getfurances.data.list));
      } else {
        Swal.fire({
          icon: "error",
          title: "   عدم دريافت اطلاعات  ",
        });
      }
    } catch (ex) {
      Swal.fire({
        icon: "error",
        title: "   عدم دريافت اطلاعات  ",
      });
    }
  }
);
