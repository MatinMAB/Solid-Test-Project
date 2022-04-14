import React, { useState } from "react";

//Import Axios
import axios from "axios";

//Import Link Router
import { useNavigate } from "react-router-dom";

//Import Styles
import styles from "./ActivateForm.module.css";

//Material UI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography, Grid, Button } from "@mui/material";

//Activate Functional Component
const ActivateForm = () => {
  const navigate = useNavigate();

  //States
  const [confirmCode, setConfirmCode] = useState("");
  const [loading, setLoading] = useState(false);

  //Functions
  const confirmCodeHandler = (event) => {
    setConfirmCode(event.target.value);
  };

  const confirm = () => {
    setLoading(true);
    axios
      .post(
        `http://chl-api.rahkardigital.com/API/V1/User/active?phone=09123456789&code=${confirmCode}&token=f726564d5071828215b9ff8a1e66ddb0d53027f9593ef0873e8d062681d1f931`
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.ok) {
          navigate("/profile");
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
      <div className={styles.activatePage}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          className={styles.activateFormBox}
        >
          <Typography
            variant="h5"
            component="h5"
            sx={{ margin: "20px 0 35px", textAlign: "center" }}
          >
            فرم فعالسازی
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="outlined-error-helper-text"
                label="کد فعالسازی *"
                value={confirmCode}
                onChange={confirmCodeHandler}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                disabled={loading}
                onClick={confirm}
                variant="contained"
                color="primary"
                sx={{ width: "100%" }}
              >
                {loading ? <span>صبر کنید ...</span> : <span>تایید</span>}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default ActivateForm;
