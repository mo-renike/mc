// show password
let passwords = document.querySelectorAll(".password");
let showBtns = document.querySelectorAll(".show-password");

passwords.forEach((password) => {
  showBtns.forEach((showBtn) => {
    showBtn.addEventListener("click", () => {
      if (password.type === "password") {
        password.type = "text";
      } else {
        password.type = "password";
      }
    });
  });
});

//   multistep form controls

const prevBtns = document.querySelectorAll(".prevBtn");
const nextBtns = document.querySelectorAll(".nextBtn");
const progress = document.querySelector("#progressbar");
const progress_steps = document.querySelectorAll(".progress_step");
const forms = document.querySelectorAll(".buy-form");
const inputs = document.querySelectorAll(".buy-form input");

let formStepsNum = 0;

// function submitOne(e) {
//   e.preventDefault();
//   if (document.getElementById("first").checkValidity()) {
//     formStepsNum++;
//     updateFormSteps();
//     updateProgress();
//   }
//   forms[0].reportValidity();
// }



nextBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
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

prevBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    formStepsNum--;
    updateFormSteps();
    updateProgress();
  });
});

function updateFormSteps() {
  forms.forEach((form) => {
    form.classList.contains("active") && form.classList.remove("active");
  });
  forms[formStepsNum].classList.add("active");
}

function updateProgress() {
  progress_steps.forEach((step, idx) => {
    if (idx < formStepsNum + 1) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
  });
}


