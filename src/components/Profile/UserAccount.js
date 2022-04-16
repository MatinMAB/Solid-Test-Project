import React, { useState, useEffect } from "react";

//Import React-Redux
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo, changePassword } from "../../redux/user/userActions";

//Import Router
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

//Import Validation Functions
import validate from "../../helpers/validateSetNewPassword";

const UserAccount = () => {
  //Router hook
  const navigate = useNavigate();

  //redux hooks
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  //States
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState({
    new: "",
    current: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  //SideEffects
  useEffect(() => {
    setErrors(validate(password));
    //eslint-disable-next-line
  }, [password, touched]);

  useEffect(() => {
    dispatch(getUserInfo(state.token));
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!!state.token === false) {
      navigate("/login");
    }
    //eslint-disable-next-line
  }, [state.token]);

  //Functions
  const passwordHandler = (event) => {
    setPassword((prevPassword) => ({
      ...prevPassword,
      [event.target.name]: event.target.value,
    }));
  };

  const focusHandler = (event) => {
    setTouched((prevTouched) => ({
      ...prevTouched,
      [event.target.name]: true,
    }));
  };

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const ConfirmNewPassword = () => {
    if (!Object.keys(errors).length) {
      dispatch(changePassword(password, state.token));
      setPassword({
        new: "",
        current: "",
      });
    } else {
      setTouched({
        new: true,
        current: true,
      });
    }
  };

  //V-DOM
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
            label="نام"
            sx={{ width: "100%" }}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={state.lastname}
            label="نام خانوادگی"
            sx={{ width: "100%" }}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={state.phone}
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
            name="current"
            error={!!errors.current && !!touched.current}
            type={showPassword ? "text" : "password"}
            value={password.current}
            label="رمز عبور فعلی"
            onChange={passwordHandler}
            sx={{ width: "100%" }}
            helperText={!!errors.current && !!touched.current && errors.current}
            onFocus={focusHandler}
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
            name="new"
            error={!!errors.new && !!touched.new}
            type={showPassword ? "text" : "password"}
            label="رمز جدید"
            value={password.new}
            onChange={passwordHandler}
            sx={{ width: "100%" }}
            helperText={!!errors.new && !!touched.new && errors.new}
            onFocus={focusHandler}
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
          <Typography
            variant="p"
            component="p"
            sx={{ textAlign: "center", color: "red" }}
          >
            {!!state.error && state.error}
          </Typography>
          <Typography
            variant="p"
            component="p"
            sx={{ textAlign: "center", color: "green" }}
          >
            {!!state.success && state.success}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default UserAccount;
