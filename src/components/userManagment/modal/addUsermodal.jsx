import React, { useEffect, useState } from "react";
import { Modal, Button, ConfigProvider } from "antd";
import fa_IR from "antd/lib/locale/fa_IR";
import { useSelector, useDispatch } from "react-redux";
import {
  RsetUserManagmentEditModal,
  selectUserManagmentEditModal,
  RsetUserManagmentCurrentUser,
  selectUserManagmentCurrentUser,
  selectUserManagmentFirstName,
  selectUserManagmentLastName,
  selectuserManagmentAccess,
  RsetUserManagmentAccess,
  RsetUserManagmentFirstName,
  RsetUserManagmentLastName,
  RsetuserManagmentAddmodal,
  selectuserManagmentAddmodal,
} from "../../../slices/userManagmentSlices";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputLabel,
  TextField,
} from "@mui/material";

const UserManagementEditModal = () => {
  const dispatch = useDispatch();

  //   -----------------------------handeling modal selectors
  const UserManagmentFirstName = useSelector(selectUserManagmentFirstName);
  const UserManagmentLastName = useSelector(selectUserManagmentLastName);
  const userManagmentAccess = useSelector(selectuserManagmentAccess);
  const userManagmentAddmodal = useSelector(selectuserManagmentAddmodal);
  const userManagmentCurrentUser = useSelector(selectUserManagmentCurrentUser);

  // -----------------------------------------------
  useEffect(() => {
    dispatch(RsetUserManagmentFirstName(""));
    dispatch(RsetUserManagmentLastName(""));
    dispatch(RsetUserManagmentAccess([]));
  }, [userManagmentCurrentUser]);

  // -----------------------------------------------------

  // Define all possible access options
  const allAccessOptions = [
    "ادمین سیستم",
    "مدیریت کارخانه ها",
    "مدیریت کوره ها",
    "مدیریت لیست بخش کوره ها",
    "مدیریت مدل های نسوز ها",
    "مدیریت ملزومات",
    "مدیریت رویدادهای کوره",
    "مدیریت ساخت کوره",
  ];
  console.log(userManagmentAccess);

  const handleAccessChange = (accessItem) => {
    if (userManagmentAccess.includes(accessItem)) {
      dispatch(
        RsetUserManagmentAccess(
          userManagmentAccess.filter((item) => item !== accessItem)
        )
      );
    } else {
      dispatch(RsetUserManagmentAccess([...userManagmentAccess, accessItem]));
    }
  };

  const handleModalCancel = () => {
    dispatch(RsetuserManagmentAddmodal(false));
  };

  const handleModalEdit = () => {
    dispatch(
      RsetUserManagmentCurrentUser({
        ...userManagmentCurrentUser,
        lastName: UserManagmentLastName,
        firstName: UserManagmentFirstName,
        access: userManagmentAccess,
      })
    );
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
        title={`ویرایش کاربر ${userManagmentCurrentUser.userName}`}
        open={userManagmentAddmodal}
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
                style={{ background: "blue", color: "white" }}
                size="large"
                onClick={() => handleModalEdit()}
              >
                اضافه كردن
              </Button>
            </div>
          </>
        )}
      >
        <form>
          <Box>
            <InputLabel className="fw-bold fs-5">نام</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) =>
                dispatch(RsetUserManagmentFirstName(e.target.value))
              }
            />
          </Box>
          <Box>
            <InputLabel className="fw-bold fs-5">نام خانوادگی</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) =>
                dispatch(RsetUserManagmentLastName(e.target.value))
              }
            />
          </Box>

          <FormGroup>
            {allAccessOptions.map((item, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={userManagmentAccess.includes(item)}
                    onChange={() => handleAccessChange(item)}
                  />
                }
                label={item}
              />
            ))}
          </FormGroup>
        </form>
      </Modal>
    </ConfigProvider>
  );
};

export default UserManagementEditModal;
