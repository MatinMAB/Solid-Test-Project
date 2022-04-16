//Import Axios
import axios from "axios";

//Actions
const fetchRequest = () => {
  return { type: "FETCH_REQUEST" };
};

const fetchFailure = (error) => {
  return { type: "FETCH_FAILURE", payload: error };
};

//Action for Register
const registerSuccess = (data, phone) => {
  return {
    type: "REGISTER_SUCCESS",
    payload: data,
    phone,
  };
};

//Action for Activate
const activateSuccess = (data) => {
  return { type: "ACTIVATE_SUCCESS", payload: data };
};

//Action for Login
const loginSuccess = (data, phone) => {
  return { type: "LOGIN_SUCCESS", payload: data, phone };
};

//Action for Getting User Info
const getUserInfoSuccess = (data) => {
  return { type: "GET_USER_INFO_SUCCESS", payload: data };
};

//Action for Change and Set New Password
const changePasswordSuccess = (data) => {
  return { type: "CHANGE_PASSSWORD_SUCCESS", payload: data };
};

//Action for Exit from Dashboard
export const exit = () => {
  return { type: "EXIT" };
};

//Async Action for Register
export const registerUser = (user, phone) => {
  return (dispatch) => {
    dispatch(fetchRequest());
    axios
      .get(
        `http://chl-api.rahkardigital.com/API/V1/User/register?password=${user.password}&firstname=${user.firstname}&lastname=${user.lastname}&phone=${user.phone}`
      )
      .then((response) => {
        console.log(response.data);
        dispatch(registerSuccess(response.data, phone));
      })
      .catch((error) => {
        dispatch(fetchFailure(error.message));
      });
  };
};

//Async Action for Activate
export const activateUser = (user) => {
  return (dispatch) => {
    dispatch(fetchRequest());
    axios
      .get(
        `http://chl-api.rahkardigital.com/API/V1/User/active?phone=${user.phone}&code=${user.confirmCode}&token=${user.token}`
      )
      .then((response) => {
        console.log(response.data);
        dispatch(activateSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchFailure(error.message));
      });
  };
};

//Async Action for Login
export const loginUser = (user) => {
  return (dispatch) => {
    dispatch(fetchRequest());
    axios
      .get(
        `http://chl-api.rahkardigital.com/API/V1/User/login?phone=${user.phone}&password=${user.password}`
      )
      .then((response) => {
        console.log(response.data);
        dispatch(loginSuccess(response.data, user.phone));
      })
      .catch((error) => {
        dispatch(fetchFailure(error.message));
      });
  };
};

//Async Action for Getting User Info
export const getUserInfo = (token) => {
  return (dispatch) => {
    dispatch(fetchRequest());
    axios
      .get(
        `http://chl-api.rahkardigital.com/API/V1/User/getUserInfo?token=${token}`
      )
      .then((response) => {
        console.log(response.data);
        dispatch(getUserInfoSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchFailure(error.message));
      });
  };
};

//Action for Change and Set New Password
export const changePassword = (password, token) => {
  return (dispatch) => {
    dispatch(fetchRequest());
    axios
      .get(
        `http://chl-api.rahkardigital.com/API/V1/User/changePassword?token=${token}&newPassword=${password.new}&curPassword=${password.current}`
      )
      .then((response) => {
        console.log(response.data);
        dispatch(changePasswordSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchFailure(error.message));
      });
  };
};
