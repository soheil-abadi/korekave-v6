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
  RsetFurnaceDistributeCurrentUser,
  RsetFurnaceDistributeEditModal,
  RsetFurnaceDistributeSection,
  RsetFurnaceDistributeType,
  selectFurnaceDistributeCurrentUser,
  selectFurnaceDistributeEditModal,
  selectFurnaceDistributeSection,
  selectFurnaceDistributeType,
} from "../../../slices/FurnaceDistribute";

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
      RsetFurnaceDistributeType(FurnaceDistributeCurrentUser.first_name)
    );
    dispatch(
      RsetFurnaceDistributeSection(FurnaceDistributeCurrentUser.last_name)
    );

    dispatch(RsetUserManagmentUserName(FurnaceDistributeCurrentUser.username));
  }, [FurnaceDistributeCurrentUser]);
  // -----------------------------------------------------

  // Define all possible access options

  const handleModalCancel = () => {
    dispatch(RsetFurnaceDistributeEditModal(false));
  };

  const handleModalEdit = () => {
    dispatch(
      RsetFurnaceDistributeCurrentUser({
        ...FurnaceDistributeCurrentUser,
        first_name: FurnaceDistributeType,
        last_name: FurnaceDistributeSection,
      })
    );
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

  const typeData = ["side sort", "end sort", "side sort , end sort"];

  return (
    <ConfigProvider direction="rtl" locale={fa_IR}>
      <Modal
        title={`ویرایش کاربر ${FurnaceDistributeCurrentUser.username}`}
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
                dispatch(RsetFurnaceDistributeType(e.target.value))
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
              value={FurnaceDistributeType}
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

export default FurnaceDistributeEditModal;
