//Import Axios
import axios from "axios";

import { useNavigate } from "react-router-dom";

const fetchRequest = () => {
  return { type: "FETCH_REQUEST" };
};
const registerSuccess = (data) => {
  return { type: "REGISTER_SUCCESS", payload: data };
};
const fetchFailure = (error) => {
  return { type: "FETCH_FAILURE", payload: error };
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
