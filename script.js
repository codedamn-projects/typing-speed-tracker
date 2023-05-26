const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random";
const quoteDisplayElement = document.getElementById("quoteDisplay");
const quoteInputElement = document.getElementById("quoteInput");
const timerElement = document.getElementById("timer");
const wpmElement = document.getElementById("wpm");
var ult_startTime = new Date();

quoteInputElement.addEventListener("input", () => {
  const quoteInput = quoteInputElement.value;
  const quoteDisplay = quoteDisplayElement.querySelectorAll("span");
  wpmElement.innerHTML = getWPM() + " WPM";

  let correct = true;
  quoteDisplay.forEach((characterSpan, ind) => {
    const character = characterSpan.innerHTML;
    if (quoteInput[ind] == null) {
      quoteDisplay[ind].classList.remove("incorrect");
      quoteDisplay[ind].classList.remove("correct");
      correct = false;
    } else if (character == quoteInput[ind]) {
      quoteDisplay[ind].classList.add("correct");
      quoteDisplay[ind].classList.remove("incorrect");
    } else {
      quoteDisplay[ind].classList.add("incorrect");
      quoteDisplay[ind].classList.remove("correct");
      correct = false;
    }
  });
  if (correct) {
    renderNewQuote();
  }
});

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then((response) => response.json())
    .then((data) => data.content);
}
async function renderNewQuote() {
  const quote = await getRandomQuote();
  quoteDisplayElement.innerHTML = "";
  wpmElement.innerHTML = "0 WPM";
  ult_startTime = new Date();
  quote.split("").forEach((character) => {
    const charSpan = document.createElement("span");
    charSpan.innerHTML = character;
    quoteDisplayElement.appendChild(charSpan);
  });
  quoteInputElement.value = "";
  startTimer();
}

function startTimer() {
  timerElement.innerHTML = 0;
  startTime = new Date();
  counter = 0;
  setInterval(() => {
    timerElement.innerHTML = Math.floor((new Date() - startTime) / 1000);
  }, 1000);
}

function getWPM() {
  let words = quoteInputElement.value.split(" ").length;
  let time = new Date() - ult_startTime;
  let wpm = words / (time / 60000);
  wpm = wpm.toFixed(2);
  return wpm;
}

renderNewQuote();
