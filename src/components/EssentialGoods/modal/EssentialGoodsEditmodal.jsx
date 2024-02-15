import React, { useEffect, useState } from "react";
import { Modal, Button, ConfigProvider } from "antd";
import fa_IR from "antd/lib/locale/fa_IR";
import { useSelector, useDispatch } from "react-redux";

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
  RsetessentialGoodsCurrentUser,
  RsetessentialGoodsEditModal,
  RsetessentialGoodsI,
  RsetessentialGoodsa,
  RsetessentialGoodsb,
  RsetessentialGoodsh,
  RsetessentialGoodsmodelCode,
  RsetessentialGoodssort,
  RsetessentialGoodstype,
  RsetessentialGoodsweight,
  selectessentialGoodsCurrentUser,
  selectessentialGoodsEditModal,
  selectessentialGoodsI,
  selectessentialGoodsModelCode,
  selectessentialGoodsa,
  selectessentialGoodsb,
  selectessentialGoodsh,
  selectessentialGoodssort,
  selectessentialGoodstype,
  selectessentialGoodsweight,
} from "../../../slices/essentialGoodsSlices";

const EssentialGoodsEdditModal = () => {
  const selectoption = ["سنگ  ", "آجر  ", "  نسوز"];
  const type = ["غير منتظم  ", "منتظم  "];
  //   -----------------------------handeling modal selectors
  const essentialGoodsmodelCode = useSelector(selectessentialGoodsModelCode);
  const essentialGoodsa = useSelector(selectessentialGoodsa);

  const essentialGoodsb = useSelector(selectessentialGoodsb);

  const essentialGoodsI = useSelector(selectessentialGoodsI);

  const essentialGoodsh = useSelector(selectessentialGoodsh);
  const essentialGoodstype = useSelector(selectessentialGoodstype);
  const essentialGoodsweight = useSelector(selectessentialGoodsweight);
  const essentialGoodssort = useSelector(selectessentialGoodssort);

  // -----------------------------------------------

  const dispatch = useDispatch();
  const essentialGoodsEditModal = useSelector(selectessentialGoodsEditModal);

  const essentialGoodsCurrentUser = useSelector(
    selectessentialGoodsCurrentUser
  );

  // Define all possible access options

  const handleModalCancel = () => {
    dispatch(RsetessentialGoodsEditModal(false));
  };
  // ------------------------sending new input to reducers
  const handleModalEdit = () => {
    dispatch(
      RsetessentialGoodsCurrentUser({
        ...essentialGoodsCurrentUser,
        sort: essentialGoodssort,
        modelCode: essentialGoodsmodelCode,
        weight: essentialGoodsweight,
        type: essentialGoodstype,
        a: essentialGoodsa,
        b: essentialGoodsb,
        I: essentialGoodsI,
        h: essentialGoodsh,
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
    dispatch(RsetessentialGoodsmodelCode(essentialGoodsCurrentUser.modelcode));
    dispatch(RsetessentialGoodsI(essentialGoodsCurrentUser.I));
    dispatch(RsetessentialGoodsweight(essentialGoodsCurrentUser.Weight));
    dispatch(RsetessentialGoodsa(essentialGoodsCurrentUser.a));

    dispatch(RsetessentialGoodsb(essentialGoodsCurrentUser.b));

    dispatch(RsetessentialGoodsh(essentialGoodsCurrentUser.h));

    dispatch(RsetessentialGoodssort(essentialGoodsCurrentUser.sort));

    dispatch(RsetessentialGoodstype(essentialGoodsCurrentUser.type));
  }, [essentialGoodsCurrentUser]);

  return (
    <ConfigProvider direction="rtl" locale={fa_IR}>
      <Modal
        title={`ويرايش مدل ${essentialGoodsCurrentUser.modelcode}`}
        open={essentialGoodsEditModal}
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
            <InputLabel className="fw-bold fs-5" id="demo-simple-select-label">
              دسته بندي
            </InputLabel>
            <Select
              className="w-100  "
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={essentialGoodssort}
              label=" دسته بندي"
              onChange={(e) => dispatch(RsetessentialGoodssort(e.target.value))}
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
          </Box>
          <Box>
            <InputLabel className="fw-bold fs-5">كد مدل </InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              value={essentialGoodsmodelCode}
              onChange={(e) =>
                dispatch(RsetessentialGoodsmodelCode(e.target.value))
              }
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
              value={essentialGoodstype}
              label="مدل"
              onChange={(e) => dispatch(RsetessentialGoodstype(e.target.value))}
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
          </Box>
          <Box>
            <InputLabel className="fw-bold fs-5">
              وزن در واحد (کیلوگرم):{" "}
            </InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              value={essentialGoodsweight}
              onChange={(e) =>
                dispatch(RsetessentialGoodsweight(e.target.value))
              }
            />
          </Box>
          <Box>
            <InputLabel className="fw-bold fs-5">a(یا x): </InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              value={essentialGoodsa}
              onChange={(e) => dispatch(RsetessentialGoodsa(e.target.value))}
            />
          </Box>
          <Box>
            <InputLabel className="fw-bold fs-5">b: </InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              value={essentialGoodsb}
              onChange={(e) => dispatch(RsetessentialGoodsb(e.target.value))}
            />
          </Box>
          <Box>
            <InputLabel className="fw-bold fs-5">l: </InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              value={essentialGoodsI}
              onChange={(e) => dispatch(RsetessentialGoodsI(e.target.value))}
            />
          </Box>
          <Box>
            <InputLabel className="fw-bold fs-5">h: </InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              value={essentialGoodsh}
              onChange={(e) => dispatch(RsetessentialGoodsh(e.target.value))}
            />
          </Box>
        </form>
      </Modal>
    </ConfigProvider>
  );
};

export default EssentialGoodsEdditModal;
