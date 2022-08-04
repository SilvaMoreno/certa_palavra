const rl = require("readline");
const { WORDS } = require("./words");

const MIN_INDEX = 0;
const MAX_INDEX = WORDS.length - 1;

const getRandomIndex = () => {
  return Math.floor(Math.random() * (MAX_INDEX - MIN_INDEX)) + MIN_INDEX;
};

const getRandomWord = () => {
  return WORDS[getRandomIndex()];
};

const readLine = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let attempts = 0;
let win = false;
const MAX_ATTEMPTS = 6;

const word = getRandomWord();

const wordLetters = word
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .split("");

const getUserWord = function () {
  attempts++;
  readLine.question(
    `[${MAX_ATTEMPTS - attempts + 1} attempts left] Guess the word: `,
    (answer) => {
      const userAnswer = answer
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      const correctAnswer = word
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      if (userAnswer === correctAnswer) {
        win = true;
        console.log("You win! In " + attempts + " attempts.");
        readLine.close();
      } else {
        if (attempts <= MAX_ATTEMPTS) {
          const userWordLetters = userAnswer.trim().toLowerCase().split("");
          let message = "";

          userWordLetters.forEach((letter, index) => {
            if (wordLetters.includes(letter)) {
              const letterInPosition = wordLetters[index];
              if (letter === letterInPosition) {
                message += "\x1b[92m" + letter;
              } else {
                message += "\x1b[93m" + letter;
              }
            } else {
              message += "\x1b[91m" + letter;
            }
          });

          message += "\x1b[0m";
          console.log(message);

          getUserWord();
        } else {
          console.log("You lose!");
        }
      }
    }
  );
};

console.log("\n\x1b[33mWelcome to CERTA_PALAVRA \x1b[0m");
console.log("\n\x1b[94mDicas \x1b[0m");
console.log("A palavra tem 5 caracteres.");
console.log("\n\n\x1b[94mInterpretacao do resultado:\x1b[0m");
console.log("\x1b[91mLetra a Vermelho - palavra nao contem letra \x1b[0m");
console.log("\x1b[92mLetra a Verde - palavra na posicao certa \x1b[0m");
console.log(
  "\x1b[93mLetra a Amarela - palavra tem letra mas esta na posicao errada \x1b[0m\n"
);
getUserWord();
