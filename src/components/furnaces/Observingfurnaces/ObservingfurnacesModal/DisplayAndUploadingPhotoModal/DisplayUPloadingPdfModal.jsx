import React, { useEffect, useState } from "react";
import { Modal, Button, ConfigProvider, Upload } from "antd";
import fa_IR from "antd/lib/locale/fa_IR";
import { useSelector, useDispatch } from "react-redux";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";

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
// import {
//   RsetuploadPhotoDes,
//   RsetuploadPhotoModal,
//   RsetuploadPic,
//   addphoto,
//   selectuploadPhotoCurrentRow,
//   selectuploadPhotoDes,
//   selectuploadPhotoModal,
//   selectuploadPic,
// } from "../../../../slices/FurnaceObservationSlices";

import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { getIdFromUrl } from "../../ObservingFurnaces";
import {
  RsetdisplayPictureModal,
  RsetuploadPhotoDes,
  RsetuploadPhotoModal,
  RsetuploadPic,
  selectFurnaceObservationdisplayPictureModal,
  selectlistOfSubPic,
  selectuploadPhotoCurrentRow,
  selectuploadPhotoDes,
  selectuploadPhotoModal,
} from "../../../../../slices/FurnaceObservationSlices";
import Item from "antd/es/list/Item";

const DisplayUPloadingPhotoModal = () => {
  const dispatch = useDispatch();

  const displayPictureModal = useSelector(
    selectFurnaceObservationdisplayPictureModal
  );

  const listOfSubPic = useSelector(selectlistOfSubPic);

  console.log(listOfSubPic.length);

  // -----------------------------------------------------

  const handleModalCancel = () => {
    dispatch(RsetdisplayPictureModal(false));
  };

  // useEffect(() => {
  //   dispatch(fetchsubtableimg());
  // }, []);
  const modalStyles = {
    header: {
      background: "gray",
      padding: "20px",
    },
    body: {
      borderRadius: 5,
      marginTop: "20px",
      hight: "200px",
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
  const [thumbsSwiper, setThumbsSwiper] = useState();
  return (
    <ConfigProvider direction="ltr" locale={fa_IR}>
      <Modal
        title={
          <>
            <h3 dir="rtl" className="fw-bold text-center">
              دانلود PDF
            </h3>
          </>
        }
        open={displayPictureModal}
        styles={modalStyles}
        closable={false}
        width={900}
        onOk={handleModalCancel}
        onCancel={handleModalCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <div className="bottom-modal d-flex justify-content-between align-items-center gap-3 w-100 flex-row-reverse">
              <Button
                onClick={handleModalCancel}
                className="w-50 m-auto "
                type="primary"
                danger
              >
                بستن
              </Button>
            </div>
          </>
        )}
      >
        <>
          {listOfSubPic.length !== 0 ? (
            <>
              <div className="d-flex justify-content-center align-items-center gap-2  flex-wrap ">
                {listOfSubPic.map((item, index) => {
                  return (
                    <Button
                      key={index}
                      className="  py-4 w-100 d-flex justify-content-center align-items-center "
                      type="primary"
                      icon={<FileDownloadIcon />}
                    >
                      <a
                        className="  w-100 "
                        href={`http://192.168.5.60:8007/api/v1/furnace-material/pdf/download/${item._id}`}
                      >{` ${item.pdf_name_origin}`}</a>
                    </Button>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="d-flex justify-content-center align-items-center fw-bold my-5">
              <h3 className="bg-danger p-3 rounded-2 text-white">
                جهت نمايش وجود ندارد PDF
              </h3>
            </div>
          )}
        </>
      </Modal>
    </ConfigProvider>
  );
};

export default DisplayUPloadingPhotoModal;
