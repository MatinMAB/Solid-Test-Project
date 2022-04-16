const initialState = {
  active: false,
  token: "",
  confirmCode: "123456",
  phone: "",
  firstname: "",
  lastname: "",
  grade: "",
  loading: false,
  error: "",
  navigateLink: "",
  success: "",
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

    case "GET_USER_INFO_SUCCESS":
      if (action.payload.ok) {
        return {
          ...state,
          active: action.payload.active,
          grade: action.payload.grade,
          phone: action.payload.phone,
          firstname: action.payload.firstname,
          lastname: action.payload.lastname,
          loading: false,
          error: "",
        };
      } else {
        return {
          ...state,

          phone: "شماره همراه دریافت نشده است",
          firstname: "نام دریافت نشده است",
          lastname: "نام خانوادگی دریافت نشده است",

          loading: false,
          error: "",
        };
      }

    case "CHANGE_PASSSWORD_SUCCESS":
      if (action.payload.ok) {
        return {
          ...state,
          loading: false,
          error: "",
          success: "تغییر رمز عبور با موفقیت صورت گرفت",
        };
      } else {
        return {
          ...state,
          success: "",
          loading: false,
          error: "تغییر رمز عبور صورت نگرفت! مجددا امتحان کنید.",
        };
      }

    case "EXIT":
      return {
        active: false,
        token: "",
        confirmCode: "123456",
        phone: "",
        firstname: "",
        lastname: "",
        grade: "",
        loading: false,
        error: "",
        navigateLink: "",
        success: "",
      };

    default:
      return state;
  }
};

export default userReducer;
