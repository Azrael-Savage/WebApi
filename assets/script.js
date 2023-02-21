let questions = [
	{
		question: "How do you write 'Hello World' in an alert box?",
		choices: [
			"msg('Hello World')",
			"msgBox('Hello World');",
			"alertBox('Hello World');",
			"alert('Hello World');",
		],
		correctAnswer: "alert('Hello World');",
	},
	{
		question: "How to empty an array in JavaScript?",
		choices: [
			"arrayList[]",
			"arrayList(0)",
			"arrayList.length=0",
			"arrayList.len(0)",
		],
		correctAnswer: "arrayList.length=0",
	},
	{
		question:"What function to add an element at the beginning of an array and one at the end?",
		choices: ["push,unshift", "unshift,push", "first,push", "unshift,last"],
		correctAnswer: "unshift,push",
	},
	{
		question: "What will this output? var a = [1, 2, 3]; console.log(a[6]);",
		choices: ["undefined", "0", "prints nothing", "Syntax error"],
		correctAnswer: "undefined",
	},
	{
		question: "What would following code return? console.log(typeof typeof 1);",
		choices: ["string", "number", "Syntax error", "undefined"],
		correctAnswer: "string",
	},
];

var startScreen = document.getElementById("start-screen");
var startButton = document.getElementById("start-btn");

var quizScreen = document.getElementById("quiz-screen");
var questionText = document.getElementById("question-container");
var questionChoices = document.getElementById("choice-container");
var quizTimer = document.getElementById("quiz-timer");

var scoreScreen = document.getElementById("score-screen");
var finalScoreText = document.getElementById("final-score");
var initialsInput = document.getElementById("initials");
var submitScoreButton = document.getElementById("submit-score");

var highScoreScreen = document.getElementById("high-score-screen");
var scoreList = document.getElementById("high-scores");

/* Timer */
var timeLeft = 60;
var timerInterval;

/* Quiz State */
var currentQuestion = 0;
var score = 20;

/* Start Button Logic */
startButton.addEventListener("click", function (event) {
	startScreen.classList.add("hidden");
	quizScreen.classList.remove("hidden");
	quizTimer.textContent = "Time left: " + timeLeft;
	renderQuestion();
	startTimer();
});

questionChoices.addEventListener("click", function (event) {
	if (event.target.matches("button")) {
		var selectedAnswer = event.target.textContent;
		var correctAnswer = questions[currentQuestion].correctAnswer;
		if (selectedAnswer === correctAnswer) {
			score++;
		} else {
			timeLeft -= 10;
			if (timeLeft < 0) {
				timeLeft = 0;
			}
			quizTimer.textContent = "Time left: " + timeLeft;
		}
		currentQuestion++;
		if (currentQuestion >= questions.length) {
			endQuiz();
		} else {
			renderQuestion();
		}
	}
});

submitScoreButton.addEventListener("click", function (event) {
	event.preventDefault();
	var initials = initialsInput.value;
	var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
	var newScore = {
		initials: initials,
		score: score,
	};
	highScores.push(newScore);
	highScores.sort(function (a, b) {
		return b.score - a.score;
	});
	highScores.splice(5);
	localStorage.setItem("highScores", JSON.stringify(highScores));
	initialsInput.value = "";
	showHighScores();
});

/* Helper Functions */
function renderQuestion() {
	if (currentQuestion < questions.length) {
		var question = questions[currentQuestion];
		questionText.textContent = question.question;
		questionChoices.innerHTML = "";
		for (var i = 0; i < question.choices.length; i++) {
			var choice = question.choices[i];

			var choiceBtn = document.createElement("button");
			choiceBtn.textContent = choice;
			choiceBtn.classList.add("choice-btn");
			questionChoices.appendChild(choiceBtn);
		}
	} else {
		endQuiz();
	}
}

function startTimer() {
	timerInterval = setInterval(function () {
		timeLeft--;
		quizTimer.textContent = "Time left: " + timeLeft;
		if (timeLeft <= 0) {
			clearInterval(timerInterval);
			endQuiz();
			showHighScores();
		}
	}, 1000);
}

function endQuiz() {
	clearInterval(timerInterval);
	quizScreen.classList.add("hidden");
	scoreScreen.classList.remove("hidden");
	finalScoreText.textContent = "Final Score: " + score;
}
	

function showHighScores() {
	var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
	scoreList.innerHTML = "";
	for (var i = 0; i < highScores.length; i++) {
		var scoreItem = highScores[i];
		var listItem = document.createElement("li");
		listItem.textContent = scoreItem.initials + " - " + scoreItem.score;
		scoreList.appendChild(listItem);
	}
	startScreen.classList.add("hidden");
	scoreScreen.classList.add("hidden");
	highScoreScreen.classList.remove("hidden");
}
