/* =============
VARIABLES
============= */
/* <div data-btn="btn--grade-1" class="quiz-gen-toolbar-selected-grade">Grado 1</div>
<div data-btn="btn--grade-2">Grado 2</div>
<div data-btn="btn--grade-3">Grado 3</div>
<div data-btn="btn--grade-4">Grado 4/5</div> */

let questionContainer;
let questionCount;
let questionCountTotal;
let questionCount_G1 = 1;
let questionCountTotal_G1;
let questionCount_G2 = 1;
let questionCountTotal_G2;
let questionCount_G3 = 1;
let questionCountTotal_G3;
let questionCount_G4 = 1;
let questionCountTotal_G4;
let gradeSelection;
// For Data:
let selectedInputArray;
let inputArrayGradeOne = [];
let inputArrayGradeTwo = [];
let inputArrayGradeThree = [];
let inputArrayGradeFour = [];


// ===Forms===
// Forms: Question Containers
const formQuestionsContainer_G1 = document.querySelector('[data-form="form--questions-grade-1"]');
const formQuestionsContainer_G2 = document.querySelector('[data-form="form--questions-grade-2"]');
const formQuestionsContainer_G3 = document.querySelector('[data-form="form--questions-grade-3"]');
const formQuestionsContainer_G4 = document.querySelector('[data-form="form--questions-grade-4"]');
// Forms: Image Settings - Grades
const formImageSettings_G1 = document.querySelector('[data-form="form--image-settings-grade-1"]');
const formImageSettings_G2 = document.querySelector('[data-form="form--image-settings-grade-2"]');
const formImageSettings_G3 = document.querySelector('[data-form="form--image-settings-grade-3"]');
const formImageSettings_G4 = document.querySelector('[data-form="form--image-settings-grade-4"]');
const formImageSettings_Container = document.querySelector('[data-form="form--image-settings-container"]');
// Forms: Code Window (=Quiz Gen Results)
const formQuizGenResults = document.querySelector('[data-form="quiz-gen-results"]');

// ===IMAGE DATA===
// Dynamic Image Variables
let selectedImageWeekNum;
let selectedImageName;
let selectedGrade; // grade info in Spanish
// Image: Get the week number of folder
const inputImageWeekNum_G1 = document.querySelector('[data-input="input--image-week-g1"]');
const inputImageWeekNum_G2 = document.querySelector('[data-input="input--image-week-g2"]');
const inputImageWeekNum_G3 = document.querySelector('[data-input="input--image-week-g3"]');
const inputImageWeekNum_G4 = document.querySelector('[data-input="input--image-week-g4"]');
// Image: Get the image name
const inputImageName_G1 = document.querySelector('[data-input="input--image-name-g1"]');
const inputImageName_G2 = document.querySelector('[data-input="input--image-name-g2"]');
const inputImageName_G3 = document.querySelector('[data-input="input--image-name-g3"]');
const inputImageName_G4 = document.querySelector('[data-input="input--image-name-g4"]');


// ===Buttons===
// Buttons: Grades Toggle
const btnGradeOne = document.querySelector('[data-btn="btn--grade-1"]');
const btnGradeTwo = document.querySelector('[data-btn="btn--grade-2"]');
const btnGradeThree = document.querySelector('[data-btn="btn--grade-3"]');
const btnGradeFour = document.querySelector('[data-btn="btn--grade-4"]');
// Buttons: Add Questions
const btnAddTextQuestion = document.querySelector('[data-btn="btn--add-text-question"]');
// Buttons: Add Questions
const btnAddImageQuestion = document.querySelector('[data-btn="btn--add-image-question"]');
// Buttons: Submit Questions
const btnSubmitQuestion = document.querySelector('[data-btn="btn--submit-questions"]');
// Buttons: Code Window Toggle
const btnCodeWindowToggle = document.querySelector('[data-btn="btn--toggle-code-window"]');

// ===Output===
const outputQuizGenCode = document.querySelector('[data-output="output--quiz-gen-code"]');


/* =============
EVENT LISTENERS
============= */
// Event Listeners: Grades Toggle
btnGradeOne.addEventListener('click', changeGrade);
btnGradeTwo.addEventListener('click', changeGrade);
btnGradeThree.addEventListener('click', changeGrade);
btnGradeFour.addEventListener('click', changeGrade);
// Event Listeners: Add Questions
btnAddTextQuestion.addEventListener('click', addQuestion);
btnAddImageQuestion.addEventListener('click', addQuestion);
// Event Listeners: Submit Questions
btnSubmitQuestion.addEventListener('click', submitQuestions);
// Event Listeners: Code Window Toggle
btnCodeWindowToggle.addEventListener('click', toggleCodeWindow);

/* =============
FUNCTIONS
============= */
/* ----------
TOGGLE CODE WINDOW
----------*/
function toggleCodeWindow() {
    // formQuizGenResults.classList.toggle('d-none');
    formQuizGenResults.classList.add('quiz-gen-results-show');
}

/* ----------
TOGGLE GRADES
----------*/
// Function: Display question containers for grades
function changeGrade(e) {
    // Before anything, disable all questions
    disableAllGrades();
    // Then, enable only the selected grade
    e.target.classList.add('quiz-gen-toolbar-selected-grade');
    // Make ImageSettings Container Visible
    formImageSettings_Container.classList.remove('d-none');
    // Hide the Code Window
    if(formQuizGenResults.classList.contains('quiz-gen-results-show')){
        formQuizGenResults.classList.add('quiz-gen-results-hide');
    }
    // ---ImageSettings: Grade 1
    if (e.target.dataset.btn.includes('grade-1')) {
        // Update the grade selection variable:
        gradeSelection = "grade-1";
        // Enable the image settings
        for(let item of formImageSettings_G1.children) {
            item.style.display = 'flex';
        }
        // Enable the question container
        formQuestionsContainer_G1.classList.remove('d-none');
    // ---ImageSettings: Grade 2
    } else if (e.target.dataset.btn.includes('grade-2')) {
        // Update the grade selection variable:
        gradeSelection = "grade-2";
        // Enable the image settings
        for(let item of formImageSettings_G2.children) {
            item.style.display = 'flex';
        }        
        // Enable the question container
        formQuestionsContainer_G2.classList.remove('d-none');
    // ---ImageSettings: Grade 3
    } else if (e.target.dataset.btn.includes('grade-3')) {
        // Update the grade selection variable:
        gradeSelection = "grade-3";
        // Enable the image settings
        for(let item of formImageSettings_G3.children) {
            item.style.display = 'flex';
        }
        // Enable the question container
        formQuestionsContainer_G3.classList.remove('d-none');
    // ---ImageSettings: Grade 4
    } else if (e.target.dataset.btn.includes('grade-4')) {
        // Update the grade selection variable:
        gradeSelection = "grade-4";
        // Enable the image settings
        for(let item of formImageSettings_G4.children) {
            item.style.display = 'flex';
        }                
        // Enable the question container
        formQuestionsContainer_G4.classList.remove('d-none');
    }
}

// Function: Disable the display of all grades
function disableAllGrades() {
    // Unselect button & hide content for all grades
    // Grade 1
    btnGradeOne.classList = "";
    // console.log(formImageSettings_G1.children)
    for (let item of formImageSettings_G1.children) {
        item.style.display = 'none';
    };
    formImageSettings_G1.classList.add('d-none');
    formQuestionsContainer_G1.classList.add('d-none');
    // Grade 2
    btnGradeTwo.classList = "";
    for (let item of formImageSettings_G2.children) {
        item.style.display = 'none';
    };
    formQuestionsContainer_G2.classList.add('d-none');
    // Grade 3
    btnGradeThree.classList = "";    
    for (let item of formImageSettings_G3.children) {
        item.style.display = 'none';
    };    
    formQuestionsContainer_G3.classList.add('d-none');
    // Grade 4
    btnGradeFour.classList = "";
    for (let item of formImageSettings_G4.children) {
        item.style.display = 'none';
    };    
    formQuestionsContainer_G4.classList.add('d-none');

}


/* ----------
SUBMIT QUESTIONS
----------*/
function submitQuestions() {
        // let gradeOneString = JSON.stringify(inputArrayGradeOne, undefined, 4);

    // ---First of all, we empty our output textarea
    outputQuizGenCode.innerHTML = '';
    // ---Create Question Arrays 
    let questionArray_G1 = createFinishedArray(inputArrayGradeOne);
    let questionArray_G2 = createFinishedArray(inputArrayGradeTwo);
    let questionArray_G3 = createFinishedArray(inputArrayGradeThree);
    let questionArray_G4 = createFinishedArray(inputArrayGradeFour);
    // --- Convert our Javascript objects/arrays into a JSON string (with stringify):
    let questionArray_G1_string = JSON.stringify(questionArray_G1, undefined, 4);
    let questionArray_G2_string = JSON.stringify(questionArray_G2, undefined, 4);
    let questionArray_G3_string = JSON.stringify(questionArray_G3, undefined, 4);
    let questionArray_G4_string = JSON.stringify(questionArray_G4, undefined, 4);
    // ---Turn those strings into TextNodes:    (we also add variable names)
    let questionArray_G1_string_textNode = document.createTextNode(`var questionArray_G1 = ${questionArray_G1_string}\r\r`);
    let questionArray_G2_string_textNode = document.createTextNode(`var questionArray_G2 = ${questionArray_G2_string}\r\r`);
    let questionArray_G3_string_textNode = document.createTextNode(`var questionArray_G3 = ${questionArray_G3_string}\r\r`);
    let questionArray_G4_string_textNode = document.createTextNode(`var questionArray_G4 = ${questionArray_G4_string}\r\r`);
    // ---Finally append our textNode Arrays to our output text area:
    outputQuizGenCode.appendChild(questionArray_G1_string_textNode);
    outputQuizGenCode.appendChild(questionArray_G2_string_textNode);
    outputQuizGenCode.appendChild(questionArray_G3_string_textNode);
    outputQuizGenCode.appendChild(questionArray_G4_string_textNode);
    // Open the code window:
    formQuizGenResults.classList.remove('quiz-gen-results-hide');
    formQuizGenResults.classList.add('quiz-gen-results-show');
    formQuizGenResults.classList.remove('quiz-gen-results-hidden');
}

function createFinishedArray(inputArray) {
    let outputArray = []
    inputArray.forEach( input => {
        let singleQuestionObject = {};
        // Upload "Situation Instruction" if existing
        if(input.questionSituationInstructionId) {
            // First we select the input field
            const instructionInputField = document.querySelector(`[data-input="${input.questionSituationInstructionId}"]`);
            let instruction;
            // If the input field is visible, we will use its' value
            if(instructionInputField.parentNode.parentNode.classList[0] !== "d-none") {
                instruction = instructionInputField.value;
            } else {
                instruction = "";
            }
            singleQuestionObject.questionSituationInstruction = instruction;
        }
        // Upload "Situation Text" if existing
        if(input.questionSituationTextId) {
            const situation = document.querySelector(`[data-input="${input.questionSituationTextId}"]`).value;
            singleQuestionObject.questionSituationText = situation;
        }
        // Upload "Intro Text" if existing
        if(input.questionIntroTextId) {
            const introText = document.querySelector(`[data-input="${input.questionIntroTextId}"]`).value;
            singleQuestionObject.questionIntroText = introText;
        }
        // Upload "Question" if existing
        if(input.questionId) {
            const question = document.querySelector(`[data-input="${input.questionId}"]`).value;
            singleQuestionObject.question = question;
        }
        // Upload "Info" if existing
        if(input.questionInfoId) {
            // First we select the input field
            const infoInputField = document.querySelector(`[data-input="${input.questionInfoId}"]`);
            let info;
            // If the input field is visible, we will use its' value
            if(infoInputField.parentNode.parentNode.classList[0] !== "d-none") {
                info = infoInputField.value;
            } else {
                info = "";
            }
            singleQuestionObject.questionInfo = info;
        }
        // Upload "Image" if existing
        if(input.questionImageId) {
            // Get the image number
            const imageNum = document.querySelector(`[data-input="${input.questionImageId}"]`).value;
            if(imageNum !== "") {
                // Dynamic Variables
                let imageWeekNum;
                let grade;
                let imageName;
                // Get the different values (weekNum, name & grade || according to the grade)
                switch(inputArray) {
                    case inputArrayGradeOne:
                        imageWeekNum = inputImageWeekNum_G1.value;
                        imageName = inputImageName_G1.value;
                        grade = "grado-1";
                        break;
                    case inputArrayGradeTwo:
                        imageWeekNum = inputImageWeekNum_G2.value;
                        imageName = inputImageName_G2.value;
                        grade = "grado-2";
                        break;
                    case inputArrayGradeThree:
                        imageWeekNum = inputImageWeekNum_G3.value;
                        imageName = inputImageName_G3.value;
                        grade = "grado-3";
                        break;
                    case inputArrayGradeFour:
                        imageWeekNum = inputImageWeekNum_G4.value;
                        imageName = inputImageName_G4.value;
                        grade = "grado-4";
                        break;
                }
                // Create the image URL
                const imageURL = `../../script/quiz/semana-${imageWeekNum}/${grade}/${imageName}-${imageNum}.png`
                singleQuestionObject.questionImage = imageURL;
            }
        }
        // Upload "OptionType" if existing
        if(input.optionTypeId) {
            const optionTypeValue = document.querySelector(`[data-input="${input.optionTypeId}"]`).dataset.input;            

            let optionType;
            if (optionTypeValue === "input--text-question") {
                optionType = "p";
            }
            singleQuestionObject.optionType = optionType;
        }
        if(input.option1Id && input.option2Id && input.option3Id && input.option4Id) {
            const option1 = document.querySelector(`[data-input="${input.option1Id}"]`).value;
            const option2 = document.querySelector(`[data-input="${input.option2Id}"]`).value;
            const option3 = document.querySelector(`[data-input="${input.option3Id}"]`).value;
            const option4 = document.querySelector(`[data-input="${input.option4Id}"]`).value;
            const options = [option1, option2, option3, option4];
            singleQuestionObject.options = options;
        }
        if(input.answerId) {
            // First we select the 4 radio buttons
            const answerInputField = document.querySelectorAll(`[name="${input.answerId}"]`);
            // Then we iterate through them to find the checked radio button and its' value
            answerInputField.forEach(answer => {
                if(answer.checked === true) {
                    const answerValue = answer.value;
                    singleQuestionObject.answer = answerValue;
                }
            })
            
        }
        outputArray.push(singleQuestionObject);
    })
    return outputArray;
    console.log(outputArray)
}

/* ----------
ADD QUESTIONS
----------*/
function addQuestion(e) {
    // Determine the Question Type
    let questionType = determineQuestionType(e);
    // Determine the Question Container
    determineQuestionContainer();
    // Add the question item
    addQuestionItem(questionType);
}

// Function: Determine which question type ("text-question" or "image-question") we have
function determineQuestionType(e) {
    let questionTypeValue;
    if(e.target.dataset.btn === 'btn--add-text-question') {
        questionTypeValue = "text-question";
    } else if(e.target.dataset.btn === 'btn--add-image-question') {
        questionTypeValue = "image-question";
    }
    return questionTypeValue;
}

// Function: Determine which question container (G1-G4) is needed
function determineQuestionContainer() {
    switch(gradeSelection) {
        case("grade-1"):
            questionContainer = formQuestionsContainer_G1;
            questionCount = questionCount_G1;
            questionCountTotal = formQuestionsContainer_G1.childElementCount + 1;
            selectedInputArray = inputArrayGradeOne;
            break;
        case("grade-2"):
            questionContainer = formQuestionsContainer_G2;
            questionCount = questionCount_G2;
            questionCountTotal = formQuestionsContainer_G2.childElementCount + 1;
            selectedInputArray = inputArrayGradeTwo;
            break;
        case("grade-3"):
            questionContainer = formQuestionsContainer_G3;
            questionCount = questionCount_G3;
            questionCountTotal = formQuestionsContainer_G3.childElementCount + 1;            
            selectedInputArray = inputArrayGradeThree;
            break;
        case("grade-4"):
            questionContainer = formQuestionsContainer_G4;
            questionCount = questionCount_G4;
            questionCountTotal = formQuestionsContainer_G4.childElementCount + 1;
            selectedInputArray = inputArrayGradeFour;
            break;
    }
}

function addQuestionItem(questionType) {
    // Variables
    let questionItemContainer;
    let questionItemSettingsToolbar;
    let questionItemCard;
    let questionItemElementsContainer;
    let questionItem_placeholder_div;
    let questionItem_placeholder_optionSpan;
    let questionItem_placeholder_title;
    let questionItem_question;
    let questionItem_options;
    let questionItem_element;
    let questionItem_image;
    // Variables - Data
    const inputFieldId_instruction = Math.random();
    const inputFieldId_situation = Math.random();
    const inputFieldId_introText = Math.random();
    const inputFieldId_question = Math.random();
    const inputFieldId_info = Math.random();
    const inputFieldId_questionImage_url = Math.random();
    const inputFieldId_questionImage_num = Math.random();
    const inputFieldId_questionImageOption_num = Math.random();
    const inputFieldId_option1 = Math.random();
    const inputFieldId_option2 = Math.random();
    const inputFieldId_option3 = Math.random();
    const inputFieldId_option4 = Math.random();
    const inputFieldId_correctOption = Math.random();

    let questionObject = {};


    // Functions
    //---Create Container
    questionItemContainer = createElementHTML('article', 'block', 'quiz-block', 'quiz-gen-block');
    questionItemContainer.dataset.input = "input--text-question";
    /* ==Upload:==*/ questionObject.optionTypeId = "input--text-question";
    //---Create Settings Toolbar
    questionItemSettingsToolbar = createElementHTML('div', 'quiz-gen-question-settings', '', '', '');
    createSettingsToolbar(questionType, questionItemSettingsToolbar);
    //---Create QuestionItemCard
    questionItemCard = createElementHTML('div', 'real-block', 'real-quiz-block', 'shadow', '');
    questionItemElementsContainer = createElementHTML('div', 'quiz-container', 'quiz-gen-container', '', '');
    // --- Image Icon
    createElementHTML('img', 'quiz-logo', '', '', questionItemElementsContainer, '', './../../img/favicon.png');
    // --- QuestionCount
    questionItem_placeholder_div = createElementHTML('div', 'question-number', '', '', '');
    questionItem_placeholder_title = createElementHTML('h3', 'question-number', '', '', questionItem_placeholder_div, `Pregunta ${questionCount} de ${questionCountTotal}`);
    questionItemElementsContainer.appendChild(questionItem_placeholder_div);
    /* ==Upload:==*/ questionObject.index = questionCount;
    //---Create Question Container
    questionItem_question = createElementHTML('div', 'question', '', '', '');
    //---Create Question "Situation" Container
    questionItem_placeholder_div = createElementHTML('div', 'question-situation', '', '', '');
        //------Create Question Element "Instruction"
        questionItem_element = createQuestionElementHtml('instruction', questionItem_placeholder_div, inputFieldId_instruction);
        /* ==Upload:==*/ questionObject.questionSituationInstructionId = inputFieldId_instruction;
        //------Create Question Element "Situation"
        questionItem_element = createQuestionElementHtml('situation', questionItem_placeholder_div, inputFieldId_situation);
        /* ==Upload:==*/ questionObject.questionSituationTextId = inputFieldId_situation;
        //------Upload our question item
        questionItem_question.appendChild(questionItem_placeholder_div);
    //---Create Question "Standard" Container
    questionItem_placeholder_div = createElementHTML('div', 'question-output', '', '', '');
        //------Create Question Element "IntroText"
        questionItem_element = createQuestionElementHtml('intro-text', questionItem_placeholder_div, inputFieldId_introText);
        /* ==Upload:==*/ questionObject.questionIntroTextId = inputFieldId_introText;
        //------Create Question Element "Question"
        questionItem_element = createQuestionElementHtml('question', questionItem_placeholder_div, inputFieldId_question);
        /* ==Upload:==*/ questionObject.questionId = inputFieldId_question;
        //------Upload our question item
        questionItem_question.appendChild(questionItem_placeholder_div);
    //---Create Question "Extra" Container (Info & Image)
    questionItem_placeholder_div = createElementHTML('div', 'question-output', '', '', '');
        //------Create Question Element "Question Image"
        questionItem_element = createImageElementHtml('question-image', questionItem_placeholder_div, inputFieldId_questionImage_url, inputFieldId_questionImage_num);
        /* ==Upload:==*/ questionObject.questionImageId = inputFieldId_questionImage_num;
        //------Create Question Element "IntroText"
        questionItem_element = createQuestionElementHtml('info', questionItem_placeholder_div, inputFieldId_info);
        /* ==Upload:==*/ questionObject.questionInfoId = inputFieldId_info;
        //------Upload our question item
        questionItem_question.appendChild(questionItem_placeholder_div);
    //---Create Options Container
    questionItem_options = createElementHTML('div', 'quiz-options', '', '', '');
        //---Create "1st Option"
        questionItem_element = createOptionElementHtml('option1', '', inputFieldId_option1, inputFieldId_correctOption, questionType);
        //------If we have an "image question" append an image
        if(questionType === "image-question") {
            questionItem_image = createElementHTML('img', '', '', '', '');
            questionItem_image.dataset.output = "output--option-image";
            questionItem_element.appendChild(questionItem_image);
        }
        /* ==Upload:==*/ questionItem_options.appendChild(questionItem_element);
        //---Create "2ndt Option"
        questionItem_element = createOptionElementHtml('option2', '', inputFieldId_option2, inputFieldId_correctOption, questionType);
        //------If we have an "image question" append an image
        if(questionType === "image-question") {
            questionItem_image = createElementHTML('img', '', '', '', '');
            questionItem_image.dataset.output = "output--option-image";
            questionItem_element.appendChild(questionItem_image);
        }
        /* ==Upload:==*/ questionItem_options.appendChild(questionItem_element);
        //---Create "3rd Option"
        questionItem_element = createOptionElementHtml('option3', '', inputFieldId_option3, inputFieldId_correctOption, questionType);
        //------If we have an "image question" append an image
        if(questionType === "image-question") {
            questionItem_image = createElementHTML('img', '', '', '', '');
            questionItem_image.dataset.output = "output--option-image";
            questionItem_element.appendChild(questionItem_image);
        }
        /* ==Upload:==*/ questionItem_options.appendChild(questionItem_element);
        //---Create "4th Option"
        questionItem_element = createOptionElementHtml('option4', '', inputFieldId_option4, inputFieldId_correctOption, questionType);
        //------If we have an "image question" append an image
        if(questionType === "image-question") {
        questionItem_image = createElementHTML('img', '', '', '', '');
        questionItem_image.dataset.output = "output--option-image";
        questionItem_element.appendChild(questionItem_image);
        }
        /* ==Upload:==*/ questionItem_options.appendChild(questionItem_element);

        if(questionType === "image-question") {
            //---Adding the image number field
            let questionItem_imageNum_div = createElementHTML('span', 'quiz-gen-input-img-option', '', '', '');
            let questionItem_imageNum = createElementHTML('input', 'quiz-gen-input', '', '', '');
            questionItem_imageNum.dataset.input = inputFieldId_questionImageOption_num;
            questionItem_imageNum.placeholder = "(Necesario:) Soy el número de las imagenes.";
            questionItem_imageNum.type = "number";
            questionItem_imageNum.min = 1;
            questionItem_imageNum.addEventListener('change', (e) => {
                if(e.target.value !== "") {
                    e.target.classList.add('quiz-gen-input-filled');
                } else {
                    e.target.classList.remove('quiz-gen-input-filled');
                }
                updateOptionImage(e);
            })
            /* ==Upload:==*/ questionItem_imageNum_div.appendChild(questionItem_imageNum);
            /* ==Upload:==*/ questionItem_options.appendChild(questionItem_imageNum_div);
            /* ==Upload:==*/ questionObject.questionImageOptionId = inputFieldId_questionImageOption_num;
        }
    // Upload our options
    questionObject.option1Id = inputFieldId_option1;
    questionObject.option2Id = inputFieldId_option2;
    questionObject.option3Id = inputFieldId_option3;
    questionObject.option4Id = inputFieldId_option4;
    questionObject.answerId = inputFieldId_correctOption;
    // Upload our question container
    questionItemElementsContainer.appendChild(questionItem_question);
    // Upload our options container
    questionItemElementsContainer.appendChild(questionItem_options);
    // Update the question count
    questionCount++;
    updateQuestionCount();
    // Upload to questionContainer
    questionItemContainer.appendChild(questionItemSettingsToolbar);
    questionItemCard.appendChild(questionItemElementsContainer);
    questionItemContainer.appendChild(questionItemCard);
    questionContainer.appendChild(questionItemContainer);

    selectedInputArray.push(questionObject)
    console.log(inputArrayGradeOne);
    console.log(inputArrayGradeTwo);
    console.log(inputArrayGradeThree);
    console.log(inputArrayGradeFour);
}



function createQuestionElementHtml(type, parent, inputFieldId) {
    // ---Variables
    let questionElement_container;
    let questionElement_placeholder_div;
    let questionElement_textarea;
    let questionElement_btn;
    let questionElement_deleteMessage;
    // Dynamic Variables
    let className;
    let questionProperty;
    let itemVisibility;
    // Variables: IDs
    
    let inputContainerId = Math.random();

    // Assign: Dynamic Variables
    switch(type) {
        case "instruction":
            className = 'quiz-gen-input-box--situation-instruction';
            className_2 = '';
            questionProperty = "instruction";
            itemVisibility = 'd-none';
            break;
        case "situation":
            className = 'question-situation-text';
            className_2 = '';
            questionProperty = "situation";
            itemVisibility = 'd-none';
            break;
        case "intro-text":
            className = 'question-intro-text';
            className_2 = '';
            questionProperty = "introText";
            itemVisibility = 'd-none';
            break;
        case "question":
            className = '';
            className_2 = '';
            questionProperty = "question";
            itemVisibility = '';
            break;
        case "info":
            className = 'question-info';
            className_2 = 'quiz-gen-question-info';
            questionProperty = "info";
            itemVisibility = 'd-none';
            break;
    }
    // ---Functions
    // Create the container
    questionElement_container = createElementHTML('div', itemVisibility, '', '', '');
    questionElement_container.dataset.type = type;
    questionElement_container.dataset.form = inputContainerId;
    // Create the parent div
    questionElement_placeholder_div = createElementHTML('div', 'quiz-gen-input-box', className, className_2, '');
    // questionElement_placeholder_div.dataset.type = type;
    // Create the textarea
    questionElement_textarea = createElementHTML('textarea', 'quiz-gen-input', '', '', '');
    setTextarea(type, questionElement_textarea);
    questionElement_textarea.dataset.input = inputFieldId;
    // Upload textarea
    questionElement_placeholder_div.appendChild(questionElement_textarea);
    // Create the button
    questionElement_btn = createElementHTML('button', 'quiz-gen-delete-btn', '', '', '', `<i class="fas fa-times"></i>`);
    questionElement_deleteMessage = createDeleteMessage(type);
    setDeleteButton(questionElement_btn);
    // Upload button
    questionElement_placeholder_div.appendChild(questionElement_btn);
    questionElement_placeholder_div.appendChild(questionElement_deleteMessage);
    // Upload our parent div
    questionElement_container.appendChild(questionElement_placeholder_div);
    // Upload the container
    if(parent) {
        parent.appendChild(questionElement_container);
    } else {
        return questionElement_container;
    }
}

function createOptionElementHtml(type, parent, inputFieldId, radioButtonId, questionType) {
    // ---Variables
    let questionElement_container;
    let questionElement_placeholder_div;
    let questionElement_textarea;
    let questionElement_radioBtn;
    // Dynamic Variables
    let className;
    let optionValue;
    // Variables: IDs
    
    let inputContainerId = Math.random();

    // Assign: Dynamic Variables
    switch(type) {
        case "option1":
            className = 'option-1';
            optionValue = 0;
            break;
        case "option2":
            className = 'option-2';
            optionValue = 1;
            break;
        case "option3":
            className = 'option-3';
            optionValue = 2;
            break;
        case "option4":
            className = 'option-4';
            optionValue = 3;
            break;
    }
    // ---Functions
    // Create the container
    questionElement_container = createElementHTML('div', className, '', '', '');
    questionElement_container.dataset.type = type;
    questionElement_container.dataset.form = inputContainerId;
    // This makes the whole option element selectable
    questionElement_container.addEventListener('click', (e) => {
        if(e.target.hasChildNodes()) {
            console.log(e.target.parentNode)
            let allOptions = e.target.parentNode.querySelectorAll('#quiz-gen-option-element-selected');
            allOptions.forEach(option => {
                option.id = "";
            })
            e.target.children[0].children[1].checked = true;
            e.target.id = 'quiz-gen-option-element-selected';
        }
    })
    // Create the parent div
    questionElement_placeholder_div = createElementHTML('span', 'quiz-gen-input-box', 'quiz-gen-input-box-options', '', '');
    // questionElement_placeholder_div.dataset.type = type;
    // Create the textarea
    questionElement_textarea = createElementHTML('textarea', 'quiz-gen-input', 'quiz-gen-input--options', '', '');
    setTextarea(type, questionElement_textarea);
    questionElement_textarea.dataset.input = inputFieldId;
    // ---Changes for "image-question" type
    if(questionType === "image-question") {
        // Add a different class for the styling of the textarea text 
        questionElement_placeholder_div.classList.add('quiz-gen-input-img');
        // Add a placeholder text
        questionElement_textarea.placeholder = '(Opcional: url)';
        questionElement_textarea.addEventListener('change', updateOptionImage);
    }
    // Create the radio button
    questionElement_radioBtn = createElementHTML('input', '', '', '', '', '', '', 'radio');
    questionElement_radioBtn.name = radioButtonId;
    questionElement_radioBtn.value = optionValue;
    questionElement_radioBtn.addEventListener('change', (e) =>{
        let allOptions = e.target.parentNode.parentNode.parentNode.querySelectorAll('#quiz-gen-option-element-selected');
        allOptions.forEach(option => {
            option.id = "";
        })
        e.target.parentNode.parentNode.id = 'quiz-gen-option-element-selected';
    })
    // Upload textarea & radio button
    questionElement_placeholder_div.appendChild(questionElement_textarea);
    questionElement_placeholder_div.appendChild(questionElement_radioBtn);
    // Upload our parent div
    questionElement_container.appendChild(questionElement_placeholder_div);
    // Upload the container
    if(parent) {
        parent.appendChild(questionElement_container);
    } else {
        return questionElement_container;
    }
}


function createImageElementHtml(type, parent, inputFieldId_url, inputFieldId_num) {
    // ---Variables
    let questionElement_container;
    let questionElement_placeholder_div;
    let questionElement_textarea;
    let questionElement_input;
    let questionElement_image;
    let questionElement_btn;
    let questionElement_deleteMessage;
    // Dynamic Variables
    let className;
    let questionProperty;
    let itemVisibility;
    // Variables: IDs

    let inputContainerId = Math.random();

    // Assign: Dynamic Variables
    switch(type) {
        case "question-image":
            className = 'quiz-gen-input-box--situation-instruction';
            className_2 = '';
            questionProperty = "instruction";
            itemVisibility = 'd-none';
            break;
    }
    // ---Functions
    // Create the container
    questionElement_container = createElementHTML('div', itemVisibility, '', '', '');
    questionElement_container.dataset.type = type;
    questionElement_container.dataset.form = inputContainerId;
    // Create the parent div
    questionElement_placeholder_div = createElementHTML('div', 'quiz-gen-input-box', 'quiz-gen-input-img', '');
    // (1) URL: Create the 1st textarea
    questionElement_textarea = createElementHTML('textarea', 'quiz-gen-input', '', '', '');
    setTextarea(type, questionElement_textarea);
    questionElement_textarea.dataset.input = inputFieldId_url;
    // (1) URL: This event listener updates the preview image after changing the url
    questionElement_textarea.addEventListener('change', updatePreviewImage);
    // (1) URL: Upload 1st textarea
    questionElement_placeholder_div.appendChild(questionElement_textarea);
    // (2) Num: Create the 2nd textarea
    questionElement_input = createElementHTML('input', 'quiz-gen-input', '', '', '');
    questionElement_input.type = "number";
    questionElement_input.min = 1;
    setTextarea("question-image--num", questionElement_input);
    questionElement_input.dataset.input = inputFieldId_num;
    // (2) Num: This event listener updates the preview image after changing the input field
    questionElement_input.addEventListener('change', updatePreviewImage);
    // (2) Num: Upload 2nd textarea
    questionElement_placeholder_div.appendChild(questionElement_input);
    // Create the button
    questionElement_btn = createElementHTML('button', 'quiz-gen-delete-btn', '', '', '', `<i class="fas fa-times"></i>`);
    questionElement_deleteMessage = createDeleteMessage(type);
    setDeleteButtonImage(questionElement_btn);
    // Upload button
    questionElement_placeholder_div.appendChild(questionElement_btn);
    questionElement_placeholder_div.appendChild(questionElement_deleteMessage);
    // (3) Image: Create the preview image
    questionElement_image = createElementHTML('img', 'question-image', 'd-none', '', '');
    questionElement_image.dataset.output = "output--question-image";
    // (3) Image: Upload the image
    questionElement_placeholder_div.appendChild(questionElement_image);
    
    // Upload our parent div
    questionElement_container.appendChild(questionElement_placeholder_div);
    // Upload the container
    if(parent) {
        parent.appendChild(questionElement_container);
    } else {
        return questionElement_container;
    }
}

function updateImageData() {
    switch(gradeSelection) {
        case "grade-1":
            selectedImageWeekNum = inputImageWeekNum_G1.value;
            selectedImageName = inputImageName_G1.value;
            selectedGrade = "grado-1";
        case "grade-2":
            selectedImageWeekNum = inputImageWeekNum_G2.value;
            selectedImageName = inputImageName_G2.value;
            selectedGrade = "grado-2";
        case "grade-3":
            selectedImageWeekNum = inputImageWeekNum_G3.value;
            selectedImageName = inputImageName_G3.value;
            selectedGrade = "grado-3";
        case "grade-4":
            selectedImageWeekNum = inputImageWeekNum_G4.value;
            selectedImageName = inputImageName_G4.value;
            selectedGrade = "grado-4";
    }

    return selectedImageWeekNum, selectedImageName, selectedGrade;
}

function updatePreviewImage(e) {
    console.log(gradeSelection);
    // ===UPDATE IMAGE DATA===
    // This function updates the data according to the selected grade
    updateImageData();

    // ===GET THE SRC VALUE===
    let imageURL = "";
    // If we change the url, we use the value of the textarea (url)
    // Or if the textarea is empty, the value of the input (number)
    if(e.target.tagName.toLowerCase() === "textarea") {
        imageURL = (e.target.value || `../../script/quiz/semana-${selectedImageWeekNum}/${selectedGrade}/${selectedImageName}-${e.target.parentNode.children[1].value}.png`);
    // If we change the number, we take the  value of the input (number) only if the url textarea is empty
    } else if(e.target.tagName.toLowerCase() === "input" && e.target.parentNode.children[0].value === "") {
        imageURL = `../../script/quiz/semana-${selectedImageWeekNum}/${selectedGrade}/${selectedImageName}-${e.target.value}.png`;
    // If the url textarea is not empty, we take its' value (even if we entered a number)
    // In short, for preview, the url will always dominate
    } else if(e.target.tagName.toLowerCase() === "input" && e.target.parentNode.children[0].value !== "") {
        imageURL = e.target.parentNode.children[0].value;
    }
    console.log(e.target.parentNode.querySelector('[data-output="output--question-image"]'))

    // ===UPDATE THE SRC VALUE AND MAKE IMAGE VISIBLE===
    let previewImage = e.target.parentNode.querySelector('[data-output="output--question-image"]');
    previewImage.src = imageURL;
    previewImage.classList.remove('d-none');
}

function updateOptionImage(e) {
    console.log(e.target.parentNode.parentNode.children[1]);
    console.log(e.target.parentNode.parentNode);
    // ===UPDATE IMAGE DATA===
    updateImageData();
    // ===GET THE OPTION NUMBER / OR IMAGE===
    // let optionNumber;
    let imageOptionOne;
    let imageOptionTwo;
    let imageOptionThree;
    let imageOptionFour;
    let textareaOne;
    let textareaTwo;
    let textareaThree;
    let textareaFour;
    // The url dominates for preview purposes (if url and image number exist, the url will be displayed)
    if(e.target.tagName.toLowerCase() === "textarea") {
        // if(e.target.parentNode.parentNode.classList.contains('option-1')){
        //     optionNumber = 'A'; 
        // } else if(e.target.parentNode.parentNode.classList.contains('option-2')){
        //     optionNumber = 'B'; 
        // } else if(e.target.parentNode.parentNode.classList.contains('option-3')){
        //     optionNumber = 'C'; 
        // } else if(e.target.parentNode.parentNode.classList.contains('option-4')){
        //     optionNumber = 'D';
        // }
        const previewImage = e.target.parentNode.parentNode.querySelector('[data-output="output--option-image"]');
        previewImage.src = e.target.value;
    } else if(e.target.tagName.toLowerCase() === "input") {
        // Select the images
        imageOptionOne = e.target.parentNode.parentNode.children[0].querySelector('[data-output="output--option-image"]');
        imageOptionTwo = e.target.parentNode.parentNode.children[1].querySelector('[data-output="output--option-image"]');
        imageOptionThree = e.target.parentNode.parentNode.children[2].querySelector('[data-output="output--option-image"]');
        imageOptionFour = e.target.parentNode.parentNode.children[3].querySelector('[data-output="output--option-image"]');
        // Select the textareas
        textareaOne = e.target.parentNode.parentNode.children[0].children[0].children[0].value;
        textareaTwo = e.target.parentNode.parentNode.children[1].children[0].children[0].value;
        textareaThree = e.target.parentNode.parentNode.children[2].children[0].children[0].value;
        textareaFour = e.target.parentNode.parentNode.children[3].children[0].children[0].value;

        if(e.target.value !== "") {
            if(textareaOne === "") {
                imageOptionOne.src = `../../script/quiz/semana-${selectedImageWeekNum}/${selectedGrade}/${selectedImageName}-${e.target.value}A.png`;
            }
            if(textareaTwo === "") {
                imageOptionTwo.src = `../../script/quiz/semana-${selectedImageWeekNum}/${selectedGrade}/${selectedImageName}-${e.target.value}B.png`;
            }
            if(textareaThree === "") {
                imageOptionThree.src = `../../script/quiz/semana-${selectedImageWeekNum}/${selectedGrade}/${selectedImageName}-${e.target.value}C.png`;
            }
            if(textareaFour === "") {
                imageOptionFour.src = `../../script/quiz/semana-${selectedImageWeekNum}/${selectedGrade}/${selectedImageName}-${e.target.value}D.png`;
            }
        }
    }
}

function setTextarea(type, textarea) {
    switch(type) {
        case "instruction":
            textarea.placeholder = "Soy una instrucción.";
            textarea.value = "Lee la situación problema y elige la opción que sea más corta para resolverla:";
            textarea.classList.add('quiz-gen-input-filled');
            break;
        case "situation":
            textarea.placeholder = "Soy una situación.";
            textarea.classList.remove('quiz-gen-input-filled');
            break;
        case "intro-text":
            textarea.placeholder = "Soy texto antes de la pregunta.";
            break;
        case "question":
            textarea.placeholder = "Soy la pregunta.";
            break;
        case "info":
            textarea.placeholder = "Soy información addicional.";
            textarea.value = "Antes de contestar realiza esta operación en una hoja.";
            textarea.classList.add('quiz-gen-input-filled');
            break;
        case "question-image":
            textarea.placeholder = "(Opcional:) Soy la url de la imagen.";
            break;
        case "question-image--num":
            textarea.placeholder = "(Necesario:) Soy el número de la imagen.";
            break;
    }
    textarea.spellcheck = false;
    textarea.addEventListener('change', (e) => {
        if(e.target.value !== "") {
            e.target.classList.add('quiz-gen-input-filled');
        } else {
            e.target.classList.remove('quiz-gen-input-filled');
        }
    })
}

function setDeleteButton(button) {
    button.addEventListener('click', (e) => {
        e.target.parentNode.children[2].classList.remove('d-none');
    });
}

function setDeleteButtonImage(button) {
    button.addEventListener('click', (e) => {
        e.target.parentNode.children[3].classList.remove('d-none');
    });
}

function createElementHTML(type, class_1, class_2, class_3, parent, message, attribute_src, inputType) {
    let htmlElement = document.createElement(type);
    // Depending on tag type
    switch(type) {
        case "img":
            htmlElement.src = (attribute_src || "");
            htmlElement.alt = "";
    }
    // Adding the message
    if(message) {
        htmlElement.innerHTML = message;
    }
    // Adding classes
    if(class_1) {
        htmlElement.classList.add(class_1);
    }
    if(class_2) {
        htmlElement.classList.add(class_2);
    }
    if(class_3) {
        htmlElement.classList.add(class_3);
    }
    if(inputType) {
        htmlElement.type = inputType;
    }
    // Upload the html Element
    if(parent) {
        parent.appendChild(htmlElement);
    } else {
        return htmlElement;
    }
}

function updateQuestionCount() {
    switch(gradeSelection) {
        case("grade-1"):
            questionCount_G1 = questionCount;
            questionCountTotal_G1 = formQuestionsContainer_G1.childElementCount + 1;
            break;
        case("grade-2"):
            questionCount_G2 = questionCount;
            break;
        case("grade-3"):
            questionCount_G3 = questionCount;
            break;
        case("grade-4"):
            questionCount_G4 = questionCount;
            break;
    }
}

function createSettingsToolbar(type, parent) {
    // ---Variables
    let settingsToolbar_icon;
    let settingsToolbar_btnInstruction;
    let settingsToolbar_btnSituation;
    let settingsToolbar_btnIntroText;
    let settingsToolbar_btnQuestion;
    let settingsToolbar_btnInfo;
    let settingsToolbar_btnImage;
    let settingsToolbar_btnDelete;

    // ---Functions
    // Text / Image Icon
    if(type === "text-question") {
        settingsToolbar_icon = createElementHTML('div', '', '', '', '', '<i class="fas fa-file-alt quiz-gen-question-settings-icon"></i>');
        parent.appendChild(settingsToolbar_icon);
    } else if(type === "image-question") {
        settingsToolbar_icon = createElementHTML('div', '', '', '', '', '<i class="fas fa-file-image quiz-gen-question-settings-icon"></i>');
        parent.appendChild(settingsToolbar_icon);
    }
    // Create Buttons
    // ---Button: Situation Instruction
    settingsToolbar_btnInstruction = createElementHTML('button', 'quiz-gen-btn--settings', '', '', '', `<i class="fas fa-plus-circle"></i> <i class="fas fa-comment-dots"></i>`);
    settingsToolbar_btnInstruction.dataset.name = "settings-btn-instruction";
    settingsToolbar_btnInstruction.addEventListener('click', (e) => {
        const targetElement = e.target;
        console.log(e.target);
        createSettingsButton('instruction', targetElement);
    });
    // ---Button: Situation
    settingsToolbar_btnSituation = createElementHTML('button', 'quiz-gen-btn--settings', '', '', '', `<i class="fas fa-plus-circle"></i> <i class="fas fa-theater-masks"></i>`);
    settingsToolbar_btnSituation.dataset.name = "settings-btn-situation";
    settingsToolbar_btnSituation.addEventListener('click', (e) => {
        const targetElement = e.target;
        createSettingsButton('situation', targetElement);
    });
    // ---Button: Intro Text
    settingsToolbar_btnIntroText = createElementHTML('button', 'quiz-gen-btn--settings', '', '', '', `<i class="fas fa-plus-circle"></i> <i class="fas fa-money-check"></i>`);
    settingsToolbar_btnIntroText.dataset.name = "settings-btn-intro-text";
    settingsToolbar_btnIntroText.addEventListener('click', (e) => {
        const targetElement = e.target;
        createSettingsButton('intro-text', targetElement);
    });
    // ---Button: Question
    settingsToolbar_btnQuestion = createElementHTML('button', 'quiz-gen-btn--settings', 'quiz-gen-btn--settings-clicked', '', '', `<i class="fas fa-plus-circle"></i> <i class="fas fa-question-circle"></i>`);
    settingsToolbar_btnQuestion.dataset.name = "settings-btn-question";
    settingsToolbar_btnQuestion.addEventListener('click', (e) => {
        const targetElement = e.target;
        createSettingsButton('question', targetElement);
    });
    // ---Button: Image
    settingsToolbar_btnImage = createElementHTML('button', 'quiz-gen-btn--settings', '', '', '', `<i class="fas fa-plus-circle"></i> <i class="fas fa-image"></i>`);
    settingsToolbar_btnImage.dataset.name = "settings-btn-question-image";
    settingsToolbar_btnImage.addEventListener('click', (e) => {
        const targetElement = e.target;
        createSettingsButton('question-image', targetElement);
    });
    // ---Button: Info
    settingsToolbar_btnInfo = createElementHTML('button', 'quiz-gen-btn--settings', '', '', '', `<i class="fas fa-plus-circle"></i> <i class="fas fa-info-circle"></i>`);
    settingsToolbar_btnInfo.dataset.name = "settings-btn-info";
    settingsToolbar_btnInfo.addEventListener('click', (e) => {
        const targetElement = e.target;
        createSettingsButton('info', targetElement);
    });
    // ---Button: Delete
    settingsToolbar_btnDelete = createElementHTML('button', 'quiz-gen-btn--settings', 'quiz-gen-btn--settings-delete', '', '', `<i class="fas fa-times"></i>`);
    // Upload Buttons
    parent.appendChild(settingsToolbar_btnInstruction);
    parent.appendChild(settingsToolbar_btnSituation);
    parent.appendChild(settingsToolbar_btnIntroText);
    parent.appendChild(settingsToolbar_btnQuestion);
    parent.appendChild(settingsToolbar_btnImage);
    parent.appendChild(settingsToolbar_btnInfo);
}


function createSettingsButton(type, targetElement) {
        console.log(targetElement.parentNode.parentNode)
        console.log(targetElement.parentNode.parentNode.parentNode);
        // console.log(targetElement.parentNode.parentNode.children[1].children[0].children[2].children[0].children[0]);
        // ---Change Button
        targetElement.classList.add('quiz-gen-btn--settings-clicked');
        // ---Container
        const item = targetElement.parentNode.parentNode.querySelector(`[data-type="${type}"]`);

        console.log(item)
        console.log(targetElement)
        
        item.classList.remove('d-none');

        // ---Text Area
        const textarea = item.querySelector('textarea')
        if(type === "instruction") {
            textarea.classList.add('quiz-gen-input-filled');
            textarea.value = "Lee la situación problema y elige la opción que sea más corta para resolverla:";
        }
        if(type === "info") {
            textarea.classList.add('quiz-gen-input-filled');
            textarea.value = "Antes de contestar realiza esta operación en una hoja.";
        }
        
        // ---Delete Message
        const deleteMessage = targetElement.parentNode.parentNode.querySelectorAll('[data-type="delete-message"]');
        console.log(deleteMessage);
        deleteMessage.forEach( message => {
            message.classList.add('d-none');
        });
}

function createDeleteMessage(type) {
    // ---Variables
    let deleteMessage_container;
    let deleteMessage_btnClose;
    let deleteMessage_btn;
    // ---Functions
    // Create the container
    deleteMessage_container = createElementHTML('div', 'quiz-gen-delete-message', 'd-none', '', '');
    deleteMessage_container.dataset.type = "delete-message";
    // Create the close button
    deleteMessage_btnClose = createElementHTML('p', 'quiz-gen-delete-message--close', '', '', '', '<i class="fas fa-times"></i>');
    deleteMessage_btnClose.addEventListener('click', (e) => {
        let item = e.target.closest('[data-type="delete-message"]');
        item.classList.add('d-none');
    })
    deleteMessage_container.appendChild(deleteMessage_btnClose);
    // Create the message text
    createElementHTML('p', '', '', '', deleteMessage_container, '¿Estás seguro de que quieres borrar este campo?');
    // Create the delete button
    deleteMessage_btn = createElementHTML('button', 'quiz-gen-confirm-delete-btn', '', '', '', 'Eliminar');
    deleteMessage_btn.dataset.name = `delete-${type}`;
    // Add Event Listener 
    deleteMessage_btn.addEventListener('click', (e) => {
        // ---Change state of our button
        console.log(e.target.dataset.name)
        let parentArticle = e.target.closest('.quiz-gen-block');
        let settingsOfParentArticle = parentArticle.children[0];
        let addButton;
        switch(e.target.dataset.name) {
            case "delete-instruction":
                addButton = settingsOfParentArticle.querySelector('[data-name="settings-btn-instruction"]');
                break;
            case "delete-situation":
                addButton = settingsOfParentArticle.querySelector('[data-name="settings-btn-situation"]');
                break;
            case "delete-intro-text":
                addButton = settingsOfParentArticle.querySelector('[data-name="settings-btn-intro-text"]');
                break;
            case "delete-question":
                addButton = settingsOfParentArticle.querySelector('[data-name="settings-btn-question"]');
                break;
            case "delete-question-image":
                addButton = settingsOfParentArticle.querySelector('[data-name="settings-btn-question-image"]');
                e.target.parentNode.parentNode.children[1].value = "";
                break;
            case "delete-info":
                addButton = settingsOfParentArticle.querySelector('[data-name="settings-btn-info"]');
                break;
        }
        addButton.classList.remove('quiz-gen-btn--settings-clicked');
        e.target.parentNode.parentNode.parentNode.classList.add('d-none');
        // Set the value of the respective input field to 0
        e.target.parentNode.parentNode.children[0].value = "";
    });
    // Upload the button
    deleteMessage_container.appendChild(deleteMessage_btn);
    // Return the container
    return deleteMessage_container;
}