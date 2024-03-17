import React, { useEffect, useState } from "react";
import { Modal, Button, ConfigProvider } from "antd";
import fa_IR from "antd/lib/locale/fa_IR";
import { useSelector, useDispatch } from "react-redux";
import {
  RsetUserManagmentEditModal,
  selectUserManagmentEditModal,
  selectUserManagmentFirstName,
  selectUserManagmentLastName,
  selectuserManagmentAccess,
  RsetUserManagmentAccess,
  RsetUserManagmentFirstName,
  RsetUserManagmentLastName,
  RsetUserManagmentUserName,
  RsetUserManagmentPassword,
  selectUserManagmentUserName,
  selectUserManagmentPassword,
} from "../../../slices/userManagmentSlices";
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
  RsetFurnaceDistributeAddmodal,
  RsetFurnaceDistributeCurrentUser,
  RsetFurnaceDistributeEditModal,
  RsetFurnaceDistributeSection,
  RsetFurnaceDistributeType,
  addfurnaceparts,
  selectFurnaceDistributeAddmodal,
  selectFurnaceDistributeCurrentUser,
  selectFurnaceDistributeEditModal,
  selectFurnaceDistributeSection,
  selectFurnaceDistributeType,
} from "../../../slices/FurnaceDistribute";
import Swal from "sweetalert2";

const FurnaceDistributeAddModal = () => {
  const dispatch = useDispatch();

  //   -----------------------------handeling modal selectors
  const FurnaceDistributeType = useSelector(selectFurnaceDistributeType);
  const FurnaceDistributeSection = useSelector(selectFurnaceDistributeSection);

  const FurnaceDistributeAddmodal = useSelector(
    selectFurnaceDistributeAddmodal
  );

  const FurnaceDistributeCurrentUser = useSelector(
    selectFurnaceDistributeCurrentUser
  );

  // -----------------------------------------------

  // -----------------------------------------------------

  // Define all possible access options

  const handleModalCancel = () => {
    dispatch(RsetFurnaceDistributeAddmodal(false));
  };

  const handleModalEdit = () => {
    const data = {
      name: FurnaceDistributeSection,
      furnace_type: FurnaceDistributeType,
    };
    if (FurnaceDistributeSection && FurnaceDistributeType) {
      dispatch(addfurnaceparts({ data: data }));
      dispatch(RsetFurnaceDistributeSection(""));
      dispatch(RsetFurnaceDistributeType(""));
      dispatch(RsetFurnaceDistributeAddmodal(false));
    } else {
      Swal.fire({
        icon: "error",
        title: "خالي بودن مقادير",
        text: " تمامي مقادير ميبايست پر شود",
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

  const typeData = ["side sort", "end sort", "side sort , end sort"];

  return (
    <ConfigProvider direction="rtl" locale={fa_IR}>
      <Modal
        title={
          <>
            <h3 className="fw-bold ">{`اضافه كردن بخش كوره`}</h3>
          </>
        }
        open={FurnaceDistributeAddmodal}
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
            <InputLabel className="fw-bold fs-5"> نام بخش</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) =>
                dispatch(RsetFurnaceDistributeSection(e.target.value))
              }
            />
          </Box>

          <Box>
            <InputLabel className="fw-bold fs-5" id="demo-simple-select-label">
              نام بخش
            </InputLabel>
            <Select
              className="w-100  "
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              label="مدل"
              onChange={(e) =>
                dispatch(RsetFurnaceDistributeType(e.target.value))
              }
            >
              {typeData &&
                typeData.map((item, index) => (
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
        </form>
      </Modal>
    </ConfigProvider>
  );
};

export default FurnaceDistributeAddModal;
