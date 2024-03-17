import React, { useEffect, useState } from "react";
import { Modal, Button, ConfigProvider } from "antd";
import fa_IR from "antd/lib/locale/fa_IR";
import { useSelector, useDispatch } from "react-redux";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  RsetFurnaceObservationmaterial,
  RsetFurnaceObservationsection,
  RsetFurnaceObservationtotaltonnage,
  RsetbottomTableEditModal,
  editrows,
  selectFurnaceObservationaddrowmodal,
  selectFurnaceObservationmaterial,
  selectFurnaceObservationsection,
  selectFurnaceObservationtotaltonnage,
  selectbottomTableEditCurrentUser,
  selectbottomTableEditModal,
  selectfurnaceEventEditCurrentRow,
} from "../../../../slices/FurnaceObservationSlices";
import {
  fetchfurancepart,
  selectFurnaceDistributeList,
} from "../../../../slices/FurnaceDistribute";
import {
  fetchessentialgoodlist,
  selectessentialGoodsList,
} from "../../../../slices/essentialGoodsSlices";
import { useLocation } from "react-router-dom";
import { getIdFromUrl } from "../ObservingFurnaces";

import Swal from "sweetalert2";

const ButtomTableEditModal = () => {
  const location = useLocation();
  const id = getIdFromUrl(location.pathname);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchfurancepart());
    dispatch(fetchessentialgoodlist());
  }, [dispatch]);

  // -----------------------------handeling modal selectors

  const bottomTableEditModal = useSelector(selectbottomTableEditModal);

  const bottomTableEditCurrentUser = useSelector(
    selectbottomTableEditCurrentUser
  );
  console.log(bottomTableEditCurrentUser);

  const essentialGoodsList = useSelector(selectessentialGoodsList);
  const FurnaceDistributeList = useSelector(selectFurnaceDistributeList);
  const FurnaceObservationsection = useSelector(
    selectFurnaceObservationsection
  );
  const FurnaceObservationtotaltonnage = useSelector(
    selectFurnaceObservationtotaltonnage
  );

  const FurnaceObservationmaterial = useSelector(
    selectFurnaceObservationmaterial
  );

  const handleaddrow = () => {
    const data = {
      furnace_oid: id,
      furnace_part_oid: FurnaceObservationsection,
      weight: FurnaceObservationtotaltonnage,
      material_oid: FurnaceObservationmaterial,
    };
    if (data) {
      dispatch(
        editrows({
          item: data,
          furnaceId: id,
          rowId: bottomTableEditCurrentUser._id,
        })
      );
      dispatch(RsetFurnaceObservationtotaltonnage(""));
      dispatch(RsetFurnaceObservationmaterial(""));
      dispatch(RsetFurnaceObservationsection(""));

      dispatch(RsetbottomTableEditModal(false));
    } else {
      Swal.fire({
        icon: "error",
        title: "خالي بودن مقادير",
        text: "عكس يا شرح عكسي براي اين رويداد انتخاب نشده است",
      });
    }
  };

  const handleModalCancel = () => {
    dispatch(RsetbottomTableEditModal(false));
    dispatch(RsetFurnaceObservationtotaltonnage(""));
    dispatch(RsetFurnaceObservationmaterial(""));
    dispatch(RsetFurnaceObservationsection(""));
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

  return (
    <ConfigProvider direction="rtl" locale={fa_IR}>
      <Modal
        title={
          <>
            <h3 className="fw-bold">ويرايش رديف </h3>
          </>
        }
        open={bottomTableEditModal}
        styles={modalStyles}
        closable={false}
        onOk={handleModalCancel}
        onCancel={handleModalCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <div className="bottom-modal d-flex justify-content-between align-items-center gap-3 w-100 flex-row-reverse">
              <Button
                style={{ background: "red", color: "white" }}
                size="large"
                onClick={() => handleModalCancel()}
              >
                لغو
              </Button>
              <Button
                className="w-100"
                variant="outlined"
                type="primary"
                color="primary"
                size="large"
                onClick={() => handleaddrow()}
              >
                اضافه كردن رديف
              </Button>
            </div>
          </>
        )}
      >
        <form>
          <InputLabel className="fw-bold fs-5">مجموع تناژ</InputLabel>
          <FormControl fullWidth>
            <TextField
              className="w-100"
              defaultValue={bottomTableEditCurrentUser.weight}
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) =>
                dispatch(RsetFurnaceObservationtotaltonnage(e.target.value))
              }
            />
          </FormControl>
          <FormControl fullWidth className=" my-3 ">
            <InputLabel
              className="fw-bold fs-5  text-center"
              id="demo-simple-select-standard-label"
            >
              متريال
            </InputLabel>
            <Select
              className="w-100  "
              defaultValue={bottomTableEditCurrentUser.materials_id}
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              label={" متريال"}
              onChange={(e) =>
                dispatch(RsetFurnaceObservationmaterial(e.target.value))
              }
            >
              {essentialGoodsList &&
                essentialGoodsList.map((item, index) => (
                  <MenuItem
                    dir="rtl"
                    className="text-center w-100 m-auto  "
                    key={item.id}
                    value={item._id}
                  >
                    {item.type_name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth className=" my-3">
            <InputLabel
              className="fw-bold fs-5  text-center"
              id="demo-simple-select-standard-label"
            >
              بخش
            </InputLabel>
            <Select
              className="w-100  "
              defaultValue={bottomTableEditCurrentUser.furnace_part_oid}
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              label={"بخش"}
              onChange={(e) =>
                dispatch(RsetFurnaceObservationsection(e.target.value))
              }
            >
              {FurnaceDistributeList &&
                FurnaceDistributeList.map((item, index) => (
                  <MenuItem
                    dir="rtl"
                    className="text-center w-100 m-auto  "
                    key={item.id}
                    value={item._id}
                  >
                    {item.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </form>
      </Modal>
    </ConfigProvider>
  );
};

export default ButtomTableEditModal;
