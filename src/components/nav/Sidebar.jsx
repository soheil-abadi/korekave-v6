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
import logo from "../img/logo/kave-logo.png";
import {
  selectUser,
  selectSmallNav,
  RsetSmallNav,
} from "../../slices/mainSlices";
import { selectIsLoggedIn, RsetIsLoggedIn } from "../../slices/authSlices";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Divider, Drawer } from "@mui/material";

const Sidebar = () => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const smallNav = useSelector(selectSmallNav);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 350,
        height: anchor === "top" || anchor === "bottom" ? "auto" : "100%",
        borderRadius: "15px",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Navbar
        dir="rtl"
        expand="lg"
        bg="dark"
        className=" d-flex justify-content-center align-items-center h-100  w-100  borderRadius-15 "
      >
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="w-100 h-100 d-flex flex-column justify-content-between align-items-center"
        >
          <div className="w-100 h-100 mt-3">
            <Nav className="flex-column justify-content-center h-100  w-100 img-fluid">
              <img
                className="p-3  m-auto mt-2"
                src={logo}
                alt="logo"
                style={{ width: "250px" }}
              />
              <div className="Sidebar-parent   h-100 d-flex flex-column justify-content-start align-items-start mx-2  ">
                <h3
                  class
                  onClick={() => navigate("/Dashboard")}
                  className="sidebar-link text-white mt-3h3 py-3 "
                  style={{ cursor: "pointer" }}
                >
                  <span className="ms-3">
                    <CottageIcon />
                    <span className=" ms-3">صفحه اصلي</span>
                  </span>
                </h3>
                <h3
                  class
                  onClick={() => navigate("/FactoryManagment")}
                  className="sidebar-link text-white mt-3h3 py-3  "
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
                  onClick={() => navigate("/FurnacePart")}
                  className="sidebar-link text-white mt-3h3 py-3  "
                  style={{ cursor: "pointer" }}
                >
                  <span className="ms-3">
                    {" "}
                    <LocalFireDepartmentIcon />
                  </span>
                  <span className="ms-3">لیست بخش کوره ها</span>
                </h3>

                <h3
                  class
                  onClick={() => navigate("/EssentialGoods")}
                  className="sidebar-link text-white mt-3h3 py-3  "
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
                  className="sidebar-link text-white mt-3h3 py-3  "
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
                  className="sidebar-link text-white mt-3h3 py-3  "
                  style={{ cursor: "pointer" }}
                >
                  <span className="ms-3">
                    {" "}
                    <ManageAccountsIcon />
                  </span>
                  <span className="ms-3">مدیریت کاربران</span>
                </h3>
                <hr className="w-100  text-white" />

                <div className="my-3 d-flex justify-content-center align-items-center w-100 my-2">
                  <div
                    onClick={() => {
                      localStorage.removeItem("token");
                      dispatch(RsetIsLoggedIn(false));
                      navigate("/");
                    }}
                    className="box-1 "
                  >
                    <div className="btns btn-one ">
                      <span className="exit-button">
                        <LogoutIcon />
                        خروج
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Nav>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </Box>
  );

  return (
    <>
      <div className="menueic borderRadius-15 ">
        {["right"].map((anchor) => (
          <React.Fragment key={anchor}>
            <button
              className=" m-auto my-3 bg-transparent border-0 men "
              onClick={toggleDrawer(anchor, true)}
            >
              <MenuIcon
                style={{ cursor: "pointer" }}
                className="    text-white "
                sx={{ fontSize: 40 }}
              />
            </button>

            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
