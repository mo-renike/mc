//Basic/Universal Code
let logo = document.querySelectorAll("#text-loader path");
let logoArr = Array.from(logo);
logoArr.map((cur, index) => {
  console.log(`Let ${cur} have a length of ${cur.getTotalLength()}`);
});

function disableScroll() {
  document.body.classList.add("stop-scrolling");
}

function enableScroll() {
  document.body.classList.remove("stop-scrolling");
}

// disableScroll();

//Preloader
$(window).on("load", () => {
  $("#p__text-box").delay(7000).fadeOut(1500);
  $(".preloader").delay(7500).slideUp(1600);
  $("#main-content").delay(7500).fadeIn(1600);
  setTimeout(enableScroll, 7500);
});

//Navigation Menu Toggle
document.querySelector("#menu").addEventListener("click", () => {
  document.querySelector(".navigation").classList.add("toggle-nav");
  disableScroll();
});

document
  .querySelector(".navigation__cancel-btn")
  .addEventListener("click", () => {
    document.querySelector(".navigation").classList.remove("toggle-nav");
    setTimeout(enableScroll, 1200);
  });

//3D layout Toggle
let checkbox = document.querySelectorAll("input[name=checkbox]");
let img3d = document.querySelectorAll("#Court3D");
let img2d = document.querySelectorAll("#Court3D-2");
let arrCheckbox = Array.from(checkbox);
let arrImg3d = Array.from(img3d);
let arrImg2d = Array.from(img2d);

arrCheckbox.forEach(function (el) {
  el.addEventListener("change", function () {
    if (this.checked) {
      arrImg2d.forEach(function (el) {
        el.classList.add("court-block");
      });
      arrImg3d.forEach(function (el) {
        el.classList.remove("court-block");
      });
      // console.log("checked");
    } else {
      arrImg2d.forEach(function (el) {
        el.classList.remove("court-block");
      });
      arrImg3d.forEach(function (el) {
        el.classList.add("court-block");
      });
      // console.log("unchecked");
    }
  });
});


//Mobile 3d Layout
document.querySelector("#m-open").addEventListener("click", () => {
  document.querySelector(".mobile__3d").classList.add("m-block");
  disableScroll();
});
document.querySelector("#m-close").addEventListener("click", () => {
  document.querySelector(".mobile__3d").classList.remove("m-block");
  setTimeout(enableScroll, 1200);
});

//Land Form Operations/Validation
let plotNumber = document.getElementById("number-of-plots");
let agreeCheckbox = document.querySelector("#check__agree");
let landDetails = document.querySelector("#land-sales__details");
let paymentPlan = document.querySelector("#payment__plan");
let installment = document.querySelector("#installment");
let outright = document.querySelector("#outright");
let installmentDetails = document.querySelector("#installment__details");
let installmentPay = document.querySelector("#installment__payment");
let paymentBtn = document.querySelector("#payment__btn");
let radioButtons = document.querySelectorAll('input[name="payment_plan"]');
let arrRadioBtns = Array.from(radioButtons);
let lotType = document.querySelector("#lotType");
let paymentPeriod = document.querySelector("#paymentPeriod");
let initialAmount = document.querySelector("#down_payment_amount");
let totalPrice = document.querySelector("#totalCost");
let downPaymentContainer = document.querySelector("#downPaymentAmount");
let numberSpan = document.querySelector("#plotTypeOutput");
//let numOfUnits = document.getElementById("numberOfUnits");
let maxUnit = parseInt(document.getElementById("number-of-plots").max);

window.onload = agreeCheckbox.checked = false;

const proceedPayment = () => {
  initialAmount
    ? localStorage.setItem("initialAmount", initialAmount.value)
    : "";
  paymentPeriod
    ? localStorage.setItem("paymentPeriod", paymentPeriod.value)
    : "";
  localStorage.setItem("paymentOption", radioButtons.value);
  lotType ? localStorage.setItem("lotType", lotType.value) : "";
  localStorage.setItem("numOfUnits", plotNumber.value);
  localStorage.setItem("amount", plotNumber.value * 20500000);
  window.location.href = "./confirm-choice.html";
};

// setting agreeCheckbox.checked to false when plotNumber changes
plotNumber.addEventListener("change", function () {
  agreeCheckbox.checked = false;
  landDetails.classList.remove("form__block");
  paymentPlan.classList.remove("form__block");
  installmentPay.classList.remove("form__block");
  paymentBtn.classList.remove("form__flex");
  installmentDetails.classList.remove("form__block");

  if (plotNumber.value > maxUnit || plotNumber.value < 1) {
    alert(`number of units cannot be greater than ${maxUnit}`);
    plotNumber.value = 0;
  }
});

//agree checkbox handler
agreeCheckbox.addEventListener("change", function () {
  // setting default state of payment plan radio buttons to false
  document
    .querySelectorAll("input[name=payment_plan]")
    .forEach((el) => (el.checked = false));

  if (this.checked) {
    if (plotNumber.value == 0) {
      alert("Please select Number of Plots");
      this.checked = false;
    } else if (plotNumber.value > maxUnit) {
      alert(`number of units cannot be greater than ${maxUnit}`);
      plotNumber.value = 0;
      this.checked = false;
    } else {
      // console.log(plotNumber.value);

      landDetails.classList.add("form__block");
      paymentPlan.classList.add("form__block");

      if (localStorage.terrace) {
        plotNumber.value > 1
          ? (numberSpan.innerHTML = `${plotNumber.value} Terraces`)
          : (numberSpan.innerHTML = `${plotNumber.value} Terrace`);
      } else {
        plotNumber.value > 1
          ? (numberSpan.innerHTML = `${plotNumber.value} Plots`)
          : (numberSpan.innerHTML = `${plotNumber.value} Plot`);
      }
      totalPrice.innerHTML = `N ${new Intl.NumberFormat().format(
        plotNumber.value * 20500000
      )}`;
    }
  } else {
    landDetails.classList.remove("form__block");
    paymentPlan.classList.remove("form__block");
    installmentPay.classList.remove("form__block");
    paymentBtn.classList.remove("form__flex");
    installmentDetails.classList.remove("form__block");
  }
});

arrRadioBtns.forEach(function (el) {
  el.addEventListener("change", function () {
    if (this.value === "installment") {
      installmentDetails.classList.add("form__block");
      paymentBtn.classList.remove("form__flex");
      localStorage.setItem("paymentMode", this.value);
      console.log(this.value);
    } else if (this.value === "outright") {
      paymentBtn.classList.add("form__flex");
      installmentDetails.classList.remove("form__block");
      localStorage.setItem("paymentMode", this.value);
      console.log(this.value);
    } else {
      installmentDetails.classList.remove("form__block");
      paymentBtn.classList.remove("form__flex");
      console.log(this.value);
    }
  });
});

function updateCal() {
  installmentPay.classList.add("form__block");
  paymentBtn.classList.add("form__flex");
}

let select2 = document.querySelector(".pay-month");
console.log(select2.options[3].value);
function update() {
  let option = select2.options[select2.selectedIndex];
  if (option.value === "2months") {
    updateCal();
  } else if (option.value === "3months") {
    updateCal();
  } else if (option.value === "6months") {
    updateCal();
  } else if (option.value === "9months") {
    updateCal();
  } else if (option.value === "12months") {
    updateCal();
  } else if (option.value === "15months") {
    updateCal();
  } else if (option.value === "18months") {
    updateCal();
  } else if (option.value === "21months") {
    updateCal();
  } else if (option.value === "24months") {
    updateCal();
  } else {
    installmentPay.classList.remove("form__block");
    paymentBtn.classList.remove("form__flex");
  }
}

select2.addEventListener("change", update);

//details confirmation
// var storedTotalPrice = localStorage.getItem("amount");
// var storedPlotNumber = localStorage.getItem("number-of-units");
// var storedPaymantPlan = localStorage.getItem("paymentOption");

// new hoverEffect({
//   parent: document.querySelector(".properties__land--big"),
//   intensity: 0.7,
//   image1: "../img/land-big.jpg",
//   image2: "../img/land-small.jpg",
//   displacementImage: "https://i.postimg.cc/28jsM5QJ/4.png",
//   imagesRatio: "0.5882",
// });

// new hoverEffect({
//   parent: document.querySelector(".apartments__houses--big"),
//   intensity: 0.7,
//   image1: "../img/house-big.jpg",
//   image2: "../img/house-small.jpg",
//   displacementImage: "https://i.postimg.cc/28jsM5QJ/4.png",
//   imagesRatio: "0.5714",
// });

// let smallLandImg = document.querySelector(".properties__land--small");
// let bigLandImg = document.querySelector(".properties__land--big");

// bigLandImg.addEventListener("mouseover", () => {
//   smallLandImg.src = "img/land-big.jpg";
// });
// bigLandImg.addEventListener("mouseout", () => {
//   smallLandImg.src = "img/land-small.jpg";
// });

// const swiper = new Swiper(".swiper-container", {
//   // effect: 'coverflow',
//   //   centeredSlides: false,
//   slidesPerView: 1,
//   loop: false,
//   speed: 600,
//   spaceBetween: 30,

//   // autoplay: {
//   // delay: 3000,
//   // },

//   // coverflowEffect: {
//   // 	rotate: 50,
//   // 	stretch: 0,
//   // 	depth: 100,
//   // 	modifier: 1,
//   // 	slideShadows: true,
//   // },

//   breakpoints: {
//     320: {
//       slidesPerView: 1,
//     },
//     560: {
//       slidesPerView: 2,
//     },
//     990: {
//       slidesPerView: 3,
//     },
//   },

//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//   },

//   navigation: {
//     nextEl: ".swiper__icon-box--nxt",
//     prevEl: ".swiper__icon-box--prev",
//   },
// });

// checkbox.addEventListener("change", function () {
//   if (this.checked) {
//     img3d.src = "img/2destate.svg";
//     console.log("checked");
//   } else {
//     img3d.src = "img/fairfield.svg";
//     console.log("unchecked");
//   }
// });
