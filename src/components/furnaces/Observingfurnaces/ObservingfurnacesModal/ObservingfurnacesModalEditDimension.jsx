import React, { useEffect, useState } from "react";
import { Modal, Button, ConfigProvider } from "antd";
import fa_IR from "antd/lib/locale/fa_IR";
import { useSelector, useDispatch } from "react-redux";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  RsetFurnaceObservationFireProofModel,
  RsetFurnaceObservationtotalNumber,
  RseteditDimentionModal,
  editdimen,
  selectFurnaceObservatioFireProofModel,
  selectFurnaceObservationNumber,
  selectFurnaceObservationcurrentmaterial,
  selecteditDimentionCurrentUser,
  selecteditDimentionModal,
} from "../../../../slices/FurnaceObservationSlices";
import {
  fetchfireprooflistList,
  selectfireProofList,
} from "../../../../slices/fireProofSlices";
import { useLocation } from "react-router-dom";
import { adddimention, editdimention } from "../../../../services/authServices";
import { getIdFromUrl } from "../ObservingFurnaces";
import { getsinglefurance } from "../../../../slices/Dashboard";
import Swal from "sweetalert2";

const ObservingfurnacesModalEditDimension = () => {
  const location = useLocation();
  const id = getIdFromUrl(location.pathname);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchfireprooflistList());
  }, [dispatch]);
  const editDimentionCurrentUser = useSelector(selecteditDimentionCurrentUser);

  const fireprooflistuser = useSelector(selectfireProofList);
  const FurnaceObservatioFireProofModel = useSelector(
    selectFurnaceObservatioFireProofModel
  );
  console.log(editDimentionCurrentUser);
  const editDimentionModal = useSelector(selecteditDimentionModal);

  const FurnaceObservationNumber = useSelector(selectFurnaceObservationNumber);
  console.log(FurnaceObservationNumber, FurnaceObservatioFireProofModel);
  console.log(fireprooflistuser);
  const handleَAddDimention = () => {
    const data = {
      material_shape_oid: FurnaceObservatioFireProofModel,
      number: FurnaceObservationNumber,
    };
    if (data) {
      dispatch(
        editdimen({
          data: data,
          furnaceId: id,
          d_id: editDimentionCurrentUser.d_id,
        })
      );

      console.log(data);
      dispatch(RsetFurnaceObservationtotalNumber(""));
      dispatch(RsetFurnaceObservationFireProofModel(""));

      dispatch(RseteditDimentionModal(false));
    } else {
      Swal.fire({
        icon: "error",
        title: "  مقادير خالي",
        text: " تمامي مقادير بايد پر شود        ",
      });
    }
  };

  // -----------------------------------------------

  useEffect(() => {
    dispatch(
      RsetFurnaceObservationFireProofModel(editDimentionCurrentUser.shape)
    );
  }, [editDimentionCurrentUser]);

  // -----------------------------------------------------

  const handleModalCancel = () => {
    dispatch(RseteditDimentionModal(false));
    dispatch(RsetFurnaceObservationtotalNumber(""));
    dispatch(RsetFurnaceObservationFireProofModel(""));
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
            <h3 className="fw-bold">اضافه كردن ابعاد </h3>
          </>
        }
        open={editDimentionModal}
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
                onClick={() => handleَAddDimention()}
              >
                اضافه كردن رديف
              </Button>
            </div>
          </>
        )}
      >
        <form>
          <InputLabel className="fw-bold fs-5"> تعداد</InputLabel>
          <FormControl fullWidth>
            <Box>
              <TextField
                variant="outlined"
                defaultValue={editDimentionCurrentUser.numbers}
                fullWidth
                margin="normal"
                onChange={(e) =>
                  dispatch(RsetFurnaceObservationtotalNumber(e.target.value))
                }
              />
            </Box>
          </FormControl>

          <FormControl fullWidth className=" my-3 ">
            <InputLabel
              className="fw-bold fs-5  text-center"
              id="demo-simple-select-standard-label"
            >
              مدل نسوز
            </InputLabel>
            <Select
              className="w-100  "
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              label={" مدل نسوز"}
              onChange={(e) =>
                dispatch(RsetFurnaceObservationFireProofModel(e.target.value))
              }
            >
              {fireprooflistuser &&
                fireprooflistuser.map((item, index) => (
                  <MenuItem
                    dir="rtl"
                    className="text-center w-100 m-auto  "
                    key={item.id}
                    value={item._id}
                  >
                    {item.shape_code}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </form>
      </Modal>
    </ConfigProvider>
  );
};

export default ObservingfurnacesModalEditDimension;
