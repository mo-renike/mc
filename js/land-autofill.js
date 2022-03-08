// autofill confirm choice

const { amount, numOfUnits, paymentMode, terrace, ...props } = localStorage;


let paymentWrapper = document.getElementById("downPaymentContainer")
let periodWrapper = document.getElementById("paymentPeriodWrapper")
let price = localStorage.getItem("initialAmount")

document.querySelector("#plotNumber").innerHTML = numOfUnits;
document.querySelector("#confirmLotType").innerHTML = localStorage.getItem("lotType");
document.querySelector("#paymentType").innerText = paymentMode;
document.querySelector("#confirmPaymentPeriod").innerHTML = localStorage.getItem("paymentPeriod");
document.querySelector("#confirm_down_payment_amount").innerHTML = `N${new Intl.NumberFormat().format(price)}`;
document.querySelector("#totalCost").innerText = `N${new Intl.NumberFormat().format(amount)}`;

if (paymentMode.toLowerCase() === "installment") {
  console.log('hiiii');
  paymentWrapper.style.display = "inherit"
  periodWrapper.style.display = "inherit"
} else {
  console.log('noooo');
  paymentWrapper.style.display = "none"
  periodWrapper.style.display = "none"
}


// paymentMode.toLowerCase() === "installment"
//   ? (document.getElementById("downPaymentContainer").style.display = "inherit")
//   : (document.getElementById("downPaymentContainer").style.display = "none");
``