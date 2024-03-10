import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { errorMessage, successMessage } from "../utils/toast";
import {
  addfurnacepart,
  editfurnacepart,
  getFurancePart,
} from "../services/authServices";
import Swal from "sweetalert2";

const initialState = {
  FurnaceDistributeList: [],
  FurnaceDistributeUserName: "",
  FurnaceDistributeCurrentUser: "",
  //modal
  FurnaceDistributeEditModal: false,
  FurnaceDistributeAddmodal: false,
  FurnaceDistributeType: "",
  FurnaceDistributeSection: "",
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

const FurnaceDistributeSlices = createSlice({
  name: "FurnaceDistribute",
  initialState,
  reducers: {
    RsetFurnaceDistributeList: (state, { payload }) => {
      return { ...state, FurnaceDistributeList: payload };
    },
    RsetFurnaceDistributeSection: (state, { payload }) => {
      return { ...state, FurnaceDistributeSection: payload };
    },
    RsetFurnaceDistributeType: (state, { payload }) => {
      return { ...state, FurnaceDistributeType: payload };
    },
    RsetFurnaceDistributeUserName: (state, { payload }) => {
      return { ...state, userMangmentUserName: payload };
    },

    RsetFurnaceDistributeCurrentUser: (state, { payload }) => {
      return { ...state, FurnaceDistributeCurrentUser: payload };
    },

    RsetFurnaceDistributeEditModal: (state, { payload }) => {
      return { ...state, FurnaceDistributeEditModal: payload };
    },

    RsetFurnaceDistributeAddmodal: (state, { payload }) => {
      return { ...state, FurnaceDistributeAddmodal: payload };
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchfurancepart.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchfurancepart.fulfilled, (state, action) => {
          state.loading = false;
        })
        .addCase(fetchfurancepart.rejected, (state) => {
          state.loading = false;
          // Handle rejection if needed
        });
    },
  },
});

export const {
  RsetFurnaceDistributeList,
  RsetFurnaceDistributeSection,
  RsetFurnaceDistributeType,
  RsetFurnaceDistributeUserName,
  RsetFurnaceDistributeCurrentUser,
  RsetFurnaceDistributeEditModal,
  RsetFurnaceDistributeAddmodal,
} = FurnaceDistributeSlices.actions;

export const selectFurnaceDistributeList = (state) =>
  state.FurnaceDistribute.FurnaceDistributeList;
export const selectFurnaceDistributeSection = (state) =>
  state.FurnaceDistribute.FurnaceDistributeSection;
export const selectFurnaceDistributeType = (state) =>
  state.FurnaceDistribute.FurnaceDistributeType;
export const selectFurnaceDistributeUserName = (state) =>
  state.FurnaceDistribute.FurnaceDistributeUserName;
export const selectFurnaceDistributeCurrentUser = (state) =>
  state.FurnaceDistribute.FurnaceDistributeCurrentUser;
export const selectFurnaceDistributeEditModal = (state) =>
  state.FurnaceDistribute.FurnaceDistributeEditModal;
export const selectFurnaceDistributeAddmodal = (state) =>
  state.FurnaceDistribute.FurnaceDistributeAddmodal;

export const selectloading = (state) => state.FurnaceDistribute.loading;

export default FurnaceDistributeSlices.reducer;

// -----------------------------------------------firancepart
export const fetchfurancepart = createAsyncThunk(
  "FurnaceDistribute/fetchdata",

  async (obj, { dispatch }) => {
    try {
      const furnacePartGetData = await getFurancePart();
      console.log(furnacePartGetData);
      if (furnacePartGetData.status === 200) {
        dispatch(RsetFurnaceDistributeList(furnacePartGetData.data.data));
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

export const editfurnaceparts = createAsyncThunk(
  "FurnaceDistribute/editfurnaceparts",

  async ({ data, id }, { dispatch }) => {
    try {
      const furancesaddevent = await editfurnacepart(data, id);
      if (furancesaddevent.status === 200) {
        dispatch(fetchfurancepart());
      } else {
        Swal.fire({
          icon: "error",
          title: "  اطلاعاتي يافت نشد ",
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

export const addfurnaceparts = createAsyncThunk(
  "FurnaceDistribute/addfurnaceparts",

  async ({ data }, { dispatch }) => {
    try {
      const furancesaddevent = await addfurnacepart(data);
      if (furancesaddevent.status === 200) {
        dispatch(fetchfurancepart());
      } else {
        Swal.fire({
          icon: "error",
          title: "  اطلاعاتي يافت نشد ",
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
