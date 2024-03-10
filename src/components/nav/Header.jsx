import React, { useState } from "react";
// import logo from "../../img/logo/kavelogo.png";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Button,
  Offcanvas,
} from "react-bootstrap";

import {
  selectLoggedIn,
  handleUsetInfo,
  selectuser,
  parseJwt,
  Rsetuser,
} from "../../slices/authSlices";
import PersonIcon from "@mui/icons-material/Person";

import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Clock from "react-live-clock";

import { useEffect } from "react";

import { selectSmallNav } from "../../slices/mainSlices";

const Header = () => {
  const currentTime = new Date();
  const isAM = currentTime.getHours() < 12;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tokenheader = localStorage.getItem("token");

  const smallNav = useSelector(selectSmallNav);
  const user = useSelector(selectuser);

  console.log(user);
  // const firstName = user.firstName;

  useEffect(() => {
    if (user == "") {
      const userInfo = parseJwt(tokenheader);
      dispatch(Rsetuser(userInfo.user));
    }
  }, [user]);

  return (
    <div className="w-100 text-white">
      <Nav className="d-flex justify-content-center align-items-center w-100">
        <div
          className={`d-flex ${
            !smallNav ? "justify-content-center" : "justify-content-start"
          } bg-dark borderRadius-15 p-1 border w-100`}
        >
          <div className="d-flex justify-content-between align-items-center">
            <div className="" id="profile-name w-100">
              <Nav.Link className="d-flex  gap-5 justify-content-between align-items-center text-light ">
                <div>
                  <Clock
                    format="HH:mm:ss"
                    interval={1000}
                    ticking={true}
                    className="ms-3 text-light d-none d-md-inline fs-5"
                    style={{ width: "60px" }}
                  />
                  <AccessTimeIcon className="mb-1 mx-2 fs-3" />
                </div>
                <p className="mb-0 fs-5">
                  {`  خوش آمديد : ${user.first_name}` +
                    " " +
                    `${user.last_name}`}
                </p>

                <p className="mb-0 fs-5 d-flex justify-content-center align-items-center">
                  {<PersonIcon className="mb-1 mx-2" />}
                  {` ${user.username}`}
                </p>
              </Nav.Link>
            </div>
          </div>
        </div>
      </Nav>
    </div>
  );
};

export default Header;
