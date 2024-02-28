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
  RsetFurnaceObservationAddDimentionModal,
  RsetFurnaceObservationaddrowmodal,
  RsetFurnaceObservationsection,
  selectFurnaceObservationAddDimentionModal,
  selectFurnaceObservationaddrowmodal,
} from "../../../../slices/FurnaceObservationSlices";

const ObservingfurnacesModalAddDimension = () => {
  const FurnaceObservationAddDimentionModal = useSelector(
    selectFurnaceObservationAddDimentionModal
  );
  console.log(FurnaceObservationAddDimentionModal);
  const materialdata = [
    "ديوار ريژ نراتور ",
    " رايدر آرچ",
    "  سقف ريژنراتور",
    "  پورت ها",
    "  ديواره پرت ها",
    "  سقف پورت ها",
    "  كف پورت ها",
    "  داك هوس",
    "  تارگت وال",
    "  فرانت وال",
    "  سياد وال",
    "  سقف كوره",
    "  وركينگ اند",
    "  ديواره وركينگ",
    "  سقف وركينگ ",
    "  ديواره شات آف",
    "  وركينگ بلور",
    "  لايه اول كف",
    "  لايه دوم كف",
    "  لايه سوم كف",
    "  لايه چهارم كف ",
    "  كانال فورهارث",
    "  فيدر ",
    "  گلوگاه",
    "  دودكش",
    "  آجر هاي زنبوري لايه اول",
    "  آجر هاي زنبوري لايه دوم",
    "  آجر هاي زنبوري لايه سوم",
    "  فلوداكت",
  ];

  const totaltonagedata = [
    " نسوز-آجر: مگنسايت  ",
    " نسوز-آجر: مگنسايت - نسوز پارس  ",
    "   نسوز-ملات: شاموت",
    "   نسوز-ملات: سيليمانيت",
    "   نسوز-ملات: مگنسايت",
    "   نسوز-ملات: سيليس",
    "   نسوز - جرم : آلوميا 60",
    "   نسوز - جرم : آلوميا 70",
    "   نسوز - جرم : آلوميا 80",
    "   نسوز - جرم : آلوميا 95",
    "   نسوز - جرم : آلوميا 97",
    "   نسوز - جرم : شاموت ",
    " نسوز-آجر: مگنسايت - دير گداز ايران ",
    " نسوز-آجر: مگنسايت - RHI  ",
    "   نسوز - جرم : سيليس ",
    "   نسوز - جرم : سيليس - PD.REFRACTORY ",
    "   نسوز - جرم : زيركون -ايران آيمدي",
    "   نسوز - جرم : زيركون - PD.REFRACTORY ",
    "   نسوز - جرم : زيركون - ايران آيمدي",
    "   نسوز - جرم: ERSOL 50",
    "    نسوز - جرم: ERSOL 06 - VIDARNA ",
    "   نسوز - جرم: Fondit K 0-3 - REFEL",
    "  نسوز - جرم: ERGAL ",
    "  نسوز - جرم: ERSOL 50 - VIDARNA",
    "  نسوز - جرم: ERSOL 06 - VIDARNA",
    "  آجر هاي زنبوري لايه اول",
    "  آجر هاي زنبوري لايه دوم",
    "  آجر هاي زنبوري لايه سوم",
    "  نسوز - آجر: شاموت",
    "  نسوز - آجر: سیلیسی",
    "  نسوز - آجر: زاک",
    "  نسوز - آجر: مولایت",
    "  نسوز - آجر: ژارگال",
    "  نسوز - آجر: سیلیمانیت",
    "  نسوز - آجر: ایزوله سیلیسی",
    "  نسوز - آجر: Alumina Silica - Ruitai",
    "  نسوز - آجر: زاک - رفل",
    "  نسوز - آجر: ایزوله - آمل کربوراندوم",
    "  نسوز - آجر: زیرکن",

    "  نسوز - آجر: زاک",
    "  نسوز - آجر: شاموت",
    "  نسوز - جرم: ایرفکست",
    "  نسوز - آجر: ایزوله شاموت",
    "  نسوز - آجر: Fused Silica",
    "  نسوز - آجر: High Alumina",

    "  نسوز - آجر: SILICA INS",
    "  نسوز - ملات: سیلیسی",
    "  نسوز - آجر: زیرکن مولایت",
    "  نسوز - آجر: RUBINAL EZ  TG",
    "  نسوز - آجر: ANKER  DG1  TG",
    "  نسوز - آجر: DURITAL  K99EX TG",
    "  نسوز - آجر: ANKER  DG3  TG",
    "  نسوز - آجر: ANKER  DG1  TL",
    "  نسوز - آجر: SIPOREX",
    "  نسوز - فیبر: ایزوله",
    "  نسوز - آجر: Alpha-Beta  Alumina",
    "  نسوز - آجر: Alumina-Zirconia-Silica",
  ];

  const dispatch = useDispatch();

  // -----------------------------handeling modal selectors
  //   const FurnaceObservationaddrowmodal = useSelector(
  //     selectFurnaceObservationaddrowmodal
  //   );

  //   const UserManagmentLastName = useSelector(selectUserManagmentLastName);
  //   const userManagmentAccess = useSelector(selectuserManagmentAccess);
  //   const userManagmentAddmodal = useSelector(selectuserManagmentAddmodal);
  //   const userManagmentCurrentUser = useSelector(selectUserManagmentCurrentUser);
  //   const UserManagmentPassword = useSelector(selectUserManagmentPassword);
  //   const UserManagmentUserName = useSelector(selectUserManagmentUserName);

  // -----------------------------------------------

  // -----------------------------------------------------

  // Define all possible access options

  //   console.log(userManagmentAccess);

  //   const handleAccessChange = (accessItemId) => {
  //     if (userManagmentAccess.some((item) => item._id === accessItemId)) {
  //       console.log(accessItemId);
  //       dispatch(
  //         RsetUserManagmentAccess(
  //           userManagmentAccess.filter((item) => item._id !== accessItemId)
  //         )
  //       );
  //     } else {
  //       const updatedAccess = [
  //         ...userManagmentAccess,
  //         allAccessOptions.find((item) => item._id === accessItemId),
  //       ];
  //       dispatch(RsetUserManagmentAccess(updatedAccess));
  //     }
  //   };

  const handleModalCancel = () => {
    dispatch(RsetFurnaceObservationAddDimentionModal(false));
  };

  //   const handleModalEdit = () => {
  //     const adduserdata = {
  //       first_name: UserManagmentFirstName,
  //       last_name: UserManagmentLastName,
  //       user_access: userManagmentAccess,
  //       password: UserManagmentPassword,
  //       username: UserManagmentUserName,
  //     };
  //     dispatch(addusers(adduserdata));
  //     dispatch(RsetuserManagmentAddmodal(false));
  //   };

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
        open={FurnaceObservationAddDimentionModal}
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
                variant="outlined"
                type="primary"
                color="primary"
                size="large"
                // onClick={() => handleَAddEvent()}
              >
                اضافه كردن رديف
              </Button>
            </div>
          </>
        )}
      >
        <form>
          <Box>
            <InputLabel className="fw-bold fs-5"> تعداد</InputLabel>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              //   onChange={(e) =>
              //     dispatch(RsetUserManagmentFirstName(e.target.value))
              //   }
            />
          </Box>
          <FormControl fullWidth className=" my-3 ">
            <InputLabel
              className="fw-bold fs-5  text-center"
              id="demo-simple-select-standard-label"
            >
              مدل نسوز
            </InputLabel>
            <Select
              className="w-100  "
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              label={" مدل نسوز"}
              value={"پرت ها"}
              //   onChange={(e) =>
              //     dispatch(RsetFurnaceObservationsection(e.target.value))
              //   }
            >
              {materialdata &&
                materialdata.map((item, index) => (
                  <MenuItem
                    dir="rtl"
                    className="text-center w-100 m-auto  "
                    key={index}
                    value={item}
                  >
                    {item}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </form>
      </Modal>
    </ConfigProvider>
  );
};

export default ObservingfurnacesModalAddDimension;
