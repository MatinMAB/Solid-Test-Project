const validate = (data) => {
  const errors = {};

  if (!data.firstname.trim()) {
    errors.firstname = "فیلد نام الزامی است";
  } else {
    delete errors.firstname;
  }

  if (!data.lastname.trim()) {
    errors.lastname = "فیلد نام خانوادگی الزامی است";
  } else {
    delete errors.lastname;
  }

  if (!data.phone.trim()) {
    errors.phone = "فیلد شماره همراه الزامی است";
  } else if (!/^(\+98|0)?9\d{9}$/.test(data.phone)) {
    errors.phone = "لطفا شماره همراه معتبر وارد کنید";
  } else {
    delete errors.phone;
  }

  if (!data.password.trim()) {
    errors.password = "فیلد رمز عبور الزامی است";
  } else if (!/(?=.{8,})/.test(data.password)) {
    errors.password = "طول رمز عبور باید بیشتر از 7 کاراکتر باشد";
  } else if (!/(?=.*[a-z])/.test(data.password)) {
    errors.password = "رمز عبور حداقل باید شامل یک حرف کوچک a-z باشد";
  } else if (!/(?=.*[A-Z])/.test(data.password)) {
    errors.password = "رمز عبور حداقل باید شامل یک حرف بزرگ A-Z باشد";
  } else if (!/(?=.*[0-9])/.test(data.password)) {
    errors.password = "رمز عبور حداقل باید شامل یک عدد 9-0 باشد";
  } else {
    delete errors.password;
  }

  return errors;
};

export default validate;
