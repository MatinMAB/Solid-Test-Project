const initialState = {
  ok: false,
  active: false,
  token: "",
  phone: "",
  password: "",
  loading: false,
  error: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        loading: false,
        error: "",
        ok: action.payload.ok,
        active: action.payload.active,
        token: action.payload.token,
      };
    case "FETCH_FAILURE":
      return {
        ok: false,
        active: false,
        token: "",
        phone: "",
        password: "",
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
