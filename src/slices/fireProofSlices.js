import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { errorMessage, successMessage } from "../utils/toast";
import {
  deletefireproof,
  editfireproof,
  fireproofadd,
  getfireprooflist,
} from "../services/authServices";
import Swal from "sweetalert2";

const initialState = {
  fireProofList: [],
  fireProofCurrentUser: "",
  //modal
  fireProofEditModal: false,
  fireProofAddmodal: false,
  fireProofShapeCode: "",
  category: "",
  weight: "",
  type_name: "",
  a_size: "",
  b_size: "",
  l_size: "",
  h: "",
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

const fireProofSlices = createSlice({
  name: "fireProof",
  initialState,
  reducers: {
    RsetfireProofList: (state, { payload }) => {
      return { ...state, fireProofList: payload };
    },
    RsetfireProofUserName: (state, { payload }) => {
      return { ...state, fireProoftUserName: payload };
    },
    RsetfireProofCurrentUser: (state, { payload }) => {
      return { ...state, fireProofCurrentUser: payload };
    },
    // -------------------------------modal--------------------------------------
    RsetfireProofmodelCode: (state, { payload }) => {
      return { ...state, fireProofShapeCode: payload };
    },
    RsetfireProofsort: (state, { payload }) => {
      return { ...state, category: payload };
    },

    RsetfireProofweight: (state, { payload }) => {
      return { ...state, weight: payload };
    },

    RsetfireProoftype: (state, { payload }) => {
      return { ...state, type_name: payload };
    },

    RsetfireProofa: (state, { payload }) => {
      return { ...state, a_size: payload };
    },

    RsetfireProofb: (state, { payload }) => {
      return { ...state, b_size: payload };
    },

    RsetfireProofI: (state, { payload }) => {
      return { ...state, l_size: payload };
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
    extraReducers: (builder) => {
      builder
        .addCase(fetchfireprooflistList.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchfireprooflistList.fulfilled, (state, action) => {
          state.loading = false;
        })
        .addCase(fetchfireprooflistList.rejected, (state) => {
          state.loading = false;
          // Handle rejection if needed
        });
    },
  },
});

export const {
  RsetfireProofList,
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
export const selectfireProofUserName = (state) =>
  state.fireProof.fireProofUserName;
export const selectfireProofCurrentUser = (state) =>
  state.fireProof.fireProofCurrentUser;
// ---------------------------------------------------------------
export const selectfireProofModelCode = (state) =>
  state.fireProof.fireProofShapeCode;
export const selectfireProofsort = (state) => state.fireProof.category;

export const selectfireProofweight = (state) => state.fireProof.weight;

export const selectfireProoftype = (state) => state.fireProof.type_name;

export const selectfireProofa = (state) => state.fireProof.a_size;

export const selectfireProofb = (state) => state.fireProof.b_size;

export const selectfireProofI = (state) => state.fireProof.l_size;
export const selectfireProofh = (state) => state.fireProof.h;
export const selectloading = (state) => state.fireProof.loading;

// -----------------------------------------------------------------
export const selectfireProofEditModal = (state) =>
  state.fireProof.fireProofEditModal;
export const selectfireProofAddmodal = (state) =>
  state.fireProof.fireProofAddmodal;

export default fireProofSlices.reducer;
// ---------------------------------------------handle api
export const fetchfireprooflistList = createAsyncThunk(
  "userManagement/fetchUserList",

  async (obj, { dispatch }) => {
    try {
      const getuser = await getfireprooflist();

      if (getuser.status === 200) {
        dispatch(RsetfireProofList(getuser.data.data));
      } else {
        Swal.fire({
          icon: "error",
          title: "  عدم دريافت اضلاعات   ",
        });
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "  عدم دريافت اضلاعات   ",
      });
    }
  }
);
export const deletefireprooflist = createAsyncThunk(
  "userManagement/deletefireprooflist",

  async (value, { dispatch }) => {
    try {
      const deleteuserlist = await deletefireproof(value);
      if (deleteuserlist.status === 200) {
        dispatch(fetchfireprooflistList());
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "  عدم دريافت اضلاعات   ",
      });
    }
  }
);
export const editfireproofs = createAsyncThunk(
  "userManagement/editfireproofs",

  async ({ data, id }, { dispatch }) => {
    try {
      const editusers = await editfireproof(data, id);
      if (editusers.status === 200) {
        dispatch(fetchfireprooflistList());
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "  عدم دريافت اضلاعات   ",
      });
    }
  }
);
export const addfireproof = createAsyncThunk(
  "userManagement/addfireproof",

  async (value, { dispatch }) => {
    try {
      console.log(value);
      const adduserdata = await fireproofadd(value);
      if (adduserdata.status === 200) {
        dispatch(fetchfireprooflistList());
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "  عدم دريافت اضلاعات   ",
      });
    }
  }
);
