const estateSection = document.getElementById("estates_section");
const estateWrapper = document.getElementById("estate-wrapper");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const cards = document.querySelectorAll(".cards");
const cardWidth = document.getElementsByClassName("cards")[0].scrollWidth;
let current = 0;

function setColor() {
  if (estateSection.scrollLeft <= cardWidth) {
    prevBtn.style.opacity = "0.5";
  }

  if (
    estateSection.scrollWidth - estateSection.scrollLeft ===
    estateWrapper.scrollWidth
  ) {
    nextBtn.style.opacity = "0.5";
  }
}

function resetCards() {
  if (screen.width <= 600) {
    prevBtn.style.opacity = "1";
    nextBtn.style.opacity = "1";
    cards[0].classList.add("active");
  }
}

// onclick function for next btn
function next() {
  prevBtn.style.opacity = "1";
  {
    estateSection.scrollLeft += cardWidth + 13;
    if (
      estateSection.scrollWidth - estateSection.scrollLeft <=
      estateWrapper.scrollWidth
    ) {
      nextBtn.style.opacity = "0.5";
    }
  }
}

// onclick function for prev btn
function prev() {
  {
    nextBtn.style.opacity = "1";
    estateSection.scrollLeft -= cardWidth + 13;
    if (estateSection.scrollLeft == 0) {
      prevBtn.style.opacity = "0.5";
    }
  }
}

nextBtn.addEventListener("click", next);

prevBtn.addEventListener("click", prev);

window.onload = function reset() {
  setColor();
  resetCards();
};

estateSection.onscroll = function setBtn() {
  if (estateSection.scrollLeft == 0) {
    prevBtn.style.opacity = "0.5";
  } else {
    prevBtn.style.opacity = "1";
  }

  if (
    estateSection.scrollWidth - estateSection.scrollLeft <=
    estateWrapper.scrollWidth
  ) {
    nextBtn.style.opacity = "0.5";
  } else {
    nextBtn.style.opacity = "1";
  }
};
