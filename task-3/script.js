const quizzes = [
  {
    title: "Geography Quiz",
    questions: [
      { q: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra"], answer: "Canberra" },
      { q: "Which is the longest river?", options: ["Amazon", "Nile", "Yangtze"], answer: "Nile" },
      { q: "Which country has the most islands?", options: ["Indonesia", "Sweden", "Philippines"], answer: "Sweden" }
    ]
  },
  {
    title: "Tech Quiz",
    questions: [
      { q: "Who founded Microsoft?", options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg"], answer: "Bill Gates" },
      { q: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Hot Mail", "How To Make Links"], answer: "Hyper Text Markup Language" },
      { q: "Which company owns Android?", options: ["Google", "Apple", "Samsung"], answer: "Google" }
    ]
  }
];

let currentQuizIndex = 0;
let currentQuestionIndex = 0;
let score = 0;
let history = JSON.parse(localStorage.getItem("quizHistory")) || [];

function loadQuestion() {
  const quiz = quizzes[currentQuizIndex];
  const question = quiz.questions[currentQuestionIndex];
  document.getElementById("question-title").textContent = question.q;

  const optionsContainer = document.getElementById("options-container");
  optionsContainer.innerHTML = "";
  question.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option);
    optionsContainer.appendChild(btn);
  });

  document.getElementById("score-display").textContent = `Score: ${score}`;
}

function checkAnswer(selected) {
  const correct = quizzes[currentQuizIndex].questions[currentQuestionIndex].answer;
  if (selected === correct) {
    score += 1;
  }

  document.getElementById("next-btn").style.display = "inline-block";
}

function nextQuestion() {
  currentQuestionIndex++;
  document.getElementById("next-btn").style.display = "none";

  if (currentQuestionIndex < quizzes[currentQuizIndex].questions.length) {
    loadQuestion();
  } else {
    showFinalScore();
  }
}

function showFinalScore() {
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("end-screen").style.display = "block";
  const finalScore = `You scored ${score}/${quizzes[currentQuizIndex].questions.length}`;
  document.getElementById("final-score").textContent = finalScore;

  // Store in history
  history.push({
    quizTitle: quizzes[currentQuizIndex].title,
    score: finalScore,
    date: new Date().toLocaleString()
  });
  localStorage.setItem("quizHistory", JSON.stringify(history));
}

function startNewQuiz() {
  currentQuizIndex = (currentQuizIndex + 1) % quizzes.length;
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById("quiz-container").style.display = "block";
  document.getElementById("end-screen").style.display = "none";
  document.getElementById("history-section").style.display = "none";
  loadQuestion();
}

function viewHistory() {
  const historyList = document.getElementById("history-list");
  historyList.innerHTML = "";
  history.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${item.quizTitle} - ${item.score} (${item.date})`;
    historyList.appendChild(li);
  });

  document.getElementById("history-section").style.display = "block";
}

// Initial load
window.onload = loadQuestion;
