import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { errorMessage, successMessage } from "../utils/toast";

const initialState = {
  userManagmentList: [],
  userManagmentUserName: "",
  userManagmentCurrentUser: "",
  //modal
  userManagmentEditModal: false,
  userManagmentAddmodal: false,
  userManagmentDeleteModal: false,
  userManagmentLastName: "",
  userManagmentFirstName: "",
  userManagmentAccess: [],
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

const userManagmentSlices = createSlice({
  name: "userManagment",
  initialState,
  reducers: {
    RsetUserManagmentList: (state, { payload }) => {
      return { ...state, userManagmentList: payload };
    },
    RsetUserManagmentFirstName: (state, { payload }) => {
      return { ...state, userManagmentFirstName: payload };
    },
    RsetUserManagmentLastName: (state, { payload }) => {
      return { ...state, userManagmentLastName: payload };
    },
    RsetUserManagmentUserName: (state, { payload }) => {
      return { ...state, userMangmentUserName: payload };
    },

    RsetUserManagmentAccess: (state, { payload }) => {
      return { ...state, userManagmentAccess: payload };
    },

    RsetUserManagmentCurrentUser: (state, { payload }) => {
      return { ...state, userManagmentCurrentUser: payload };
    },

    RsetUserManagmentEditModal: (state, { payload }) => {
      return { ...state, userManagmentEditModal: payload };
    },

    RsetuserManagmentAddmodal: (state, { payload }) => {
      return { ...state, userManagmentAddmodal: payload };
    },
    RsetuserManagmentDeleteModal: (state, { payload }) => {
      return { ...state, userManagmentDeleteModal: payload };
    },
  },
});

export const {
  RsetUserManagmentList,
  RsetUserManagmentFirstName,
  RsetUserManagmentLastName,
  RsetUserManagmentUserName,
  RsetUserManagmentCurrentUser,
  RsetUserManagmentEditModal,
  RsetuserManagmentAddmodal,
  RsetUserManagmentAccess,
  RsetuserManagmentDeleteModal,
} = userManagmentSlices.actions;

export const selectUserManagmentList = (state) =>
  state.userManagment.userManagmentList;
export const selectUserManagmentFirstName = (state) =>
  state.userManagment.userManagmentFirstName;
export const selectUserManagmentLastName = (state) =>
  state.userManagment.userManagmentLastName;
export const selectUserManagmentUserName = (state) =>
  state.userManagment.userManagmentUserName;
export const selectUserManagmentCurrentUser = (state) =>
  state.userManagment.userManagmentCurrentUser;
export const selectUserManagmentEditModal = (state) =>
  state.userManagment.userManagmentEditModal;
export const selectuserManagmentAddmodal = (state) =>
  state.userManagment.userManagmentAddmodal;
export const selectuserManagmentAccess = (state) =>
  state.userManagment.userManagmentAccess;
export const selectuserManagmentDeleteModal = (state) =>
  state.userManagment.userManagmentDeleteModal;

export default userManagmentSlices.reducer;
