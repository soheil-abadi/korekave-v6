import React, { useEffect, useState } from "react";
import { Modal, Button, ConfigProvider } from "antd";
import fa_IR from "antd/lib/locale/fa_IR";
import { useSelector, useDispatch } from "react-redux";

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
  RsetfireProofAddmodal,
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
  addfireproof,
  editfireproofs,
  selectfireProofAddmodal,
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
import { fireproofadd } from "../../../services/authServices";
import Swal from "sweetalert2";

const AddFireProofModal = () => {
  const selectoption = ["سنگ  ", "آجر  ", "  نسوز"];
  const type = ["غير منتظم  ", "منتظم  "];
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

  const dispatch = useDispatch();

  const fireProofAddmodal = useSelector(selectfireProofAddmodal);

  const fireProofCurrentUser = useSelector(selectfireProofCurrentUser);

  // Define all possible access options

  const handleModalCancel = () => {
    dispatch(RsetfireProofAddmodal(false));
    RsetfireProofmodelCode("");
    RsetfireProofI("");
    RsetfireProofweight("");
    RsetfireProofa("");
    RsetfireProofb("");
    RsetfireProofh("");
    RsetfireProofsort("");
    RsetfireProoftype("");
  };
  // ------------------------sending new input to reducers
  const handleModalEdit = () => {
    const data = {
      category: fireProofsort,
      shape_code: fireProofmodelCode,
      weight: fireProofweight,
      type_name: fireProoftype,
      a_size: fireProofa,
      b_size: fireProofb,
      l_size: fireProofI,
      h_size: fireProofh,
    };
    if (
      fireProofsort &&
      fireProofmodelCode &&
      fireProofweight &&
      fireProoftype &&
      fireProofa &&
      fireProofb &&
      fireProofI &&
      fireProofh
    ) {
      dispatch(addfireproof(data));
      RsetfireProofmodelCode("");
      RsetfireProofI("");
      RsetfireProofweight("");
      RsetfireProofa("");
      RsetfireProofb("");
      RsetfireProofh("");
      RsetfireProofsort("");
      RsetfireProoftype("");
      dispatch(RsetfireProofAddmodal(false));
    } else {
      Swal.fire({
        icon: "error",
        title: " تمامي مقادير بايد پر شود    ",
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
        title={
          <>
            <h3 className="fw-bold ">{`  اضافه كردن مدل و ابعاد نسوز ها  `}</h3>
          </>
        }
        open={fireProofAddmodal}
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
                اضافه كردن
              </Button>
            </div>
          </>
        )}
      >
        <form>
          <Box>
            <FormControl className="my-4" fullWidth>
              <InputLabel
                className="fw-bold fs-5"
                id="demo-simple-select-label"
              >
                نوع
              </InputLabel>
              <Select
                className="w-100  "
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
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
            </FormControl>
          </Box>
          <Box>
            <FormControl fullWidth>
              <InputLabel
                className="fw-bold fs-5"
                id="demo-simple-select-label"
              >
                دسته بندي
              </InputLabel>
              <Select
                className="w-100  "
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                label=" دسته بندي"
                onChange={(e) => dispatch(RsetfireProofsort(e.target.value))}
              >
                {selectoption &&
                  selectoption.map((item, index) => (
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
          <Box>
            <InputLabel className="fw-bold fs-5 my-2">كد مدل </InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) => dispatch(RsetfireProofmodelCode(e.target.value))}
            />
          </Box>

          <Box>
            <InputLabel className="fw-bold fs-5">
              وزن در واحد (کیلوگرم):
            </InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) => dispatch(RsetfireProofweight(e.target.value))}
            />
          </Box>
          <Box>
            <InputLabel className="fw-bold fs-5">a(یا x): </InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) => dispatch(RsetfireProofa(e.target.value))}
            />
          </Box>
          <Box>
            <InputLabel className="fw-bold fs-5">b: </InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) => dispatch(RsetfireProofb(e.target.value))}
            />
          </Box>
          <Box>
            <InputLabel className="fw-bold fs-5">l: </InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) => dispatch(RsetfireProofI(e.target.value))}
            />
          </Box>
          <Box>
            <InputLabel className="fw-bold fs-5">h: </InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) => dispatch(RsetfireProofh(e.target.value))}
            />
          </Box>
        </form>
      </Modal>
    </ConfigProvider>
  );
};

export default AddFireProofModal;
