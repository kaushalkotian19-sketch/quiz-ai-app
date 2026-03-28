const startBtn = document.getElementById("startBtn");
const quizDiv = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("timer");
const resultEl = document.getElementById("result");

let questions = [
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4"
  },
  {
    question: "Capital of India?",
    options: ["Delhi", "Mumbai", "Chennai", "Kolkata"],
    answer: "Delhi"
  }
];

let current = 0;
let score = 0;
let timer;

startBtn.onclick = () => {
  startBtn.style.display = "none";
  quizDiv.style.display = "block";
  loadQuestion();
};

function loadQuestion() {
  clearInterval(timer);

  let q = questions[current];
  questionEl.innerText = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach(opt => {
    let btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(opt);
    optionsEl.appendChild(btn);
  });

  startTimer();
}

function startTimer() {
  let time = 10;
  timerEl.innerText = "Time: " + time;

  timer = setInterval(() => {
    time--;
    timerEl.innerText = "Time: " + time;

    if (time === 0) {
      nextQuestion();
    }
  }, 1000);
}

function checkAnswer(ans) {
  if (ans === questions[current].answer) {
    score++;
  }
  nextQuestion();
}

function nextQuestion() {
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizDiv.style.display = "none";
  resultEl.innerText = "Your Score: " + score;
}
