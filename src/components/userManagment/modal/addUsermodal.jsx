import React, { useEffect, useState } from "react";
import { Modal, Button, ConfigProvider } from "antd";
import fa_IR from "antd/lib/locale/fa_IR";
import { useSelector, useDispatch } from "react-redux";
import { adduser } from "../../../services/authServices";
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
  RsetUserManagmentList,
  selectUserManagmentList,
  RsetUserManagmentUserName,
  RsetUserManagmentPassword,
  selectUserManagmentPassword,
  selectUserManagmentUserName,
  addusers,
} from "../../../slices/userManagmentSlices";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputLabel,
  TextField,
} from "@mui/material";
import Swal from "sweetalert2";

const UserManagementEditModal = () => {
  const dispatch = useDispatch();

  //   -----------------------------handeling modal selectors
  const UserManagmentFirstName = useSelector(selectUserManagmentFirstName);
  const UserManagmentLastName = useSelector(selectUserManagmentLastName);
  const userManagmentAccess = useSelector(selectuserManagmentAccess);
  const userManagmentAddmodal = useSelector(selectuserManagmentAddmodal);
  const userManagmentCurrentUser = useSelector(selectUserManagmentCurrentUser);
  const UserManagmentPassword = useSelector(selectUserManagmentPassword);
  const UserManagmentUserName = useSelector(selectUserManagmentUserName);

  // -----------------------------------------------

  // -----------------------------------------------------

  // Define all possible access options
  const allAccessOptions = [
    { _id: "65c09a964e92ee075289d4ef", name: "ادمین سیستم" },

    { _id: "65c09a964e92ee075289d4f0", name: "مدیریت رویدادهای کوره" },

    { _id: "65c09a964e92ee075289d4f1", name: "مدیریت کارخانه‌ها" },

    { _id: "65c09a964e92ee075289d4f2", name: "مدیریت کوره‌ها" },

    { _id: "65c09a964e92ee075289d4f3", name: "مدیریت لیست بخش‌های کوره" },

    { _id: "65c09a964e92ee075289d4f4", name: "مدیریت مدل‌های نسوز‌ها" },

    { _id: "65c09a964e92ee075289d4f5", name: "مدیریت ملزومات" },

    { _id: "65c09a964e92ee075289d4f6", name: "مدیریت ساخت کوره" },
  ];

  console.log(userManagmentAccess);

  const handleAccessChange = (accessItemId) => {
    if (userManagmentAccess.some((item) => item._id === accessItemId)) {
      console.log(accessItemId);
      dispatch(
        RsetUserManagmentAccess(
          userManagmentAccess.filter((item) => item._id !== accessItemId)
        )
      );
    } else {
      const updatedAccess = [
        ...userManagmentAccess,
        allAccessOptions.find((item) => item._id === accessItemId),
      ];
      dispatch(RsetUserManagmentAccess(updatedAccess));
    }
  };

  const handleModalCancel = () => {
    dispatch(RsetuserManagmentAddmodal(false));
  };

  const handleModalEdit = () => {
    const adduserdata = {
      first_name: UserManagmentFirstName,
      last_name: UserManagmentLastName,
      user_access: userManagmentAccess,
      password: UserManagmentPassword,
      username: UserManagmentUserName,
    };
    if (
      UserManagmentFirstName &&
      UserManagmentLastName &&
      UserManagmentUserName &&
      userManagmentAccess
    ) {
      dispatch(addusers(adduserdata));
      dispatch(RsetuserManagmentAddmodal(false));
      dispatch(RsetUserManagmentFirstName(""));
      dispatch(RsetUserManagmentLastName(""));
      dispatch(RsetUserManagmentUserName(""));
      dispatch(RsetUserManagmentPassword(""));
      dispatch(RsetUserManagmentAccess([]));
    } else {
      Swal.fire({
        icon: "error",
        title: "   تمامي مقادير بايد پر شود  ",
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

  return (
    <ConfigProvider direction="rtl" locale={fa_IR}>
      <Modal
        title={` اضافه كردن كاربر `}
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
          <Box>
            <InputLabel className="fw-bold fs-5">نام كاربري </InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) =>
                dispatch(RsetUserManagmentUserName(e.target.value))
              }
            />
          </Box>
          <Box>
            <InputLabel className="fw-bold fs-5">رمز عبور</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) =>
                dispatch(RsetUserManagmentPassword(e.target.value))
              }
            />
          </Box>

          <FormGroup>
            {allAccessOptions.map((item, index) => {
              return (
                <FormControlLabel
                  key={item._id}
                  control={
                    <Checkbox
                      checked={userManagmentAccess.some(
                        (access) => access._id === item._id
                      )}
                      onChange={() => handleAccessChange(item._id)}
                    />
                  }
                  label={item.name}
                />
              );
            })}
          </FormGroup>
        </form>
      </Modal>
    </ConfigProvider>
  );
};

export default UserManagementEditModal;
