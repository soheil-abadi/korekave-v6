import React, { useEffect } from "react";
import logo from "../img/logo/kave-logo.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { dashboardget } from "../../services/authServices";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ListIcon from "@mui/icons-material/List";
import { selectLoading, RsetLoading } from "../../slices/mainSlices";
import { Spin } from "antd";

import {
  RsetDashboardList,
  dashboardgetfurances,
  fetchedashboard,
  selectDashboardList,
  selectfurances,
  selectloading,
} from "../../slices/Dashboard";

import { useDispatch, useSelector } from "react-redux";
import { selectuser } from "../../slices/authSlices";
import { Button, Container } from "@mui/material";

const Dashboard = () => {
  const navigate = useNavigate();
  // const reflect = reflect();

  const dispatch = useDispatch();

  const dashboardlist = useSelector(selectDashboardList);
  const loading = useSelector(selectloading);

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
        {!loading ? (
          <div className="parent-card d-flex justify-content-sm-center    justify-content-md-center align-items-center gap-5 flex-wrap  border-top p-2 pt-5 mb-5 w-100  ">
            {dashboardlist &&
              dashboardlist.map((item, index) => (
                <div
                  key={index}
                  className="cards col-sm-6 col-md-5  p-3 baxshadow  p-5 .borderRadius-15 position-relative  mt-5    "
                  style={{ backgroundColor: "white" }}
                >
                  <div style={{ height: "300px" }}>
                    <div className="descard p-4 w-100 m-auto  ">
                      <h3>{item.name}</h3>
                      <hr />
                      <p>
                        سال تاسیس: <span> {item.foundation_year}</span>
                      </p>
                      <p>
                        تعدادکوره: <span>{item.furnace_count}</span>
                      </p>
                      <p>
                        نوع : <span>{item.factory_type}</span>
                      </p>
                      <p>
                        محل: <span>{item.address}</span>
                      </p>

                      <div className="w-100 text-center ">
                        <Button
                          onClick={() => {
                            dispatch(dashboardgetfurances(item._id));
                            navigate(`/Dashboard/Factory/${item._id}`);
                          }}
                          variant="contained"
                          className="mt-2 w-100 "
                        >
                          نمايش كوره
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-4">
                      <img
                        src={`http://192.168.5.60:8007/uploads/images/${item.logo}`}
                        alt="#"
                        className=" card-img img-fluid  position-absolute  bg-white  z-3  "
                        style={{
                          height: "130px",
                          width: "130px",
                          padding: "10px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <>
            <div
              className="d-flex justify-content-center w-100 "
              style={{ marginTop: "200px" }}
            >
              <Spin size="large" />;
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
