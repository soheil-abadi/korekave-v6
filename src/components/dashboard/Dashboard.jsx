import React, { useEffect } from "react";
import logo from "../img/logo/kave-logo.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { dashboardget } from "../../services/authServices";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ListIcon from "@mui/icons-material/List";
import { selectLoading, RsetLoading } from "../../slices/mainSlices";

import {
  RsetDashboardList,
  dashboardgetfurances,
  fetchedashboard,
  selectDashboardList,
  selectfurances,
} from "../../slices/Dashboard";

import { useDispatch, useSelector } from "react-redux";
import { selectuser } from "../../slices/authSlices";
import { Button, Container } from "@mui/material";

const Dashboard = () => {
  const navigate = useNavigate();
  // const reflect = reflect();

  const dispatch = useDispatch();

  const dashboardlist = useSelector(selectDashboardList);

  useEffect(() => {
    dispatch(fetchedashboard());
  }, [dispatch]);

  const furanceId = useSelector(selectfurances);

  return (
    <>
      <div className="py-3 mx-4">
        <div
          className="d-flex justify-content-between text-white py-3  borderRadius-top"
          style={{ background: "#485550" }}
        >
          <div className="ms-4 mt-1">
            <span className="me-2">
              <ListIcon />
            </span>
            صفحه اصلي
          </div>
        </div>
        <div className="parent-card d-flex justify-content-sm-center    justify-content-md-center align-items-center gap-5 flex-wrap  border-top p-2 pt-5 mb-5 w-100  ">
          {dashboardlist &&
            dashboardlist.map((item, index) => (
              <div
                key={index}
                className="cards col-sm-4 col-md-3  p-3 baxshadow  p-5 .borderRadius-15     "
                style={{ backgroundColor: "white" }}
              >
                <div style={{ height: "450px" }}>
                  <img
                    src={`http://192.168.5.60:8007/uploads/images/${item.logo}`}
                    alt="logo"
                    className=" d-block img-fluid m-auto  rounded-3   "
                    style={{ width: "200px", minHeight: "200px" }}
                  />
                  <h4 className="my-3"> {item.name}</h4>
                  <p style={{ height: "30px" }}>
                    سال تاسیس:{" "}
                    <span className="fw-bold fs-6 ">
                      {item.foundation_year}
                    </span>
                  </p>
                  <p className="my-3">
                    تعدادکوره:{" "}
                    <span className="fw-bold fs-6 ">{item.furnace_count}</span>
                  </p>
                  <p className="my-3">
                    نوع :{" "}
                    <span className="fw-bold fs-6 ">{item.factory_type}</span>
                  </p>
                  <p className="my-3">
                    محل: <span className="fw-bold fs-6 ">{item.address}</span>
                  </p>
                </div>
                <button
                  onClick={() => {
                    dispatch(dashboardgetfurances(item._id));
                    navigate(`/Dashboard/Factory/${item._id}`);
                  }}
                  className="btn btn-primary w-100 text-center "
                >
                  نمایش کوره
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
