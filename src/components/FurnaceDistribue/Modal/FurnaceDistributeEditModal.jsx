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
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  RsetFurnaceDistributeCurrentUser,
  RsetFurnaceDistributeEditModal,
  RsetFurnaceDistributeSection,
  RsetFurnaceDistributeType,
  editfurnaceparts,
  selectFurnaceDistributeCurrentUser,
  selectFurnaceDistributeEditModal,
  selectFurnaceDistributeSection,
  selectFurnaceDistributeType,
} from "../../../slices/FurnaceDistribute";
import Swal from "sweetalert2";

const FurnaceDistributeEditModal = () => {
  const dispatch = useDispatch();

  //   -----------------------------handeling modal selectors
  const FurnaceDistributeType = useSelector(selectFurnaceDistributeType);
  const FurnaceDistributeSection = useSelector(selectFurnaceDistributeSection);

  const FurnaceDistributeEditModal = useSelector(
    selectFurnaceDistributeEditModal
  );
  const FurnaceDistributeCurrentUser = useSelector(
    selectFurnaceDistributeCurrentUser
  );

  // -----------------------------------------------
  useEffect(() => {
    dispatch(
      RsetFurnaceDistributeType(FurnaceDistributeCurrentUser.furnace_type)
    );
    dispatch(RsetFurnaceDistributeSection(FurnaceDistributeCurrentUser.name));

    dispatch(RsetUserManagmentUserName(FurnaceDistributeCurrentUser.username));
  }, [FurnaceDistributeCurrentUser]);
  // -----------------------------------------------------

  // Define all possible access options

  const handleModalCancel = () => {
    dispatch(RsetFurnaceDistributeEditModal(false));
  };

  const handleModalEdit = () => {
    const data = {
      name: FurnaceDistributeSection,
      furnace_type: FurnaceDistributeType,
    };

    if (data) {
      dispatch(
        editfurnaceparts({ data: data, id: FurnaceDistributeCurrentUser._id })
      );
      dispatch(RsetFurnaceDistributeSection(""));
      dispatch(RsetFurnaceDistributeType(""));
    } else {
      Swal.fire({
        icon: "error",
        title: "خالي بودن مقادير",
        text: " تمامي مقادير ميبايست پر شود",
      });
    }

    dispatch(RsetFurnaceDistributeEditModal(false));
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

  const typeData = ["side-port", "end-port", "side-port and end-port"];

  return (
    <ConfigProvider direction="rtl" locale={fa_IR}>
      <Modal
        title={`ویرایش بخش ${FurnaceDistributeCurrentUser.name}`}
        open={FurnaceDistributeEditModal}
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
              value={FurnaceDistributeSection}
              onChange={(e) =>
                dispatch(RsetFurnaceDistributeSection(e.target.value))
              }
            />
          </Box>

          <Box>
            <FormControl fullWidth className=" my-3 ">
              <InputLabel
                className="fw-bold fs-5"
                id="demo-simple-select-label"
              >
                نوع كوره
              </InputLabel>
              <Select
                className="w-100  "
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={FurnaceDistributeType}
                label=" نوع كوره"
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
            </FormControl>
          </Box>
        </form>
      </Modal>
    </ConfigProvider>
  );
};

export default FurnaceDistributeEditModal;
