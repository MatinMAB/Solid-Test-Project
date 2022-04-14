import React, { useState, useEffect } from "react";

//Import Axios
import axios from "axios";

//Material UI
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

const UserAccount = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstname: "ali",
    lastname: "alies",
    phone: "09124567893",
  });
  const [password, setPassword] = useState({
    new: "",
    current: "",
  });

  useEffect(() => {
    // setLoading(true);
    axios
      .post(
        `http://chl-api.rahkardigital.com/API/V1/User/getUserInfo?token=79adae459a6291d02a2f7bf118ddef34e0516a3e92e641ad0f99221aa231c757`
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.ok) {
          // navigate("/activate");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        // setLoading(false);
      });
  }, []);

  const currentPasswordHandler = (event) => {
    setPassword((prevPassword) => ({
      ...prevPassword,
      current: event.target.value,
    }));
  };
  const newPasswordHandler = (event) => {
    setPassword((prevPassword) => ({
      ...prevPassword,
      new: event.target.value,
    }));
  };
  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };
  const ConfirmNewPassword = () => {
    // setLoading(true);
    axios
      .post(
        `http://chl-api.rahkardigital.com/API/V1/User/changePassword?token=79adae459a6291d02a2f7bf118ddef34e0516a3e92e641ad0f99221aa231c757&newPassword=${password.new}&curPassword=${password.current}`
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.ok) {
          // navigate("/activate");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        // setLoading(false);
      });
  };

  return (
    <>
      <Typography
        variant="h5"
        component="h5"
        sx={{ margin: "30px 10px 35px", fontWeight: "bold" }}
      >
        مشاهده و ویرایش حساب کاربری
      </Typography>
      <Grid container spacing={3} sx={{ padding: "10px 50px" }}>
        <Grid item xs={12} sm={6}>
          <TextField
            value={userInfo.firstname}
            id="outlined-error-helper-text"
            label="نام"
            sx={{ width: "100%" }}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={userInfo.lastname}
            id="outlined-error-helper-text"
            label="نام خانوادگی"
            sx={{ width: "100%" }}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={userInfo.phone}
            id="outlined-error-helper-text"
            label="شماره همراه"
            sx={{ width: "100%" }}
            disabled
          />
        </Grid>
      </Grid>
      <Typography
        variant="h5"
        component="div"
        sx={{ margin: "40px 50px 10px" }}
      >
        ویرایش رمز عبور
      </Typography>{" "}
      <Grid container spacing={3} sx={{ padding: "10px 50px" }}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="outlined-error-helper-text"
            type={showPassword ? "text" : "password"}
            value={password.current}
            label="رمز عبور فعلی"
            onChange={currentPasswordHandler}
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
        <Grid item xs={12} sm={6}>
          <TextField
            id="outlined-error-helper-text"
            type={showPassword ? "text" : "password"}
            label="رمز جدید"
            value={password.new}
            onChange={newPasswordHandler}
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
            variant="contained"
            color="primary"
            sx={{ width: "100%", marginBottom: "20px" }}
            onClick={ConfirmNewPassword}
          >
            <span>ثبت رمز جدید</span>
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default UserAccount;
