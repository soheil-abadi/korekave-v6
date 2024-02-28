import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import logo from "../img/logo/kave-logo.png";
import FactoryModal from "./Modal/factoryModal";
import { useDispatch, useSelector } from "react-redux";
import ListIcon from "@mui/icons-material/List";

import {
  RsetfactoryEditModal,
  selectFactoryEditModal,
  selectfactoryVolume,
  selectfactoryWorkingVolume,
  selectfactorycapicity,
  selectfactorysname,
  selectfactorytype,
  selectsurfaceofmaterial,
} from "../../slices/factory";
import {
  dashboardgetfurances,
  getsinglefurance,
  selectfurances,
  selectsinglefurances,
} from "../../slices/Dashboard";
import { getIdFromUrl } from "./Observingfurnaces/ObservingFurnaces";

const card = [
  {
    header: "کارخانه بلور کاوه",
    number: "5",
    logo: logo,
    year: 1350,
    type: "بلور",
    location: "تهران میدان انقلاب نرسیده ب آزادی",
  },
  {
    header: "کارخانه بلور کاوه",
    number: "5",
    logo: logo,
    year: 1350,
    type: "بلور",
    location: "تهران میدان انقلاب نرسیده ب آزادی",
  },
];

const Furnaces = () => {
  const dispatch = useDispatch();
  const FactoryEditModal = useSelector(selectFactoryEditModal);
  const furances = useSelector(selectfurances);
  const singlefurances = useSelector(selectsinglefurances);
  console.log(singlefurances);

  console.log(furances);

  const navigate = useNavigate();
  const location = useLocation();
  const id = getIdFromUrl(location.pathname);

  useEffect(() => {
    dispatch(dashboardgetfurances(id));
  }, [dispatch]);
  // ------------------------------------selectors

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
        <div className="parent-card d-flex justify-content-sm-center    justify-content-md-center align-items-center gap-5 flex-wrap  border-top p-2 pt-5 mb-5 w-100  ">
          {furances &&
            furances.map((item, index) => (
              <div
                key={index}
                className="cards col-sm-4 col-md-3  p-3 baxshadow  p-5 .borderRadius-15     "
                style={{ backgroundColor: "white" }}
              >
                <h4 className="my-3"> {item.name}</h4>
                <p>
                  : نوع{" "}
                  <span className="fw-bold fs-6 ">{item.furnace_type}</span>
                </p>
                <p className="my-3">
                  تعداد تعميرات سرد:
                  <span className="fw-bold fs-6 ">
                    {item.channel_line_count ? item.channel_line_count : 0}
                  </span>
                </p>
                <p className="my-3">
                  ظرفيت : <span className="fw-bold fs-6 ">{item.capacity}</span>
                </p>
                <p className="my-3">
                  تعداد خطوط كانال :
                  <span className="fw-bold fs-6 ">
                    {item.channel_line_count ? item.channel_line_count : 0}
                  </span>
                </p>
                <p className="my-3">
                  حجم كوره :
                  <span className="fw-bold fs-6 ">{item.furnace_volume}</span>
                </p>
                <p className="my-3">
                  نوع ورودي كانال:
                  <span className="fw-bold fs-6 ">
                    {item.channel_entrance_type
                      ? item.channel_entrance_type
                      : 0}
                  </span>
                </p>
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
                    onClick={() => dispatch(RsetfactoryEditModal(true))}
                    className="btn btn-secondary w-100 text-center "
                  >
                    ويرايش
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {FactoryEditModal && <FactoryModal />}
    </>
  );
};

export default Furnaces;
