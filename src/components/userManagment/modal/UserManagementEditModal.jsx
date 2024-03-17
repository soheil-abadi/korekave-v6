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
  RsetUserManagmentUserName,
  RsetUserManagmentPassword,
  selectUserManagmentUserName,
  selectUserManagmentPassword,
  editusers,
} from "../../../slices/userManagmentSlices";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputLabel,
  TextField,
} from "@mui/material";
import { edituser } from "../../../services/authServices";
import Swal from "sweetalert2";

const UserManagementEditModal = () => {
  const dispatch = useDispatch();

  //   -----------------------------handeling modal selectors
  const UserManagmentFirstName = useSelector(selectUserManagmentFirstName);
  const UserManagmentLastName = useSelector(selectUserManagmentLastName);
  const userManagmentAccess = useSelector(selectuserManagmentAccess);
  const userManagmentEditModal = useSelector(selectUserManagmentEditModal);
  const userManagmentCurrentUser = useSelector(selectUserManagmentCurrentUser);
  const UserManagmentPassword = useSelector(selectUserManagmentPassword);
  const UserManagmentUserName = useSelector(selectUserManagmentUserName);
  const userId = userManagmentCurrentUser._id;

  // -----------------------------------------------
  useEffect(() => {
    dispatch(RsetUserManagmentFirstName(userManagmentCurrentUser.first_name));
    dispatch(RsetUserManagmentLastName(userManagmentCurrentUser.last_name));
    dispatch(RsetUserManagmentAccess(userManagmentCurrentUser.user_access));
    dispatch(RsetUserManagmentUserName(userManagmentCurrentUser.username));
    dispatch(RsetUserManagmentPassword(userManagmentCurrentUser.password));
  }, [userManagmentCurrentUser]);
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
  const handleAccessChange = (accessItemId) => {
    if (userManagmentAccess.some((item) => item._id === accessItemId)) {
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
    dispatch(RsetUserManagmentEditModal(false));
    dispatch(RsetUserManagmentFirstName(""));
    dispatch(RsetUserManagmentLastName(""));
    dispatch(RsetUserManagmentUserName(""));
    dispatch(RsetUserManagmentPassword(""));
    dispatch(RsetUserManagmentAccess([]));
  };
  console.log(userManagmentAccess);
  const handleModalEdit = async () => {
    const userValues = {
      first_name: UserManagmentFirstName,
      last_name: UserManagmentLastName,
      username: UserManagmentUserName,
      user_access: userManagmentAccess,
    };

    if (
      UserManagmentFirstName &&
      UserManagmentLastName &&
      UserManagmentUserName &&
      userManagmentAccess
    ) {
      dispatch(editusers({ data: userValues, id: userId }));
      dispatch(RsetUserManagmentFirstName(""));
      dispatch(RsetUserManagmentLastName(""));
      dispatch(RsetUserManagmentUserName(""));
      dispatch(RsetUserManagmentPassword(""));
      dispatch(RsetUserManagmentAccess([]));

      dispatch(RsetUserManagmentEditModal(false));
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
        title={
          <>
            <h3 className="fw-bold ">{`ویرایش كاربر  ${userManagmentCurrentUser.username}`}</h3>
          </>
        }
        open={userManagmentEditModal}
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
          <Box>
            <InputLabel className="fw-bold fs-5"> نام كاربري</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              value={UserManagmentUserName}
              onChange={(e) =>
                dispatch(RsetUserManagmentUserName(e.target.value))
              }
            />
          </Box>
          <Box>
            <InputLabel className="fw-bold fs-5"> رمز عبور</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              value={UserManagmentPassword}
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
