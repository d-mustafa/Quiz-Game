// Quiz Game

let currentQuestion = 0;
let score = 0;

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const scoreText = document.getElementById("score-text");

// Quiz Questions
// Store your quiz questions, multiple choice options, and correct answer in an associative array
// ------

// ------

startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", restartQuiz);

function startQuiz() {
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  currentQuestion = 0;
  score = 0;
  showQuestion();
}

// Displays the appropriate question onscreen. You may add a parameter if you like.
function showQuestion() {
  questionText.innerHTML = "1"
}

// Checks if the answer is correct. This answer should be read from the site and passed as a parameter.
// You may add additional parameters, as needed.
function checkAnswer() {}

// Displays results of the quiz:  The more detailed results, the better! Users should see feedback from
// each question.
function showResults() {}

// You do not have to alter this function.
function restartQuiz() {
  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
}

// Program one of the following extensions, or come up with one of your own:
// - Randomize question order or shuffle answers

// - Use dropdowns instead of radio buttons

// - Add a countdown timer

// - Track incorrect answers for review

// - Store high scores in localStorage
