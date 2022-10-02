const typingText = document.querySelector(".typing-text p");
inpField = document.querySelector(".input-field");

let charIndex = 0;

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
  const characters = typingText.querySelectorAll("span");
  4;
  let typedChar = inpField.value.split("")[charIndex];
  console.log(typedChar, characters[charIndex].innerText);
  if (characters[charIndex].innerText === typedChar) {
    characters[charIndex].classList.add("correct");
    console.log("correct");
  } else {
    characters[charIndex].classList.add("incorrect");
    console.log("wrong");
  }
  charIndex++;
}

inpField.addEventListener("input", initTyping);
window.addEventListener("DOMContentLoaded", () => {
  inpField.value = "";
  randomParagraph();
});
