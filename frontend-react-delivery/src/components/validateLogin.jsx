export default function validateLogin(values) {
  let errors = {};
  const expression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!values.email) {
    errors.email = "Email address is required!";
  }
  if (!values.password) {
    errors.password = "Password is required!";
  }
  if (!expression.test(String(values.email).toLowerCase())) {
    errors.email = "Please enter a valid email address.";
  }
  return errors;
}
