const checkPwd = function () {
  let pwdValue = document.getElementById("password").value;
  let confirm_pwdValue = document.getElementById("confirm_password").value;
  let error = document.getElementById("pwd_error_message");

  if (pwdValue.length < 8 || pwdValue.length > 15) {
    error.innerHTML = "Passwords must be between 8 and 15 characters";
    error.style.color = "red";
  } else if (pwdValue == confirm_pwdValue) {
    error.style.color = "green";
    error.innerHTML = "Passwords Match";
  } else {
    error.style.color = "red";
    error.innerHTML = "Passwords don't match";
  }
};

// let forms = document.querySelectorAll('.buy-form')
// console.log(forms);

const customerDetailsHandler = document.getElementById(
  "customerDetailsHandler"
);

customerDetailsHandler.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "./payment-page.html";
});
