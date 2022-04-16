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
          error: "اطلاعات وارد شده صحیح نمی‌باشد.",
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
      } else {
        return {
          ...state,
          loading: false,
          error: "کد تاییدیه به درستی وارد نشده است یا توکن منقضی شده است.",
        };
      }

    case "LOGIN_SUCCESS":
      if (action.payload.ok && action.payload.active) {
        return {
          ...state,
          active: action.payload.active,
          token: action.payload.token,
          phone: action.phone,
          loading: false,
          error: "",
          navigateLink: "/profile",
        };
      } else if (action.payload.ok && !action.payload.active) {
        return {
          ...state,
          active: action.payload.active,
          phone: action.phone,
          token: action.payload.token,
          loading: false,
          error: "",
          navigateLink: "/activate",
        };
      } else {
        return {
          ...state,
          loading: false,
          error: "اطلاعات وارد شده صحیح نمی‌باشد.",
        };
      }

    default:
      return state;
  }
};

export default userReducer;
