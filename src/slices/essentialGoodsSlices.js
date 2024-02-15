import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { errorMessage, successMessage } from "../utils/toast";

const initialState = {
  essentialGoodsList: [],
  essentialGoodsCurrentUser: "",
  //modal
  essentialGoodsEditModal: false,
  essentialGoodsAddmodal: false,
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

const essentialGoodsSlices = createSlice({
  name: "essentialGoods",
  initialState,
  reducers: {
    RsetessentialGoodsList: (state, { payload }) => {
      return { ...state, essentialGoodstList: payload };
    },
    RsetessentialGoodsFirstName: (state, { payload }) => {
      return { ...state, essentialGoodstFirstName: payload };
    },
    RsetessentialGoodsLastName: (state, { payload }) => {
      return { ...state, essentialGoodstLastName: payload };
    },
    RsetessentialGoodsUserName: (state, { payload }) => {
      return { ...state, essentialGoodstUserName: payload };
    },
    RsetessentialGoodsCurrentUser: (state, { payload }) => {
      return { ...state, essentialGoodsCurrentUser: payload };
    },
    // -------------------------------modal--------------------------------------
    RsetessentialGoodsmodelCode: (state, { payload }) => {
      return { ...state, modelCode: payload };
    },
    RsetessentialGoodssort: (state, { payload }) => {
      return { ...state, sort: payload };
    },

    RsetessentialGoodsweight: (state, { payload }) => {
      return { ...state, weight: payload };
    },

    RsetessentialGoodstype: (state, { payload }) => {
      return { ...state, type: payload };
    },

    RsetessentialGoodsa: (state, { payload }) => {
      return { ...state, a: payload };
    },

    RsetessentialGoodsb: (state, { payload }) => {
      return { ...state, b: payload };
    },

    RsetessentialGoodsI: (state, { payload }) => {
      return { ...state, I: payload };
    },

    RsetessentialGoodsh: (state, { payload }) => {
      return { ...state, h: payload };
    },

    // --------------------------------------------------------------------------------
    RsetessentialGoodsEditModal: (state, { payload }) => {
      return { ...state, essentialGoodsEditModal: payload };
    },

    RsetessentialGoodsAddmodal: (state, { payload }) => {
      return { ...state, essentialGoodsAddmodal: payload };
    },
  },
});

export const {
  RsetessentialGoodsList,
  RsetessentialGoodsFirstName,
  RsetessentialGoodsLastName,
  RsetessentialGoodsUserName,
  RsetessentialGoodsCurrentUser,
  RsetessentialGoodsEditModal,
  RsetessentialGoodsAddmodal,
  RsetessentialGoodsmodelCode,
  RsetessentialGoodssort,
  RsetessentialGoodsweight,
  RsetessentialGoodstype,
  RsetessentialGoodsa,
  RsetessentialGoodsb,
  RsetessentialGoodsI,
  RsetessentialGoodsh,
} = essentialGoodsSlices.actions;

export const selectessentialGoodsList = (state) =>
  state.essentialGoods.essentialGoodsList;
export const selectessentialGoodsFirstName = (state) =>
  state.essentialGoods.essentialGoodsFirstName;
export const selectessentialGoodsLastName = (state) =>
  state.essentialGoods.essentialGoodsLastName;
export const selectessentialGoodsUserName = (state) =>
  state.essentialGoods.essentialGoodsUserName;
export const selectessentialGoodsCurrentUser = (state) =>
  state.essentialGoods.essentialGoodsCurrentUser;
// ---------------------------------------------------------------
export const selectessentialGoodsModelCode = (state) =>
  state.essentialGoods.modelCode;
export const selectessentialGoodssort = (state) => state.essentialGoods.sort;

export const selectessentialGoodsweight = (state) =>
  state.essentialGoods.weight;

export const selectessentialGoodstype = (state) => state.essentialGoods.type;

export const selectessentialGoodsa = (state) => state.essentialGoods.a;

export const selectessentialGoodsb = (state) => state.essentialGoods.b;

export const selectessentialGoodsI = (state) => state.essentialGoods.I;
export const selectessentialGoodsh = (state) => state.essentialGoods.h;

// -----------------------------------------------------------------
export const selectessentialGoodsEditModal = (state) =>
  state.essentialGoods.essentialGoodsEditModal;
export const selectessentialGoodsAddmodal = (state) =>
  state.essentialGoods.essentialGoodsAddmodal;

export default essentialGoodsSlices.reducer;
