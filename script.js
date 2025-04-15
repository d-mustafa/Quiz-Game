// Quiz Game

let currentQuestion = 0;
let score = 0;
let highscore = "";

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
  {question: 'Whats this colorful logo called?', img: 'Quiz-Game Images/google.jpg', answer: 'Google', correct: false, feedback: ""},
  {question: 'Whats this fox-like logo?', img: 'Quiz-Game Images/firefox.jpg', answer: 'Firefox', correct: false, feedback: ""},
  {question: 'What game does this blocky logo come from?', img: 'Quiz-Game Images/minecraft.jpg', answer: 'Minecraft', correct: false, feedback: ""},
  {question: 'What is this multiplayer game?', img: 'Quiz-Game Images/roblox.jpg', answer: 'Roblox', correct: false, feedback: ""},
  {question: 'What operating system uses this logo?', img: 'Quiz-Game Images/windows.png', answer: 'Windows', correct: false, feedback: ""},
  {question: 'What Popular IDE has this logo?', img: 'Quiz-Game Images/vscode.png', answer: 'Visual Studio Code', correct: false, feedback: ""},
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

startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", restartQuiz);

function startQuiz() {
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  currentQuestion = 0;
  score = 0;
  showQuestion(questionList[0], answerList[0]);
}

// Displays the appropriate question onscreen. You may add a parameter if you like.
function showQuestion(questionObj, answerObj) {
  questionText.innerHTML = `<p>${questionObj.question}</p> <img src='${questionObj.img}'>`;
    
  const labels = document.getElementsByTagName("label");

  let randAnswers = [];
  for (let i = 0 ; i < labels.length; i++) {
    let rand = Math.floor(Math.random() * 4);
    let chosenAnswer = answerObj[rand];
    while (randAnswers.includes(chosenAnswer)) {
      rand = Math.floor(Math.random() * 4);
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
    if (currentQuestion+1 < questionList.length) {
      currentQuestion++;
      showQuestion(questionList[currentQuestion], answerList[currentQuestion]);
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
  let actualAnswer = questionList[currentQuestion].answer;
  if(selectedAnswer == actualAnswer) {
    questionList[currentQuestion].correct = true;
    score++;
    questionList[currentQuestion].feedback = `Question: ${questionList[currentQuestion]["question"]} | Your Answer: <span class='green'>${selectedAnswer}</span> <br>`;
  } else {
    questionList[currentQuestion].feedback = `Question: ${questionList[currentQuestion]["question"]} | Your Answer: <span class='red'>${selectedAnswer}</span> <br>`;
  }
}

// Displays results of the quiz:  The more detailed results, the better! Users should see feedback from
// each question.
function showResults() {
  scoreText.innerHTML = `Your Final Score: ${score}/${questionList.length}`;

  // Displays each question and if you got them correct or not
  for (let question in questionList) {
    if (questionList[question]["correct"]){
      scoreText.innerHTML += `<p>${questionList[question]["feedback"]}</p>`;
    }
  }
  for (let question in questionList) {
    if (!questionList[question]["correct"]){
      scoreText.innerHTML += `<p>${questionList[question]["feedback"]}</p>`;
    }
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
