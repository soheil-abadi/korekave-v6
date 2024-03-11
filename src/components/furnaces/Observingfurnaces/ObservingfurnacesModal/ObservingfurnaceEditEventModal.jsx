import React, { useEffect, useState } from "react";
import { Modal, Button, ConfigProvider, DatePicker } from "antd";
import fa_IR from "antd/lib/locale/fa_IR";
import { useSelector, useDispatch } from "react-redux";
import moment from "jalali-moment";
import faIR from "antd/lib/locale/fa_IR";
import { DtPicker } from "react-calendar-datetime-picker";

import { Box, InputLabel, MenuItem, Select, TextField } from "@mui/material";

import { FormControl } from "react-bootstrap";
import {
  RsetFurnaceObservationDateOfEnd,
  RsetFurnaceObservationDateOfStart,
  RsetFurnaceObservationDescriptionP,
  RsetFurnaceObservationEventName,
  RsetFurnaceObservationStatusModal,
  RsetFurnaceObservationTypeOfEvent,
  RsetFurnaceObservationpersianCalender,
  RsetFurnaceObservationpersianCalenderEnd,
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
  selectFurnaceObservationpersianCalender,
  selectFurnaceObservationpersianCalenderEnd,
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

const solarToGregorian = (solarDate) => {
  // Parse the Solar Hijri date using jalali-moment
  const gregorianDate = moment(solarDate, "jYYYY-jMM-jDD");

  // Convert to Gregorian format
  const gregorianDateString = gregorianDate.format("YYYY-MM-DD");

  return gregorianDateString;
};

const ObservingfurnaceEditEventModal = () => {
  const [start, setStart] = useState({});
  const [end, setEnd] = useState({});
  // const [formatstart, setformatStart] = useState("");
  // const [formatend, setformatEnd] = useState("");
  // if ((start, end)) {
  //   const starts = start.year - start.month - start.day;
  //   setformatStart(starts);
  //   const ends = end.year - end.month - end.day;
  //   setformatEnd(ends);
  // }

  // const convertDate = `${startDate.year}/${startDate.mounth}/${startDate.day}`;

  const enetrydata = ["ساخت ", "تعمير سرد"];
  const dispatch = useDispatch();
  const location = useLocation();
  const id = getIdFromUrl(location.pathname);

  const handlecancelmodal = () => {
    dispatch(RsetfurnaceEventEditModal(false));
  };

  const handleَAddEvent = () => {
    const eventdata = {
      name: FurnaceObservationStatusEventName,
      begin_date: FurnaceObservationStatusDateOfStart,
      end_date: FurnaceObservationStatusDateOfEnd,
      event_type: FurnaceObservationStatusTypeOfEvent,
      description: FurnaceObservationDescriptionP,
    };
    if (
      FurnaceObservationStatusEventName &&
      FurnaceObservationStatusEventName &&
      FurnaceObservationStatusDateOfEnd &&
      FurnaceObservationStatusTypeOfEvent &&
      FurnaceObservationDescriptionP
    ) {
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
                value={FurnaceObservationStatusTypeOfEvent}
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
                value={FurnaceObservationDescriptionP}
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

export default ObservingfurnaceEditEventModal;
