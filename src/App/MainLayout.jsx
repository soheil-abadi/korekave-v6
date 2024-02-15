import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../components/nav/Sidebar";
import Header from "../components/nav/Header";
import { selectSmallNav } from "../slices/mainSlices";
import { useSelector, useDispatch } from "react-redux";
import { RsetIsLoggedIn, selectIsLoggedIn } from "../slices/authSlices";
import Login from "../components/auth/Login";
import background from "../components/img/kave.jpg";

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  const smallNav = useSelector(selectSmallNav);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(RsetIsLoggedIn(true));
    } else {
      dispatch(RsetIsLoggedIn(false));
    }
  }, [token]);

  console.log(isLoggedIn, token);

  return (
    <div className="bg-dark overflow-hidden">
      <div
        className="m-0 min-h-100 p-1   "
        style={{
          background: isLoggedIn
            ? "#f2f2f2"
            : `url(${background}) no-repeat center center/cover`,
        }}
      >
        {isLoggedIn ? (
          <Row className="m-0">
            <Col
              sm="2"
              xl={!smallNav ? "1" : "2"}
              className="d-none d-xl-inline border p-0"
            >
              <Sidebar />
            </Col>
            <Col
              sm="12"
              xl={!smallNav ? "11" : "10"}
              className="p-0 min-vh-100"
            >
              <Header />
              {children}
            </Col>
          </Row>
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
};

export default MainLayout;
