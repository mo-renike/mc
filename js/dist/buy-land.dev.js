"use strict";

// form validation
// function validateForm() {
//   let x = document.forms["myForm"]["fname"].value;
//   if (x == "") {
//     alert("Name must be filled out");
//     return false;
//   }
// }
// show password
var passwords = document.querySelectorAll(".password");
var showBtns = document.querySelectorAll(".show-password");
passwords.forEach(function (password) {
  showBtns.forEach(function (showBtn) {
    showBtn.addEventListener("click", function () {
      if (password.type === "password") {
        password.type = "text";
      } else {
        password.type = "password";
      }
    });
  });
}); //   multistep form controls

var prevBtns = document.querySelectorAll(".prevBtn");
var nextBtns = document.querySelectorAll(".nextBtn");
var progress = document.querySelector("#progressbar");
var progress_steps = document.querySelectorAll(".progress_step");
var forms = document.querySelectorAll(".buy-form");
var inputs = document.querySelectorAll(".buy-form input");
var formStepsNum = 0; // function submitOne(e) {
//   e.preventDefault();
//   if (document.getElementById("first").checkValidity()) {
//     formStepsNum++;
//     updateFormSteps();
//     updateProgress();
//   }
//   forms[0].reportValidity();
// }

console.log(forms);
nextBtns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    console.log(formStepsNum);

    if (forms[formStepsNum].checkValidity()) {
      console.log(formStepsNum);
      formStepsNum++;
      updateFormSteps();
      updateProgress();
    }

    forms[formStepsNum].reportValidity();
  });
});
prevBtns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    formStepsNum--;
    updateFormSteps();
    updateProgress();
  });
});

function updateFormSteps() {
  forms.forEach(function (form) {
    form.classList.contains("active") && form.classList.remove("active");
  });
  forms[formStepsNum].classList.add("active");
}

function updateProgress() {
  progress_steps.forEach(function (step, idx) {
    if (idx < formStepsNum + 1) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
  });
} // payment method


var paymentOption = document.querySelectorAll(".payment__option");

var paymentOptionHandler = function paymentOptionHandler(e) {
  // console.log(e);
  paymentOption.forEach(function (opt) {
    opt.classList.remove("active");
  });
  e.target.classList.add("active"); // console.log(e);
};