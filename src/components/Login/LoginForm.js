import React, { useState, useEffect } from "react";

//Import React-Redux
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../redux/user/userActions";

//Import Router
import { useNavigate, Link } from "react-router-dom";

//Import Styles
import styles from "./LoginForm.module.css";

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
import validate from "../../helpers/validateLogin";

const LoginForm = () => {
  //Router hook
  const navigate = useNavigate();

  //redux hooks
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  //States
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
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
    if (state.navigateLink === "/profile") {
      navigate("/profile");
    } else if (state.navigateLink === "/activate") {
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

  const login = () => {
    if (!Object.keys(errors).length) {
      dispatch(loginUser(user));
    } else {
      setTouched({
        phone: true,
        password: true,
      });
    }
  };

  //V-DOM
  return (
    <>
      <div className={styles.loginPage}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          className={styles.loginFormBox}
        >
          <Typography
            variant="h5"
            component="h5"
            sx={{ margin: "20px 0 35px", textAlign: "center" }}
          >
            فرم ورود
          </Typography>
          <Grid container spacing={3}>
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
                disabled={loading}
                onClick={login}
                variant="contained"
                color="primary"
                sx={{ width: "100%" }}
              >
                {loading ? <span>صبر کنید ...</span> : <span>ورود</span>}
              </Button>
              <Typography
                variant="p"
                component="p"
                sx={{ margin: "5px 0 0", textAlign: "center", color: "red" }}
              >
                {state.error ? (
                  <span>اطلاعات وارد شده صحیح نمی‌باشد</span>
                ) : (
                  <p></p>
                )}
              </Typography>
            </Grid>
          </Grid>
          <Typography
            variant="p"
            component="p"
            sx={{ margin: "20px 0 0", textAlign: "center" }}
          >
            از قبل حساب کاربری نداشته‌اید ؟{" "}
            <Link to="/register" className={styles.signupLink} color="primary">
              ثبت نام
            </Link>
          </Typography>
        </Box>
      </div>
    </>
  );
};
export default LoginForm;
