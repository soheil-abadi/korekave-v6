import React, { useEffect, useState } from "react";
import { Modal, Button, ConfigProvider } from "antd";
import fa_IR from "antd/lib/locale/fa_IR";
import { useSelector, useDispatch } from "react-redux";

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
import {
  RsetessentialGoodsAddmodal,
  RsetessentialGoodsCurrentUser,
  RsetessentialGoodsEditModal,
  RsetessentialGoodscountryoforigin,
  RsetessentialGoodssort,
  RsetessentialGoodstype,
  RsetessentialGoodsfirmorigin,
  selectessentialGoodsAddmodal,
  selectessentialGoodsCurrentUser,
  selectessentialGoodscountryoforigin,
  selectessentialGoodssort,
  selectessentialGoodstype,
  selectessentialGoodsfirmorigin,
  addessentialgood,
} from "../../../slices/essentialGoodsSlices";
import { essentialgoodsadd } from "../../../services/authServices";
import { RsetfireProofAddmodal } from "../../../slices/fireProofSlices";
import Swal from "sweetalert2";

const EssentialGoodsADDModal = () => {
  const selectoption = ["نسوز - ملات", "نسوز - آجر", "نسوز - فیبر"];
  const type = ["غير منتظم  ", "منتظم  "];
  //   -----------------------------handeling modal selectors
  const essentialGoodscountryoforigin = useSelector(
    selectessentialGoodscountryoforigin
  );

  const essentialGoodstype = useSelector(selectessentialGoodstype);
  const essentialGoodsfirmorigin = useSelector(selectessentialGoodsfirmorigin);
  const essentialGoodssort = useSelector(selectessentialGoodssort);

  // -----------------------------------------------

  const dispatch = useDispatch();
  const essentialGoodADDModal = useSelector(selectessentialGoodsAddmodal);

  const essentialGoodsCurrentUser = useSelector(
    selectessentialGoodsCurrentUser
  );

  // Define all possible access options

  const handleModalCancel = () => {
    dispatch(RsetessentialGoodsAddmodal(false));
  };
  // ------------------------sending new input to reducers

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

  const handleModalEdit = () => {
    const adduserdata = {
      category: essentialGoodssort,
      manufacturing_country: essentialGoodscountryoforigin,
      manufacturer: essentialGoodsfirmorigin,
      type_name: essentialGoodstype,
    };
    if (
      essentialGoodssort &&
      essentialGoodscountryoforigin &&
      essentialGoodsfirmorigin &&
      essentialGoodstype
    ) {
      dispatch(addessentialgood(adduserdata));
      dispatch(RsetessentialGoodscountryoforigin(""));
      dispatch(RsetessentialGoodstype(""));
      dispatch(RsetessentialGoodsfirmorigin(""));
      dispatch(RsetessentialGoodsAddmodal(false));
    } else {
      Swal.fire({
        icon: "error",
        title: "خالي بودن مقادير",
        text: " تمامي مقادير بايد پر شود   ",
      });
    }
  };

  // -----------------seting current data in reducer
  useEffect(() => {
    dispatch(
      RsetessentialGoodscountryoforigin(
        essentialGoodsCurrentUser.countryoforigin
      )
    );

    dispatch(
      RsetessentialGoodsfirmorigin(essentialGoodsCurrentUser.firmorigin)
    );

    dispatch(RsetessentialGoodssort(essentialGoodsCurrentUser.sort));

    dispatch(RsetessentialGoodstype(essentialGoodsCurrentUser.type));
  }, [essentialGoodsCurrentUser]);

  return (
    <ConfigProvider direction="rtl" locale={fa_IR}>
      <Modal
        title={` اضافه كردن ليست ملزومات `}
        open={essentialGoodADDModal}
        styles={modalStyles}
        closable={false}
        onOk={handleModalCancel}
        onCancel={handleModalCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <div className="bottom-modal d-flex justify-content-between align-items-center gap-3 w-100">
              <Button
                style={{ background: "red", color: "white" }}
                size="large"
                onClick={() => handleModalCancel()}
              >
                لغو
              </Button>
              <Button
                className="w-100"
                type="primary"
                variant="outlined"
                color="primary"
                size="large"
                onClick={() => handleModalEdit()}
              >
                ویرایش کاربر
              </Button>
            </div>
          </>
        )}
      >
        <form>
          <Box>
            <InputLabel className="fw-bold fs-5" id="demo-simple-select-label">
              دسته بندي
            </InputLabel>
            <Select
              className="w-100  "
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              label=" دسته بندي"
              onChange={(e) => dispatch(RsetessentialGoodssort(e.target.value))}
            >
              {selectoption &&
                selectoption.map((item, index) => (
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
            <InputLabel className="fw-bold fs-5">كشور سازنده</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) =>
                dispatch(RsetessentialGoodscountryoforigin(e.target.value))
              }
            />
          </Box>
          <Box>
            <InputLabel className="fw-bold fs-5">نوع (متریال)</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) => dispatch(RsetessentialGoodstype(e.target.value))}
            />
          </Box>
          <Box>
            <InputLabel className="fw-bold fs-5">شركت توليد كننده</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) =>
                dispatch(RsetessentialGoodsfirmorigin(e.target.value))
              }
            />
          </Box>
        </form>
      </Modal>
    </ConfigProvider>
  );
};

export default EssentialGoodsADDModal;
