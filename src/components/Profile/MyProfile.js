import React , {useState} from "react";

//Import React-Redux
import { useSelector, useDispatch } from "react-redux";
import { exit } from "../../redux/user/userActions";


//Import Link Router
import { Routes, Route, Link, useLocation , useNavigate } from "react-router-dom";

//Import Styles
import styles from "./MyProfile.module.css";

//Material UI
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListIcon from '@mui/icons-material/List';

//Components
import Dashboard from "./Dashboard";
import UserAccount from "./UserAccount";

//Profile Functional Component
const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();


//redux hooks
const state = useSelector((state) => state);
const dispatch = useDispatch();
  
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const exitDashboard = () => {
    navigate('/login');
    dispatch(exit())

  }


  return (
    <>
      <Grid container spacing={2} sx={{ height: "100vh" }}>
        <Grid
          item
          xs={12}
          sm={4}
          lg={3}
          sx={{ backgroundImage: "linear-gradient(to top, #fff,#1976d2cd)" }}
        >
          <div className={styles.sidebar}>
            <div className={styles.imageBox}>
              <img
                src="https://randomuser.me/api/portraits/men/21.jpg"
                alt="user-img"
                className={styles.userImage}
              />
            </div>
            <div className={styles.menuIcon}>
              <Button
                id="demo-positioned-button"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <ListIcon fontSize="large" color="action"/>
              </Button>
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem onClick={() => navigate('/profile')}>داشبورد</MenuItem>
                <MenuItem onClick={() => navigate('/profile/my-account')}>حساب کاربری</MenuItem>
                <MenuItem onClick={exitDashboard}>خروج</MenuItem>
              </Menu>
            </div>
            <div className={styles.lists}>
              <ul className={styles.itemsList}>
                <li className={styles.item}>
                  <Link
                    className={`${styles.itemLink} ${
                      location.pathname === "/profile" && styles.active
                    }`}
                    to="/profile"
                  >
                    داشبورد
                  </Link>
                </li>
                <li className={styles.item}>
                  <Link
                    className={`${styles.itemLink} ${
                      location.pathname === "/profile/my-account" &&
                      styles.active
                    }`}
                    to="/profile/my-account"
                  >
                    حساب کاربری
                  </Link>
                </li>
                <li className={styles.item} onClick={exitDashboard}>
                  <Link className={styles.itemLink} to="/login">
                    خروج
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={8} lg={9}>
          <Routes>
            <Route path="" element={<Dashboard />} />
            <Route path="my-account" element={<UserAccount />} />
          </Routes>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
