import React, { useEffect, useState } from "react";
import { Modal, Button, ConfigProvider } from "antd";
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
  selectFactoryManagmentCurrentUser,
  selectFactoryManagmentEditModal,
} from "../../../slices/FactoryManagment";
const selectoption = ["سنگ  ", "آجر  ", "  نسوز"];
const type = ["غير منتظم  ", "منتظم  "];

const FactoryManagmentEditModal = () => {
  //   -----------------------------handeling modal selectors
  const fireProofmodelCode = useSelector(selectfireProofModelCode);
  const fireProofa = useSelector(selectfireProofa);

  const fireProofb = useSelector(selectfireProofb);

  const fireProofI = useSelector(selectfireProofI);

  const fireProofh = useSelector(selectfireProofh);
  const fireProoftype = useSelector(selectfireProoftype);
  const fireProofweight = useSelector(selectfireProofweight);
  const fireProofsort = useSelector(selectfireProofsort);
  // -----------------------------------------------
  console.log(fireProofsort);
  const dispatch = useDispatch();
  const FactoryManagmentEditModa = useSelector(selectFactoryManagmentEditModal);

  const FactoryManagmentCurrentUser = useSelector(
    selectFactoryManagmentCurrentUser
  );
  // Define all possible access options

  const handleModalCancel = () => {
    dispatch(RsetFactoryManagmentEditModal(false));
  };
  // ------------------------sending new input to reducers
  const handleModalEdit = () => {
    dispatch(
      RsetFactoryManagmentCurrentUser({
        ...FactoryManagmentCurrentUser,
        type_name: fireProofsort,
        shape_code: fireProofmodelCode,
        weight: fireProofweight,
        category: fireProoftype,
        a_size: fireProofa,
        b_size: fireProofb,
        l_size: fireProofI,
        h: fireProofh,
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
  // -----------------seting current data in reducer
  useEffect(() => {
    dispatch(
      RsetFactoryManagmentEstablish(FactoryManagmentCurrentUser.shape_code)
    );
    dispatch(RsetFactoryManagmentLocation(FactoryManagmentCurrentUser.l_size));
    dispatch(RsetFactoryManagmentLogo(FactoryManagmentCurrentUser.weight));
    dispatch(RsetFactoryManagmentType(FactoryManagmentCurrentUser.a_size));

    dispatch(RsetFactoryManagmentName(FactoryManagmentCurrentUser.b_size));
  }, []);
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log(event);
    // Handle the uploaded file
  };

  console.log(FactoryManagmentCurrentUser);
  return (
    <ConfigProvider direction="rtl" locale={fa_IR}>
      <Modal
        title={`ويرايش مدل ${FactoryManagmentCurrentUser.shape_code}`}
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
                ویرایش کاربر
              </Button>
            </div>
          </>
        )}
      >
        <form>
          <Box>
            <InputLabel className="fw-bold fs-5">
              وزن در واحد (کیلوگرم):{" "}
            </InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              value={fireProofweight}
              onChange={(e) => dispatch(RsetfireProofweight(e.target.value))}
            />
          </Box>
          <Box>
            <InputLabel className="fw-bold fs-5">a(یا x): </InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              value={fireProofa}
              onChange={(e) => dispatch(RsetfireProofa(e.target.value))}
            />
          </Box>
          <Box>
            <InputLabel className="fw-bold fs-5">b: </InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              value={fireProofb}
              onChange={(e) => dispatch(RsetfireProofb(e.target.value))}
            />
          </Box>
          <Box>
            <InputLabel className="fw-bold fs-5">l: </InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              value={fireProofI}
              onChange={(e) => dispatch(RsetfireProofI(e.target.value))}
            />
          </Box>
          <Box>
            <InputLabel className="fw-bold fs-5" id="demo-simple-select-label">
              نوع
            </InputLabel>
            <Select
              className="w-100  "
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={fireProoftype}
              label="مدل"
              onChange={(e) => dispatch(RsetfireProoftype(e.target.value))}
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
            <div className="my-3  p-3">
              <Input
                accept="image/*"
                id="contained-button-file"
                type="file"
                onChange={handleFileUpload}
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  color="default"
                  component="span"
                  startIcon={<CloudUploadOutlinedIcon />}
                >
                  بارگزاري لوگو
                </Button>
              </label>
            </div>
          </Box>
        </form>
      </Modal>
    </ConfigProvider>
  );
};

export default FactoryManagmentEditModal;
