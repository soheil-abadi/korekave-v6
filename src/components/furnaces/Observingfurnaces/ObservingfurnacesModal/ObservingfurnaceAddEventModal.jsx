import React, { useEffect, useState } from "react";
import { Modal, Button, ConfigProvider, DatePicker } from "antd";
import fa_IR from "antd/lib/locale/fa_IR";
import { useSelector, useDispatch } from "react-redux";
import moment from "jalali-moment";
import faIR from "antd/lib/locale/fa_IR";

import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { FormControl } from "react-bootstrap";
import {
  RsetFurnaceObservationDateOfEnd,
  RsetFurnaceObservationDateOfStart,
  RsetFurnaceObservationDescriptionP,
  RsetFurnaceObservationEnteryType,
  RsetFurnaceObservationEventName,
  RsetFurnaceObservationFormatTabs,
  RsetFurnaceObservationStatusModal,
  RsetFurnaceObservationTypeOfEvent,
  addevent,
  addevents,
  selectFurnaceObservationAddTabs,
  selectFurnaceObservationDateOfEnd,
  selectFurnaceObservationDateOfStart,
  selectFurnaceObservationDescriptionP,
  selectFurnaceObservationEnteryType,
  selectFurnaceObservationEventName,
  selectFurnaceObservationFormatTabs,
  selectFurnaceObservationStatusModal,
  selectFurnaceObservationTypeOfEvent,
  selectFurnaceObservationoveralAddEvent,
} from "../../../../slices/FurnaceObservationSlices";
import { addfurnaceevent } from "../../../../services/authServices";

const ObservingfurnaceAddEventModal = ({ handleOk }) => {
  const enetrydata = ["ساخت ", "تعمير سرد"];
  const dispatch = useDispatch();
  // // -----------------------------------selects
  // const FactoryEditModal = useSelector(selectFactoryEditModal);
  // const factoryVolume = useSelector(selectfactoryVolume);

  // const factorycapicity = useSelector(selectfactorycapicity);

  // const factorytype = useSelector(selectfactorytype);

  // const factoryWorkingVolume = useSelector(selectfactoryWorkingVolume);

  // const tfactorysname = useSelector(selectfactorysname);

  // const enteryType = useSelector(selectenteryType);
  // const surfaceofmaterial = useSelector(selectsurfaceofmaterial);

  // const handlecancelmodal = () => {
  //   dispatch(RsetfactoryEditModal(false));
  // };

  //   -----------------------------handeling modal selectors
  //   const UserManagmentFirstName = useSelector(selectUserManagmentFirstName);
  //   const UserManagmentLastName = useSelector(selectUserManagmentLastName);
  //   const userManagmentAccess = useSelector(selectuserManagmentAccess);
  //   const userManagmentEditModal = useSelector(selectUserManagmentEditModal);
  //   const userManagmentCurrentUser = useSelector(selectUserManagmentCurrentUser);
  //   const UserManagmentPassword = useSelector(selectUserManagmentPassword);
  //   const UserManagmentUserName = useSelector(selectUserManagmentUserName);

  // -----------------------------------------------
  //   useEffect(() => {
  //     dispatch(RsetUserManagmentFirstName(userManagmentCurrentUser.first_name));
  //     dispatch(RsetUserManagmentLastName(userManagmentCurrentUser.last_name));
  //     dispatch(RsetUserManagmentAccess(userManagmentCurrentUser.user_access));
  //     dispatch(RsetUserManagmentUserName(userManagmentCurrentUser.username));
  //     dispatch(RsetUserManagmentPassword(userManagmentCurrentUser.password));
  //   }, [userManagmentCurrentUser]);
  // -----------------------------------------------------

  // Define all possible access options

  //   const handleAccessChange = (accessItemId) => {
  //     if (userManagmentAccess.some((item) => item._id === accessItemId)) {
  //       console.log(accessItemId);
  //       dispatch(
  //         RsetUserManagmentAccess(
  //           userManagmentAccess.filter((item) => item._id !== accessItemId)
  //         )
  //       );
  //     } else {
  //       const updatedAccess = [
  //         ...userManagmentAccess,
  //         allAccessOptions.find((item) => item._id === accessItemId),
  //       ];
  //       dispatch(RsetUserManagmentAccess(updatedAccess));
  //     }
  //   };

  //   const handleModalCancel = () => {
  //     dispatch(RsetUserManagmentEditModal(false));
  //   };
  //   console.log(userManagmentAccess);
  //   const handleModalEdit = async () => {
  //     // Dispatch an action to set loading state or any indication that the request is in progress
  //     // For example: dispatch(setLoading(true));

  //     // Make the API call to add the user
  //     const userValues = {
  //       first_name: UserManagmentFirstName,
  //       last_name: UserManagmentLastName,
  //       username: UserManagmentUserName,
  //       user_access: userManagmentAccess,
  //     };
  //     dispatch(editusers(userValues));
  //     console.log(userValues);
  //     const editUserRes = await edituser(userValues);
  //     dispatch(RsetUserManagmentEditModal(false));
  //   };

  const handlecancelmodal = () => {
    dispatch(RsetFurnaceObservationStatusModal(false));
  };

  const handleَAddEvent = () => {
    const eventdata = {
      name: FurnaceObservationStatusEventName,
      begin_date: FurnaceObservationStatusDateOfStart,
      end_date: FurnaceObservationStatusDateOfEnd,
      event_type: FurnaceObservationStatusTypeOfEvent,
      description: FurnaceObservationDescriptionP,
    };
    console.log(eventdata);
    dispatch(addevents(eventdata));

    dispatch(RsetFurnaceObservationStatusModal(false));
  };

  const modalStyles = {
    header: {
      background: "gray",
      padding: "20px",
    },
    body: {
      borderRadius: 5,
      marginTop: "20px",
    },
    mask: {
      backdropFilter: "blur(10px)",
    },
    footer: {
      borderTop: "1px solid gray",
      marginTop: "20px",
      padding: "20px",
    },
    content: {
      boxShadow: "0 0 30px #999",
    },
  };
  const FurnaceObservationStatusModal = useSelector(
    selectFurnaceObservationStatusModal
  );
  const FurnaceObservationStatusDateOfEnd = useSelector(
    selectFurnaceObservationDateOfEnd
  );

  const FurnaceObservationStatusEventName = useSelector(
    selectFurnaceObservationEventName
  );

  const FurnaceObservationStatusDateOfStart = useSelector(
    selectFurnaceObservationDateOfStart
  );
  const FurnaceObservationDescriptionP = useSelector(
    selectFurnaceObservationDescriptionP
  );
  const FurnaceObservationEnteryType = useSelector(
    selectFurnaceObservationEnteryType
  );

  const FurnaceObservationStatusTypeOfEvent = useSelector(
    selectFurnaceObservationTypeOfEvent
  );
  const FurnaceObservationStatusAddTabs = useSelector(
    selectFurnaceObservationAddTabs
  );

  const formattabs = useSelector(selectFurnaceObservationFormatTabs);

  return (
    <ConfigProvider direction="rtl" locale={fa_IR}>
      <Modal
        title={`ویرایش كوره `}
        open={FurnaceObservationStatusModal}
        styles={modalStyles}
        closable={false}
        onOk={handlecancelmodal}
        onCancel={handlecancelmodal}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <div className="bottom-modal d-flex justify-content-between align-items-center gap-3 w-100">
              <Button
                style={{ background: "red", color: "white" }}
                size="large"
                onClick={() => handlecancelmodal()}
              >
                لغو
              </Button>
              <Button
                className="w-100"
                variant="outlined"
                type="primary"
                color="primary"
                size="large"
                onClick={() => handleَAddEvent()}
              >
                اضافه كردن رويداد
              </Button>
            </div>
          </>
        )}
      >
        <form>
          <Box>
            <InputLabel className="fw-bold fs-5">نام رویداد </InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) => {
                dispatch(RsetFurnaceObservationEventName(e.target.value));
              }}
            />
          </Box>

          <DatePicker
            className="my-3 p-3"
            placeholder="تاريخ شروع"
            style={{ width: "100%" }} // You can adjust the width according to your UI
            onChange={(e) => {
              dispatch(RsetFurnaceObservationDateOfStart(e.$d));
            }}
          />

          <Box>
            <DatePicker
              className="my-3 p-3"
              placeholder="تاريخ پايان"
              style={{ width: "100%" }} // You can adjust the width according to your UI
              onChange={(e) => {
                dispatch(RsetFurnaceObservationDateOfEnd(e.$d));
              }}
            />
          </Box>
          <Box>
            <InputLabel
              className="fw-bold fs-5"
              id="demo-simple-select-standard-label"
            >
              نوع رویداد
            </InputLabel>
            <Select
              className="w-100  "
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              label={"نوع رويداد"}
              onChange={(e) => {
                dispatch(RsetFurnaceObservationTypeOfEvent(e.target.value));
              }}
            >
              {enetrydata &&
                enetrydata.map((item, index) => (
                  <MenuItem className="text-center w-100 m-auto" key={index}>
                    {item}
                  </MenuItem>
                ))}
            </Select>
            <TextField
              className="w-100 my-3 text-center h-50 p-2 "
              id="outlined-multiline-static"
              label="توضيحات"
              multiline
              rows={4}
              variant="outlined"
              onChange={(e) => {
                dispatch(RsetFurnaceObservationDescriptionP(e.target.value));
              }}
            />
          </Box>
        </form>
      </Modal>
    </ConfigProvider>
  );
};

export default ObservingfurnaceAddEventModal;
