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
} from "antd";
import { Button } from "react-bootstrap";
import TabPane from "antd/lib/tabs/TabPane";
import ObservingfurnaceAddEventModal from "./ObservingfurnacesModal/ObservingfurnaceAddEventModal";
import ObservingfurnacesModalAddRow from "./ObservingfurnacesModal/ObservingfurnacesModalAddRow";
import ObservingfurnacesModalAddDimension from "./ObservingfurnacesModal/ObservingfurnacesModalAddDimension";
import ListIcon from "@mui/icons-material/List";
import UploadImageModal from "./ObservingfurnacesModal/UploadImageModal";

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
import "swiper/css";
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
  const urlParts = location.pathname.split("/");
  const id = getIdFromUrl(location.pathname);
  const singlefurances = useSelector(selectsinglefurances);
  const furenceObserEvents = useSelector(selectFurenceObserEvents);
  const listReloader = useSelector(selectListReloader);
  const [material, setmaterial] = useState([]);
  // material.map((item2) => {
  //   item2.map((item3) => {
  //     console.log(item3.h_size);
  //   });
  // });
  useEffect(() => {
    dispatch(getsinglefurance(id));
  }, [dispatch]);

  useEffect(() => {
    console.log(singlefurances);
  }, [singlefurances]);

  const materialdata = singlefurances.furnaceMaterials;

  useEffect(() => {
    if (singlefurances.furnaceMaterials !== undefined) {
      const materials = singlefurances.furnaceMaterials.map(
        (item) => item.materialPerShape_
      );
      setmaterial(materials);
    }
  }, [singlefurances]);

  const datatop = [
    {
      key: "1",
      name: "برازجان",
      type: "John Brown",
      capicity: 32,
      working_capacity: "New York No. 1 Lake Park",
      surface: 288.0,
    },
  ];
  const columnstop = [
    {
      title: "نام كوره",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "نوع",
      dataIndex: "furnace_type",
      key: "furnace_type",
    },
    {
      title: "حجم كوره",
      dataIndex: "capacity",
      key: "capacity",
    },
    {
      title: " ظرفيت كوره ",
      dataIndex: "furnace_volume",
      key: "furnace_volume",
    },
    {
      title: "حجم working",
      dataIndex: "working_volume",
      key: "working_volume",
    },
    {
      title: "سطح حمام قلع",
      dataIndex: "solder_bath_surface",
      key: "solder_bath_surface",
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

  const data3 = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
  ];
  const ali = [];

  const columnsbuttom = [
    {
      title: " شروع استفاده	",
      dataIndex: "first_usage_event_id",
      key: "first_usage_event_id ",
    },
    {
      title: " بخش",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "متريال ",
      dataIndex: "materials_category",
      key: "materials_category",
    },
    {
      title: "كشور سازنده",
      dataIndex: "materials_manufacturing_country",
      key: "materials_manufacturing_country",
    },
    {
      title: "شركت توليد كننده",
      dataIndex: "materials_manufacturer",
      key: "materials_manufacturer",
    },
    {
      title: "وزن (تناژ)",
      dataIndex: "weight",
      key: "weight",
    },

    {
      title: "ابعاد و تعداد	",
      key: "action",
      width: 300,

      render: (text, record) => (
        <ul>
          {record.materialPerShape_.map((item, index) => (
            <>
              <li key={index}>{item.shape_code}</li>
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
          description="آيا از حذف اين سطر مطمعن هستيد"
          // onConfirm={confirm}
          // onOpenChange={() => toggleTable(text, record)}
        >
          {/* {console.log(
            record.materialPerShape_.map((item) => {
              console.log(item.b_size);
            })
          )} */}
          <Button type="primary">حذف </Button>
        </Popconfirm>
      ),
    },
    {
      title: "افزودن",
      key: "action",
      render: () => (
        <Button
          onClick={() =>
            dispatch(RsetFurnaceObservationAddDimentionModal(true))
          }
        >
          اضافه كردن ابعاد
        </Button>
      ),
    },
  ];

  // -----------------handling currend datas for events--------------------------
  useEffect(() => {
    // Initialize tabs with data from dataSource
    if (singlefurances.furnaceEvents !== undefined) {
      dispatch(
        RsetFurnaceObservationAddTabs(
          singlefurances.furnaceEvents.map((person) => ({
            event: person.name,
            key: person.id,
            content: (
              <Table
                dataSource={[person]}
                columns={columnsevent}
                pagination={false}
              />
            ),
          }))
        )
      );
    }
  }, [singlefurances]);

  // ------------------handle event for adding event-----------------------

  const handleOk = () => {
    const newTabs = [...AddTabs];
    const newTabKey = `tab${newTabs.length + 1}`;
    const { event_type, end_date, description, begin_date, event } = formattabs;
    const content = (
      <Table
        dataSource={[
          {
            key: newTabKey,
            event: event,
            end_date,
            description,
            begin_date,
            event_type,
          },
        ]}
        columns={columnsevent}
        pagination={false}
      />
    );
    newTabs.push({ event, content, key: newTabKey });
    dispatch(RsetFurnaceObservationAddTabs(newTabs));

    dispatch(RsetFurnaceObservationFormatTabs({}));
  };

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
    },
    {
      title: "تاريخ پايان",
      dataIndex: "end_date",
      key: "end_date",
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
          description="   آيا از نهايي كردن اين سطر مطمعن هستيد   "
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
    },
    {
      title: " طول",
      dataIndex: "length",
      key: "length",
      width: 100,
    },
    {
      title: " عرض",
      dataIndex: "width",
      key: "width",
      width: 100,
    },
    {
      title: "ارتفاع",
      dataIndex: "height",
      key: "height",
      width: 100,
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
          className="d-flex justify-content-between text-white py-3  borderRadius-top"
          style={{ background: "#485550" }}
        >
          <div className="ms-4 mt-1">
            <span className="me-2">
              <ListIcon />
            </span>
            {`مديريت كوره`}
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
            {AddTabs.map((tab) => (
              <TabPane tab={tab.event} key={tab.key}>
                {tab.content}
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
              />
            </TabPane>
            <TabPane tab=" تصاوير" key="tab3">
              <Swiper
                className="mt-3 bg-black"
                spaceBetween={50}
                slidesPerView={1}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
                navigation={true}
                pagination={{ clickable: true }}
              >
                {pic.map((item) => (
                  <SwiperSlide
                    className=" d-flex justify-content-center align-items-center my-3 flex-column "
                    key={item.id}
                  >
                    <h3 className="my-3">{item.description}</h3>
                    <img
                      style={{ width: "800px", height: "800px" }}
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
      {FurnaceObservationStatusModal && (
        <ObservingfurnaceAddEventModal handleOk={handleOk} />
      )}
      {FurnaceObservationaddrowmodal && <ObservingfurnacesModalAddRow />}
      {FurnaceObservationAddDimentionModal && (
        <ObservingfurnacesModalAddDimension />
      )}
      {uploadPhotoModal && <UploadImageModal />}
    </>
  );
};

export default ObservingFurnaces;
