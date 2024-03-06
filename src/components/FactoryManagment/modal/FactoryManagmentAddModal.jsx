import React, { useEffect, useState } from "react";
import { Modal, Button, ConfigProvider, Upload } from "antd";
import fa_IR from "antd/lib/locale/fa_IR";
import { useSelector, useDispatch } from "react-redux";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import {
  RsetFactoryManagmentAddmodal,
  RsetFactoryManagmentCurrentUser,
  RsetFactoryManagmentEditModal,
  RsetFactoryManagmentEstablish,
  RsetFactoryManagmentLocation,
  RsetFactoryManagmentLogo,
  RsetFactoryManagmentName,
  RsetFactoryManagmentType,
  addfactory,
  selectFactoryManagmentAddmodal,
  selectFactoryManagmentCurrentUser,
  selectFactoryManagmentEditModal,
  selectFactoryManagmentEstablish,
  selectFactoryManagmentLocation,
  selectFactoryManagmentLogo,
  selectFactoryManagmentName,
  selectFactoryManagmentType,
} from "../../../slices/FactoryManagment";
import Swal from "sweetalert2";
const selectoption = ["سنگ  ", "آجر  ", "  نسوز"];
const type = ["غير منتظم  ", "منتظم  "];

const FactoryManagmentAddModal = () => {
  //   -----------------------------handeling modal selectors

  // -----------------------------------------------

  const dispatch = useDispatch();
  const FactoryManagmentAddmodal = useSelector(selectFactoryManagmentAddmodal);

  const FactoryManagmentCurrentUser = useSelector(
    selectFactoryManagmentCurrentUser
  );
  const FactoryManagmentEstablish = useSelector(
    selectFactoryManagmentEstablish
  );
  const FactoryManagmentLocation = useSelector(selectFactoryManagmentLocation);
  const FactoryManagmentLogo = useSelector(selectFactoryManagmentLogo);
  const FactoryManagmentName = useSelector(selectFactoryManagmentName);
  const FactoryManagmentType = useSelector(selectFactoryManagmentType);

  const handleModalCancel = () => {
    dispatch(RsetFactoryManagmentAddmodal(false));
  };
  // ------------------------sending new input to reducers
  const handleModalEdit = () => {
    if (
      FactoryManagmentLogo.fileList &&
      FactoryManagmentLocation &&
      FactoryManagmentEstablish &&
      FactoryManagmentType
    ) {
      const data = new FormData();
      for (var x = 0; x < FactoryManagmentLogo.fileList.length; x++) {
        const file = FactoryManagmentLogo.fileList[x].originFileObj;

        data.append("image", file);
        data.append("name", FactoryManagmentName);
        data.append("address", FactoryManagmentLocation);
        data.append("foundation_year", FactoryManagmentEstablish);
        data.append("factory_type", FactoryManagmentType);
      }

      dispatch(addfactory({ data: data }));
      dispatch(RsetFactoryManagmentAddmodal(false));
    } else {
      Swal.fire({
        icon: "error",
        title: "خالي بودن مقادير",
        text: " تمامي مقادير بايد پر شود   ",
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
  // -----------------seting current data in reducer

  return (
    <ConfigProvider direction="rtl" locale={fa_IR}>
      <Modal
        title={` اضافه كردن كارخانه`}
        open={FactoryManagmentAddmodal}
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
                اضافه كردن كارخانه
              </Button>
            </div>
          </>
        )}
      >
        <form>
          <Box>
            <InputLabel className="fw-bold fs-5">نام كارخانه</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) =>
                dispatch(RsetFactoryManagmentName(e.target.value))
              }
            />
          </Box>
          <Box>
            <InputLabel className="fw-bold fs-5">محل </InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) =>
                dispatch(RsetFactoryManagmentLocation(e.target.value))
              }
            />
          </Box>
          <Box>
            <InputLabel className="fw-bold fs-5">سال تاسيس </InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) =>
                dispatch(RsetFactoryManagmentEstablish(e.target.value))
              }
            />
          </Box>

          <Box>
            <InputLabel className="fw-bold fs-5" id="demo-simple-select-label">
              نوع كارخانه
            </InputLabel>
            <Select
              className="w-100  "
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              label="مدل"
              onChange={(e) =>
                dispatch(RsetFactoryManagmentType(e.target.value))
              }
            >
              {type &&
                type.map((item, index) => (
                  <MenuItem
                    className="text-center w-100 m-auto"
                    key={index}
                    value={item}
                  >
                    {item}
                  </MenuItem>
                ))}
            </Select>
            <div>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader my-3 w-100  d-flex justify-content-center align-items-center "
                showUploadList={false}
                action="/upload_url"
                beforeUpload={(file) => {
                  return false; // Return false to prevent automatic upload
                }}
                onChange={(info) => dispatch(RsetFactoryManagmentLogo(info))}
              >
                <Button type="primary" className="w-100 my-3">
                  آپلود عكس
                </Button>
              </Upload>
            </div>
          </Box>
        </form>
      </Modal>
    </ConfigProvider>
  );
};

export default FactoryManagmentAddModal;
