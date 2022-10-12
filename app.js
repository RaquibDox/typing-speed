const typingText = document.querySelector(".typing-text p"),
  typingTextContainer = document.querySelector(".typing-text"),
  testOver = document.querySelector(".test-over"),
  inpField = document.querySelector(".input-field"),
  mistakeTag = document.querySelector(".mistake span"),
  mistakeOverTag = document.querySelector(".mistake-over span"),
  timerTag = document.querySelector(".time span b"),
  wpmTag = document.querySelector(".wpm span"),
  cpmTag = document.querySelector(".cpm span"),
  wpmOverTag = document.querySelector(".wpm-over span"),
  tryAgainBtn = document.querySelector(".content button"),
  tryAgainOverBtn = testOver.querySelector("button");

const audio = new Audio("one click.mp3");

let maxTime = 40,
  interval,
  timeLeft = maxTime,
  timerStarted = false,
  typo = true,
  letterProvided = false,
  charIndex = (mistakes = reduceMistake = size = lastInputIndex = 0);

//this function randomly calls a paragraph and show it in the view
function randomParagraph() {
  let randIndex = Math.floor(Math.random() * paraSpan.length);
  typingText.innerHTML = "";
  size = paragraphs[randIndex].split("").length; //letter content size is approximately same in paragraphs and paraSpan
  typingText.innerHTML = paraSpan[randIndex];
  typingText.querySelectorAll("span")[0].classList.add("active");
  scrollToCursor();
  document.addEventListener("keydown", () => inpField.focus());
  typingText.addEventListener("click", () => inpField.focus());
}

//this function is to extend the paragraph if the user almost completed typing the entire paragraph
function extendParagraph() {
  let randIndex = Math.floor(Math.random() * paraSpan.length);
  size += paragraphs[randIndex].split("").length; //letter content size is approximately same in paragraphs and paraSpan
  typingText.innerHTML += paraSpan[randIndex];
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

  //console.log(typedChar, characters[charIndex].innerText);

  //this code will trigger while typing alphabets
  if (lastInputIndex < inpField.value.split("").length) {
    if (typedChar !== " ") {
      letterProvided = true;
    } else if (!letterProvided && typedChar === " ") {
      lastInputIndex = inpField.value.split("").length;
      return;
    } else if (characters[charIndex].innerText === " ") {
      letterProvided = false;
    }
    if (characters[charIndex].innerText === typedChar) {
      characters[charIndex].classList.add("correct");
      typo = false;
    } else {
      mistakes++;
      characters[charIndex].classList.add("incorrect");
      typo = true;
    }
    charIndex++;
  }
  //this code will trigger when you don't enter any letters.(examples: backspace)
  else if (charIndex > 0 && typo) {
    charIndex--;
    if (characters[charIndex].classList.contains("incorrect")) {
      if (characters[charIndex].innerText === " ") {
        reduceMistake--;
      }
      mistakes--;
    } else {
      typo = false;
    }
    characters[charIndex].classList.remove("correct", "incorrect");
  }

  lastInputIndex = inpField.value.split("").length;

  //moving the text cursor
  characters.forEach((span) => span.classList.remove("active"));
  characters[charIndex].classList.add("active");
  scrollToCursor();

  //this code triggers when you hit space in between words
  if (
    typedChar === " " &&
    characters[charIndex - 1].innerText !== " " &&
    letterProvided
  ) {
    skipSpace();
  }
}

//this is a function to skip to the next space in the paragraph
function skipSpace() {
  letterProvided = false;
  reduceMistake++;
  const characters = typingText.querySelectorAll("span");
  do {
    charIndex++;
    mistakes++;
    characters[charIndex - 1].classList.add("incorrect");
  } while (characters[charIndex - 1].innerText !== " ");
  //mistakes--;
  characters.forEach((span) => span.classList.remove("active"));
  characters[charIndex].classList.add("active");
  scrollToCursor();
}

//resets everything and brings a new paragraph
function resetGame() {
  testOver.classList.add("visible");
  inpField.value = "";
  randomParagraph();
  timeLeft = maxTime;
  timerStarted = false;
  typo = true;
  clearInterval(interval);
  charIndex = mistakes = reduceMistake = lastInputIndex = 0;
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

  mistakeTag.innerText = mistakes - reduceMistake;
  cpmTag.innerText = wpm * 5;
  wpmTag.innerText = wpm;
}

//scrolls the lines according to the text cursor
function scrollToCursor() {
  let activeCursor = document.querySelector(".active");
  activeCursor.scrollIntoView(true);
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
      cpmTag.innerText = Math.round((charIndex - mistakes) * (60 / maxTime));
      mistakeOverTag.innerText = mistakeTag.innerText;
      wpmOverTag.innerText = wpmTag.innerText;
      testOver.classList.toggle("visible");
    }
    timeLeft--;
    timerTag.innerText = timeLeft;
    updateTags();

    //this triggers when the paragraph is required to be extended
    if (size <= charIndex + 250) {
      typingText.innerHTML += `<span> </span>`;
      size++;
      extendParagraph();
    }
  }, 1000);
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
  inpField.focus();
  timerTag.innerText = maxTime;
  randomParagraph();
});

//resets when you press the button
tryAgainBtn.addEventListener("click", resetGame);
tryAgainOverBtn.addEventListener("click", resetGame);

window.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    resetGame();
  }
});
