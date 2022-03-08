const terraceArray = [
  {
    id: 1,
    name: "3 Bedroom Terrace With Extra Room",
    stringId: "terrace_with_extra_room",
    imgUrl: "./img/new-export/terrace_with_extra_room.jpg",
  },
  {
    id: 2,
    name: "3 Bedroom Terrace With Office",
    stringId: "terrace_with_office",
    imgUrl: "./img/new-export/terrace_with_office.jpg",
  },
  {
    id: 3,
    name: "3 Bedroom Terrace With Garage",
    stringId: "terrace_with_garage",
    imgUrl: "./img/new-export/terrace_with_garage.jpg",
  },
  {
    id: 4,
    name: "3 Bedroom Terrace With Showroom",
    stringId: "terrace_with_showroom",
    imgUrl: "./img/new-export/terrace_with_showroom.jpg",
  },
];

console.log(localStorage);
const terraceVariety = JSON.parse(localStorage.getItem("terrace"));

function terraceVarietyPicker() {
  if (document.getElementById("terrace_variety")) {
    document.getElementById("terrace_variety").value = terraceVariety.name;
  }
}

window.onload = terraceVarietyPicker();
// autofill confirm choice
const { amount, numOfUnits, paymentMode, terrace, initialAmount, ...props } =
  localStorage;
const { name } = JSON.parse(terrace);

document.getElementById("terrace_variety").innerText = name;
document.getElementById("total").innerText = new Intl.NumberFormat().format(
  amount
);
document.getElementById("units").innerText = numOfUnits;
document.getElementById("payment_plan").innerText = paymentMode;
// console.log(paymentMode);
paymentMode.toLowerCase() === "installment"
  ? (document.getElementById("downPaymentAmount").style.display = "inherit")
  : (document.getElementById("downPaymentAmount").style.display = "none");

document.getElementById("confirm_down_payment_amount").innerText =
  new Intl.NumberFormat().format(initialAmount);

// insert more variety options
const units = localStorage.getItem("numOfUnits");
window.onload = console.log(units);

if (units > 1) {
  for (let i = 1; i < units; i++) {
    document.getElementById("terrace_variety_options").innerHTML += `
    <div class="form__group">
      <label for="terrace${i + 1}" class="form__name">Terrace Variety ${
      i + 1
    }</label>
      <select name="terrace${i + 1}" class="form__input" id="terrace${i + 1}">
      <option>Select Terrace Variety</option>
    <option value="terrace_with_extra_room">Terrace With Extra Room</option>
    <option value="terrace_with_office">Terrace With Office</option>
    <option value="terrace_with_garage">Terrace With Garage</option>
    <option value="terrace_with_showroom">Terrace With Showroom</option>
    </select>
    </div>
    `;
  }
}
