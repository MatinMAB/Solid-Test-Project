//Import Axios
import axios from "axios";

import { useNavigate } from "react-router-dom";

const fetchRequest = () => {
  return { type: "FETCH_REQUEST" };
};

const fetchFailure = (error) => {
  return { type: "FETCH_FAILURE", payload: error };
};

const registerSuccess = (data, firstname, lastname, password, phone) => {
  return {
    type: "REGISTER_SUCCESS",
    payload: data,
    firstname,
    lastname,
    password,
    phone,
  };
};

const activateSuccess = (data) => {
  return { type: "ACTIVATE_SUCCESS", payload: data };
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
        dispatch(
          registerSuccess(
            response.data,
            user.firstname,
            user.lastname,
            user.password,
            user.phone
          )
        );
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
