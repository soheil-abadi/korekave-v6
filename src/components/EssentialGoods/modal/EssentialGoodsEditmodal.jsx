import React, { useEffect, useState } from "react";
import { Modal, Button, ConfigProvider } from "antd";
import fa_IR from "antd/lib/locale/fa_IR";
import { useSelector, useDispatch } from "react-redux";

import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  RsetessentialGoodsCurrentUser,
  RsetessentialGoodsEditModal,
  RsetessentialGoodscountryoforigin,
  RsetessentialGoodssort,
  RsetessentialGoodstype,
  RsetessentialGoodsfirmorigin,
  selectessentialGoodsCurrentUser,
  selectessentialGoodsEditModal,
  selectessentialGoodscountryoforigin,
  selectessentialGoodssort,
  selectessentialGoodstype,
  selectessentialGoodsfirmorigin,
} from "../../../slices/essentialGoodsSlices";
import { editessentialgoods } from "../../../services/authServices";

const EssentialGoodsEdditModal = () => {
  const selectoption = [
    "نسوز - ملات",
    "نسوز - آجر",
    "نسوز - فیبر",
    "نسوز - جرم	",
  ];
  //   -----------------------------handeling modal selectors
  const essentialGoodscountryoforigin = useSelector(
    selectessentialGoodscountryoforigin
  );

  const essentialGoodstype = useSelector(selectessentialGoodstype);
  const essentialGoodsfirmorigin = useSelector(selectessentialGoodsfirmorigin);
  const essentialGoodssort = useSelector(selectessentialGoodssort);

  // -----------------------------------------------

  const dispatch = useDispatch();
  const essentialGoodsEditModal = useSelector(selectessentialGoodsEditModal);

  const essentialGoodsCurrentUser = useSelector(
    selectessentialGoodsCurrentUser
  );

  // Define all possible access options

  const handleModalCancel = () => {
    dispatch(RsetessentialGoodsEditModal(false));
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
  // -----------------seting current data in reducer
  useEffect(() => {
    dispatch(
      RsetessentialGoodscountryoforigin(
        essentialGoodsCurrentUser.manufacturing_country
      )
    );
    dispatch(
      RsetessentialGoodsfirmorigin(essentialGoodsCurrentUser.manufacturer)
    );

    dispatch(RsetessentialGoodssort(essentialGoodsCurrentUser.category));

    dispatch(RsetessentialGoodstype(essentialGoodsCurrentUser.type_name));
  }, [essentialGoodsCurrentUser]);
  const handleModalEdit = async () => {
    try {
      // Dispatch an action to set loading state or any indication that the request is in progress
      // For example: dispatch(setLoading(true));

      // Make the API call to add the user
      await editessentialgoods({
        category: essentialGoodssort,
        manufacturing_country: essentialGoodscountryoforigin,
        manufacturer: essentialGoodsfirmorigin,
        type: essentialGoodstype,
      });
      window.location.reload();

      // Dispatch any actions necessary to handle the success scenario
      // For example: dispatch(addUserSuccess(newUser));

      // Dispatch an action to reset any form state or close the modal
      // For example: dispatch(resetForm());

      // Close the modal
      dispatch(RsetessentialGoodsEditModal(false));
    } catch (error) {
      // Handle errors, you can dispatch actions to handle error state or show error messages
      console.error("Error adding user:", error);
      // For example: dispatch(addUserFailure(error));
    }
  };

  return (
    <ConfigProvider direction="rtl" locale={fa_IR}>
      <Modal
        title={`ويرايش مدل ${essentialGoodsCurrentUser.type}`}
        open={essentialGoodsEditModal}
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
            <FormControl className="w-100">
              <InputLabel
                className="fw-bold fs-5"
                id="demo-simple-select-standard-label"
              >
                دسته بندي
              </InputLabel>
              <Select
                className="w-100  "
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={essentialGoodssort}
                label={"دسته بندي"}
                onChange={(e) =>
                  dispatch(RsetessentialGoodssort(e.target.value))
                }
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
            </FormControl>
          </Box>

          <Box>
            <InputLabel className="fw-bold fs-5">كشور سازنده</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              value={essentialGoodscountryoforigin}
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
              value={essentialGoodstype}
              onChange={(e) => dispatch(RsetessentialGoodstype(e.target.value))}
            />
          </Box>

          <Box>
            <InputLabel className="fw-bold fs-5">شركت توليد كننده</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              value={essentialGoodsfirmorigin}
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

export default EssentialGoodsEdditModal;
