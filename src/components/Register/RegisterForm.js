import React, { useState } from "react";

//Import Link Router
import { Link } from "react-router-dom";

//Import Styles
import styles from "./RegisterForm.module.css";

//Material UI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography, Grid, Button } from "@mui/material";

const Register = () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    password: "",
  });

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
          <Grid container spacing={3} xs={{ width: "600px" }}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-error-helper-text"
                label="نام *"
                value={user.firstname}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-error-helper-text"
                label="نام خانوادگی *"
                value={user.lastname}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-error-helper-text"
                label="شماره همراه *"
                value={user.phone}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-error-helper-text"
                label="رمز عبور *"
                value={user.password}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                sx={{ width: "100%" }}
              >
                ثبت نام
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
