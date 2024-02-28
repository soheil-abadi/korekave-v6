import React from "react";
import logo from "../img/logo/kave-logo.png";
import { useDispatch, useSelector } from "react-redux";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  RsetIsLoggedIn,
  selectIsLoggedIn,
  Rsetusername,
  RsetPassword,
  selectUsername,
  selectPassword,
  Rsettoken,
  selecttoken,
  selectuser,
  Rsetuser,
  parseJwt,
} from "../../slices/authSlices";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { successMessage } from "../../utils/toast";
import {
  Button,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { postLogin } from "../../services/authServices";
import { Navigate, useNavigate } from "react-router-dom";

//add font to material inputs
const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "iranSans, Arial, sans-serif", // Change the font family as desired
  },
});

const Login = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const username = useSelector(selectUsername);
  const password = useSelector(selectPassword);
  const token = useSelector(selectuser);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const parseJwt = (token) => {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const values = {
      username,
      password,
    };
    const postLoginRes = await postLogin(values);
    console.log(postLoginRes);
    if (postLoginRes.data.code === 200) {
      const userInfo = parseJwt(postLoginRes.data.token);

      dispatch(Rsetuser(userInfo));

      console.log(userInfo);
      navigate("/Dashboard");
      dispatch(RsetIsLoggedIn(true));
      localStorage.setItem("id", userInfo.user._id);
      localStorage.setItem("token", postLoginRes.data.token);
      dispatch(Rsetusername(""));
      dispatch(RsetPassword(""));
    }
    console.log("National Code:", username);
    console.log("Password:", password);
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        {isLoggedIn ? (
          // Render this content when logged in
          <div>
            {/* {successMessage("ورود موفقيت آميز بود")} */}
            {Navigate("/Dashboard")}

            {/* Add any other content you want to show when logged in */}
          </div>
        ) : (
          <div
            dir="rtl"
            className="login-main-parent d-flex justify-content-center align-items-center  flex-column col-sm-12 col-md-6  w-100      "
            style={{ height: "100vh" }}
          >
            <div className="login-form   col-md-6 p-4  mt-5 rounded-3 shadow   ">
              <div className="login-head-logo text-center">
                <img
                  src={logo}
                  alt="logo"
                  className="img-fluid d-block center"
                  style={{ width: "50px", margin: "auto" }}
                />
                <h1 className="text-dark fw-bold">درگاه ورود به کاوه</h1>
              </div>
              <form
                action="#"
                method="post"
                className="d-flex justify-content-center align-items-start flex-column w-100 m-auto  "
                onSubmit={handleLogin}
              >
                <InputLabel
                  htmlFor="user-name"
                  className="mt-4"
                  style={{ fontWeight: "bold", fontSize: "20px" }}
                >
                  نام کاربری
                </InputLabel>
                <Input
                  id="user-name"
                  label="username"
                  variant="standard"
                  value={username}
                  onChange={(e) => dispatch(Rsetusername(e.target.value))}
                  placeholder="لطفا نام کاربری خود را وارد نمایید"
                  className="w-100 p-2 rounded-3  "
                />

                <InputLabel
                  htmlFor="standard-adornment-password  "
                  className="mt-4"
                  style={{ fontWeight: "bold", fontSize: "20px" }}
                >
                  رمز عبور
                </InputLabel>
                <Input
                  label="password"
                  variant="outline"
                  value={password}
                  onChange={(e) => dispatch(RsetPassword(e.target.value))}
                  placeholder="رمز عبور خود را وارد نمایید"
                  className="w-100 p-2 rounded-3  "
                  id="standard-adornment-password "
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />

                <a style={{ textDecoration: "none" }} className="my-3" href="#">
                  فراموشی رمز عبور
                </a>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  style={{
                    fontWeight: "bold",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  className="w-100 fs-6 "
                >
                  ورود
                </Button>
              </form>
            </div>
          </div>
        )}
      </ThemeProvider>
    </>
  );
};

export default Login;
