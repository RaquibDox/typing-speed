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
  charIndex = (mistakes = lastInputIndex = words = 0);

function randomParagraph() {
  let randIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = "";
  paragraphs[randIndex].split("").forEach((span) => {
    let spanTag = `<span>${span}</span>`;
    typingText.innerHTML += spanTag;
  });
  typingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => inpField.focus());
  typingText.addEventListener("click", () => inpField.focus());
}

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
  let wpm = Math.round(
    ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
  );
  wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

  mistakeTag.innerText = mistakes;
  cpmTag.innerText = charIndex - mistakes;
  wpmTag.innerText = wpm;
}

function typing() {
  audio.play();
}

function startTimer() {
  interval = setInterval(() => {
    if (timeLeft <= 1) {
      offTimer = false;
      clearInterval(interval);
      inpField.value = "";
    }
    timeLeft--;
    timerTag.innerText = timeLeft;
  }, 1000);
}

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
}

inpField.addEventListener("input", () => {
  if (timeLeft > 0) {
    typing();
    initTyping();
  } else {
    inpField.value = "";
  }
});

window.addEventListener("DOMContentLoaded", () => {
  inpField.value = "";
  randomParagraph();
});

tryAgainBtn.addEventListener("click", resetGame);
