import React, { useEffect, useState } from "react";

//Import React-Redux
import { useSelector, useDispatch } from "react-redux";
import { activateUser } from "../../redux/user/userActions";

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
  //Router hook
  const navigate = useNavigate();

  //redux hooks
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  //States
  const [confirmCode, setConfirmCode] = useState("");

  //SideEffects
  useEffect(() => {
    if (!!state.token === false) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (state.navigateLink === "/profile") {
      navigate("/profile");
    }
  }, [state.navigateLink]);

  //Functions
  const confirmCodeHandler = (event) => {
    setConfirmCode(event.target.value);
  };

  const confirm = () => {
    dispatch(
      activateUser({ phone: state.phone, token: state.token, confirmCode })
    );
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
                disabled={state.loading}
                onClick={confirm}
                variant="contained"
                color="primary"
                sx={{ width: "100%" }}
              >
                {state.loading ? <span>صبر کنید ...</span> : <span>تایید</span>}
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
        </Box>
      </div>
    </>
  );
};

export default ActivateForm;
