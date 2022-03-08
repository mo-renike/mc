const appSubBtn = document.getElementById("appointmentSubmit");
const appForm = document.getElementById("appointmentForm");
const date = document.getElementById("date");
const today =
  new Date().getFullYear() +
  "-" +
  (new Date().getMonth() + 1 < 10
    ? "0" + (new Date().getMonth() + 1)
    : new Date().getMonth + 1) +
  "-" +
  new Date().getDate();

appSubBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!appForm.checkValidity()) {
    appForm.reportValidity();
  } else if (date.value === today) {
    alert("Appointment date cannot be today's date");
  } else if (date.value < today) {
    alert("Appointment date cannot be an earlier date");
  } else
    alert(
      "Your request was successfully submitted. \n We'll get back to you shortly"
    );
});
