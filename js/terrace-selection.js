window.onload = localStorage.clear();

const terraceArray = [
  {
    id: 4,
    name: "3 Bedroom Terrace With Showroom",
    stringId: "terrace_with_showroom",
    imgUrl: "./img/new-export/terrace_with_showroom.jpg",
  },
  {
    id: 2,
    name: "3 Bedroom Terrace With Office Space",
    stringId: "terrace_with_office",
    imgUrl: "./img/new-export/terrace_with_garage.jpg",
  },
  {
    id: 3,
    name: "3 Bedroom Terrace With Garage",
    stringId: "terrace_with_garage",
    imgUrl: "./img/new-export/terrace_with_showroom.jpg",
  },
  {
    id: 1,
    name: "3 Bedroom Terrace With Extra Room",
    stringId: "terrace_with_extra_room",
    imgUrl: "./img/new-export/terrace_with_garage.jpg",
  },
];

let terraceId = null;
let terraceName = null;
// fetching list of terrace options
terraceArray.map((terrace) => {
  terraceId = terrace.stringId;
  document.getElementById("terrace_options").innerHTML += `
  <div class="option">
    <input
      onchange="onChoose(event)"
      onclick="onChoose(event)"
      class="option__input"
      type="radio"
      name="terraces"
      id=${terrace.stringId}
      value=${JSON.stringify(terrace.name)}
      checked
    />
    
    <label class="option__label" for=${terrace.stringId}
      ><span></span>${terrace.name}</label
    >
  </div>`;
});

// setting default terrace
const optionsArray = document.querySelectorAll('input[type="radio"]');
window.onload = optionsArray.forEach((option) => {
  if (option.checked === true) {
    (terraceId = option.id), (terraceName = option.value);
  }
});

// terrace variety selection {continue} button
function onChoose(event) {
  const { value, id, ...props } = event.target;
  console.log(event.target);
  terraceName = value;
  terraceId = id;

  setImage(terraceId);
  terraceId
    ? document
        .getElementById("terraceBtn")
        .classList.add("terrace__btn--active")
    : document
        .getElementById("terraceBtn")
        .classList.remove("terrace__btn--active");
}

// setting terrace image
let setImage = (selected) => {
  terraceArray.filter((terrace) =>
    terrace.stringId === selected
      ? (document.getElementById("terrace_image_wrapper").innerHTML = `
  <img
    src=${terrace.imgUrl}
    id="terraceImage"
    alt=""
    class="terrace-slider__image img-fluid court-block"
  />`)
      : ""
  );
};

let options = document.querySelectorAll("input[name='terraces']");
let findSelected = () => {
  let selected = document.querySelector("input[name='terraces']:checked").value;
  setImage(selected);
};

window.onload = options.forEach((option) => {
  setImage(option.id);
  option.addEventListener("change", findSelected);
});

const continueHandler = () => {
  localStorage.setItem(
    "terrace",
    JSON.stringify({
      name: terraceName,
      terraceId: terraceId,
    })
  );
  window.location.href = "./choose-terrace-estate.html";
  console.log(localStorage);
};
