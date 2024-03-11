import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SuccessMessage, errorMessage, successMessage } from "../utils/toast";
import {
  adduser,
  deleteUser,
  edituser,
  getUserList,
} from "../services/authServices";

const initialState = {
  userManagmentList: [],

  userManagmentCurrentUser: "",
  //modal
  userManagmentUserName: "",
  userManagmentEditModal: false,
  userManagmentAddmodal: false,
  userManagmentDeleteModal: false,
  userManagmentLastName: "",
  userManagmentFirstName: "",
  userManagmentPassword: "",
  userManagmentAccess: [],
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
      return { ...state, userManagmentUserName: payload };
    },
    RsetUserManagmentPassword: (state, { payload }) => {
      return { ...state, userManagmentPassword: payload };
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
    extraReducers: (builder) => {
      builder
        .addCase(fetchUserList.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchUserList.fulfilled, (state, action) => {
          state.loading = false;
        })
        .addCase(fetchUserList.rejected, (state) => {
          state.loading = false;
          // Handle rejection if needed
        });
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
  RsetUserManagmentPassword,
} = userManagmentSlices.actions;

export const selectUserManagmentList = (state) =>
  state.userManagment.userManagmentList;
export const selectUserManagmentFirstName = (state) =>
  state.userManagment.userManagmentFirstName;
export const selectUserManagmentLastName = (state) =>
  state.userManagment.userManagmentLastName;
export const selectUserManagmentUserName = (state) =>
  state.userManagment.userManagmentUserName;
export const selectUserManagmentPassword = (state) =>
  state.userManagment.userManagmentPassword;
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
export const selectloading = (state) => state.userManagment.loading;

export default userManagmentSlices.reducer;

// ---------------------------------------------handle api
export const fetchUserList = createAsyncThunk(
  "userManagement/fetchUserList",

  async (obj, { dispatch }) => {
    try {
      const getuser = await getUserList();
      console.log(getuser);
      if (getuser.status === 200) {
        dispatch(RsetUserManagmentList(getuser.data));
      } else {
        errorMessage("عدم دريافت اطلاعات");
      }
    } catch (ex) {
      console.log(ex);
    }
  }
);
export const deleteuserlist = createAsyncThunk(
  "userManagement/deleteuserlist",

  async (value, { dispatch }) => {
    try {
      const deleteuserlist = await deleteUser(value);
      if (deleteuserlist.status === 200) {
        SuccessMessage(deleteuserlist.data.message);
        dispatch(fetchUserList());
      }
    } catch (ex) {
      console.log("عدم دريافت اطلاعات");
    }
  }
);
export const editusers = createAsyncThunk(
  "userManagement/editusers",

  async ({ data, id }, { dispatch }) => {
    try {
      const editusers = await edituser(data, id);
      if (editusers.status === 200) {
        SuccessMessage(editusers.data.message);
        dispatch(fetchUserList());
      }
    } catch (ex) {
      console.log("عدم دريافت اطلاعات");
    }
  }
);
export const addusers = createAsyncThunk(
  "userManagement/addusers",

  async (value, { dispatch }) => {
    try {
      const adduserdata = await adduser(value);
      if (adduserdata.status === 200) {
        SuccessMessage(adduserdata.data.message);

        dispatch(fetchUserList());
      }
    } catch (ex) {
      console.log("عدم دريافت اطلاعات");
    }
  }
);
