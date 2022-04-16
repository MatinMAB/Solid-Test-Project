import React, { useState, useEffect } from "react";

//Import React-Redux
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo, changePassword } from "../../redux/user/userActions";

//Import Link Router
import { useNavigate } from "react-router-dom";

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
  //Router hook
  const navigate = useNavigate();

  //redux hooks
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [password, setPassword] = useState({
    new: "",
    current: "",
  });

  useEffect(() => {
    dispatch(getUserInfo(state.token));
  }, []);

  useEffect(() => {
    if (!!state.token === false) {
      navigate("/login");
    }
  }, [state.token]);

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
    dispatch(changePassword(password, state.token));
    setPassword({
      new: "",
      current: "",
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
            value={state.firstname}
            id="outlined-error-helper-text"
            label="نام"
            sx={{ width: "100%" }}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={state.lastname}
            id="outlined-error-helper-text"
            label="نام خانوادگی"
            sx={{ width: "100%" }}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={state.phone}
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
          <Typography variant="p" component="p" sx={{ textAlign: "center", color: "red" }}>
            {!!state.error && state.error}
          </Typography>
          <Typography variant="p" component="p" sx={{ textAlign: "center", color: "green" }}>
            {!!state.success && state.success}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default UserAccount;
