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
  Rsetcanals,
  RsetenteryType,
  RsetfactoryAddModal,
  RsetfactoryVolume,
  RsetfactoryWorkingVolume,
  Rsetfactorycapicity,
  Rsetfactorysname,
  Rsetfactorytype,
  Rsetsurfaceofmaterial,
  addfurnaces,
  selectFactoryEditModal,
  selectcanals,
  selectenteryType,
  selectfactoryAddModal,
  selectfactoryVolume,
  selectfactoryWorkingVolume,
  selectfactorycapicity,
  selectfactorysname,
  selectfactorytype,
  selectsurfaceofmaterial,
} from "../../../slices/factory";
import { getIdFromUrl } from "../Observingfurnaces/ObservingFurnaces";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const FactoryAddModal = () => {
  const location = useLocation();
  const id = getIdFromUrl(location.pathname);
  const dispatch = useDispatch();
  const typedata = ["sideport", "endport"];
  const enetrydata = ["deepchanel", "working"];
  const factoryAddModal = useSelector(selectfactoryAddModal);
  const factorysname = useSelector(selectfactorysname);
  const factoryVolume = useSelector(selectfactoryVolume);

  const factoryWorkingVolume = useSelector(selectfactoryWorkingVolume);

  const factorycapicity = useSelector(selectfactorycapicity);

  const factorytype = useSelector(selectfactorytype);

  const canals = useSelector(selectcanals);

  const surfaceofmaterial = useSelector(selectsurfaceofmaterial);

  const enteryType = useSelector(selectenteryType);

  const handleModalCancel = () => {
    dispatch(RsetfactoryAddModal(false));
  };

  const addfurnace = () => {
    const data = {
      name: factorysname,
      furnace_type: factorytype,
      capacity: factorycapicity,
      furnace_volume: factoryVolume,
      working_volume: factoryWorkingVolume,
      solder_bath_surface: surfaceofmaterial,
      channel_line_count: canals,
      channel_entrance_type: enteryType,
      factory_oid: id,
    };
    if (
      factorysname &&
      factorytype &&
      factorycapicity &&
      factoryVolume &&
      factoryWorkingVolume &&
      surfaceofmaterial &&
      canals &&
      enteryType
    ) {
      dispatch(addfurnaces({ data: data, id: id }));
      dispatch(RsetfactoryVolume(""));
      dispatch(RsetfactoryWorkingVolume(""));
      dispatch(Rsetfactorysname(""));
      dispatch(Rsetfactorycapicity(""));
      dispatch(RsetenteryType(""));
      dispatch(Rsetfactorytype(""));
      dispatch(Rsetcanals(""));
      dispatch(Rsetsurfaceofmaterial(""));
      dispatch(RsetfactoryAddModal(false));
    } else {
      Swal.fire({
        icon: "error",
        title: "  مقادير خالي",
        text: " تمامي مقادير بايد پر شود        ",
      });
    }
  };

  const modalStyles = {
    header: {
      background: "lightgray",
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
            <h3 className="fw-bold fs-3  "> اضافه كردن كوره </h3>
          </>
        }
        open={factoryAddModal}
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
                onClick={() => addfurnace()}
              >
                اضافه كردن كوره
              </Button>
            </div>
          </>
        )}
      >
        <form>
          <Box>
            <InputLabel className="fw-bold fs-5">نام كوره</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) => dispatch(Rsetfactorysname(e.target.value))}
            />
          </Box>
          <Box>
            <FormControl fullWidth className=" my-3 ">
              <InputLabel
                className="fw-bold fs-5"
                id="demo-simple-select-standard-label"
              >
                نوع
              </InputLabel>
              <Select
                className="w-100  "
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                label={" نوع "}
                onChange={(e) => dispatch(Rsetfactorytype(e.target.value))}
              >
                {typedata &&
                  typedata.map((item, index) => (
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
            <InputLabel className="fw-bold fs-5"> ظرفيت(تن)</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) => dispatch(Rsetfactorycapicity(e.target.value))}
            />
          </Box>
          <Box>
            <InputLabel className="fw-bold fs-5"> حجم كوره</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) => dispatch(RsetfactoryVolume(e.target.value))}
            />
          </Box>
          <Box>
            <InputLabel className="fw-bold fs-5">
              حجم working (متر مکعب):
            </InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) =>
                dispatch(RsetfactoryWorkingVolume(e.target.value))
              }
            />
          </Box>
          <Box>
            <InputLabel className="fw-bold fs-5"> سطح حمام قلع </InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) => dispatch(Rsetsurfaceofmaterial(e.target.value))}
            />
          </Box>
          <Box>
            <InputLabel className="fw-bold fs-5">
              {" "}
              تعداد خطوط کانال (FOREHEARTH)
            </InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) => dispatch(Rsetcanals(e.target.value))}
            />
          </Box>
          <Box>
            <FormControl fullWidth className=" my-3 ">
              <InputLabel
                className="fw-bold fs-5"
                id="demo-simple-select-standard-label"
              >
                نوع ورودی
              </InputLabel>
              <Select
                className="w-100  "
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                label={"نوع ورودي"}
                onChange={(e) => dispatch(RsetenteryType(e.target.value))}
              >
                {enetrydata &&
                  enetrydata.map((item, index) => (
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
        </form>
      </Modal>
    </ConfigProvider>
  );
};

export default FactoryAddModal;
