/* Start Screen */
var startScreen = document.querySelector("#start-screen");
var startButton = document.querySelector("#js-start-button");
/*timer*/
var quizTimer = document.querySelector("#quiz-timer");

/* Quiz Screen */
var quizScreen = document.querySelector("#quiz-container");
var questionText = document.querySelector("#question-container");
var questionChoices = document.querySelector("#choice-container");

/* input score page elements */
var inputScore = document.querySelector("#input-score");
var playerInitials = document.querySelector("#initials");
var finalScore = document.querySelector("#finalscore");
var submitResultsBtn = document.querySelector("#submit-results");

/* High score page elements */
var scoreData = document.querySelector("#high-score-data");
var scoreList = document.querySelector("#show-scores");
var backBtn = document.querySelector("#back-button");
var clearScoreDataBtn = document.querySelector("#clear-data");

/* questions[0].choices */

var time = 360;
var questionIndex = 0;
/* Start Button Logic */
startButton.addEventListener("click", function (event) {
	startScreen.classList.add("is-hidden");
	quizScreen.classList.remove("is-hidden");
	quizTimer.classList.remove("is-hidden");
	renderQuestion();
});

function renderQuestion() {
	
	var questionObj = questions[questionIndex];
	console.log(questionObj);
	questionText.innerHTML = questionObj.question;
	for (let index = 0; index < questionObj.choices.length; index++) {
		const choiceText = questionObj.choices[index];
		
		

		var choiceBTN = document.createElement("button");

		choiceBTN.textContent = questionObj.choices[index];
		choiceBTN.classList.add("all-buttons");
		questionChoices.append(choiceBTN);
		console.log(choiceBTN)
		
		
		
	}
	/* Selects all classes with class of all-buttons */
	
	
	/* starts at questions.question index[0].correctAnswer which for index[0] in questions.correctAnswer == 3
	So this keeps track of our correct answer */
	var ansObj = questions[questionIndex].correctAnswer;
	console.log(ansObj);
	var userChoice = questions[questionIndex].choices
	console.log(userChoice)
	var ansSelect = document.querySelectorAll('.all-buttons');
	
	
	ansSelect.forEach(ans => {
		ans.addEventListener('click', function(event){
			
			/* if (userChoice == ansObj) {
				alert('Correct')
				
			} else {
				alert('try again')
			}
			 */
			
			
			
				
			

			console.log('ans clicked', event );

		});
	});
};	


