const selectedRangeEl = document.querySelector(".selected-range");
const rangeBtnEl = document.querySelectorAll(".range-btn");
const guessNumberMsgEl = document.querySelector(".guess-number-msg");
const submitBtnEl = document.querySelector(".submit-btn");
const inputEl = document.querySelector(".input");
const guessremainingEl = document.querySelector(".guess-remaining");
const clueBoxEl = document.querySelector(".clue-box");
const textBoxEl = document.querySelector(".text-box");
const prevGuessesEl = document.querySelector(".prev-guesses");

let values = {
  rangeMaxVal: null,
  valueToGuess: null,
  remainingGuesses: null,
  isRangeChosen: false,
  inputVal: null,
  prevGuesses: [],
};

const rangeHandler = (range, value, guesses) => {
  selectedRangeEl.innerHTML = `Your range is: ${range}`;
  values.rangeMaxVal = value;

  guessNumberMsgEl.innerHTML = `You will get ${guesses} guesses`;
  guessremainingEl.innerHTML = `Guesses Remaining: ${values.remainingGuesses}`;
};

rangeBtnEl.forEach((range) => {
  range.addEventListener("click", (event) => {
    values.isRangeChosen = true;

    if (event.target.innerText === "1-10") {
      values.valueToGuess = Math.floor(Math.random() * 10 + 1);
      values.remainingGuesses = 5;
      rangeHandler("1-10", 10, 5);
    } else {
      values.valueToGuess = Math.floor(Math.random() * 100 + 1);
      values.remainingGuesses = 10;
      rangeHandler("1-100", 100, 10);
    }
  });
});

inputEl.addEventListener("change", (event) => {
  values.inputVal = event.target.value;
});

submitBtnEl.addEventListener("click", () => {
  let { isRangeChosen, valueToGuess, inputVal, prevGuesses } = values;

  if (!isRangeChosen) {
    alert("Please, Choose a range");
  } else if (!inputVal) {
    alert("Please, Enter a guess");
  } else if (isNaN(inputVal)) {
    alert("Enter numbers only");
  } else {
    if (inputVal == valueToGuess) {
      clueBoxEl.innerHTML = `<h3 class='clue-text'>Woooho, You have guessed the number 🥳</h3>`;
      textBoxEl.style.display = "none";
    }
    if (inputVal < valueToGuess) {
      if (values.remainingGuesses != 0) {
        clueBoxEl.innerHTML = `<h3 class='clue-text'>Greater than this 🙂</h3>`;
        values.remainingGuesses -= 1;

        guessremainingEl.innerHTML = `Guesses Remaining: ${values.remainingGuesses}`;
        prevGuesses.push(inputVal);
        prevGuessesEl.innerHTML = `Previous Guesses: ${prevGuesses}`;
      } else {
        clueBoxEl.innerHTML = `<h3 class='clue-text'>You are out of Guess ☹️</h3>`;
      }
    }
    if (inputVal > valueToGuess) {
      if (values.remainingGuesses != 0) {
        clueBoxEl.innerHTML = `<h3 class='clue-text'>Less than this 🙂</h3>`;
        values.remainingGuesses -= 1;

        guessremainingEl.innerHTML = `Guesses Remaining: ${values.remainingGuesses}`;
        prevGuesses.push(inputVal);
        prevGuessesEl.innerHTML = `Previous Guesses: ${prevGuesses}`;
      } else {
        clueBoxEl.innerHTML = `<h3 class='clue-text'>You are out of Guess ☹️</h3>`;
      }
    }
  }
});
