import React, { useEffect, useState } from "react";
import { Modal, Button, ConfigProvider, Upload } from "antd";
import fa_IR from "antd/lib/locale/fa_IR";
import { useSelector, useDispatch } from "react-redux";

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

const DisplayUPloadingPhotoModal = () => {
  const dispatch = useDispatch();

  const displayPictureModal = useSelector(
    selectFurnaceObservationdisplayPictureModal
  );

  const listOfSubPic = useSelector(selectlistOfSubPic);

  // -----------------------------------------------------

  const handleModalCancel = () => {
    dispatch(RsetdisplayPictureModal(false));
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
      innerHeight: "800px",
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
              مشاهده عكس
            </h3>
          </>
        }
        open={displayPictureModal}
        styles={modalStyles}
        closable={false}
        width={1000}
        onOk={handleModalCancel}
        onCancel={handleModalCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <div className="bottom-modal d-flex justify-content-between align-items-center gap-3 w-100 flex-row-reverse">
              <Button
                onClick={handleModalCancel}
                className="w-100 m-auto"
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
          <Swiper
            style={{ height: "700px" }}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
            </SwiperSlide>
          </Swiper>
        </>
      </Modal>
    </ConfigProvider>
  );
};

export default DisplayUPloadingPhotoModal;
