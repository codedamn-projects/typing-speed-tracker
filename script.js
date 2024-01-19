const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random";
const quoteDisplayElement = document.getElementById("quoteDisplay");

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then((response) => response.json())
    .then((data) => data.content);
}

async function renderNewQuote() {
  const quote = await getRandomQuote();
  quote.split("").forEach((character) => {
    const charSpan = document.createElement("span");
    charSpan.innerHTML = character;
    quoteDisplayElement.appendChild(charSpan);
  });
}

renderNewQuote();
