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
  RsetfireProofCurrentUser,
  RsetfireProofEditModal,
  RsetfireProofI,
  RsetfireProofa,
  RsetfireProofb,
  RsetfireProofh,
  RsetfireProofmodelCode,
  RsetfireProofsort,
  RsetfireProoftype,
  RsetfireProofweight,
  selectfireProofCurrentUser,
  selectfireProofEditModal,
  selectfireProofI,
  selectfireProofModelCode,
  selectfireProofa,
  selectfireProofb,
  selectfireProofh,
  selectfireProofsort,
  selectfireProoftype,
  selectfireProofweight,
} from "../../../slices/fireProofSlices";
import {
  RsetFactoryManagmentCurrentUser,
  RsetFactoryManagmentEditModal,
  RsetFactoryManagmentEstablish,
  RsetFactoryManagmentLocation,
  RsetFactoryManagmentLogo,
  RsetFactoryManagmentName,
  RsetFactoryManagmentType,
  editfactory,
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

const FactoryManagmentEditModal = () => {
  //   -----------------------------handeling modal selectors
  const dispatch = useDispatch();
  const FactoryManagmentAddmodal = useSelector(selectFactoryManagmentAddmodal);

  const FactoryManagmentEstablish = useSelector(
    selectFactoryManagmentEstablish
  );
  const FactoryManagmentLocation = useSelector(selectFactoryManagmentLocation);
  const FactoryManagmentLogo = useSelector(selectFactoryManagmentLogo);
  const FactoryManagmentName = useSelector(selectFactoryManagmentName);
  const FactoryManagmentType = useSelector(selectFactoryManagmentType);
  const FactoryManagmentEditModa = useSelector(selectFactoryManagmentEditModal);

  const FactoryManagmentCurrentUser = useSelector(
    selectFactoryManagmentCurrentUser
  );

  // -----------------------------------------------

  // Define all possible access options

  const handleModalCancel = () => {
    dispatch(RsetFactoryManagmentEditModal(false));
  };
  // ------------------------sending new input to reducers
  const handleModalEdit = () => {
    if (FactoryManagmentLogo.fileList && FactoryManagmentLogo) {
      const data = new FormData();
      for (var x = 0; x < FactoryManagmentLogo.fileList.length; x++) {
        const file = FactoryManagmentLogo.fileList[x].originFileObj;

        data.append("image", file);
        data.append("name", FactoryManagmentName);
        data.append("address", FactoryManagmentLocation);
        data.append("foundation_year", FactoryManagmentEstablish);
        data.append("factory_type", FactoryManagmentType);
      }

      dispatch(
        editfactory({ data: data, id: FactoryManagmentCurrentUser._id })
      );

      dispatch(RsetFactoryManagmentEditModal(false));
    } else {
      Swal.fire({
        icon: "error",
        title: "خالي بودن مقادير",
        text: "  (عكس جديد نيز آپلود شود)    تمامي مقادير ميبايست پر شود",
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
  useEffect(() => {
    dispatch(
      RsetFactoryManagmentEstablish(FactoryManagmentCurrentUser.foundation_year)
    );
    dispatch(RsetFactoryManagmentLocation(FactoryManagmentCurrentUser.address));
    dispatch(RsetFactoryManagmentLogo(FactoryManagmentCurrentUser.weight));
    dispatch(
      RsetFactoryManagmentType(FactoryManagmentCurrentUser.factory_type)
    );
    dispatch(RsetFactoryManagmentLogo(FactoryManagmentCurrentUser.logo));

    dispatch(RsetFactoryManagmentName(FactoryManagmentCurrentUser.name));
  }, []);

  return (
    <ConfigProvider direction="rtl" locale={fa_IR}>
      <Modal
        title={
          <>
            <h3 className="fw-bold ">{` ويرايش كارخانه  ${FactoryManagmentCurrentUser.name}`}</h3>
          </>
        }
        open={FactoryManagmentEditModa}
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
                ویرایش كارخانه
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
              value={FactoryManagmentName}
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
              value={FactoryManagmentLocation}
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
              value={FactoryManagmentEstablish}
              onChange={(e) =>
                dispatch(RsetFactoryManagmentEstablish(e.target.value))
              }
            />
          </Box>

          <Box>
            <FormControl fullWidth className="my-3">
              <InputLabel
                className="fw-bold fs-5"
                id="demo-simple-select-label"
              >
                نوع كارخانه
              </InputLabel>
              <Select
                className="w-100  "
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={FactoryManagmentType}
                label="نوع كارخانه"
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
            </FormControl>
          </Box>
          <div>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader my-3 w-100  d-flex justify-content-center align-items-center "
              showUploadList={false}
              action="/upload_url"
              beforeUpload={(file) => {
                return false;
              }}
              onChange={(info) => dispatch(RsetFactoryManagmentLogo(info))}
            >
              <Button type="primary" className="w-100 my-3">
                آپلود عكس
              </Button>
            </Upload>
          </div>
        </form>
      </Modal>
    </ConfigProvider>
  );
};

export default FactoryManagmentEditModal;
