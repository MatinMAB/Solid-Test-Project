//Import Axios
import axios from "axios";

const fetchRequest = () => {
  return { type: "FETCH_REQUEST" };
};

const fetchFailure = (error) => {
  return { type: "FETCH_FAILURE", payload: error };
};

const registerSuccess = (data) => {
  return {
    type: "REGISTER_SUCCESS",
    payload: data,
  };
};

const activateSuccess = (data) => {
  return { type: "ACTIVATE_SUCCESS", payload: data };
};

const loginSuccess = (data) => {
  return { type: "LOGIN_SUCCESS", payload: data };
};

export const registerUser = (user) => {
  return (dispatch) => {
    dispatch(fetchRequest());
    axios
      .get(
        `http://chl-api.rahkardigital.com/API/V1/User/register?password=${user.password}&firstname=${user.firstname}&lastname=${user.lastname}&phone=${user.phone}`
      )
      .then((response) => {
        console.log(response.data);
        dispatch(registerSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchFailure(error.message));
      });
  };
};

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

export const loginUser = (user) => {
  return (dispatch) => {
    dispatch(fetchRequest());
    axios
      .get(
        `http://chl-api.rahkardigital.com/API/V1/User/login?phone=${user.phone}&password=${user.password}`
      )
      .then((response) => {
        console.log(response.data);
        dispatch(loginSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchFailure(error.message));
      });
  };
};
