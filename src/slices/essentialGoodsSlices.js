import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SuccessMessage, errorMessage, successMessage } from "../utils/toast";
import {
  deleteessentialgoods,
  editessentialgoods,
  essentialgoodsadd,
  getessentialgoods,
} from "../services/authServices";
import Swal from "sweetalert2";

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
  loading: false,
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
    extraReducers: (builder) => {
      builder
        .addCase(fetchessentialgoodlist.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchessentialgoodlist.fulfilled, (state, action) => {
          state.loading = false;
        })
        .addCase(fetchessentialgoodlist.rejected, (state) => {
          state.loading = false;
          // Handle rejection if needed
        });
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

export const selectloading = (state) => state.essentialGoods.loading;

export default essentialGoodsSlices.reducer;
// ------------------------------------------------------handle api
export const fetchessentialgoodlist = createAsyncThunk(
  "essentialGoodsSlices/fetchessentialgoodlist",

  async (obj, { dispatch }) => {
    try {
      const getuser = await getessentialgoods();

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
  "essentialGoodsSlices/editessentialgood",

  async ({ data, id }, { dispatch }) => {
    try {
      const editgoods = await editessentialgoods(data, id);
      if (editgoods.status === 200) {
        SuccessMessage(editgoods.data.message);
        dispatch(fetchessentialgoodlist());
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
export const addessentialgood = createAsyncThunk(
  "essentialGoodsSlices/addessentialgood",

  async (value, { dispatch }) => {
    try {
      console.log(value);
      const adduserdata = await essentialgoodsadd(value);
      if (adduserdata.status === 200) {
        SuccessMessage(adduserdata.data.message);
        dispatch(fetchessentialgoodlist());
      } else {
        Swal.fire({
          icon: "error",
          title: "   عدم دريافت اطلاعات  ",
        });
      }
      dispatch(fetchessentialgoodlist());
    } catch {
      Swal.fire({
        icon: "error",
        title: "   عدم دريافت اطلاعات  ",
      });
    }
  }
);

export const deleteessentialgood = createAsyncThunk(
  "essentialGoodsSlicess/deleteessentialgood",

  async (id, { dispatch }) => {
    try {
      const deletegoods = await deleteessentialgoods(id);
      if (deletegoods.status === 200) {
        console.log(deletegoods.data);
        SuccessMessage(deletegoods.data.message);

        dispatch(fetchessentialgoodlist());
      } else {
        Swal.fire({
          icon: "error",
          title: "  خطا حذف انجام نشد",
        });
      }
    } catch (ex) {
      console.log("عدم دريافت اطلاعات");
    }
  }
);
