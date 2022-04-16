const validate = (data) => {
  const errors = {};

  if (!data.current.trim()) {
    errors.current = "فیلد رمز عبور الزامی است";
  } else {
    delete errors.current;
  }

  if (!data.new.trim()) {
    errors.new = "فیلد رمز عبور جدید الزامی است";
  } else if (!/(?=.{8,})/.test(data.new)) {
    errors.new = "طول رمز عبور جدید باید بیشتر از 7 کاراکتر باشد";
  } else if (!/(?=.*[a-z])/.test(data.new)) {
    errors.new = "رمز عبور جدید حداقل باید شامل یک حرف کوچک a-z باشد";
  } else if (!/(?=.*[A-Z])/.test(data.new)) {
    errors.new = "رمز عبور جدید حداقل باید شامل یک حرف بزرگ A-Z باشد";
  } else if (!/(?=.*[0-9])/.test(data.new)) {
    errors.new = "رمز عبور جدید حداقل باید شامل یک عدد 9-0 باشد";
  } else {
    delete errors.new;
  }

  return errors;
};

export default validate;
