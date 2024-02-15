import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import CottageIcon from "@mui/icons-material/Cottage";
import FactoryIcon from "@mui/icons-material/Factory";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import FormatListNumberedRtlIcon from "@mui/icons-material/FormatListNumberedRtl";
import PhotoSizeSelectSmallIcon from "@mui/icons-material/PhotoSizeSelectSmall";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  selectUser,
  selectSmallNav,
  RsetSmallNav,
} from "../../slices/mainSlices";
import { selectIsLoggedIn, RsetIsLoggedIn } from "../../slices/authSlices";
import MenuIcon from "@mui/icons-material/Menu";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const smallNav = useSelector(selectSmallNav);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className="h-100">
      {!smallNav ? (
        <Navbar
          expand="lg"
          bg="dark"
          className="borderRadius-15 h-100 sidebar-transition "
          style={{ transition: 0.5 }}
        >
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="w-100 h-100 d-flex flex-column justify-content-between sidebar-transition"
          >
            <div className="mt-3 d-flex w-100">
              <Nav className="d-flex flex-column align-items-center w-100">
                <div className=" mb-3">
                  <MenuIcon
                    style={{ cursor: "pointer" }}
                    className="   text-white"
                    sx={{ fontSize: 40 }}
                    onClick={() => {
                      dispatch(RsetSmallNav(!smallNav));
                    }}
                  />
                </div>
              </Nav>
            </div>

            <div>
              <span
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/");
                }}
              ></span>
              <div style={{ height: "50px" }}></div>
            </div>
          </Navbar.Collapse>
        </Navbar>
      ) : (
        <Navbar
          expand="lg"
          bg="dark"
          className="h-100 borderRadius-15 w-100 text-center"
        >
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="w-100 h-100 d-flex flex-column justify-content-between"
          >
            <div className="w-100 mt-3">
              <Nav className="flex-column w-100">
                <Navbar.Brand className="text-center mb-3 d-flex justify-content-between align-items-center">
                  <div className="text-center text-white">
                    {/* Your logo or brand content */}
                  </div>
                  <div className="">
                    <MenuIcon
                      className=" text-white "
                      style={{ cursor: "pointer" }}
                      sx={{ fontSize: 25 }}
                      onClick={() => {
                        console.log("hi");

                        dispatch(RsetSmallNav(!smallNav));
                      }}
                    />
                  </div>
                </Navbar.Brand>
                <div className="Sidebar-parent d-flex flex-column justify-content-start align-items-start mx-2  ">
                  <h3
                    class
                    onClick={() => navigate("/Dashboard")}
                    className="sidebar-link text-white mt-3h3 my-3 "
                    style={{ cursor: "pointer" }}
                  >
                    <span className="ms-3">
                      <CottageIcon />
                      <span className=" ms-3">صفحه اصلي</span>
                    </span>
                  </h3>
                  <h3
                    class
                    onClick={() => navigate("/Factorymanagement")}
                    className="sidebar-link text-white mt-3h3 my-3 "
                    style={{ cursor: "pointer" }}
                  >
                    <span className="ms-3">
                      {" "}
                      <FactoryIcon />
                    </span>
                    <span className="ms-3">مدیریت کارخانه ها</span>
                  </h3>

                  <h3
                    class
                    onClick={() => navigate("/home")}
                    className="sidebar-link text-white mt-3h3 my-3 "
                    style={{ cursor: "pointer" }}
                  >
                    <span className="ms-3">
                      {" "}
                      <LocalFireDepartmentIcon />
                    </span>
                    <span className="ms-3">لیست پخش کوره ها</span>
                  </h3>

                  <h3
                    class
                    onClick={() => navigate("/EssentialGoods")}
                    className="sidebar-link text-white mt-3h3 my-3 "
                    style={{ cursor: "pointer" }}
                  >
                    <span className="ms-3">
                      {" "}
                      <FormatListNumberedRtlIcon />
                    </span>
                    <span className="ms-3">لیست ملزومات</span>
                  </h3>
                  <h3
                    class
                    onClick={() => navigate("/FireProof")}
                    className="sidebar-link text-white mt-3h3 my-3 "
                    style={{ cursor: "pointer" }}
                  >
                    <span className="ms-3">
                      {" "}
                      <PhotoSizeSelectSmallIcon />
                    </span>
                    <span className="ms-3">مدل و ابعاد نسوز ها</span>
                  </h3>
                  <h3
                    class
                    onClick={() => navigate("/userManagment")}
                    className="sidebar-link text-white mt-3h3 my-3 "
                    style={{ cursor: "pointer" }}
                  >
                    <span className="ms-3">
                      {" "}
                      <ManageAccountsIcon />
                    </span>
                    <span className="ms-3">مدیریت کاربران</span>
                  </h3>
                </div>
              </Nav>
            </div>
            <div className="my-3">
              <Button className="px-4 py-2 bg-transparent border-2 border-danger rounded-pill navItem">
                <span
                  onClick={() => {
                    localStorage.removeItem("token");
                    dispatch(RsetIsLoggedIn(false));
                    navigate("/");
                  }}
                >
                  <LogoutIcon />
                  خروج
                </span>
              </Button>
              <div classstyle={{ height: "50px" }}></div>
            </div>
          </Navbar.Collapse>
        </Navbar>
      )}
    </div>
  );
};

export default Sidebar;
