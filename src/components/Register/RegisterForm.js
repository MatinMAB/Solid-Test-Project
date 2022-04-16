import React, { useState, useEffect } from "react";

//Import React-Redux
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../../redux/user/userActions";

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

//Import Validation Functions
import validate from "../../helpers/validateRegister";

//Register Functional Component
const Register = () => {
  //Router hook
  const navigate = useNavigate();

  //redux hooks
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  //States
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  //SideEffects
  useEffect(() => {
    setErrors(validate(user));
    console.log(errors);
  }, [user, touched]);

  useEffect(() => {
    if (state.navigateLink === "/activate") {
      navigate("/activate");
    }
  }, [state.navigateLink]);

  //Functions
  const userHandler = (event) => {
    setUser((prevUser) => ({
      ...prevUser,
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

  const signUp = () => {
    if (!Object.keys(errors).length) {
      dispatch(registerUser(user, user.phone));
    } else {
      setTouched({
        firstname: true,
        lastname: true,
        phone: true,
        password: true,
      });
    }
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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={!!errors.firstname && !!touched.firstname}
                name="firstname"
                id="outlined-error-helper-text"
                label="نام *"
                value={user.firstname}
                onChange={userHandler}
                sx={{ width: "100%" }}
                helperText={
                  !!errors.firstname && !!touched.firstname && errors.firstname
                }
                onFocus={focusHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={!!errors.lastname && !!touched.lastname}
                name="lastname"
                id="outlined-error-helper-text"
                label="نام خانوادگی *"
                value={user.lastname}
                onChange={userHandler}
                sx={{ width: "100%" }}
                helperText={
                  !!errors.lastname && !!touched.lastname && errors.lastname
                }
                onFocus={focusHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={!!errors.phone && !!touched.phone}
                name="phone"
                id="outlined-error-helper-text"
                label="شماره همراه *"
                value={user.phone}
                onChange={userHandler}
                sx={{ width: "100%" }}
                helperText={!!errors.phone && !!touched.phone && errors.phone}
                onFocus={focusHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={!!errors.password && !!touched.password}
                name="password"
                id="outlined-error-helper-text"
                type={showPassword ? "text" : "password"}
                label="رمز عبور *"
                value={user.password}
                onChange={userHandler}
                sx={{ width: "100%" }}
                helperText={
                  !!errors.password && !!touched.password && errors.password
                }
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
                onClick={signUp}
                disabled={state.loading}
                variant="contained"
                color="primary"
                sx={{ width: "100%" }}
              >
                {state.loading ? (
                  <span>صبر کنید ...</span>
                ) : (
                  <span>ثبت نام</span>
                )}
              </Button>
            </Grid>
          </Grid>
          <Typography
            variant="subtitle2"
            component="p"
            sx={{ margin: "10px 0 0", textAlign: "center", color: "red" }}
          >
            {!!state.error && state.error}
          </Typography>
          <Typography
            variant="p"
            component="p"
            sx={{ margin: "35px 0 0", textAlign: "center" }}
          >
            از قبل حساب کاربری داشته‌اید ؟{" "}
            <Link to="/login" className={styles.loginLink} color="primary">
              ورود
            </Link>
          </Typography>
        </Box>
      </div>
    </>
  );
};

export default Register;
