const body = document.querySelector("body");
const hamburgerIcon = body.querySelector(".hamburger-icon");
const closeIcon = hamburgerIcon.nextElementSibling;
const dropdownMenu = body.querySelector(".nav-links-dropdown-menu");
const overlay = body.querySelector(".overlay");
const input = document.getElementById("input");
const btnGo = body.querySelector(".btn-go");
const errorMessage = body.querySelector("small");
const btnInput = body.querySelector(".btn-input");
const testCards = [...body.querySelectorAll(".slider .test-card")];
const dots = [...body.querySelectorAll(".dot-container .dot")];

//the current active card is the one which has the classList of active
//so we want to remove it when we click on the next dot
//let currentCard = testCards.children.classList.contains("active");

//console.log(currentCard);

//FUNCTIONS
const validate = (email) => {
  const expression =
    /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|\[[\t -Z^-~]*])/i;

  return expression.test(String(email).toLowerCase());
};

//must get the index of the targetDot and link it to the index of the currentSlide
//or when you click on index 0 of dots array - show index 0 of the testCards array

dots.forEach((dot) => {
  dot.addEventListener("click", (e) => {
    let targetDot = e.target;
    //console.log(targetDot);
    let targetDotIndex = dots.indexOf(e.target);
    //console.log(targetDotIndex);
    dots.forEach((dot) => {
      if (dot === targetDot) {
        targetDot.classList.add("filled"); //but now must remove all others
        //that maybe filled
      } else {
        dot.classList.remove("filled");
      }
    });
    testCards.forEach((card) => {
      if (card === targetDotIndex) {
        card.classList.add("active");
      } else {
        card.classList.remove("active");
      }
    });

    //so when I click on a dot - the targetDot - I want the testCard with the
    //same index as the targetDot to be active
    testCards[targetDotIndex].classList.add("active");
    //but the slides are all staying active so I must remove them
    //like I did for the dots above
  });
});

//EVENT LISTENERS
window.addEventListener("DOMContentLoaded", () => {
  testCards[0].classList.add("active");
  dots[0].classList.add("filled");
});

hamburgerIcon.addEventListener("click", () => {
  dropdownMenu.style.visibility = "visible";
  hamburgerIcon.style.display = "none";
  closeIcon.style.display = "block";
  overlay.style.display = "block";
});

closeIcon.addEventListener("click", () => {
  overlay.style.display = "none";
  dropdownMenu.style.visibility = "hidden";
  hamburgerIcon.style.display = "block";
  closeIcon.style.display = "none";
});

btnGo.addEventListener("click", () => {
  console.log(input.value);
  if (!input.value) {
    errorMessage.style.visibility = "visible";
    errorMessage.textContent = "The input field is empty";
    btnInput.classList.add("error");
    input.classList.add("red");
  } else if (!validate(input.value)) {
    errorMessage.style.visibility = "visible";
    errorMessage.textContent = "The email address is not formatted correctly";
    btnInput.classList.add("error");
  } else {
    errorMessage.style.visibility = "hidden";
    input.classList.remove("red");
    btnInput.classList.remove("error");
  }
});
