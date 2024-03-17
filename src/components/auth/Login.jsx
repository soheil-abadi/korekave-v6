import React, { useEffect } from "react";
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
import { SuccessMessage, successMessage } from "../../utils/toast";
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
import Swal from "sweetalert2";
import { selecterror } from "../../slices/Dashboard";

//add font to material inputs
const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "iranSans, Arial, sans-serif", // Change the font family as desired
  },
});

export const token = () => {
  return localStorage.getItem("token");
};

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

  const handleLogin = async (e) => {
    e.preventDefault();
    const values = {
      username,
      password,
    };

    if ((username.trim() !== " ", password.trim() !== " ")) {
      const postLoginRes = await postLogin(values);

      if (postLoginRes.data.code === 200) {
        const userInfo = parseJwt(postLoginRes.data.token);
        console.log(userInfo);
        dispatch(Rsetuser(userInfo.user));

        navigate("/Dashboard");
        dispatch(RsetIsLoggedIn(true));
        localStorage.setItem("id", userInfo.user._id);
        localStorage.setItem("token", postLoginRes.data.token);
        dispatch(Rsetusername(""));
        dispatch(RsetPassword(""));
        SuccessMessage("ورود موفق");
      } else {
        Swal.fire({
          icon: "error",
          title: "   نام كاربري يا رمز عبور اشتباه است    ",
        });
      }
    }
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        {isLoggedIn ? (
          // Render this content when logged in
          <div>
            <p>در حال بارگزاري صفحه ....</p>
          </div>
        ) : (
          <div
            dir="rtl"
            className="login-main-parent d-flex justify-content-center align-items-center  flex-column col-sm-12 col-md-6  w-50 m-auto      "
            style={{ height: "100vh" }}
          >
            <div className="login-form   col-md-6 p-4  mt-5 rounded-3 shadow   ">
              <div className="login-head-logo text-center">
                <img
                  src={logo}
                  alt="logo"
                  className="img-fluid d-block center"
                  style={{ width: "200px", margin: "auto" }}
                />
                <h1 className="text-dark fw-bold mt-5">
                  درگاه ورود به كوره کاوه
                </h1>
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
                    margin: "40px 0px",
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
