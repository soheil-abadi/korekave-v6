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
      data.append("furnace_material_oid", uploadPhotoSubTableCurrentUser._id);
      for (var x = 0; x < uploadPhotoSubTablePic.fileList.length; x++) {
        const file = uploadPhotoSubTablePic.fileList[x].originFileObj;

        data.append("pdf", file);
      }
      dispatch(addphotosubtable({ data: data, id: id }));
      dispatch(RsetuploadPhotoSubTable(false));
      dispatch(RsetuploadPhotoSubTablePic(""));
    } else {
      Swal.fire({
        icon: "error",
        title: "خالي بودن مقادير",
        text: "فايلي انتخاب نشده است         ",
      });
    }
  };

  // -----------------------------------------------------

  const handleModalCancel = () => {
    dispatch(RsetuploadPhotoSubTable(false));
    dispatch(RsetuploadPhotoSubTablePic(""));
  };

  const uploadPhotoSubTable = useSelector(selectuploadPhotoSubTable);
  const uploadPhotoSubTablePic = useSelector(selectuploadPhotoSubTablePic);

  console.log(uploadPhotoSubTablePic);

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
            <h3 className="fw-bold"> آپلود PDF</h3>
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
              multiple={true}
              action="/upload_url"
              beforeUpload={(file) => {
                const isPDF = file.type === "application/pdf";
                if (!isPDF) {
                  Swal.fire(" تنها فرمت پي دي اف قابل قبول ميباشد  ");
                }
                return isPDF;
              }}
              onChange={(info) => {
                const pdfFiles = info.fileList.filter(
                  (file) => file.type === "application/pdf"
                );
                dispatch(RsetuploadPhotoSubTablePic({ fileList: pdfFiles }));
                console.log(info);
              }}
            >
              <Button type="primary" className="w-100 my-3">
                آپلود PDF
              </Button>
            </Upload>
            <hr />
            <div>
              {uploadPhotoSubTablePic.fileList &&
                uploadPhotoSubTablePic.fileList.map((item, index) => {
                  return (
                    <>
                      <ul>
                        <li>
                          <p key={index}>{item.name}</p>
                        </li>
                      </ul>
                    </>
                  );
                })}
            </div>
          </div>
        </form>
      </Modal>
    </ConfigProvider>
  );
};

export default ButtomTableUploadPhotoModal;
