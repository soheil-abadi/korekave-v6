import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { errorMessage, successMessage } from "../utils/toast";
import { dashboardget, editfurnace } from "../services/authServices";

const initialState = {
  factorysList: [],
  factoryEditModal: false,
  factorysname: "",
  factorytype: "",
  factorycapicity: "",
  factoryVolume: "",
  factoryWorkingVolume: "",
  surfaceofmaterial: "",
  canals: "",
  enteryType: "",
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

const factorySlices = createSlice({
  name: "Factory",
  initialState,
  reducers: {
    RsetDashboardList: (state, { payload }) => {
      return { ...state, factorysList: payload };
    },
    RsetfactoryEditModal: (state, { payload }) => {
      return { ...state, factoryEditModal: payload };
    },
    Rsetfactorysname: (state, { payload }) => {
      return { ...state, factorysname: payload };
    },
    Rsetfactorytype: (state, { payload }) => {
      return { ...state, factorytype: payload };
    },
    Rsetfactorycapicity: (state, { payload }) => {
      return { ...state, factorycapicity: payload };
    },
    RsetfactoryVolume: (state, { payload }) => {
      return { ...state, factoryVolume: payload };
    },
    RsetfactoryWorkingVolume: (state, { payload }) => {
      return { ...state, factoryWorkingVolume: payload };
    },
    Rsetcanals: (state, { payload }) => {
      return { ...state, canals: payload };
    },
    RsetenteryType: (state, { payload }) => {
      return { ...state, enteryType: payload };
    },
    Rsetsurfaceofmaterial: (state, { payload }) => {
      return { ...state, surfaceofmaterial: payload };
    },
  },
});

export const {
  RsetDashboardList,
  RsetfactoryEditModal,
  Rsetfactorysname,
  Rsetfactorytype,
  Rsetfactorycapicity,
  RsetfactoryVolume,
  RsetfactoryWorkingVolume,
  Rsetcanals,
  RsetenteryType,
  Rsetsurfaceofmaterial,
} = factorySlices.actions;

export const selectFactory = (state) => state.Factory.factorysList;
export const selectFactoryEditModal = (state) => state.Factory.factoryEditModal;
export const selectfactorysname = (state) => state.Factory.factorysname;

export const selectfactorytype = (state) => state.Factory.factorytype;
export const selectfactorycapicity = (state) => state.Factory.factorycapicity;
export const selectfactoryVolume = (state) => state.Factory.factoryVolume;
export const selectfactoryWorkingVolume = (state) =>
  state.Factory.factoryWorkingVolume;
export const selectsurfaceofmaterial = (state) =>
  state.Factory.surfaceofmaterial;
export const selectcanals = (state) => state.Factory.canals;
export const selectenteryType = (state) => state.Factory.enteryType;

export default factorySlices.reducer;

export const editfurnaces = createAsyncThunk(
  "userManagement/editusers",

  async (token, value, { dispatch }) => {
    try {
      const editusers = await editfurnace(token, value);
    } catch (ex) {
      console.log("عدم دريافت اطلاعات");
    }
  }
);
