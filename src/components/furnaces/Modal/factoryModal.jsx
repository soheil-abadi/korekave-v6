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
  RsetfactoryEditModal,
  RsetfactoryVolume,
  RsetfactoryWorkingVolume,
  Rsetfactorycapicity,
  Rsetfactorysname,
  Rsetfactorytype,
  Rsetsurfaceofmaterial,
  editfurnaces,
  selectFactoryEditModal,
  selectcanals,
  selectenteryType,
  selectfactoryVolume,
  selectfactoryWorkingVolume,
  selectfactorycapicity,
  selectfactorysname,
  selectfactorytype,
  selectsurfaceofmaterial,
} from "../../../slices/factory";
import {
  dashboardgetfurances,
  selectfurances,
} from "../../../slices/Dashboard";
import { getIdFromUrl } from "../Observingfurnaces/ObservingFurnaces";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const FactoryModal = ({ card }) => {
  const location = useLocation();
  const id = getIdFromUrl(location.pathname);
  const dispatch = useDispatch();
  const typedata = ["side-port", "end-port"];
  const enetrydata = ["deep chanel", "working"];

  const furances = useSelector(selectfurances);

  useEffect(() => {
    dispatch(RsetfactoryVolume(card.furnace_volume));
    dispatch(RsetfactoryWorkingVolume(card.working_volume));
    dispatch(Rsetfactorysname(card.name));
    dispatch(Rsetfactorycapicity(card.capacity));
    dispatch(RsetenteryType(card.channel_entrance_type));
    dispatch(Rsetfactorytype(card.furnace_type));
    dispatch(Rsetcanals(card.channel_line_count));
    dispatch(Rsetsurfaceofmaterial(card.solder_bath_surface));
  }, [card]);

  const editfurnace = () => {
    const data = {
      name: factorysname,
      furnace_type: factorytype,
      capacity: factorycapicity,
      furnace_volume: factoryVolume,
      working_volume: factoryWorkingVolume,
      solder_bath_surface: surfaceofmaterial,
      channel_line_count: canals,
      channel_entrance_type: enteryType,
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
      dispatch(editfurnaces({ data: data, id: id }));
      dispatch(RsetfactoryVolume(""));
      dispatch(RsetfactoryWorkingVolume(""));
      dispatch(Rsetfactorysname(""));
      dispatch(Rsetfactorycapicity(""));
      dispatch(RsetenteryType(""));
      dispatch(Rsetfactorytype(""));
      dispatch(Rsetcanals(""));
      dispatch(Rsetsurfaceofmaterial(""));
      dispatch(RsetfactoryEditModal(false));
    } else {
      Swal.fire({
        icon: "error",
        title: "  مقادير خالي",
        text: " تمامي مقادير بايد پر شود        ",
      });
    }
  };

  const factoryWorkingVolume = useSelector(selectfactoryWorkingVolume);

  const factorycapicity = useSelector(selectfactorycapicity);

  const factorytype = useSelector(selectfactorytype);

  const canals = useSelector(selectcanals);

  const surfaceofmaterial = useSelector(selectsurfaceofmaterial);

  const enteryType = useSelector(selectenteryType);
  const factorysname = useSelector(selectfactorysname);
  const FactoryEditModal = useSelector(selectFactoryEditModal);
  const factoryVolume = useSelector(selectfactoryVolume);

  const handleModalCancel = () => {
    dispatch(RsetfactoryEditModal(false));
    dispatch(RsetfactoryVolume(""));
    dispatch(RsetfactoryWorkingVolume(""));
    dispatch(Rsetfactorysname(""));
    dispatch(Rsetfactorycapicity(""));
    dispatch(RsetenteryType(""));
    dispatch(Rsetfactorytype(""));
    dispatch(Rsetcanals(""));
    dispatch(Rsetsurfaceofmaterial(""));
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
            <h3 className="fw-bold fs-3  "> ويرايش كوره {factorysname}</h3>
          </>
        }
        open={FactoryEditModal}
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
                onClick={() => editfurnace()}
              >
                ويرايش كوره
              </Button>
            </div>
          </>
        )}
      >
        <form>
          <Box>
            <InputLabel className="fw-bold fs-5 ">نام كوره </InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              value={factorysname}
              onChange={(e) => dispatch(Rsetfactorysname(e.target.value))}
            />
          </Box>
          <Box>
            <FormControl fullWidth className=" my-3 ">
              <InputLabel
                className="fw-bold  fs-5"
                id="demo-simple-select-standard-label"
              >
                نوع
              </InputLabel>
              <Select
                className="w-100  "
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={factorytype}
                label={" نوع "}
                onChange={(e) => dispatch(Rsetfactorytype(e.target.value))}
              >
                {typedata &&
                  typedata.map((item, index) => (
                    <MenuItem
                      dir="rtl"
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
            <InputLabel className="fw-bold fs-5 my-2"> ظرفيت(تن)</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              value={factorycapicity}
              onChange={(e) => dispatch(Rsetfactorycapicity(e.target.value))}
            />
          </Box>
          <Box>
            <InputLabel className="fw-bold fs-5"> حجم كوره</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              value={factoryVolume}
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
              value={factoryWorkingVolume}
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
              value={surfaceofmaterial}
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
              value={canals}
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
                value={enteryType}
                label={"نوع ورودي"}
                onChange={(e) => dispatch(RsetenteryType(e.target.value))}
              >
                {enetrydata &&
                  enetrydata.map((item, index) => (
                    <MenuItem
                      dir="rtl"
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

export default FactoryModal;
