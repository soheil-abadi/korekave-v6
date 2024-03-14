import React, { useEffect, useState } from "react";
import { Modal, Button, ConfigProvider, DatePicker } from "antd";
import fa_IR from "antd/lib/locale/fa_IR";
import { useSelector, useDispatch } from "react-redux";
import moment from "jalali-moment";

import { DtPicker } from "react-calendar-datetime-picker";

import { Box, InputLabel, MenuItem, Select, TextField } from "@mui/material";

import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { getIdFromUrl } from "../../ObservingFurnaces";
import {
  RsetFurnaceObservationDateOfEnd,
  RsetFurnaceObservationDateOfStart,
  RsetFurnaceObservationDescriptionP,
  RsetFurnaceObservationEventName,
  RsetFurnaceObservationTypeOfEvent,
  RsetaddEventModal,
  addevents,
  selectFurnaceObservationDateOfEnd,
  selectFurnaceObservationDateOfStart,
  selectFurnaceObservationDescriptionP,
  selectFurnaceObservationEventName,
  selectFurnaceObservationTypeOfEvent,
  selectaddEventModal,
} from "../../../../../slices/FurnaceObservationSlices";
import { selectsinglefurances } from "../../../../../slices/Dashboard";

const solarToGregorian = (solarDate) => {
  // Parse the Solar Hijri date using jalali-moment
  const gregorianDate = moment(solarDate, "jYYYY-jMM-jDD");

  // Convert to Gregorian format
  const gregorianDateString = gregorianDate.format("YYYY-MM-DD");

  return gregorianDateString;
};

const NewFactoryFurnaceAddEvent = () => {
  const enetrydata = ["ساخت ", "تعمير سرد"];
  const dispatch = useDispatch();
  const location = useLocation();
  const id = getIdFromUrl(location.pathname);

  const addEventModal = useSelector(selectaddEventModal);

  const handlecancelmodal = () => {
    dispatch(RsetaddEventModal(false));
    dispatch(RsetFurnaceObservationEventName(""));
    dispatch(RsetFurnaceObservationDateOfStart(""));
    dispatch(RsetFurnaceObservationDateOfEnd(""));
    dispatch(RsetFurnaceObservationTypeOfEvent(""));
    dispatch(RsetFurnaceObservationDescriptionP(""));
  };

  const handleَAddEvent = () => {
    const eventdata = {
      name: FurnaceObservationStatusEventName,
      begin_date: FurnaceObservationStatusDateOfStart,
      end_date: FurnaceObservationStatusDateOfEnd,
      event_type: FurnaceObservationStatusTypeOfEvent,
      description: FurnaceObservationDescriptionP,
      furnace_oid: id,
    };
    if (
      FurnaceObservationStatusEventName &&
      FurnaceObservationStatusDateOfEnd &&
      FurnaceObservationStatusTypeOfEvent &&
      FurnaceObservationDescriptionP
    ) {
      dispatch(addevents({ data: eventdata, id: id }));
      dispatch(RsetaddEventModal(false));
      dispatch(RsetFurnaceObservationEventName(""));
      dispatch(RsetFurnaceObservationDateOfStart(""));
      dispatch(RsetFurnaceObservationDateOfEnd(""));
      dispatch(RsetFurnaceObservationTypeOfEvent(""));
      dispatch(RsetFurnaceObservationDescriptionP(""));
    } else {
      Swal.fire({
        icon: "error",
        title: "  مقادير خالي",
        text: " تمامي مقادير بايد پر شود        ",
      });
    }
  };

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
  const singlefurances = useSelector(selectsinglefurances);

  const FurnaceObservationStatusTypeOfEvent = useSelector(
    selectFurnaceObservationTypeOfEvent
  );

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

  return (
    <>
      <ConfigProvider direction="rtl" locale={fa_IR}>
        <Modal
          title={
            <>
              <h3 className="fw-bold "> اضافه كردن رويداد</h3>
            </>
          }
          open={addEventModal}
          styles={modalStyles}
          closable={true}
          onOk={handlecancelmodal}
          footer={(_, { OkBtn, CancelBtn }) => (
            <>
              <div className="bottom-modal d-flex justify-content-between align-items-center gap-3 w-100 flex-row-reverse">
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
              <InputLabel className="fw-bold fs-5 ">نام رویداد </InputLabel>
              <TextField
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => {
                  dispatch(RsetFurnaceObservationEventName(e.target.value));
                }}
              />
            </Box>

            <DtPicker
              inputClass="p-3 text-start mt-2 border"
              placeholder="تاريخ شروع ..."
              onChange={(e) => {
                if (e) {
                  // Convert Solar Hijri date to Gregorian
                  const gregorianDate = solarToGregorian(
                    `${e.year}-${e.month}-${e.day}`
                  );

                  // Dispatch the Gregorian date
                  dispatch(RsetFurnaceObservationDateOfStart(gregorianDate));
                }
              }}
              local="fa"
              showWeekend
            />
            <DtPicker
              inputClass="p-3 text-start mt-2 border"
              placeholder="تاريخ پايان ..."
              onChange={(e) => {
                if (e) {
                  // Convert Solar Hijri date to Gregorian
                  const gregorianDate = solarToGregorian(
                    `${e.year}-${e.month}-${e.day}`
                  );

                  // Dispatch the Gregorian date
                  dispatch(RsetFurnaceObservationDateOfEnd(gregorianDate));
                }
              }}
              local="fa"
              showWeekend
            />

            <Box>
              <InputLabel
                className="fw-bold  fs-5 my-4"
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
                    <MenuItem
                      className="text-center w-100 m-auto"
                      key={index}
                      value={item}
                    >
                      {item}
                    </MenuItem>
                  ))}
              </Select>
            </Box>
            <Box>
              <TextField
                className="w-100 my-3 text-center h-50 p-2  "
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
    </>
  );
};

export default NewFactoryFurnaceAddEvent;
