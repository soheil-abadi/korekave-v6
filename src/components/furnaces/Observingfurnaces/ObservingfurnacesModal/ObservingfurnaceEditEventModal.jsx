import React, { useEffect, useState } from "react";
import { Modal, Button, ConfigProvider } from "antd";
import fa_IR from "antd/lib/locale/fa_IR";
import { useSelector, useDispatch } from "react-redux";
import moment from "jalali-moment";
import faIR from "antd/lib/locale/fa_IR";
import { DtPicker } from "react-calendar-datetime-picker";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
} from "@mui/material";

import {
  RsetFurnaceObservationDateOfEnd,
  RsetFurnaceObservationDateOfStart,
  RsetFurnaceObservationDescriptionP,
  RsetFurnaceObservationEventName,
  RsetFurnaceObservationTypeOfEvent,
  RsetfurnaceEventEditModal,
  addevents,
  editevents,
  selectFurnaceObservationDateOfEnd,
  selectFurnaceObservationDateOfStart,
  selectFurnaceObservationDescriptionP,
  selectFurnaceObservationEventName,
  selectFurnaceObservationStatusModal,
  selectFurnaceObservationTypeOfEvent,
  selectFurnaceObservationfurnaceEventEditModal,
  selectfurnaceEventEditCurrentRow,
} from "../../../../slices/FurnaceObservationSlices";
import { addfurnaceevent } from "../../../../services/authServices";
import {
  getsinglefurance,
  selectsinglefurances,
} from "../../../../slices/Dashboard";
import { getIdFromUrl } from "../ObservingFurnaces";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import TextArea from "antd/es/input/TextArea";

const solarToGregorian = (solarDate) => {
  // Parse the Solar Hijri date using jalali-moment
  const gregorianDate = moment(solarDate, "jYYYY-jMM-jDD");

  // Convert to Gregorian format
  const gregorianDateString = gregorianDate.format("YYYY-MM-DD");

  return gregorianDateString;
};

const ObservingfurnaceEditEventModal = () => {
  const enetrydata = ["ساخت ", "تعمير سرد"];
  const dispatch = useDispatch();
  const location = useLocation();
  const id = getIdFromUrl(location.pathname);

  const handlecancelmodal = () => {
    dispatch(RsetfurnaceEventEditModal(false));
    dispatch(RsetFurnaceObservationEventName(""));
    dispatch(RsetFurnaceObservationDateOfStart(""));
    dispatch(RsetFurnaceObservationDateOfEnd(""));
    dispatch(RsetFurnaceObservationTypeOfEvent(""));
    dispatch(RsetFurnaceObservationDescriptionP(""));
  };

  const handleَAddEvent = (e) => {
    console.log(e);
    const eventdata = {
      name: FurnaceObservationStatusEventName,
      begin_date: FurnaceObservationStatusDateOfStart,
      end_date: FurnaceObservationStatusDateOfEnd,
      event_type: FurnaceObservationStatusTypeOfEvent,
      description: FurnaceObservationDescriptionP,
    };
    if (eventdata) {
      dispatch(
        editevents({
          data: eventdata,
          id: id,
          oid: furnaceEventEditCurrentRow._id,
        })
      );
      dispatch(RsetFurnaceObservationEventName(""));
      dispatch(RsetFurnaceObservationDateOfStart(""));
      dispatch(RsetFurnaceObservationDateOfEnd(""));
      dispatch(RsetFurnaceObservationTypeOfEvent(""));
      dispatch(RsetFurnaceObservationDescriptionP(""));

      dispatch(RsetfurnaceEventEditModal(false));
    } else {
      Swal.fire({
        icon: "error",
        title: "  مقادير خالي",
        text: " تمامي مقادير بايد پر شود        ",
      });
    }
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

  const furnaceEventEditCurrentRow = useSelector(
    selectfurnaceEventEditCurrentRow
  );
  console.log(furnaceEventEditCurrentRow);

  const FurnaceObservationfurnaceEventEditModal = useSelector(
    selectFurnaceObservationfurnaceEventEditModal
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
  const singlefurances = useSelector(selectsinglefurances);

  const FurnaceObservationStatusTypeOfEvent = useSelector(
    selectFurnaceObservationTypeOfEvent
  );

  useEffect(() => {
    dispatch(RsetFurnaceObservationEventName(furnaceEventEditCurrentRow.name));
    dispatch(
      RsetFurnaceObservationDateOfStart(furnaceEventEditCurrentRow.begin_date)
    );
    dispatch(
      RsetFurnaceObservationDateOfEnd(furnaceEventEditCurrentRow.end_date)
    );
    dispatch(
      RsetFurnaceObservationTypeOfEvent(furnaceEventEditCurrentRow.event_type)
    );
    dispatch(
      RsetFurnaceObservationDescriptionP(furnaceEventEditCurrentRow.description)
    );
  }, [furnaceEventEditCurrentRow]);
  return (
    <>
      <ConfigProvider direction="rtl" locale={fa_IR}>
        <Modal
          title={
            <>
              <h3 className="fw-bold ">ویرایش کوره</h3>
            </>
          }
          open={FurnaceObservationfurnaceEventEditModal}
          styles={modalStyles}
          closable={false}
          onOk={handlecancelmodal}
          onCancel={handlecancelmodal}
          footer={(_, { OkBtn, CancelBtn }) => (
            <>
              <div className="bottom-modal d-flex justify-content-between align-items-center gap-3 w-100 flex-row-reverse">
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
                  ويرايش رويداد
                </Button>
              </div>
            </>
          )}
        >
          <form>
            <Box>
              <InputLabel className="fw-bold fs-5 ">نام رویداد </InputLabel>
              <TextField
                value={FurnaceObservationStatusEventName}
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
              placeholder={
                FurnaceObservationStatusDateOfStart
                  ? moment(FurnaceObservationStatusDateOfStart).format(
                      "jYYYY/jMM/jDD"
                    )
                  : ""
              } // Format the placeholder to Jalali
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
              placeholder={
                FurnaceObservationStatusDateOfEnd
                  ? moment(FurnaceObservationStatusDateOfEnd).format(
                      "jYYYY/jMM/jDD"
                    )
                  : ""
              }
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
              <FormControl fullWidth>
                <InputLabel
                  className="fw-bold  fs-5 "
                  id="demo-simple-select-standard-label"
                >
                  نوع رویداد
                </InputLabel>
                <Select
                  className="w-100  "
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  label={"نوع رويداد"}
                  value={FurnaceObservationStatusTypeOfEvent}
                  onChange={(e) => {
                    dispatch(RsetFurnaceObservationTypeOfEvent(e.target.value));
                  }}
                >
                  {enetrydata &&
                    enetrydata.map((item, index) => (
                      <MenuItem
                        dir="rtl"
                        className="text-center w-100 m-auto"
                        key={index}
                        value={item}
                      >
                        {item}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>

            <Box>
              <TextArea
                className="w-100 my-3 text-center h-50 p-2  "
                value={FurnaceObservationDescriptionP}
                onChange={(e) => {
                  dispatch(RsetFurnaceObservationDescriptionP(e.target.value));
                }}
                placeholder="توضيحات"
                rows={5}
              />
            </Box>
          </form>
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default ObservingfurnaceEditEventModal;
