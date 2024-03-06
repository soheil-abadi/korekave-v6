import React, { useEffect, useState } from "react";
import {
  Table,
  Collapse,
  Tabs,
  Popconfirm,
  Modal,
  Form,
  Input,
  Upload,
  Empty,
} from "antd";
import { Button } from "react-bootstrap";
import TabPane from "antd/lib/tabs/TabPane";
import ObservingfurnaceAddEventModal from "./ObservingfurnacesModal/ObservingfurnaceAddEventModal";
import ObservingfurnacesModalAddRow from "./ObservingfurnacesModal/ObservingfurnacesModalAddRow";
import ObservingfurnacesModalAddDimension from "./ObservingfurnacesModal/ObservingfurnacesModalAddDimension";
import ListIcon from "@mui/icons-material/List";
import UploadImageModal from "./ObservingfurnacesModal/UploadImageModal";
import moment from "moment-jalaali";
import UndoIcon from "@mui/icons-material/Undo";

import NewFactoryNewFurnaceModal from "./ObservingfurnacesModal/NewFurnaceModal/newFactoryNewFurnaceModal";
import NewFactoryFurnaceAddEvent from "./ObservingfurnacesModal/NewFurnaceModal/newFactoryFurnaceAddEvent";

import { useDispatch, useSelector } from "react-redux";
import {
  RsetFurnaceObservationAddDimentionModal,
  RsetFurnaceObservationAddTabs,
  RsetFurnaceObservationStatusModal,
  RsetFurnaceObservationaddrowmodal,
  RsetFurnaceObservationoveralAddTabs,
  RsetFurnaceObservationsection,
  selectFurnaceObservationAddDimentionModal,
  selectFurnaceObservationAddTabs,
  selectFurnaceObservationDateOfEnd,
  selectFurnaceObservationDateOfStart,
  selectFurnaceObservationDescriptionP,
  selectFurnaceObservationEventName,
  selectFurnaceObservationStatusModal,
  selectFurnaceObservationTypeOfEvent,
  selectFurnaceObservationaddrowmodal,
  selectFurnaceObservationoveralAddTabs,
  selectFurenceObserEvents,
  RsteFurenceObserEvents,
  RsetListReloader,
  selectListReloader,
  selectFurnaceObservationFormatTabs,
  RsetFurnaceObservationFormatTabs,
  finalingevent,
  selectuploadPhotoModal,
  RsetuploadPhotoModal,
  RsetuploadPhotoCurrentRow,
  deletematerials,
  RsetFurnaceObservationAddDimentioncurrentmaterial,
  Rsetcurrenfurnaceid,
  selectFurnaceObservationcurrenfurnaceid,
  selectaddDimentionModal,
  RsetaddDimentionModal,
  selectaddEventModal,
} from "../../../slices/FurnaceObservationSlices";
import {
  RsetFurnaceDistributeAddmodal,
  selectFurnaceDistributeType,
} from "../../../slices/FurnaceDistribute";
import { Container } from "@mui/material";
import {
  getsinglefurance,
  selectsinglefurances,
} from "../../../slices/Dashboard";
import { useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { uploadephoto } from "../../../services/authServices";

const { Panel } = Collapse;

export const getIdFromUrl = (pathname) => {
  const urlParts = pathname.split("/");
  return urlParts[urlParts.length - 1];
};

const ObservingFurnaces = () => {
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();
  const location = useLocation();
  const id = getIdFromUrl(location.pathname);

  const singlefurances = useSelector(selectsinglefurances);
  const furenceObserEvents = useSelector(selectFurenceObserEvents);
  const addDimentionModal = useSelector(selectaddDimentionModal);
  const addEventModal = useSelector(selectaddEventModal);

  const listReloader = useSelector(selectListReloader);
  const [material, setmaterial] = useState([]);

  useEffect(() => {
    dispatch(getsinglefurance(id));
  }, [dispatch]);

  useEffect(() => {
    console.log(singlefurances);
  }, [singlefurances]);

  const materialdata = singlefurances.furnaceMaterials;
  useEffect(() => {
    if (singlefurances.furnaceDimension !== undefined) {
      if (singlefurances.furnaceDimension.length === 0) {
        dispatch(RsetaddDimentionModal(true));
      }
    }
  }, [singlefurances]);

  useEffect(() => {
    if (singlefurances.furnaceMaterials !== undefined) {
      const materials = singlefurances.furnaceMaterials.map(
        (item) => item.materialPerShape_
      );
      setmaterial(materials);
    }
  }, [singlefurances]);

  const columnstop = [
    {
      title: "نام كوره",
      dataIndex: "name",
      key: "name",
      render: (text) => <span className="fw-bold fs-5">{text}</span>, // Apply custom class to render function
    },
    {
      title: "نوع",
      dataIndex: "furnace_type",
      key: "furnace_type",
      render: (text) => <span className="fw-bold fs-5">{text}</span>, // Apply custom class to render function
    },
    {
      title: "حجم كوره",
      dataIndex: "capacity",
      key: "capacity",
      render: (text) => <span className="fw-bold fs-5">{text}</span>, // Apply custom class to render function
    },
    {
      title: " ظرفيت كوره ",
      dataIndex: "furnace_volume",
      key: "furnace_volume",
      render: (text) => <span className="fw-bold fs-5">{text}</span>, // Apply custom class to render function
    },
    {
      title: "حجم working",
      dataIndex: "working_volume",
      key: "working_volume",
      render: (text) => <span className="fw-bold fs-5">{text}</span>, // Apply custom class to render function
    },
    {
      title: "سطح حمام قلع",
      dataIndex: "solder_bath_surface",
      key: "solder_bath_surface",
      render: (text) => <span className="fw-bold fs-5">{text}</span>, // Apply custom class to render function
    },

    {
      title: "عمليات",
      key: "عمليات",
      render: (text, record) => (
        <Button onClick={() => toggleTable(text, record)}>اطلاعات بيشتر</Button>
      ),
    },
  ];

  // ----------------------------------------------------------------------------------------------

  const columnsbuttom = [
    {
      title: " شروع استفاده	",
      dataIndex: "first_usage_event_id",
      key: "first_usage_event_id ",
      render: (text) => <span className="fw-bold ">{text}</span>, // Apply custom class to render function
    },
    {
      title: " بخش",
      dataIndex: "furnace_parts_name",
      key: "furnace_parts_name",
      render: (text) => <span className="fw-bold ">{text}</span>, // Apply custom class to render function
    },
    {
      title: "متريال ",
      dataIndex: "materials_category",
      key: "materials_category",
      render: (text) => <span className="fw-bold ">{text}</span>, // Apply custom class to render function
    },
    {
      title: "كشور سازنده",
      dataIndex: "materials_manufacturing_country",
      key: "materials_manufacturing_country",
      render: (text) => <span className="fw-bold ">{text}</span>, // Apply custom class to render function
    },
    {
      title: "شركت توليد كننده",
      dataIndex: "materials_manufacturer",
      key: "materials_manufacturer",
      render: (text) => <span className="fw-bold ">{text}</span>, // Apply custom class to render function
    },
    {
      title: "وزن (تناژ)",
      dataIndex: "weight",
      key: "weight",
      render: (text) => <span className="fw-bold ">{text}</span>, // Apply custom class to render function
    },

    {
      title: "ابعاد و تعداد	",
      key: "action",
      width: 300,

      render: (text, record) => (
        <ul>
          {record.shape_code_custome.map((item, index) => (
            <>
              <li className="fw-bold" key={index}>
                {item.shape}
              </li>
              <p className="fw-bold"> تعداد : {item.numbers}</p>
            </>
          ))}
        </ul>
      ),
    },

    ,
    {
      title: "ابعاد و تعداد	",
      key: "action",
      width: 150, // Set the width to 100px

      render: (text, record) => (
        <Popconfirm
          className="bg-danger"
          title="حذف"
          description=" آيا از حذف اين سطر مطمئن هستيد ؟"
          onConfirm={() => {
            dispatch(deletematerials({ itemId: record._id, furnaceId: id }));
          }}
        >
          <Button type="primary">حذف </Button>
        </Popconfirm>
      ),
    },
    {
      title: "افزودن",
      key: "action",
      render: (record) => (
        <Button
          onClick={() => {
            dispatch(RsetFurnaceObservationAddDimentionModal(true));
            dispatch(
              RsetFurnaceObservationAddDimentioncurrentmaterial(record._id)
            );
          }}
        >
          اضافه كردن ابعاد
        </Button>
      ),
    },
  ];

  // -----------------handling currend datas for events--------------------------

  // ------------------handle event for adding event-----------------------

  // --------------------------------------------

  const columnsevent = [
    {
      title: "نام رويداد ",
      dataIndex: "name ",
      key: "event",
      hidden: true,
    },
    {
      title: "تاريخ شروع",
      dataIndex: "begin_date",
      key: "begin_date",
      render: (text) => moment(text).format("jYYYY/jMM/jDD"), // Convert Gregorian to Solar
    },
    {
      title: "تاريخ پايان",
      dataIndex: "end_date",
      key: "end_date",
      render: (text) => moment(text).format("jYYYY/jMM/jDD"), // Convert Gregorian to Solar
    },
    {
      title: "نوع رويداد",
      dataIndex: "event_type",
      key: "event_type",
    },
    {
      title: "توضيحات",
      dataIndex: "description",
      key: "description",
      width: 500,
    },
    {
      title: "عمليات",
      dataIndex: "function",
      key: "function",
      width: 150,
      render: (text, record) => (
        <>
          <Button
            onClick={() => {
              dispatch(RsetuploadPhotoModal(true));
              dispatch(RsetuploadPhotoCurrentRow(record));
            }}
            type="primary"
          >
            آپلود عكس
          </Button>
        </>
      ),
    },
    {
      title: "عمليات",
      dataIndex: "function",
      key: "function",
      width: 150,
      render: (text, record) => (
        <Popconfirm
          className="bg-danger"
          title="نهايي سازي"
          description="   آيا از نهايي كردن اين سطر مطمئن هستيد ؟  "
          onConfirm={() => {
            dispatch(finalingevent(record._id));
            dispatch(getsinglefurance(id));
          }}
        >
          <Button
            style={{ display: record.is_final ? "none" : "" }}
            type="primary"
          >
            نهايي سازي
          </Button>
        </Popconfirm>
      ),
    },
  ];

  // --------------------------------------

  const columnsmini = [
    {
      title: " بخش كوره",
      dataIndex: "furnace_part_name",
      key: "furnace_part_name",
      width: 100,
      render: (text) => <span className="fw-bold fs-5">{text}</span>, // Apply custom class to render function
    },
    {
      title: " طول",
      dataIndex: "length",
      key: "length",
      width: 100,
      render: (text) => <span className="fw-bold fs-5">{text}</span>, // Apply custom class to render function
    },
    {
      title: " عرض",
      dataIndex: "width",
      key: "width",
      width: 100,
      render: (text) => <span className="fw-bold fs-5">{text}</span>, // Apply custom class to render function
    },
    {
      title: "ارتفاع",
      dataIndex: "height",
      key: "height",
      width: 100,
      render: (text) => <span className="fw-bold fs-5">{text}</span>, // Apply custom class to render function
    },
  ];

  // -------------------------------------------

  const columns4 = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
  ];
  const paginationConfig = {
    position: ["bottomCenter"],
    showTotal: (total) => <span className="font12">مجموع : {total}</span>,
    pageSize: 10,
    showSizeChanger: false,
    pageSizeOptions: [],
    size: "small",
  };
  //   ------------------------------------------------------------------------------------
  const [image, setImage] = useState(null);
  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  // ------------------------------------------------------delete material

  // ------------------------------------------------------handling event modal
  const [activeT, setActiveT] = useState("tab2");

  const toggleTable = () => {
    setShowTable(!showTable);
  };

  const handleTabChan = (key) => {
    setActiveT(key);
  };
  const [showTable, setShowTable] = useState(false);

  // -----------------------------handling slices
  const FurnaceObservationStatusModal = useSelector(
    selectFurnaceObservationStatusModal
  );
  const uploadPhotoModal = useSelector(selectuploadPhotoModal);

  const FurnaceObservationDateOfEnd = useSelector(
    selectFurnaceObservationTypeOfEvent
  );
  const FurnaceObservationDateOfStart = useSelector(
    selectFurnaceObservationDateOfStart
  );
  const FurnaceDistributeType = useSelector(selectFurnaceDistributeType);
  const FurnaceObservationDescriptionP = useSelector(
    selectFurnaceObservationDescriptionP
  );
  const eventname = useSelector(selectFurnaceObservationEventName);
  const AddTabs = useSelector(selectFurnaceObservationAddTabs);
  const formattabs = useSelector(selectFurnaceObservationFormatTabs);

  // dispatch(RsetFurnaceObservationAddTabs(singlefurances[0].furnace_Events));
  // -----------------add row modal slices
  const FurnaceObservationaddrowmodal = useSelector(
    selectFurnaceObservationaddrowmodal
  );

  // ---------------add dimention modal
  const FurnaceObservationAddDimentionModal = useSelector(
    selectFurnaceObservationAddDimentionModal
  );

  // -----------------------handling event

  const [event, setevent] = useState([]);
  const [eventName, seteventname] = useState([]);

  useEffect(() => {
    if (singlefurances.furnaceEvents !== undefined) {
      const allevent = singlefurances.furnaceEvents.map((item) => item).flat();
      const eventname = singlefurances.furnaceEvents
        .map((item) => item.name)
        .flat();
      setevent(allevent);
      seteventname(eventname);
    }
  }, [singlefurances]);

  // --------------------uploade photo function
  const [pic, setPic] = useState([]);

  useEffect(() => {
    if (singlefurances.furnaceEvents !== undefined) {
      const allPictures = singlefurances.furnaceEvents
        .map((item) => item.pictures)
        .flat();
      setPic(allPictures);
    }
  }, [singlefurances]);

  return (
    <>
      <div className="py-4 mx-4">
        <div
          className="d-flex justify-content-between text-white py-3  borderRadius-top "
          style={{ background: "#485550" }}
        >
          <div className="ms-4 mt-1">
            <span className="me-2">
              <ListIcon />
            </span>
            {`مديريت  كوره`}
          </div>
        </div>
        <div className="topinformation ">
          <Table
            className="py-5"
            columns={columnstop}
            dataSource={singlefurances.furnace}
            pagination={false}
          />
          <Collapse>
            {showTable && (
              <Table
                className="w-75 m-auto py-5"
                columns={columnsmini}
                dataSource={singlefurances.furnaceDimension}
                pagination={false}
                locale={{
                  emptyText: <Empty description="اطلاعات موجود نیست!" />,
                }}
              />
            )}
          </Collapse>
        </div>

        <div className="buttom-table">
          {/* <Button
          onClick={() => dispatch(RsetFurnaceObservationStatusModal(true))}
          className="m-3"
        >
          اضافه كردن رويداد
        </Button> */}

          <Button
            className="m-3"
            onClick={() => dispatch(RsetFurnaceObservationStatusModal(true))}
          >
            اضافه كردن رويداد
          </Button>

          {/* ---------------------------------------------------------------- */}
          <Tabs>
            {eventName.map((tab, index) => (
              <TabPane className="fw-bold" tab={tab} key={index}>
                <Table
                  locale={{
                    emptyText: <Empty description="اطلاعات موجود نیست!" />,
                  }}
                  columns={columnsevent}
                  dataSource={[event[index]]}
                />
              </TabPane>
            ))}
          </Tabs>

          {/* --------------------------------------------------------------------- */}

          <Tabs activeKey={activeT} onChange={handleTabChan} className="m-4">
            <TabPane tab="ملزومات استفاده شده" key="tab2">
              <Button
                onClick={() =>
                  dispatch(RsetFurnaceObservationaddrowmodal(true))
                }
                className="m-3"
              >
                اضافه كردن رديف
              </Button>

              <Table
                columns={columnsbuttom}
                dataSource={materialdata}
                pagination={paginationConfig}
                locale={{
                  emptyText: <Empty description="اطلاعات موجود نیست!" />,
                }}
              />
            </TabPane>
            <TabPane tab=" تصاوير" key="tab3">
              <Swiper
                className="mt-3 bg-black"
                spaceBetween={50}
                slidesPerView={1}
                navigation={true}
                modules={[Pagination, Navigation]}
                pagination={{
                  type: "fraction",
                }}
              >
                {pic.map((item) => (
                  <SwiperSlide
                    className=" d-flex justify-content-center align-items-center my-3 flex-column "
                    key={item.id}
                  >
                    <h3 className="my-3 bg-secondary w-100 text-center py-2 rounded-3 text-white">
                      {item.description}
                    </h3>
                    <img
                      style={{ width: "800px", height: "700px" }}
                      src={`http://192.168.5.60:8007/uploads/furnaces/${item.picture}`}
                      alt="event image"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </TabPane>
          </Tabs>
        </div>
      </div>
      {FurnaceObservationStatusModal && <ObservingfurnaceAddEventModal />}
      {FurnaceObservationaddrowmodal && <ObservingfurnacesModalAddRow />}
      {FurnaceObservationAddDimentionModal && (
        <ObservingfurnacesModalAddDimension />
      )}
      {uploadPhotoModal && <UploadImageModal />}

      {addDimentionModal && <NewFactoryNewFurnaceModal />}
      {addEventModal && <NewFactoryFurnaceAddEvent />}
    </>
  );
};

export default ObservingFurnaces;
