// Select question and options
// *** Questions & QuestionCount
const question = document.querySelector('.question');
const questionNumberSpan = document.querySelector('.question-num-value');
const totalQuestionSpan = document.querySelector('.question-num-total');
// *** Options
const options = document.querySelector('.quiz-options').children;
const optionOne = document.querySelector('.option-1');
const optionTwo = document.querySelector('.option-2');
const optionThree = document.querySelector('.option-3');
const optionFour = document.querySelector('.option-4');
// ** Image Options
// const imageOptionOne = document.querySelector('.img-option-1');
// const imageOptionTwo = document.querySelector('.img-option-2');
// const imageOptionThree = document.querySelector('.img-option-3');
// const imageOptionFour = document.querySelector('.img-option-4');
// *** Index & AnswerTracker
let questionIndex; // down below we make the Index random
let index = 0;
const answerTracker = document.querySelector(".answers-tracker");
// *** Button
const nextButton = document.querySelector(".btn-next");
// *** Check for Question Duplicacy
let randomNumberArray = [];
let testRandomNumber = [];
// *** Count Score
let quizScore = 0;
// *** QuizOver Buttons
const tryAgainBtn = document.querySelector('.try-again-btn');
tryAgainBtn.addEventListener('click', tryAgain);
const goBackBtn = document.querySelector('.go-back-btn');
goBackBtn.addEventListener('click', goBack);
const goBackLink = document.querySelector('.go-back-link');
goBackLink.addEventListener('click', goBack);
// *** Results
const correctAnswerSpan = document.querySelector('.correct-answers');
const totalQuestionSpanQuizOver = document.querySelector('.total-questions');
const resultPercentage = document.querySelector('.result-percentage');
const quizOverTitle = document.querySelector('.quiz-over-title')


// Questions / Options
const questionArray = [
    {
        question: 'What is the color of the sky?',
        optionType: 'p',
        options: ['green','blue','yellow','red'],
        answer: 1
    },
    {
        question: 'What is the biggest animal of the following?',
        optionType: 'p',
        options: ['whale','dolphin','shark','seastar'],
        answer: 0
    },
    {
        question: 'What is a name for a man?',
        optionType: 'p',
        options: ['Laura','Sofia','Guadalupe','Julia'],
        answer: 2
    },
    {
        question: 'What is 5 * 5?',
        optionType: 'p',
        options: ['25','55','255','10'],
        answer: 0
    },
    {
        question: 'What is the answer of everything?',
        optionType: 'p',
        options: ['chocolate','the internet','love','42'],
        answer: 3
    },
    {
        question: 'Which of the following is equal to 4/5?',
        optionType: 'img',
        options: ['../../img/quiz/option-1.svg','../../img/quiz/option-2.svg','../../img/quiz/option-3.svg','../../img/quiz/option-4.svg'],
        answer: 0
    },
    {
        question: 'Which of the following is equal to 2/5?',
        optionType: 'img',
        options: ['../../img/quiz/option-1.svg','../../img/quiz/option-2.svg','../../img/quiz/option-3.svg','../../img/quiz/option-4.svg'],
        answer: 3
    }
]

// Set TotalQuestionNumber
totalQuestionSpan.innerHTML = questionArray.length;


// Set Questions - Options - QuestionNumber
function loadQuestions(){
    questionNumberSpan.innerHTML=index+1;
    question.innerHTML=questionArray[questionIndex].question;
    if (questionArray[questionIndex].optionType === "p") {
        optionOne.innerHTML=questionArray[questionIndex].options[0];
        optionTwo.innerHTML=questionArray[questionIndex].options[1];
        optionThree.innerHTML=questionArray[questionIndex].options[2];
        optionFour.innerHTML=questionArray[questionIndex].options[3];
    } else if (questionArray[questionIndex].optionType === "img") {
        // imageOptionOne.src = questionArray[questionIndex].options[0];
        // imageOptionTwo.src = questionArray[questionIndex].options[1];
        // imageOptionThree.src = questionArray[questionIndex].options[2];
        // imageOptionFour.src = questionArray[questionIndex].options[3];
        // Option One
        optionOne.innerText = "";
        const imageOne = document.createElement("img");
        imageOne.src = questionArray[questionIndex].options[0];
        optionOne.appendChild(imageOne);
        // Option Two
        optionTwo.innerText = "";
        const imageTwo = document.createElement("img");
        imageTwo.src = questionArray[questionIndex].options[1];
        optionTwo.appendChild(imageTwo);
        // Option Three
        optionThree.innerText = "";
        const imageThree = document.createElement("img");
        imageThree.src = questionArray[questionIndex].options[2];
        optionThree.appendChild(imageThree);
        // Option Four
        optionFour.innerText = "";
        const imageFour = document.createElement("img");
        imageFour.src = questionArray[questionIndex].options[3];
        optionFour.appendChild(imageFour);
    }
    index++;
}

// Add EventListener to Next Button (Other option: You can use "onclick" in the markup)
nextButton.addEventListener('click', displayNextQuestion);


// Check the selected option
function check(element){
    // console.log(element.id);
    // ***Show if answer was right or wrong
    if(element.id == questionArray[questionIndex].answer){
        element.classList.add("correct");
        updateAnswerTracker("correct");
        quizScore++;
        // console.log(quizScore);
    } else {
        element.classList.add("wrong");
        updateAnswerTracker("wrong");
    }

    // Disable the other options after selecting your answer
    disableOptions();
    // Call next question (I used EventListener, another options is to use "onclick" in the markup)
    // I made  amistake: The NextButton has to be independent from this function
}

// Avoid reselection of options
function disableOptions() {
    for(let i=0; i<options.length; i++) {
        options[i].classList.add("disabled");
        // ***Show the correct solution
        if(options[i].id == questionArray[questionIndex].answer){
            options[i].classList.add("correct");
        }
    }
}

function enableOptions() {
    for (let i=0; i<options.length; i++) {
        options[i].classList.remove('disabled', 'correct', 'wrong');
        // console.log(options[i].classList);
    }
}

// Validate that answer is chosen
function validateSelection() {
    if(!options[0].classList.contains("disabled")) {
        alert("¡Elige una respuesta!");
    } else {
        enableOptions();
        randomQuestion();
    }
}

// Display next Question
function displayNextQuestion(element) {
    validateSelection();
}

// // Create a random QuestionOrder
// function randomQuestion() {
//     let randomNumber = Math.floor(Math.random()*questionArray.length);
//     if(index === questionArray.length) {
//         console.log("Quiz is over");
//     } else{
//     questionIndex = randomNumber;
//     loadQuestions();
//     myArray.push(randomNumber);
//     }
// }

// Create a random QuestionOrder
function randomQuestion() {
    // *** We create a random number
    let randomNumber = Math.floor(Math.random()*questionArray.length);
    let hitDuplicate = 0;
    // *** If the index reached the end of our array we end the quiz...
    if(index == questionArray.length) {
        // console.log("Quiz is over");
        quizOver();
    // *** Otherwise we load a new question
    } else{
        if(randomNumberArray.length>0) {       // This means there is sth inside the array
            for(let i=0; i<randomNumberArray.length; i++){   // So we loop over our randomNumberArray to see if we had the numebr already
                if(randomNumberArray[i]==randomNumber) {
                    // console.log("duplicate found");
                    hitDuplicate = 1;             // if so we set hitDuplicate to 1 and break the loop
                    break;
                }
            }
            if (hitDuplicate==1) {                // if hitDuplicate == 1 we load the randomQuestion() Function again
                    randomQuestion();
            } else {                              // if not we use the randomNumber as our index and load the corresponding question
                    questionIndex = randomNumber;
                    loadQuestions();
                    // testRandomNumber.push(questionIndex);
            }
        }
        if(randomNumberArray.length==0) {          // if the empty is still array, we also take the randomNumber as our Index and load the corresponding question
            questionIndex = randomNumber;
            loadQuestions();
            // testRandomNumber.push(questionIndex);
        }
    }
    // console.log(testRandomNumber);
    randomNumberArray.push(randomNumber);           // at the end we save the randomNumber on our randomNumberArray o keep track of this number
}

// Create the Answer Tracker
function displayAnswerTracker() {
    for(let i=0; i<questionArray.length; i++) {
        const div = document.createElement("div");
        answerTracker.appendChild(div);
    }
}

// Update the Answer Tracker
function updateAnswerTracker(className) {
    // Shorter Way -> Use the parameter as the new className
    answerTracker.children[index-1].classList.add(className);

    // *** My solution
    // if (selection === "correct") {
    //     answerTracker.children[index-1].classList.add("correct");
    // } else if (selection === "wrong") {
    //     answerTracker.children[index-1].classList.add("wrong");
    // }
}

function quizOver(){
    document.querySelector('.quiz-over').classList.add("show");
    showQuizOverTitle();
    correctAnswerSpan.innerHTML = quizScore;
    totalQuestionSpanQuizOver.innerHTML = questionArray.length;
    resultPercentage.innerHTML = Math.round((quizScore/questionArray.length)*100) + "%";
    // resultPercentage.innerHTML = ((quizScore/questionArray.length)*100).toFixed(1) + "%";
}
// console.log(questionArray.length);

function showQuizOverTitle() {
    quizOverTitle.innerHTML = "Hello";
    const totalPercentage = Math.round((quizScore/questionArray.length)*100);
    if(totalPercentage >= 90) {
        quizOverTitle.innerHTML = "¡Excelente!";
    } else if(totalPercentage <90 && totalPercentage >= 60) {
        quizOverTitle.innerHTML = "¡Bien hecho!";
    } else if(totalPercentage <60) {
        quizOverTitle.innerHTML = "¡Inténtalo de nuevo!";
    }
}

function tryAgain() {
    window.location.reload();
}
function goBack() {
    window.history.back();
}


// Call the RandomQuestion Function to start
window.onload=function() {
    randomQuestion();
    displayAnswerTracker();
}



// console.log(questions);
// console.log(questions[0].question);
// console.log(questions[0].options[2]);
// console.log(questions[1].answer);