const validate = (data) => {
  const errors = {};

  if (!data.phone.trim()) {
    errors.phone = "فیلد شماره همراه الزامی است";
  } else {
    delete errors.phone;
  }

  if (!data.password.trim()) {
    errors.password = "فیلد رمز عبور الزامی است";
  } else {
    delete errors.password;
  }

  return errors;
};

export default validate;
