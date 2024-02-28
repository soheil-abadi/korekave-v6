import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { errorMessage, successMessage } from "../utils/toast";
import {
  addfurnaceevent,
  dashboardget,
  finalevent,
} from "../services/authServices";
import { getsinglefurance } from "./Dashboard";

const initialState = {
  FurnaceObservationsList: [],
  FurnaceObservationStatusModal: false,
  EventName: "",
  DateOfStart: "",
  DateOfEnd: "",
  TypeOfEvent: "",
  DescriptionP: "",
  AddTabs: [],
  FormatTabs: {},
  EnteryType: "",

  // ----------add row modal
  addrowmodal: false,
  section: "",
  material: "",
  totaltonnage: "",

  // ------------------add dimention
  AddDimentionModal: false,
  FireProofModel: "",
  Number: "",
  furenceObserEvents: [],
  listReloader: false,
  // -----------------Uploade photo-------------------
  uploadPhotoCurrentRow: [],
  uploadPhotoModal: false,
  uploadPhotoDes: "",
  uploadPic: "",
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

const FurnaceObservationSlices = createSlice({
  name: "FurnaceObservation",
  initialState,
  reducers: {
    RsetDashboardList: (state, { payload }) => {
      return { ...state, FurnaceObservationsList: payload };
    },
    // ---------------------add event modal
    RsetFurnaceObservationStatusModal: (state, { payload }) => {
      return { ...state, FurnaceObservationStatusModal: payload };
    },
    RsetFurnaceObservationEventName: (state, { payload }) => {
      return { ...state, EventName: payload };
    },
    RsetFurnaceObservationDateOfStart: (state, { payload }) => {
      return { ...state, DateOfStart: payload };
    },
    RsetFurnaceObservationEnteryType: (state, { payload }) => {
      return { ...state, EnteryType: payload };
    },

    RsetFurnaceObservationTypeOfEvent: (state, { payload }) => {
      return { ...state, TypeOfEvent: payload };
    },
    RsetFurnaceObservationDescriptionP: (state, { payload }) => {
      return { ...state, DescriptionP: payload };
    },
    RsetFurnaceObservationDateOfEnd: (state, { payload }) => {
      return { ...state, DateOfEnd: payload };
    },
    RsetFurnaceObservationAddTabs: (state, { payload }) => {
      return { ...state, AddTabs: payload };
    },
    RsetFurnaceObservationFormatTabs: (state, { payload }) => {
      return { ...state, FormatTabs: payload };
    },
    RsteFurenceObserEvents: (state, { payload }) => {
      return { ...state, furenceObserEvents: payload };
    },

    // ----------------add row modal
    RsetFurnaceObservationaddrowmodal: (state, { payload }) => {
      return { ...state, addrowmodal: payload };
    },
    RsetFurnaceObservationsection: (state, { payload }) => {
      return { ...state, section: payload };
    },
    RsetFurnaceObservationmaterial: (state, { payload }) => {
      return { ...state, material: payload };
    },
    RsetFurnaceObservationtotaltonnage: (state, { payload }) => {
      return { ...state, totaltonnage: payload };
    },
    // ----------------------------add dimention modal

    RsetFurnaceObservationAddDimentionModal: (state, { payload }) => {
      return { ...state, AddDimentionModal: payload };
    },
    RsetFurnaceObservationFireProofModel: (state, { payload }) => {
      return { ...state, FireProofModel: payload };
    },
    RsetFurnaceObservationtotalNumber: (state, { payload }) => {
      return { ...state, Number: payload };
    },
    RsetListReloader: (state, { payload }) => {
      return { ...state, listReloader: payload };
    },

    // ------------------------upload photo
    RsetuploadPhotoDes: (state, { payload }) => {
      return { ...state, uploadPhotoDes: payload };
    },
    RsetuploadPic: (state, { payload }) => {
      return { ...state, uploadPic: payload };
    },
    RsetuploadPhotoModal: (state, { payload }) => {
      return { ...state, uploadPhotoModal: payload };
    },
    RsetuploadPhotoCurrentRow: (state, { payload }) => {
      return { ...state, uploadPhotoCurrentRow: payload };
    },
  },
});

export const {
  RsetDashboardList,
  RsetFurnaceObservationStatusModal,
  RsetFurnaceObservationEventName,
  RsetFurnaceObservationDateOfStart,
  RsetFurnaceObservationTypeOfEvent,
  RsetFurnaceObservationDescriptionP,
  RsetFurnaceObservationDateOfEnd,
  RsetFurnaceObservationAddTabs,
  RsetFurnaceObservationaddrowmodal,
  RsetFurnaceObservationsection,
  RsetFurnaceObservationmaterial,
  RsetFurnaceObservationtotaltonnage,
  RsetFurnaceObservationAddDimentionModal,
  RsetFurnaceObservationFireProofModel,
  RsetFurnaceObservationtotalNumber,
  RsetFurnaceObservationFormatTabs,
  RsteFurenceObserEvents,
  RsetListReloader,
  RsetuploadPhotoDes,
  RsetuploadPic,
  RsetuploadPhotoModal,
  RsetuploadPhotoCurrentRow,
  RsetFurnaceObservationEnteryType,
} = FurnaceObservationSlices.actions;

export const selectFurnaceObservation = (state) =>
  state.FurnaceObservation.FurnaceObservationsList;
export const selectFurnaceObservationStatusModal = (state) =>
  state.FurnaceObservation.FurnaceObservationStatusModal;
export const selectFurnaceObservationEventName = (state) =>
  state.FurnaceObservation.EventName;
export const selectFurnaceObservationDateOfStart = (state) =>
  state.FurnaceObservation.DateOfStart;
export const selectFurnaceObservationTypeOfEvent = (state) =>
  state.FurnaceObservation.TypeOfEvent;
export const selectFurnaceObservationDescriptionP = (state) =>
  state.FurnaceObservation.DescriptionP;
export const selectFurnaceObservationDateOfEnd = (state) =>
  state.FurnaceObservation.DateOfEnd;
export const selectFurnaceObservationAddTabs = (state) =>
  state.FurnaceObservation.AddTabs;
export const selectFurnaceObservationFormatTabs = (state) =>
  state.FurnaceObservation.FormatTabs;
export const selectFurnaceObservationEnteryType = (state) =>
  state.FurnaceObservation.EnteryType;

// ----------------------add row modal
export const selectFurnaceObservationaddrowmodal = (state) =>
  state.FurnaceObservation.addrowmodal;
export const selectFurnaceObservationsection = (state) =>
  state.FurnaceObservation.section;
export const selectFurnaceObservationmaterial = (state) =>
  state.FurnaceObservation.material;
export const selectFurnaceObservationtotaltonnage = (state) =>
  state.FurnaceObservation.totaltonnage;
export const selectFurenceObserEvents = (state) =>
  state.FurnaceObservation.furenceObserEvents;
export const selectListReloader = (state) =>
  state.FurnaceObservation.listReloader;

// ------------------------dimention add modal
export const selectFurnaceObservationAddDimentionModal = (state) =>
  state.FurnaceObservation.AddDimentionModal;
export const selectFurnaceObservatioFireProofModel = (state) =>
  state.FurnaceObservation.FireProofModel;
export const selectFurnaceObservationNumber = (state) =>
  state.FurnaceObservation.Number;
// ------------------------------------upload photo
export const selectuploadPhotoDes = (state) =>
  state.FurnaceObservation.uploadPhotoDes;
export const selectuploadPic = (state) => state.FurnaceObservation.uploadPic;

export const selectuploadPhotoModal = (state) =>
  state.FurnaceObservation.uploadPhotoModal;
export const selectuploadPhotoCurrentRow = (state) =>
  state.FurnaceObservation.uploadPhotoCurrentRow;

export default FurnaceObservationSlices.reducer;

// ---------------------------managing apis

export const finalingevent = createAsyncThunk(
  "FurnaceObservation/finalingevent",

  async (value, { dispatch }) => {
    try {
      const finalevents = await finalevent(value);

      if (finalevents.status === 200) {
      } else {
        errorMessage("عدم دريافت اطلاعات");
      }
    } catch (ex) {
      console.log(ex);
    }
  }
);

export const addevents = createAsyncThunk(
  "Dashboard/addevents",

  async (value, { dispatch }) => {
    try {
      const furancesaddevent = await addfurnaceevent(value);
      console.log(furancesaddevent);
    } catch (ex) {
      console.log(ex);
    }
  }
);
