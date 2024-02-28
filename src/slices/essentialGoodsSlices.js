import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { errorMessage, successMessage } from "../utils/toast";
import {
  editessentialgoods,
  essentialgoodsadd,
  getessentialgoods,
} from "../services/authServices";

const initialState = {
  essentialGoodsList: [],
  essentialGoodsCurrentUser: "",
  //modal
  essentialGoodsEditModal: false,
  essentialGoodsAddmodal: false,
  countryoforigin: "",
  sort: "",
  firmorigin: "",
  type: "",
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
      return { ...state, essentialGoodsList: payload };
    },

    RsetessentialGoodsUserName: (state, { payload }) => {
      return { ...state, essentialGoodstUserName: payload };
    },
    RsetessentialGoodsCurrentUser: (state, { payload }) => {
      return { ...state, essentialGoodsCurrentUser: payload };
    },
    // -------------------------------modal--------------------------------------
    RsetessentialGoodscountryoforigin: (state, { payload }) => {
      return { ...state, countryoforigin: payload };
    },
    RsetessentialGoodssort: (state, { payload }) => {
      return { ...state, sort: payload };
    },

    RsetessentialGoodsfirmorigin: (state, { payload }) => {
      return { ...state, firmorigin: payload };
    },

    RsetessentialGoodstype: (state, { payload }) => {
      return { ...state, type: payload };
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
  RsetessentialGoodsUserName,
  RsetessentialGoodsCurrentUser,
  RsetessentialGoodsEditModal,
  RsetessentialGoodsAddmodal,
  RsetessentialGoodscountryoforigin,
  RsetessentialGoodssort,
  RsetessentialGoodsfirmorigin,
  RsetessentialGoodstype,
} = essentialGoodsSlices.actions;

export const selectessentialGoodsList = (state) =>
  state.essentialGoods.essentialGoodsList;
export const selectessentialGoodsUserName = (state) =>
  state.essentialGoods.essentialGoodsUserName;
export const selectessentialGoodsCurrentUser = (state) =>
  state.essentialGoods.essentialGoodsCurrentUser;
// ---------------------------------------------------------------
export const selectessentialGoodscountryoforigin = (state) =>
  state.essentialGoods.countryoforigin;
export const selectessentialGoodssort = (state) => state.essentialGoods.sort;

export const selectessentialGoodsfirmorigin = (state) =>
  state.essentialGoods.firmorigin;

export const selectessentialGoodstype = (state) => state.essentialGoods.type;

// -----------------------------------------------------------------
export const selectessentialGoodsEditModal = (state) =>
  state.essentialGoods.essentialGoodsEditModal;
export const selectessentialGoodsAddmodal = (state) =>
  state.essentialGoods.essentialGoodsAddmodal;

export default essentialGoodsSlices.reducer;
// ------------------------------------------------------handle api
export const fetchessentialgoodlist = createAsyncThunk(
  "userManagement/fetchessentialgoodlist",

  async (obj, { dispatch }) => {
    try {
      const getuser = await getessentialgoods();
      console.log(getuser);

      if (getuser.status === 200) {
        dispatch(RsetessentialGoodsList(getuser.data.data));
      } else {
        errorMessage("عدم دريافت اطلاعات");
      }
    } catch (ex) {
      console.log(ex);
    }
  }
);
// export const deleteessentialgoodlist = createAsyncThunk(
//   "userManagement/deleteessentialgoodlist",

//   async (value, { dispatch }) => {
//     try {
//       const deleteuserlist = await deleteessentialgood(value);
//       dispatch(fetchessentialgoodlistList());
//     } catch (ex) {
//       console.log("عدم دريافت اطلاعات");
//     }
//   }
// );
export const editessentialgood = createAsyncThunk(
  "userManagement/editessentialgood",

  async (value, { dispatch }) => {
    try {
      const editusers = await editessentialgoods(value);
      dispatch(fetchessentialgoodlist());
    } catch (ex) {
      console.log("عدم دريافت اطلاعات");
    }
  }
);
export const addessentialgood = createAsyncThunk(
  "userManagement/addessentialgood",

  async (value, { dispatch }) => {
    try {
      console.log(value);
      const adduserdata = await essentialgoodsadd(value);
      dispatch(fetchessentialgoodlist());
    } catch (ex) {
      console.log("عدم دريافت اطلاعات");
    }
  }
);
