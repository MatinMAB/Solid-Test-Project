import React, { useEffect } from "react";

//Import React-Redux
import { useSelector } from "react-redux";

//Import Router
import { useNavigate } from "react-router-dom";

//Import Styles
import styles from "./Dashboard.module.css";

//Material UI
import {
  Badge,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import ArrowCircleLeftSharpIcon from "@mui/icons-material/ArrowCircleLeftSharp";

const Dashboard = () => {
  //redux hooks
  const state = useSelector((state) => state);
  const navigate = useNavigate();

  //SideEffects
  useEffect(() => {
    if (!!state.token === false) {
      navigate("/login");
    }
    //eslint-disable-next-line
  }, [state.token]);

  //V-DOM
  return (
    <>
      <Grid container spacing={3} sx={{ padding: "30px 20px" }}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="30"
                sx={{ backgroundColor: "#2E7D32" }}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="body1"
                  component="div"
                  className={styles.cardContent}
                >
                  <span>تماس گرفته شده</span>
                  <Badge badgeContent={9} color="success">
                    <MailIcon color="action" />
                  </Badge>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="30"
                sx={{ backgroundColor: "#ED6C02" }}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="body1"
                  component="div"
                  className={styles.cardContent}
                >
                  <span>بررسی شده</span>
                  <Badge badgeContent={11} color="warning">
                    <MailIcon color="action" />
                  </Badge>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="30"
                sx={{ backgroundColor: "#D32F2F" }}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="body1"
                  component="div"
                  className={styles.cardContent}
                >
                  <span>قبول شده</span>
                  <Badge badgeContent={2} color="error">
                    <MailIcon color="action" />
                  </Badge>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>

      <Typography
        gutterBottom
        variant="h6"
        component="div"
        sx={{
          margin: "30px 20px 0",
          fontWeight: "bold",
          borderTop: "1px solid #e1e1e1",
          paddingTop: "20px",
        }}
      >
        تکمیل حساب کاربری
      </Typography>

      <Grid container spacing={3} sx={{ padding: "30px 20px" }}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardActionArea>
              <CardContent sx={{ backgroundColor: "#D32F2F" }}>
                <Typography
                  gutterBottom
                  variant="body1"
                  component="div"
                  className={styles.cardContent}
                  sx={{ color: "#fff" }}
                >
                  <span>حرفه ای</span>

                  <ArrowCircleLeftSharpIcon color="action" />
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardActionArea>
              <CardContent sx={{ backgroundColor: "#9c27b0" }}>
                <Typography
                  gutterBottom
                  variant="body1"
                  component="div"
                  className={styles.cardContent}
                  sx={{ color: "#fff" }}
                >
                  <span>آموزشی</span>

                  <ArrowCircleLeftSharpIcon color="action" />
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
