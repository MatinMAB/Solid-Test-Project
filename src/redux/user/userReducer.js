const initialState = {
  ok: false,
  active: false,
  token: "",
  phone: "",
  password: "",
  firstname: "",
  lastname: "",
  confirmCode: "123456",
  loading: false,
  error: "",
  alreadyExist: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_FAILURE":
      return {
        ...state,
        ok: false,
        loading: false,
        error: action.payload,
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        loading: false,
        error: "",
        phone: action.phone,
        password: action.password,
        firstname: action.firstname,
        lastname: action.lastname,
        active: action.payload.active,
        token: action.payload.token,
        alreadyExist: action.payload.alreadyExist,
      };
    case "ACTIVATE_SUCCESS":
      if (action.payload.ok) {
        return {
          ...state,
          active: true,
          loading: false,
          error: "",
        };
      } else {
        return {
          ...state,
          loading: false,
          error: "error Expected",
        };
      }
    case "LOGIN_SUCCESS":
      if (action.payload.ok) {
        return {
          ...state,
          active: action.payload.active,
          token: action.payload.token,
          loading : false,
          error:""
        };
      } else {
        return {
          ...state,
          loading : false,
          error : "error Expected"
        };
      }

    default:
      return state;
  }
};

export default userReducer;
