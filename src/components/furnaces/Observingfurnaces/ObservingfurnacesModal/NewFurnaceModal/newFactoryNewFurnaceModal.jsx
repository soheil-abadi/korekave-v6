import React, { useEffect, useState } from "react";
import { Modal, Button, ConfigProvider } from "antd";
import fa_IR from "antd/lib/locale/fa_IR";
import { useSelector, useDispatch } from "react-redux";

import { InputLabel, TextField } from "@mui/material";

import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { getIdFromUrl } from "../../ObservingFurnaces";
import { selectsinglefurances } from "../../../../../slices/Dashboard";
import {
  getnewdimentions,
  selectgetNewDimention,
} from "../../../../../slices/factory";
import {
  RsetaddDimentionModal,
  RsetaddEventModal,
  RsetdimentionHight,
  RsetdimentionLenght,
  Rsetdimentionwidth,
  addnewdimentionss,
  selectDimentionData,
  selectdimentionHight,
  selectdimentionLenght,
  selectdimentionwidth,
} from "../../../../../slices/FurnaceObservationSlices";

const NewFactoryNewFurnaceModal = () => {
  const location = useLocation();
  const id = getIdFromUrl(location.pathname);
  const dispatch = useDispatch();
  const typedata = ["sideport", "endport"];
  const enetrydata = ["deepchanel", "working"];

  // ------------------------------------------------------selector
  const singlefurances = useSelector(selectsinglefurances);
  const dimentionHight = useSelector(selectdimentionHight);
  const dimentionwidth = useSelector(selectdimentionwidth);
  const dimentionLenght = useSelector(selectdimentionLenght);

  const DimentionData = useSelector(selectDimentionData);

  const getNewDimention = useSelector(selectgetNewDimention);

  const [Data, setData] = useState("");
  const [labal, setLabel] = useState([]);

  useEffect(() => {
    if (getNewDimention !== undefined) {
      setLabel(getNewDimention.furnace_parts);
    }
  }, [getNewDimention]);

  useEffect(() => {
    if (singlefurances.furnace !== undefined) {
      const newData = singlefurances.furnace.map((item, index) => item._id);
      setData(newData); // Setting the updated data
    }
  }, [singlefurances]);

  useEffect(() => {
    // Dispatching action when Data changes
    if (Data !== "") {
      dispatch(getnewdimentions(Data));
    }
  }, [Data, dispatch]);
  const handleModalCancel = () => {
    dispatch(RsetaddDimentionModal(false));
    dispatch(RsetdimentionLenght(""));
    dispatch(Rsetdimentionwidth(""));
    dispatch(RsetdimentionHight(""));
  };

  const adddimention = (index) => {
    const selectedLabel = labal[index];

    const data = {
      length: dimentionLenght,
      width: dimentionwidth,
      height: dimentionHight,
      furnace_oid: id,
      furnace_part_oid: selectedLabel._id,
    };
    if (data) {
      dispatch(addnewdimentionss({ data: data, id: id }));
      dispatch(RsetdimentionLenght(""));
      dispatch(Rsetdimentionwidth(""));
      dispatch(RsetdimentionHight(""));

      if (index === labal.length - 1) {
        // Last index reached, do something here
        dispatch(RsetaddDimentionModal(false));
        dispatch(RsetaddEventModal(true));
      }

      setCurrentIndex(currentIndex + 1);
    } else {
      Swal.fire({
        icon: "error",
        title: "خالي بودن مقادير",
        text: "  تمامي مقادير ميبايست پر شود",
      });
    }
  };

  const modalStyles = {
    header: {
      background: "lightgray",
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
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <ConfigProvider direction="rtl" locale={fa_IR}>
      <Modal
        width={1200}
        title={
          <>
            <h3 className="fw-bold fs-3  "> اضافه كردن ابعاد </h3>
          </>
        }
        open={true}
        styles={modalStyles}
        closable={false}
        onOk={handleModalCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <div className="bottom-modal d-flex justify-content-between align-items-center gap-3 w-100 flex-row-reverse "></div>
          </>
        )}
      >
        <form>
          <div>
            <div className="d-flex justify-content-around align-items-center  w-75 m-auto">
              <h3>طول</h3>
              <h3>عرض</h3>
              <h3>ارتفاع</h3>
            </div>
            {labal &&
              labal.map((label, index) => (
                <>
                  <div
                    key={index}
                    className="d-flex justify-content-center align-items-center gap-3"
                  >
                    <InputLabel className="fw-bold fs-5 w-100   ">
                      {
                        <>
                          <h3>${label.name}</h3>
                        </>
                      }
                    </InputLabel>
                    <TextField
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      defaultValue={0}
                      placeholder="طول" // Set placeholder dynamically
                      onChange={(e) =>
                        dispatch(RsetdimentionLenght(e.target.value))
                      }
                      disabled={currentIndex !== index}
                    />
                    <TextField
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      defaultValue={0}
                      placeholder="عرض" // Set placeholder dynamically
                      onChange={(e) =>
                        dispatch(Rsetdimentionwidth(e.target.value))
                      }
                      disabled={currentIndex !== index}
                    />
                    <TextField
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      defaultValue={0}
                      placeholder="ارتفاع" // Set placeholder dynamically
                      onChange={(e) =>
                        dispatch(RsetdimentionHight(e.target.value))
                      }
                      disabled={currentIndex !== index}
                    />

                    <Button
                      disabled={currentIndex !== index}
                      onClick={() => adddimention(index)}
                      variant="contained"
                    >
                      ارسال
                    </Button>
                  </div>
                </>
              ))}
          </div>
        </form>
      </Modal>
    </ConfigProvider>
  );
};

export default NewFactoryNewFurnaceModal;
