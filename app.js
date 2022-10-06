const typingText = document.querySelector(".typing-text p");
inpField = document.querySelector(".input-field");
mistakeTag = document.querySelector(".mistake span");
timerTag = document.querySelector(".time span b");

let maxTime = 60;
let timerStarted = false;
let charIndex = (mistakes = lastInputIndex = 0);

function randomParagraph() {
  let randIndex = Math.floor(Math.random() * paragraphs.length);
  paragraphs[randIndex].split("").forEach((span) => {
    let spanTag = `<span>${span}</span>`;
    typingText.innerHTML += spanTag;
  });
  document.addEventListener("keydown", () => inpField.focus());
  typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
  //the timer will start
  if (!timerStarted) {
    startTimer();
    timerStarted = true;
  }
  typing();

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
  mistakeTag.innerText = mistakes;
}

inpField.addEventListener("input", initTyping);
window.addEventListener("DOMContentLoaded", () => {
  inpField.value = "";
  randomParagraph();
});

const audio = new Audio("one click.mp3");

function typing() {
  audio.play();
}

function startTimer() {
  let interval = setInterval(() => {
    if (maxTime === 1) {
      clearInterval(interval);
    }
    maxTime--;
    timerTag.innerText = maxTime;
  }, 1000);
}
