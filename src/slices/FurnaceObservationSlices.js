import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SuccessMessage, errorMessage, successMessage } from "../utils/toast";
import {
  adddimention,
  addfurnaceevent,
  addrow,
  dashboardget,
  deletematerial,
  editfurnaceevent,
  finalevent,
  getfiuranceaddrowmaterial,
  getfiuranceaddrowpart,
  getsubtableimg,
  newadddimentions,
  uploadephoto,
  uploadephotosubtable,
} from "../services/authServices";
import { getsinglefurance } from "./Dashboard";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

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
  currenfurnaceid: "",

  persianCalender: {},
  persianCalenderEnd: {},
  // -------------------------edit event
  furnaceEventEditModal: false,
  furnaceEventEditCurrentRow: "",

  // ----------add row modal
  addrowmodal: false,
  section: "",
  material: "",
  totaltonnage: "",
  // -----------------------display picture in buttom table
  displayPictureModal: false,
  listOfSubPic: [],

  // ------------------add dimention
  AddDimentionModal: false,
  FireProofModel: "",
  Number: "",
  furenceObserEvents: [],
  currentmaterial: "",
  listReloader: false,
  // -----------------Uploade photo-------------------
  uploadPhotoCurrentRow: [],
  uploadPhotoModal: false,
  uploadPhotoDes: "",
  uploadPic: "",
  // ------------------------------upload photo buttom table

  uploadPhotoSubTable: false,
  uploadPhotoSubTableCurrentUser: [],
  uploadPhotoSubTablePic: "",

  // ----------------add new dimention
  addDimentionModal: false,

  DimentionData: { length: "", width: "", height: "" },

  dimentionHight: "",
  dimentionwidth: "",
  dimentionLenght: "",

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

const FurnaceObservationSlices = createSlice({
  name: "FurnaceObservation",
  initialState,
  reducers: {
    RsetDashboardList: (state, { payload }) => {
      return { ...state, FurnaceObservationsList: payload };
    },
    Rsetcurrenfurnaceid: (state, { payload }) => {
      return { ...state, currenfurnaceid: payload };
    },
    // ---------------------------event edit modal
    RsetfurnaceEventEditModal: (state, { payload }) => {
      return { ...state, furnaceEventEditModal: payload };
    },
    RsetfurnaceEventEditCurrentRow: (state, { payload }) => {
      return { ...state, furnaceEventEditCurrentRow: payload };
    },
    // --------------------------------display pic in buttom table
    RsetuploadPhotoSubTableCurrentUser: (state, { payload }) => {
      return { ...state, uploadPhotoSubTableCurrentUser: payload };
    },

    RsetlistOfSubPic: (state, { payload }) => {
      return { ...state, listOfSubPic: payload };
    },

    // -------------------------------------------------

    RsetuploadPhotoSubTable: (state, { payload }) => {
      return { ...state, uploadPhotoSubTable: payload };
    },

    RsetuploadPhotoSubTable: (state, { payload }) => {
      return { ...state, uploadPhotoSubTable: payload };
    },

    RsetuploadPhotoSubTablePic: (state, { payload }) => {
      return { ...state, uploadPhotoSubTablePic: payload };
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
    RsetFurnaceObservationpersianCalender: (state, { payload }) => {
      return { ...state, persianCalender: payload };
    },
    RsetFurnaceObservationpersianCalenderEnd: (state, { payload }) => {
      return { ...state, persianCalenderEnd: payload };
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
    RsetFurnaceObservationAddDimentioncurrentmaterial: (state, { payload }) => {
      return { ...state, currentmaterial: payload };
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
    // ---------------------------------------------add dimention

    RsetaddDimentionModal: (state, { payload }) => {
      return { ...state, addDimentionModal: payload };
    },
    RsetaddEventModal: (state, { payload }) => {
      return { ...state, addEventModal: payload };
    },
    RsetdimentionHight: (state, { payload }) => {
      return { ...state, dimentionHight: payload };
    },
    Rsetdimentionwidth: (state, { payload }) => {
      return { ...state, dimentionwidth: payload };
    },
    RsetdimentionLenght: (state, { payload }) => {
      return { ...state, dimentionLenght: payload };
    },
    RsetDimentionData: (state, { payload }) => {
      return { ...state, DimentionData: payload };
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
  RsetFurnaceObservationAddDimentioncurrentmaterial,
  Rsetcurrenfurnaceid,
  RsetFurnaceObservationpersianCalender,
  RsetFurnaceObservationpersianCalenderEnd,
  RsetaddEventModal,
  RsetaddDimentionModal,
  RsetdimentionHight,
  Rsetdimentionwidth,
  RsetdimentionLenght,
  RsetDimentionData,
  RsetfurnaceEventEditModal,
  RsetfurnaceEventEditCurrentRow,
  RsetdisplayPictureModal,
  RsetuploadPhotoSubTable,
  RsetuploadPhotoSubTableCurrentUser,
  RsetuploadPhotoSubTablePic,
  RsetlistOfSubPic,
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
export const selectFurnaceObservationcurrenfurnaceid = (state) =>
  state.FurnaceObservation.currenfurnaceid;
export const selectFurnaceObservationpersianCalender = (state) =>
  state.FurnaceObservation.persianCalender;
export const selectFurnaceObservationpersianCalenderEnd = (state) =>
  state.FurnaceObservation.persianCalenderEnd;
// --------------------------------------display pic

export const selectFurnaceObservationdisplayPictureModal = (state) =>
  state.FurnaceObservation.displayPictureModal;

export const selectlistOfSubPic = (state) =>
  state.FurnaceObservation.listOfSubPic;
// ------------------------------------------upload photo buttom table

export const selectuploadPhotoSubTable = (state) =>
  state.FurnaceObservation.uploadPhotoSubTable;

export const selectuploadPhotoSubTableCurrentUser = (state) =>
  state.FurnaceObservation.uploadPhotoSubTableCurrentUser;

export const selectuploadPhotoSubTablePic = (state) =>
  state.FurnaceObservation.uploadPhotoSubTablePic;

// ------------------------------------------------edit event

export const selectFurnaceObservationfurnaceEventEditModal = (state) =>
  state.FurnaceObservation.furnaceEventEditModal;
export const selectfurnaceEventEditCurrentRow = (state) =>
  state.FurnaceObservation.furnaceEventEditCurrentRow;

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
export const selectFurnaceObservationcurrentmaterial = (state) =>
  state.FurnaceObservation.currentmaterial;
// ------------------------------------upload photo
export const selectuploadPhotoDes = (state) =>
  state.FurnaceObservation.uploadPhotoDes;
export const selectuploadPic = (state) => state.FurnaceObservation.uploadPic;

export const selectuploadPhotoModal = (state) =>
  state.FurnaceObservation.uploadPhotoModal;
export const selectuploadPhotoCurrentRow = (state) =>
  state.FurnaceObservation.uploadPhotoCurrentRow;

// -----------------------------------------add dimention

export const selectaddDimentionModal = (state) =>
  state.FurnaceObservation.addDimentionModal;
export const selectaddEventModal = (state) =>
  state.FurnaceObservation.addEventModal;
export const selectdimentionHight = (state) =>
  state.FurnaceObservation.dimentionHight;
export const selectdimentionwidth = (state) =>
  state.FurnaceObservation.dimentionwidth;
export const selectdimentionLenght = (state) =>
  state.FurnaceObservation.dimentionLenght;

export const selectDimentionData = (state) =>
  state.FurnaceObservation.DimentionData;

export default FurnaceObservationSlices.reducer;

// ---------------------------managing apis

export const finalingevent = createAsyncThunk(
  "FurnaceObservation/finalingevent",

  async (value, { dispatch }) => {
    try {
      const finalevents = await finalevent(value);

      if (finalevents.status === 200) {
        SuccessMessage(finalevents.data.message);
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

export const addevents = createAsyncThunk(
  "Dashboard/addevents",

  async ({ data, id }, { dispatch }) => {
    try {
      const furancesaddevent = await addfurnaceevent(data);
      if (furancesaddevent.status === 200) {
        SuccessMessage(furancesaddevent.data.message);
        dispatch(getsinglefurance(id));
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
export const editevents = createAsyncThunk(
  "Dashboard/addevents",

  async ({ data, id, oid }, { dispatch }) => {
    try {
      const furanceseditevent = await editfurnaceevent(data, oid);
      console.log(oid);
      if (furanceseditevent.status === 200) {
        SuccessMessage(furanceseditevent.data.message);
        dispatch(getsinglefurance(id));
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

export const addphoto = createAsyncThunk(
  "Dashboard/addevents",

  async ({ data, id, token }, { dispatch }) => {
    try {
      const furancesaddphoto = await uploadephoto(data, token);
      if (furancesaddphoto.status === 200) {
        SuccessMessage(furancesaddphoto.data.message);
        dispatch(getsinglefurance(id));
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

export const addphotosubtable = createAsyncThunk(
  "FurnaceObservationSlices/addphotosubtable",

  async ({ data, id }, { dispatch }) => {
    try {
      const furancesaddphoto = await uploadephotosubtable(data);
      if (furancesaddphoto.status === 200) {
        SuccessMessage(furancesaddphoto.data.message);
        dispatch(getsinglefurance(id));
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

export const deletematerials = createAsyncThunk(
  "userManagement/deletematerials",

  async ({ itemId, furnaceId }, { dispatch }) => {
    try {
      const deleteuserlist = await deletematerial(itemId);
      if (deleteuserlist.status == 200) {
        SuccessMessage(deleteuserlist.data.message);
        dispatch(getsinglefurance(furnaceId));
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

export const fetchMaterialFurnaceSection = createAsyncThunk(
  "FurnaceObservationSlices/fetchMaterialFurnaceSection",

  async ({ dispatch }) => {
    try {
      const getpart = await getfiuranceaddrowpart();

      if (getpart.status === 200) {
        dispatch(RsetFurnaceObservationsection(getpart.data.data));
      } else {
        errorMessage("عدم دريافت اطلاعات");
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "   عدم دريافت اطلاعات  ",
      });
    }
  }
);

export const fetchMaterialFurnacematerial = createAsyncThunk(
  "FurnaceObservationSlices/fetchMaterialFurnacematerial",

  async ({ dispatch }) => {
    try {
      const getmaterial = await getfiuranceaddrowmaterial();

      if (getmaterial.status === 200) {
        dispatch(RsetFurnaceObservationmaterial(getmaterial.data.data));
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

export const adddimentions = createAsyncThunk(
  "FurnaceObservationSlices/adddimentions",

  async ({ data, furnaceId }, { dispatch }) => {
    try {
      const furancesadddimention = await adddimention(data);
      if (furancesadddimention.status === 200) {
        SuccessMessage(furancesadddimention.data.message);
        dispatch(getsinglefurance(furnaceId));
      } else {
        Swal.fire({
          icon: "error",
          title: "   عدم دريافت اطلاعات  ",
        });
      }
      console.log(furancesadddimention);
    } catch {
      Swal.fire({
        icon: "error",
        title: "   عدم دريافت اطلاعات  ",
      });
    }
  }
);

export const addrows = createAsyncThunk(
  "FurnaceObservationSlices/addrows",

  async ({ item, furnaceId }, { dispatch }) => {
    try {
      const furancesaddrow = await addrow(item);

      if (furancesaddrow.status === 200) {
        SuccessMessage(furancesaddrow.data.message);
        dispatch(getsinglefurance(furnaceId));
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

export const addnewdimentionss = createAsyncThunk(
  "FurnaceObservationSlices/addnewdimentionss",

  async ({ data, id }, { dispatch }) => {
    try {
      const furancesaddrow = await newadddimentions(data);

      if (furancesaddrow.status === 200) {
        SuccessMessage(furancesaddrow.data.message);
        dispatch(getsinglefurance(id));
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

export const fetchsubtableimg = createAsyncThunk(
  "FurnaceObservationSlices/fetchMaterialFurnacematerial",

  async (id, { dispatch }) => {
    try {
      const getmaterial = await getsubtableimg(id);

      if (getmaterial.status === 200) {
        dispatch(RsetlistOfSubPic(getmaterial.data.data));
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
