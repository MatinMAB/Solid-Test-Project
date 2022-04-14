import React, { useState } from "react";

//Import Axios
import axios from "axios";

//Import Link Router
import { Link, useNavigate } from "react-router-dom";

//Import Styles
import styles from "./RegisterForm.module.css";

//Material UI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Typography,
  Grid,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

//Register Functional Component
const Register = () => {
  const navigate = useNavigate();

  //States
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    password: "",
  });

  //Functions
  const firstnameHandler = (event) => {
    setUser((prevUser) => ({
      ...prevUser,
      firstname: event.target.value,
    }));
  };
  const lastnameHandler = (event) => {
    setUser((prevUser) => ({
      ...prevUser,
      lastname: event.target.value,
    }));
  };
  const phoneHandler = (event) => {
    setUser((prevUser) => ({
      ...prevUser,
      phone: event.target.value,
    }));
  };
  const passwordHandler = (event) => {
    setUser((prevUser) => ({
      ...prevUser,
      password: event.target.value,
    }));
  };
  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const signUp = () => {
    setLoading(true);
    axios
      .post(
        `http://chl-api.rahkardigital.com/API/V1/User/register?password=${user.password}&firstname=${user.firstname}&lastname=${user.lastname}&phone=${user.phone}`
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.ok) {
          navigate("/activate");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className={styles.registerPage}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          className={styles.registerFormBox}
        >
          <Typography
            variant="h5"
            component="h5"
            sx={{ margin: "20px 0 35px", textAlign: "center" }}
          >
            فرم ثبت نام
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-error-helper-text"
                label="نام *"
                value={user.firstname}
                onChange={firstnameHandler}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-error-helper-text"
                label="نام خانوادگی *"
                value={user.lastname}
                onChange={lastnameHandler}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-error-helper-text"
                label="شماره همراه *"
                value={user.phone}
                onChange={phoneHandler}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-error-helper-text"
                type={showPassword ? "text" : "password"}
                label="رمز عبور *"
                value={user.password}
                onChange={passwordHandler}
                sx={{ width: "100%" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={showPasswordHandler}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>{" "}
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={signUp}
                disabled={loading}
                variant="contained"
                color="primary"
                sx={{ width: "100%" }}
              >
                {loading ? <span>صبر کنید ...</span> : <span>ثبت نام</span>}
              </Button>
            </Grid>
          </Grid>
          <Typography
            variant="p"
            component="p"
            sx={{ margin: "35px 0 0", textAlign: "center" }}
          >
            از قبل حساب کاربری داشته‌اید ؟{" "}
            <Link to="/" className={styles.loginLink} color="primary">
              ورود
            </Link>
          </Typography>
        </Box>
      </div>
    </>
  );
};

export default Register;
