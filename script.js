const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random";
const quoteDisplayElement = document.getElementById("quoteDisplay");
const timerElement = document.getElementById("timer");
const quoteInputElement = document.getElementById("quoteInput");
let intervalId;

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then((response) => response.json())
    .then((data) => data.content);
}

async function renderNewQuote() {
  const quote = await getRandomQuote();
  quoteDisplayElement.innerHTML = "";
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
  let startTime = new Date();
  counter = 0;

  clearInterval(intervalId);

  intervalId = setInterval(() => {
    timerElement.innerHTML = Math.floor((new Date() - startTime) / 1000);
  }, 1000);
}

quoteInputElement.addEventListener("input", () => {
  const quoteInput = quoteInputElement.value;
  const quoteDisplay = quoteDisplayElement.querySelectorAll("span");

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

renderNewQuote();
