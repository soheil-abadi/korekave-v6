import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SuccessMessage, errorMessage, successMessage } from "../utils/toast";
import {
  addfactorymanagment,
  editfactorymanagment,
  getFactoryManagmentData,
} from "../services/authServices";
import Swal from "sweetalert2";

const initialState = {
  FactoryManagmentList: [],

  FactoryManagmentCurrentUser: "",
  //modal

  FactoryManagmentEditModal: false,
  FactoryManagmentAddmodal: false,
  FactoryManagmentName: "",
  FactoryManagmentLocation: "",
  FactoryManagmentEstablish: "",
  FactoryManagmentType: "",
  FactoryManagmentLogo: "",
  loading: false,
};

// export const handleStaffLogin = createAsyncThunk(
//   "main/handleStaffLogin",
//   async (obj, { dispatch, getState }) => {
//     const { staffCodeMeli, staffPassword } = getState().auth;
//     const user = {
//       Establish: staffCodeMeli,
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

const FactoryManagmentSlices = createSlice({
  name: "FactoryManagment",
  initialState,
  reducers: {
    RsetFactoryManagmentList: (state, { payload }) => {
      return { ...state, FactoryManagmentList: payload };
    },
    RsetFactoryManagmentLocation: (state, { payload }) => {
      return { ...state, FactoryManagmentLocation: payload };
    },
    RsetFactoryManagmentName: (state, { payload }) => {
      return { ...state, FactoryManagmentName: payload };
    },
    RsetFactoryManagmentEstablish: (state, { payload }) => {
      return { ...state, FactoryManagmentEstablish: payload };
    },

    RsetFactoryManagmentCurrentUser: (state, { payload }) => {
      return { ...state, FactoryManagmentCurrentUser: payload };
    },

    RsetFactoryManagmentEditModal: (state, { payload }) => {
      return { ...state, FactoryManagmentEditModal: payload };
    },

    RsetFactoryManagmentAddmodal: (state, { payload }) => {
      return { ...state, FactoryManagmentAddmodal: payload };
    },
    RsetFactoryManagmentType: (state, { payload }) => {
      return { ...state, FactoryManagmentType: payload };
    },
    RsetFactoryManagmentLogo: (state, { payload }) => {
      return { ...state, FactoryManagmentLogo: payload };
    },
    Rsetloading: (state, { payload }) => {
      return { ...state, loading: payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchdata.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchdata.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchdata.rejected, (state) => {
        state.loading = false;
        // Handle rejection if needed
      });
  },
});

export const {
  RsetFactoryManagmentList,
  RsetFactoryManagmentLocation,
  RsetFactoryManagmentName,
  RsetFactoryManagmentEstablish,
  RsetFactoryManagmentCurrentUser,
  RsetFactoryManagmentEditModal,
  RsetFactoryManagmentAddmodal,
  RsetFactoryManagmentType,
  RsetFactoryManagmentLogo,
  Rsetloading,
} = FactoryManagmentSlices.actions;

export const selectFactoryManagmentList = (state) =>
  state.FactoryManagment.FactoryManagmentList;
export const selectFactoryManagmentLocation = (state) =>
  state.FactoryManagment.FactoryManagmentLocation;
export const selectFactoryManagmentName = (state) =>
  state.FactoryManagment.FactoryManagmentName;
export const selectFactoryManagmentEstablish = (state) =>
  state.FactoryManagment.FactoryManagmentEstablish;

export const selectFactoryManagmentCurrentUser = (state) =>
  state.FactoryManagment.FactoryManagmentCurrentUser;
export const selectFactoryManagmentEditModal = (state) =>
  state.FactoryManagment.FactoryManagmentEditModal;
export const selectFactoryManagmentAddmodal = (state) =>
  state.FactoryManagment.FactoryManagmentAddmodal;
export const selectFactoryManagmentType = (state) =>
  state.FactoryManagment.FactoryManagmentType;
export const selectFactoryManagmentLogo = (state) =>
  state.FactoryManagment.FactoryManagmentLogo;
export const selectloading = (state) => state.FactoryManagment.loading;

export default FactoryManagmentSlices.reducer;
// ---------------------------------------------------
export const fetchdata = createAsyncThunk(
  "userManagement/fetchdata",

  async (obj, { dispatch }) => {
    try {
      const FactoryManagmentData = await getFactoryManagmentData();

      if (FactoryManagmentData.status === 200) {
        console.log(FactoryManagmentData.data.data);
        dispatch(RsetFactoryManagmentList(FactoryManagmentData.data.data));
      } else {
        Swal.fire({
          icon: "error",
          title: "  عدم دريافت اطلاعات  ",
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

export const addfactory = createAsyncThunk(
  "userManagement/fetchdata",

  async ({ data }, { dispatch }) => {
    try {
      const FactoryManagmentData = await addfactorymanagment(data);

      if (FactoryManagmentData.status === 200) {
        SuccessMessage(FactoryManagmentData.data.message);
        dispatch(fetchdata());
      } else {
        Swal.fire({
          icon: "error",
          title: "  عدم دريافت اطلاعات  ",
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

export const editfactory = createAsyncThunk(
  "userManagement/fetchdata",

  async ({ data, id }, { dispatch }) => {
    try {
      const FactoryManagmentData = await editfactorymanagment(data, id);

      if (FactoryManagmentData.status === 200) {
        SuccessMessage(FactoryManagmentData.data.message);

        dispatch(fetchdata());
      } else {
        Swal.fire({
          icon: "error",
          title: "  عدم دريافت اطلاعات  ",
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
