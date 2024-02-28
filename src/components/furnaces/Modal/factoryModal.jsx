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
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { edituser } from "../../../services/authServices";
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
  editfurnace,
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
import { FormControl } from "react-bootstrap";
import { getIdFromUrl } from "../Observingfurnaces/ObservingFurnaces";
import { useLocation } from "react-router-dom";

const FurnacesModal = () => {
  const location = useLocation();
  const id = getIdFromUrl(location.pathname);

  const typedata = ["sideport", "endport"];
  const enetrydata = ["deepchanel", "working"];
  const dispatch = useDispatch();
  // -----------------------------------selects
  const FactoryEditModal = useSelector(selectFactoryEditModal);
  const factorysname = useSelector(selectfactorysname);
  const factoryVolume = useSelector(selectfactoryVolume);

  const factoryWorkingVolume = useSelector(selectfactoryWorkingVolume);

  const factorycapicity = useSelector(selectfactorycapicity);

  const factorytype = useSelector(selectfactorytype);

  const canals = useSelector(selectcanals);

  const surfaceofmaterial = useSelector(selectsurfaceofmaterial);

  const enteryType = useSelector(selectenteryType);

  const handlecancelmodal = () => {
    dispatch(RsetfactoryEditModal(false));
  };

  const handlefurnace = () => {
    const durnaceEdit = {};
    editfurnaces(id, durnaceEdit);
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
        title={`ویرایش كوره `}
        open={FactoryEditModal}
        styles={modalStyles}
        closable={false}
        onOk={handlecancelmodal}
        onCancel={handlecancelmodal}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <div className="bottom-modal d-flex justify-content-between align-items-center gap-3 w-100">
              <Button
                style={{ background: "red", color: "white" }}
                size="large"
                onClick={() => handlecancelmodal()}
              >
                لغو
              </Button>
              <Button
                className="w-100"
                variant="outlined"
                type="primary"
                color="primary"
                size="large"
                onClick={() => handlefurnace()}
              >
                ويرايش كوره
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
              // value={UserManagmentFirstName}
              onChange={(e) => dispatch(Rsetfactorysname(e.target.value))}
            />
          </Box>
          <Box>
            <InputLabel
              className="fw-bold fs-5"
              id="demo-simple-select-standard-label"
            >
              دسته بندي
            </InputLabel>
            <Select
              className="w-100  "
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              // value={essentialGoodssort}
              label={"نوع "}
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
          </Box>
          <Box>
            <InputLabel className="fw-bold fs-5"> ظرفيت(تن)</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              // value={UserManagmentLastName}
              onChange={(e) => dispatch(Rsetfactorycapicity(e.target.value))}
            />
          </Box>
          <Box>
            <InputLabel className="fw-bold fs-5"> حجم كوره</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              // value={UserManagmentUserName}
              onChange={(e) => dispatch(RsetfactoryVolume(e.target.value))}
            />
          </Box>
          <Box>
            <InputLabel className="fw-bold fs-5">
              {" "}
              حجم working (متر مکعب):
            </InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              // value={UserManagmentPassword}
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
              // value={UserManagmentPassword}
              onChange={(e) => dispatch(Rsetsurfaceofmaterial(e.target.value))}
            />
          </Box>
          <Box>
            <InputLabel className="fw-bold fs-5">
              {" "}
              تعداد خطوط کانال (FOREHEARTH){" "}
            </InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              // value={UserManagmentPassword}
              onChange={(e) => dispatch(Rsetcanals(e.target.value))}
            />
          </Box>
          <Box>
            <InputLabel
              className="fw-bold fs-5"
              id="demo-simple-select-standard-label"
            >
              نوع ورودی کانال{" "}
            </InputLabel>
            <Select
              className="w-100  "
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              // value={essentialGoodssort}
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
          </Box>
        </form>
      </Modal>
    </ConfigProvider>
  );
};

export default FurnacesModal;
