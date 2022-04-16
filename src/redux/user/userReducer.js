const initialState = {
  active: false,
  token: "",
  confirmCode: "123456",
  phone: "",
  loading: false,
  error: "",
  navigateLink: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_FAILURE":
      return {
        ...state,
        loading: false,
        error: "در ارتباط با سرور مشکلی رخ داده است.",
      };
    case "REGISTER_SUCCESS":
      if (action.payload.ok) {
        return {
          ...state,
          loading: false,
          error: "",
          phone: action.phone,
          active: action.payload.active,
          token: action.payload.token,
          navigateLink: "/activate",
        };
      } else if (!action.payload.ok && action.payload.alreadyExist) {
        return {
          ...state,
          loading: false,
          error: "شما از قبل حساب کاربری داشته‌اید. لطفا وارد شوید",
        };
      } else {
        return {
          ...state,
          loading: false,
          error: "در ارتباط با سرور مشکلی رخ داده است.",
        };
      }




    case "ACTIVATE_SUCCESS":
      if (action.payload.ok) {
        return {
          ...state,
          active: true,
          loading: false,
          error: "",
          navigateLink: "/profile",
        };
      } else if (!action.payload.ok) {
        return {
          ...state,
          loading: false,
          error: "کد تاییدیه به درستی وارد نشده است یا توکن منقضی شده است.",
        };
      } else {
        return {
          ...state,
          loading: false,
          error: "در ارتباط با سرور مشکلی رخ داده است.",
        };
      }




    case "LOGIN_SUCCESS":
      if (action.payload.ok) {
        return {
          ...state,
          active: action.payload.active,
          token: action.payload.token,
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

    default:
      return state;
  }
};

export default userReducer;
