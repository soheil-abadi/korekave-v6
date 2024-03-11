import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SuccessMessage, errorMessage, successMessage } from "../utils/toast";
import {
  addfurnace,
  dashboardget,
  editfurnace,
  getnewdimention,
} from "../services/authServices";
import { dashboardgetfurances } from "./Dashboard";
import Swal from "sweetalert2";

const initialState = {
  factorysList: [],
  factoryEditModal: false,
  factoryAddModal: false,
  factorysname: "",
  factorytype: "",
  factorycapicity: "",
  factoryVolume: "",
  factoryWorkingVolume: "",
  surfaceofmaterial: "",
  canals: "",
  enteryType: "",
  // --------------adding new factory
  getNewDimention: [],

  addDimentionModal: false,
  addEventModal: false,
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
    RsetfactoryAddModal: (state, { payload }) => {
      return { ...state, factoryAddModal: payload };
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
    RsetgetNewDimention: (state, { payload }) => {
      return { ...state, getNewDimention: payload };
    },
    RsetaddDimentionModal: (state, { payload }) => {
      return { ...state, addDimentionModal: payload };
    },
    RsetgeaddEventModal: (state, { payload }) => {
      return { ...state, addEventModal: payload };
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
  RsetfactoryAddModal,
  RsetgetNewDimention,
  RsetaddDimentionModal,
  RsetgeaddEventModal,
} = factorySlices.actions;

export const selectFactory = (state) => state.Factory.factorysList;
export const selectFactoryEditModal = (state) => state.Factory.factoryEditModal;
export const selectfactoryAddModal = (state) => state.Factory.factoryAddModal;

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
export const selectgetNewDimention = (state) => state.Factory.getNewDimention;
export const selectaddDimentionModal = (state) =>
  state.Factory.addDimentionModal;

export const selectaddEventModal = (state) => state.Factory.addEventModal;

export default factorySlices.reducer;

export const editfurnaces = createAsyncThunk(
  "factory/editfurnaces",

  async ({ data, id }, { dispatch }) => {
    try {
      const editfurnaces = await editfurnace(id, data);
      if (editfurnaces.status !== undefined) {
        SuccessMessage(editfurnaces.data.message);
        dispatch(dashboardgetfurances(id));
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

export const addfurnaces = createAsyncThunk(
  "factory/addfurnaces",

  async ({ data, id }, { dispatch }) => {
    try {
      const postfurance = await addfurnace(data);
      if (postfurance.status === 200) {
        SuccessMessage(postfurance.data.message);
        dispatch(dashboardgetfurances(id));
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

export const getnewdimentions = createAsyncThunk(
  "factory/getnewdimentions",

  async (id, { dispatch }) => {
    try {
      const getDimention = await getnewdimention(id);
      if (getDimention.status === 200) {
        dispatch(RsetgetNewDimention(getDimention.data.data));
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
