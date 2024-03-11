import React, { useEffect, useState } from "react";
import { Modal, Button, ConfigProvider, Upload } from "antd";
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

import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { getIdFromUrl } from "../../ObservingFurnaces";
import {
  RsetuploadPhotoSubTable,
  RsetuploadPhotoSubTablePic,
  addphotosubtable,
  selectuploadPhotoSubTable,
  selectuploadPhotoSubTableCurrentUser,
  selectuploadPhotoSubTablePic,
} from "../../../../../slices/FurnaceObservationSlices";

const ButtomTableUploadPhotoModal = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const tokenUser = localStorage.getItem("token");

  // Log the value of the token to the console
  console.log(tokenUser);

  // ------------------uploade photo-----------------------------
  const location = useLocation();
  const id = getIdFromUrl(location.pathname);

  const uploadPhotos = () => {
    if (uploadPhotoSubTableCurrentUser && uploadPhotoSubTablePic.fileList) {
      const data = new FormData();
      for (var x = 0; x < uploadPhotoSubTablePic.fileList.length; x++) {
        const file = uploadPhotoSubTablePic.fileList[x].originFileObj;

        data.append("image", file);

        data.append("furnace_event_oid", uploadPhotoSubTableCurrentUser._id);
      }
      dispatch(addphotosubtable({ data: data, id: id }));
      dispatch(RsetuploadPhotoSubTable(false));
    } else {
      Swal.fire({
        icon: "error",
        title: "خالي بودن مقادير",
        text: "عكس يا شرح عكسي براي اين رويداد انتخاب نشده است",
      });
    }
  };

  // -----------------------------------------------------

  const handleModalCancel = () => {
    dispatch(RsetuploadPhotoSubTable(false));
  };

  const uploadPhotoSubTable = useSelector(selectuploadPhotoSubTable);
  const uploadPhotoSubTablePic = useSelector(selectuploadPhotoSubTablePic);

  const uploadPhotoSubTableCurrentUser = useSelector(
    selectuploadPhotoSubTableCurrentUser
  );

  console.log(uploadPhotoSubTableCurrentUser);

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
            <h3 className="fw-bold"> آپلود عكس</h3>
          </>
        }
        open={uploadPhotoSubTable}
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
                onClick={() => uploadPhotos()}
              >
                آپلود عكس
              </Button>
            </div>
          </>
        )}
      >
        <form>
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
              onChange={(info) => dispatch(RsetuploadPhotoSubTablePic(info))}
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

export default ButtomTableUploadPhotoModal;
