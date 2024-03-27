import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import logo from "../img/logo/kave-logo.png";
import FactoryModal from "./Modal/factoryModal";
import { useDispatch, useSelector } from "react-redux";
import ListIcon from "@mui/icons-material/List";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FactoryAddModal from "./Modal/factoryAddModal";
import { Spin } from "antd";

import {
  RsetfactoryEditModal,
  selectFactoryEditModal,
  selectfactoryVolume,
  RsetfactoryVolume,
  selectfactoryWorkingVolume,
  RsetfactoryWorkingVolume,
  Rsetfactorysname,
  Rsetfactorycapicity,
  Rsetsurfaceofmaterial,
  RsetenteryType,
  Rsetfactorytype,
  Rsetcanals,
  selectfactorycapicity,
  selectfactorysname,
  selectfactorytype,
  selectsurfaceofmaterial,
  selectfactoryAddModal,
  RsetfactoryAddModal,
  selectaddDimentionModal,
  selectaddEventModal,
  getnewdimentions,
  selectgetNewDimention,
} from "../../slices/factory";
import {
  dashboardgetfurances,
  getsinglefurance,
  selectfurances,
  selectloadingFurnace,
  selectsinglefurances,
} from "../../slices/Dashboard";
import { getIdFromUrl } from "./Observingfurnaces/ObservingFurnaces";
import { Button } from "@mui/material";
import { RsetaddDimentionModal } from "../../slices/FurnaceObservationSlices";

const Furnaces = () => {
  const dispatch = useDispatch();
  const FactoryEditModal = useSelector(selectFactoryEditModal);
  const furances = useSelector(selectfurances);
  const factoryAddModal = useSelector(selectfactoryAddModal);
  const addDimentionModal = useSelector(selectaddDimentionModal);
  const addEventModal = useSelector(selectaddEventModal);
  const getNewDimention = useSelector(selectgetNewDimention);
  const loadingFurnace = useSelector(selectloadingFurnace);

  const navigate = useNavigate();
  const location = useLocation();
  const id = getIdFromUrl(location.pathname);

  useEffect(() => {
    dispatch(dashboardgetfurances(id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getnewdimentions());
  }, [dispatch]);

  // ------------------------------------selectors

  const [clickedCard, setClickedCard] = useState(null);
  const handleCardClick = (card) => {
    setClickedCard(card);
  };

  return (
    <>
      <div className="py-4 mx-4">
        <div
          className="d-flex justify-content-between text-white py-4  borderRadius-top"
          style={{ background: "#485550" }}
        >
          <div className="ms-4 mt-2">
            <span className="me-2 text-center ">
              <ListIcon />
              {` مديريت كوره ها `}
            </span>
          </div>
          <div>
            <button
              title="  افزودن كوره جديد"
              className=" btn me-4 shadow rounded-circle  bg-success  py-2   fa btn-success "
              onClick={() => dispatch(RsetfactoryAddModal(true))}
            >
              <AddCircleIcon className="rounded-circle w-100 z-3 " />
            </button>
          </div>
        </div>

        {!loadingFurnace ? (
          <div className="parent-card d-flex justify-content-sm-center    justify-content-md-center align-items-center gap-5 flex-wrap  border-top p-2 pt-5 mb-5 w-100  ">
            {furances &&
              furances.map((item, index) => (
                <div
                  key={index}
                  className="cards col-sm-4 col-md-3  p-3 baxshadow  p-5 .borderRadius-15   position-relative overflow-hidden    "
                >
                  <div style={{ height: "350px" }}>
                    <div>
                      <h4 className=" my-3 fw-bold  py-3 text-white text-center  furnace-header ">
                        {item.name}
                      </h4>
                    </div>
                    <p>
                      نوع :{" "}
                      <span className="fw-bold fs-6   ">
                        {item.furnace_type}
                      </span>
                    </p>
                    <p className="my-3">
                      تعداد تعميرات سرد:{" "}
                      <span className="fw-bold fs-6 ">
                        {item.channel_line_count
                          ? item.channel_line_count
                          : "-"}
                      </span>
                    </p>
                    <p className="my-3">
                      ظرفيت :{" "}
                      <span className="fw-bold fs-6 ">{item.capacity}</span>
                    </p>
                    <p className="my-3">
                      تعداد خطوط كانال :{" "}
                      <span className="fw-bold fs-6 ">
                        {item.channel_line_count
                          ? item.channel_line_count
                          : "-"}
                      </span>
                    </p>
                    <p className="my-3">
                      حجم كوره :{" "}
                      <span className="fw-bold fs-6 ">
                        {item.furnace_volume}
                      </span>
                    </p>
                    <p className="my-3">
                      نوع ورودي كانال:{" "}
                      <span className="fw-bold fs-6 ">
                        {item.channel_entrance_type
                          ? item.channel_entrance_type
                          : "-"}
                      </span>
                    </p>
                  </div>
                  <div className="buttons d-flex justify-content-center align-items-center gap-3">
                    <button
                      onClick={() => {
                        navigate(
                          `/Dashboard/Factory/:id/Observingfurnaces/${item._id}`
                        );
                        dispatch(getsinglefurance(item._id));
                      }}
                      className="btn btn-primary w-100 text-center "
                    >
                      مشاهده كوره
                    </button>
                    <button
                      onClick={() => {
                        dispatch(RsetfactoryEditModal(true));
                        handleCardClick(item);
                      }}
                      className="btn btn-secondary w-100 text-center "
                    >
                      ويرايش
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <>
            <div
              className="d-flex justify-content-center w-100"
              style={{ marginTop: "200px" }}
            >
              <Spin size="large" />;
            </div>
          </>
        )}
      </div>

      {FactoryEditModal && <FactoryModal card={clickedCard} />}
      {factoryAddModal && <FactoryAddModal />}
      {/* {<NewFactoryNewFurnaceModal />} */}
    </>
  );
};

export default Furnaces;
