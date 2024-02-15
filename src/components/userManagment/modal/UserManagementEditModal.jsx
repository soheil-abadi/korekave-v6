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
  const userManagmentEditModal = useSelector(selectUserManagmentEditModal);
  const userManagmentCurrentUser = useSelector(selectUserManagmentCurrentUser);

  console.log(userManagmentCurrentUser);

  // -----------------------------------------------
  useEffect(() => {
    dispatch(RsetUserManagmentFirstName(userManagmentCurrentUser.first_name));
    dispatch(RsetUserManagmentLastName(userManagmentCurrentUser.last_name));
    dispatch(RsetUserManagmentAccess(userManagmentCurrentUser.user_access));
  }, [userManagmentCurrentUser]);
  console.log(userManagmentAccess);

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
    dispatch(RsetUserManagmentEditModal(false));
  };

  const handleModalEdit = () => {
    dispatch(
      RsetUserManagmentCurrentUser({
        ...userManagmentCurrentUser,
        last_name: UserManagmentLastName,
        first_name: UserManagmentFirstName,
        user_access: userManagmentAccess,
      })
    );
    dispatch(RsetUserManagmentEditModal(false));
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
        open={userManagmentEditModal}
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
            <InputLabel className="fw-bold fs-5">نام</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              value={UserManagmentFirstName}
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
              value={UserManagmentLastName}
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
