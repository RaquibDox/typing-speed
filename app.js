const typingText = document.querySelector(".typing-text p"),
  inpField = document.querySelector(".input-field"),
  mistakeTag = document.querySelector(".mistake span"),
  timerTag = document.querySelector(".time span b"),
  wpmTag = document.querySelector(".wpm span"),
  cpmTag = document.querySelector(".cpm span"),
  tryAgainBtn = document.querySelector("button");

const audio = new Audio("one click.mp3");

let maxTime = 60,
  interval,
  timeLeft = maxTime,
  timerStarted = false,
  charIndex = (mistakes = size = lastInputIndex = words = 0);

//this function randomly calls a paragraph and show it in the view
function randomParagraph() {
  let randIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = "";
  size = paragraphs[randIndex].split("").length;
  paragraphs[randIndex].split("").forEach((span) => {
    //removing everything except letters
    if (span.toLowerCase() != span.toUpperCase() || span === " ") {
      let spanTag = `<span>${span}</span>`;
      typingText.innerHTML += spanTag;
    }
  });
  typingText.querySelectorAll("span")[0].classList.add("active");
  scrollToCursor();
  document.addEventListener("keydown", () => inpField.focus());
  typingText.addEventListener("click", () => inpField.focus());
}

//the main function calling all other functions(everything happens here)
function initTyping() {
  //the timer will start
  if (!timerStarted) {
    startTimer();
    timerStarted = true;
  }

  const characters = typingText.querySelectorAll("span");
  let typedChar = inpField.value.split("")[lastInputIndex];

  //this code will trigger while typing alphabets
  if (lastInputIndex < inpField.value.split("").length) {
    if (characters[charIndex].innerText === typedChar) {
      characters[charIndex].classList.add("correct");
    } else {
      mistakes++;
      characters[charIndex].classList.add("incorrect");
    }
    charIndex++;
  }
  //this code will trigger when you don't enter any letters.(examples: backspace)
  else if (charIndex > 0) {
    charIndex--;
    if (characters[charIndex].classList.contains("incorrect")) {
      mistakes--;
    }
    characters[charIndex].classList.remove("correct", "incorrect");
  }

  lastInputIndex = inpField.value.split("").length;

  //moving the text cursor
  characters.forEach((span) => span.classList.remove("active"));
  characters[charIndex].classList.add("active");
  scrollToCursor();
}

//for typing sound
function typing() {
  audio.play();
}

//starts the timer and also switch it offs automatically after time runs out
function startTimer() {
  interval = setInterval(() => {
    if (timeLeft <= 1) {
      clearInterval(interval);
      inpField.value = "";
      updateTags();
    }
    timeLeft--;
    timerTag.innerText = timeLeft;
    updateTags();
  }, 1000);
}

//resets everything and brings a new paragraph
function resetGame() {
  randomParagraph();
  timeLeft = maxTime;
  timerStarted = false;
  clearInterval(interval);
  charIndex = mistakes = lastInputIndex = words = 0;
  timerTag.innerText = timeLeft;
  mistakeTag.innerText = mistakes;
  wpmTag.innerText = 0;
  cpmTag.innerText = 0;
  scrollToCursor();
}

//used for updating the mistakes, wpm, cpm
function updateTags() {
  let wpm = Math.round(
    ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
  );
  wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

  mistakeTag.innerText = mistakes;
  cpmTag.innerText = charIndex - mistakes;
  wpmTag.innerText = wpm;
}

//scrolls the lines according to the text cursor
function scrollToCursor() {
  let activeCursor = document.querySelector(".active");
  activeCursor.scrollIntoView(true);
}

//activates when you type something
inpField.addEventListener("input", () => {
  if (timeLeft > 0 && charIndex < size - 1) {
    typing();
    initTyping();
  } else {
    inpField.value = "";
  }
});

//resets when you reload the page
window.addEventListener("DOMContentLoaded", () => {
  inpField.value = "";
  randomParagraph();
});

//resets when you press the button
tryAgainBtn.addEventListener("click", resetGame);

window.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    resetGame();
  }
});
