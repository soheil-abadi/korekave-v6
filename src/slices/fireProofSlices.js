import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { errorMessage, successMessage } from "../utils/toast";

const initialState = {
  fireProofList: [],
  fireProofCurrentUser: "",
  //modal
  fireProofEditModal: false,
  fireProofAddmodal: false,
  modelCode: "",
  sort: "",
  weight: "",
  type: "",
  a: "",
  b: "",
  I: "",
  h: "",
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

const fireProofSlices = createSlice({
  name: "fireProof",
  initialState,
  reducers: {
    RsetfireProofList: (state, { payload }) => {
      return { ...state, fireProoftList: payload };
    },
    RsetfireProofFirstName: (state, { payload }) => {
      return { ...state, fireProoftFirstName: payload };
    },
    RsetfireProofLastName: (state, { payload }) => {
      return { ...state, fireProoftLastName: payload };
    },
    RsetfireProofUserName: (state, { payload }) => {
      return { ...state, fireProoftUserName: payload };
    },
    RsetfireProofCurrentUser: (state, { payload }) => {
      return { ...state, fireProofCurrentUser: payload };
    },
    // -------------------------------modal--------------------------------------
    RsetfireProofmodelCode: (state, { payload }) => {
      return { ...state, modelCode: payload };
    },
    RsetfireProofsort: (state, { payload }) => {
      return { ...state, sort: payload };
    },

    RsetfireProofweight: (state, { payload }) => {
      return { ...state, weight: payload };
    },

    RsetfireProoftype: (state, { payload }) => {
      return { ...state, type: payload };
    },

    RsetfireProofa: (state, { payload }) => {
      return { ...state, a: payload };
    },

    RsetfireProofb: (state, { payload }) => {
      return { ...state, b: payload };
    },

    RsetfireProofI: (state, { payload }) => {
      return { ...state, I: payload };
    },

    RsetfireProofh: (state, { payload }) => {
      return { ...state, h: payload };
    },

    // --------------------------------------------------------------------------------
    RsetfireProofEditModal: (state, { payload }) => {
      return { ...state, fireProofEditModal: payload };
    },

    RsetfireProofAddmodal: (state, { payload }) => {
      return { ...state, fireProofAddmodal: payload };
    },
  },
});

export const {
  RsetfireProofList,
  RsetfireProofFirstName,
  RsetfireProofLastName,
  RsetfireProofUserName,
  RsetfireProofCurrentUser,
  RsetfireProofEditModal,
  RsetfireProofAddmodal,
  RsetfireProofmodelCode,
  RsetfireProofsort,
  RsetfireProofweight,
  RsetfireProoftype,
  RsetfireProofa,
  RsetfireProofb,
  RsetfireProofI,
  RsetfireProofh,
} = fireProofSlices.actions;

export const selectfireProofList = (state) => state.fireProof.fireProofList;
export const selectfireProofFirstName = (state) =>
  state.fireProof.fireProofFirstName;
export const selectfireProofLastName = (state) =>
  state.fireProof.fireProofLastName;
export const selectfireProofUserName = (state) =>
  state.fireProof.fireProofUserName;
export const selectfireProofCurrentUser = (state) =>
  state.fireProof.fireProofCurrentUser;
// ---------------------------------------------------------------
export const selectfireProofModelCode = (state) => state.fireProof.modelCode;
export const selectfireProofsort = (state) => state.fireProof.sort;

export const selectfireProofweight = (state) => state.fireProof.weight;

export const selectfireProoftype = (state) => state.fireProof.type;

export const selectfireProofa = (state) => state.fireProof.a;

export const selectfireProofb = (state) => state.fireProof.b;

export const selectfireProofI = (state) => state.fireProof.I;
export const selectfireProofh = (state) => state.fireProof.h;

// -----------------------------------------------------------------
export const selectfireProofEditModal = (state) =>
  state.fireProof.fireProofEditModal;
export const selectfireProofAddmodal = (state) =>
  state.fireProof.fireProofAddmodal;

export default fireProofSlices.reducer;
