// Quiz Game

let currentQuestion = 1;
let score = 0;
let highscore = "";
let usedQuestions = [];

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
// Questions
let questionList = [
  {question: 'Whats this colorful logo called?', img: 'Quiz-Game Images/google.jpg', answer: 'Google', feedback: ""},
  {question: 'Whats this fox-like logo?', img: 'Quiz-Game Images/firefox.jpg', answer: 'Firefox', feedback: ""},
  {question: 'What game does this blocky logo come from?', img: 'Quiz-Game Images/minecraft.jpg', answer: 'Minecraft', feedback: ""},
  {question: 'What is this multiplayer game?', img: 'Quiz-Game Images/roblox.jpg', answer: 'Roblox', feedback: ""},
  {question: 'What operating system uses this logo?', img: 'Quiz-Game Images/windows.png', answer: 'Windows', feedback: ""},
  {question: 'What Popular IDE has this logo?', img: 'Quiz-Game Images/vscode.png', answer: 'Visual Studio Code', feedback: ""},
]

// Answers
let answerList = [
  ["Edge", "Chrome", "Google", "Opera"],
  ["Safari", "Firefox", "Brave", "Opera GX"],
  ["Minecraft", "Terraria", "Lego Worlds", "Planet Crafter"],
  ["Fortnite", "Roblox", "Among Us", "Brawl Stars"],
  ["Apple", "Android", "Linux", "Windows"],
  ["Visual Studio Code", "NetBeans", "Xcode", "Roblox Studio"],
]

let randQuestion; // variable must be made after questionList is initialized

startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", restartQuiz);

function startQuiz() {
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  currentQuestion = 1;
  score = 0;
  usedQuestions = [];

  // randomly decides which question should be first
  randQuestion = Math.floor(Math.random() * questionList.length);
  usedQuestions.push(questionList[randQuestion]["question"]);
  showQuestion(questionList[randQuestion], answerList[randQuestion]);
}

// Displays the appropriate question onscreen. You may add a parameter if you like.
function showQuestion(questionObj, answerObj) {
  questionText.innerHTML = `<p>${questionObj.question}</p> <img src='${questionObj.img}'>`;
    
  const labels = document.getElementsByTagName("label");

  let randAnswers = [];
  
  // loops through all the labels in the document and replaces their values and text
  for (let i = 0 ; i < labels.length; i++) {
    // randomly decides the order of the answers
    let rand = Math.floor(Math.random() * answerObj.length);
    let chosenAnswer = answerObj[rand];

    while (randAnswers.includes(chosenAnswer)) { // safeguard to avoid duplicate answers
      rand = Math.floor(Math.random() * answerObj.length);
      chosenAnswer = answerObj[rand];
    }
    randAnswers.push(chosenAnswer);

    labels[i].innerHTML = `<input type="radio" name="answer" value="${chosenAnswer}"> ${chosenAnswer}`;
  }
}

document.getElementById("submit-btn").addEventListener("click", function() {
  const radios = document.getElementsByName("answer");
  let selectedValue = null;

  for (let radio of radios) {
    if (radio.checked) {
      selectedValue = radio.value;
      break;
    }
  }

  if (selectedValue !== null) {
    alert("You selected: " + selectedValue);
    // Now compare selectedValue with the correct answer index or value
    checkAnswer(selectedValue);
    if (currentQuestion < questionList.length) {
      currentQuestion++;

      randQuestion = Math.floor(Math.random() * questionList.length);
      while(usedQuestions.includes(questionList[randQuestion]["question"])){  // safeguard to avoid duplicate questions
        randQuestion = Math.floor(Math.random() * questionList.length);
      }
      usedQuestions.push(questionList[randQuestion]["question"]);

      showQuestion(questionList[randQuestion], answerList[randQuestion]);
    } else {
      quizScreen.classList.add("hidden");
      resultScreen.classList.remove("hidden");
      showResults();
    }
  } else {
    alert("Please select an answer.");
  }
});

// Checks if the answer is correct. This answer should be read from the site and passed as a parameter.
// You may add additional parameters, as needed.
function checkAnswer(selectedAnswer) {
  let actualAnswer = questionList[randQuestion].answer;
  if(selectedAnswer == actualAnswer) {
    score++;
    questionList[randQuestion].feedback = `Question: ${questionList[randQuestion]["question"]} | Your Answer: <span class='green'>${selectedAnswer}</span> <br>`;
  } else {
    questionList[randQuestion].feedback = `Question: ${questionList[randQuestion]["question"]} | Your Answer: <span class='red'>${selectedAnswer}</span> <br>`;
  }
}

// Displays results of the quiz:  The more detailed results, the better! Users should see feedback from
// each question.
function showResults() {
  percentage = Math.round(score/questionList.length * 100);
  scoreText.innerHTML = `Your Final Score: ${score}/${questionList.length}  |  ${percentage}%`;

  // Displays each question and if you got them correct or not
  for (let question in questionList) {
    scoreText.innerHTML += `<p>${questionList[question]["feedback"]}</p>`;
  }

  if(score == questionList.length) {
    scoreText.innerHTML += `<p>You answered every question correctly, congrats!</p>`
  }

  // Highscores
  if (score > highscore) {
    highscore = score;
    scoreText.innerHTML += `<p><span class='blue'>New Highscore! ${highscore}/${questionList.length}</span></p>`
  } else {
    scoreText.innerHTML += `<p>Current Highscore. ${highscore}/${questionList.length}</p>`
  }
}

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

// startScreen.classList.add("hidden");
// quizScreen.classList.add("hidden");
// resultScreen.classList.remove("hidden");
