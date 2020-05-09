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


// ===Buttons===
// Buttons: Grades Toggle
const btnGradeOne = document.querySelector('[data-btn="btn--grade-1"]');
const btnGradeTwo = document.querySelector('[data-btn="btn--grade-2"]');
const btnGradeThree = document.querySelector('[data-btn="btn--grade-3"]');
const btnGradeFour = document.querySelector('[data-btn="btn--grade-4"]');
// Buttons: Add Questions
const btnAddTextQuestion = document.querySelector('[data-btn="btn--add-text-question"]');
// Buttons: Code Window Toggle
const btnCodeWindowToggle = document.querySelector('[data-btn="btn--toggle-code-window"]');


/* =============
EVENT LISTENERS
============= */
// Event Listeners: Grades Toggle
btnGradeOne.addEventListener('click', changeGrade);
btnGradeTwo.addEventListener('click', changeGrade);
btnGradeThree.addEventListener('click', changeGrade);
btnGradeFour.addEventListener('click', changeGrade);
// Event Listeners: Add Questions
btnAddTextQuestion.addEventListener('click', addTextQuestion);
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
    formQuizGenResults.classList.toggle('quiz-gen-results-show');
    formQuizGenResults.classList.toggle('d-none');

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
ADD QUESTIONS
----------*/
function addTextQuestion() {
    determineQuestionContainer();
    addQuestionItem();
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

function addQuestionItem() {
    // Variables
    let questionItemContainer;
    let questionItemSettingsToolbar;
    let questionItemCard;
    let questionItemElementsContainer;
    let questionItem_placeholder_div;
    let questionItem_placeholder_title;
    let questionItem_question;
    let questionItem_element;
    // Variables - Data
    let questionObject = {};
    const btnAdd_instruction = Math.random();
    const btnAdd_situation = Math.random();
    const btnAdd_introText = Math.random();
    const btnAdd_question = Math.random();
    const btnAdd_image = Math.random();
    const btnAdd_info = Math.random();

    // Functions
    //---Create Container
    questionItemContainer = createElementHTML('article', 'block', 'quiz-block', 'quiz-gen-block');
    //---Create Settings Toolbar
    questionItemSettingsToolbar = createElementHTML('div', 'quiz-gen-question-settings', '', '', '');
    createSettingsToolbar('text', questionItemSettingsToolbar, btnAdd_instruction, btnAdd_situation, btnAdd_introText, btnAdd_question, btnAdd_image, btnAdd_info);
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
        questionItem_element = createQuestionElementHtml('instruction', questionItem_placeholder_div, questionObject, btnAdd_instruction);
        //------Create Question Element "Situation"
        questionItem_element = createQuestionElementHtml('situation', questionItem_placeholder_div, questionObject, btnAdd_situation);
        //------Upload our question item
        questionItem_question.appendChild(questionItem_placeholder_div);
    //---Create Question "Standard" Container
    questionItem_placeholder_div = createElementHTML('div', 'question-output', '', '', '');
        //------Create Question Element "IntroText"
        questionItem_element = createQuestionElementHtml('intro-text', questionItem_placeholder_div, questionObject, btnAdd_introText);
        //------Create Question Element "Question"
        questionItem_element = createQuestionElementHtml('question', questionItem_placeholder_div, questionObject, btnAdd_question);
        //------Upload our question item
        questionItem_question.appendChild(questionItem_placeholder_div);
    //---Create Question "Extra" Container (Info & Image)
    questionItem_placeholder_div = createElementHTML('div', 'question-output', '', '', '');
        //------Create Question Element "IntroText"
        questionItem_element = createQuestionElementHtml('info', questionItem_placeholder_div, questionObject, btnAdd_info);
        //------Upload our question item
        questionItem_question.appendChild(questionItem_placeholder_div);
    // Upload our question container
    questionItemElementsContainer.appendChild(questionItem_question);
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



function createQuestionElementHtml(type, parent, object, btnAddId) {
    // ---Variables
    let questionElement_container;
    let questionElement_placeholder_div;
    let questionElement_textarea;
    let questionElement_btn;
    let questionElement_deleteMessage;
    // Dynamic Variables
    let className;
    let questionElementObject = {};
    let questionProperty;
    let itemVisibility;
    // Variables: IDs
        /* Upload:*/ questionElementObject.btnAdd = btnAddId;
    let btnDeleteId = Math.random();
        /* Upload:*/ questionElementObject.btnDelete = btnDeleteId;
    let inputContainerId = Math.random();
    let inputFieldId = Math.random();
    let messageDeleteId = Math.random();
            /* Upload:*/ questionElementObject.messageDelete = messageDeleteId;

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
        /* Upload:*/ questionElementObject.inputContainer = inputContainerId;
    // Create the parent div
    questionElement_placeholder_div = createElementHTML('div', 'quiz-gen-input-box', className, className_2, '');
    // questionElement_placeholder_div.dataset.type = type;
    // Create the textarea
    questionElement_textarea = createElementHTML('textarea', 'quiz-gen-input', '', '', '');
    setTextarea(type, questionElement_textarea);
    questionElement_textarea.dataset.input = inputFieldId;
        /* Upload:*/ questionElementObject.inputField = inputFieldId;
    // Upload textarea
    questionElement_placeholder_div.appendChild(questionElement_textarea);
    // Create the button
    questionElement_btn = createElementHTML('button', 'quiz-gen-delete-btn', '', '', '', `<i class="fas fa-times"></i>`);
    questionElement_deleteMessage = createDeleteMessage(messageDeleteId, btnDeleteId, type);
    setDeleteButton(questionElement_btn);
    // Upload button
    questionElement_placeholder_div.appendChild(questionElement_btn);
    questionElement_placeholder_div.appendChild(questionElement_deleteMessage);
    // Upload our parent div
    questionElement_container.appendChild(questionElement_placeholder_div);
    // Upload the container
    if(object) {
        object[questionProperty] = questionElementObject;
    }
    if(parent) {
        parent.appendChild(questionElement_container);
    } else {
        return questionElement_container;
    }
}

function setTextarea(type, textarea) {
    switch(type) {
        case "instruction":
            textarea.placeholder = " Soy una instrucción.";
            textarea.value = "Lee la situación problema y elige la opción que sea más corta para resolverla:";
            textarea.classList.add('quiz-gen-input-filled');
            break;
        case "situation":
            textarea.placeholder = " Soy una situación.";
            textarea.classList.remove('quiz-gen-input-filled');
            break;
        case "intro-text":
            textarea.placeholder = " Soy texto antes de la pregunta.";
            break;
        case "question":
            textarea.placeholder = " Soy la pregunta.";
            break;
        case "info":
            textarea.placeholder = " Soy información addicional.";
            textarea.value = "Antes de contestar realiza esta operación en una hoja.";
            textarea.classList.add('quiz-gen-input-filled');
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

function createElementHTML(type, class_1, class_2, class_3, parent, message, attribute_src) {
    let htmlElement = document.createElement(type);
    // Depending on tag type
    switch(type) {
        case "img":
            htmlElement.src = attribute_src;
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

function createSettingsToolbar(type, parent, btn_instruction, btn_situation, btn_introText, btn_question, btn_image, btn_info) {
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
    if(type === "text") {
        settingsToolbar_icon = createElementHTML('div', '', '', '', '', '<i class="fas fa-file-alt quiz-gen-question-settings-icon"></i>');
        parent.appendChild(settingsToolbar_icon);
    } else if(type === "img") {
        settingsToolbar_icon = createElementHTML('div', '', '', '', '', '<i class="fas fa-file-image quiz-gen-question-settings-icon"></i>');
        parent.appendChild(settingsToolbar_icon);
    }
    // Create Buttons
    // ---Button: Situation Instruction
    settingsToolbar_btnInstruction = createElementHTML('button', 'quiz-gen-btn--settings', '', '', '', `<i class="fas fa-plus-circle"></i> <i class="fas fa-comment-dots"></i>`);
    settingsToolbar_btnInstruction.dataset.btn = btn_instruction;
    settingsToolbar_btnInstruction.dataset.name = "settings-btn-instruction";
    settingsToolbar_btnInstruction.addEventListener('click', (e) => {
        const targetElement = e.target;
        console.log(e.target);
        createSettingsButton('instruction', targetElement);
    });
    // ---Button: Situation
    settingsToolbar_btnSituation = createElementHTML('button', 'quiz-gen-btn--settings', '', '', '', `<i class="fas fa-plus-circle"></i> <i class="fas fa-theater-masks"></i>`);
    settingsToolbar_btnSituation.dataset.btn = btn_situation;
    settingsToolbar_btnSituation.dataset.name = "settings-btn-situation";
    settingsToolbar_btnSituation.addEventListener('click', (e) => {
        const targetElement = e.target;
        createSettingsButton('situation', targetElement);
    });
    // ---Button: Intro Text
    settingsToolbar_btnIntroText = createElementHTML('button', 'quiz-gen-btn--settings', '', '', '', `<i class="fas fa-plus-circle"></i> <i class="fas fa-money-check"></i>`);
    settingsToolbar_btnIntroText.dataset.btn = btn_introText;
    settingsToolbar_btnIntroText.dataset.name = "settings-btn-intro-text";
    settingsToolbar_btnIntroText.addEventListener('click', (e) => {
        const targetElement = e.target;
        createSettingsButton('intro-text', targetElement);
    });
    // ---Button: Question
    settingsToolbar_btnQuestion = createElementHTML('button', 'quiz-gen-btn--settings', 'quiz-gen-btn--settings-clicked', '', '', `<i class="fas fa-plus-circle"></i> <i class="fas fa-question-circle"></i>`);
    settingsToolbar_btnQuestion.dataset.btn = btn_question;
    settingsToolbar_btnQuestion.dataset.name = "settings-btn-question";
    settingsToolbar_btnQuestion.addEventListener('click', (e) => {
        const targetElement = e.target;
        createSettingsButton('question', targetElement);
    });
    // ---Button: Image
    settingsToolbar_btnImage = createElementHTML('button', 'quiz-gen-btn--settings', '', '', '', `<i class="fas fa-plus-circle"></i> <i class="fas fa-image"></i>`);
    // ---Button: Info
    settingsToolbar_btnInfo = createElementHTML('button', 'quiz-gen-btn--settings', '', '', '', `<i class="fas fa-plus-circle"></i> <i class="fas fa-info-circle"></i>`);
    settingsToolbar_btnInfo.dataset.btn = btn_info;
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

// let inputArrayGradeOne = [
//     {
//         index: 1,
//         instructionObject: {
//             btnAdd: "id",
//             btnDelete: "id",
//             inputContainer: "id",
//             inputField: "id",
//             messageDelete: "id"
//         },
//         situationObject: {
//             btnAdd: "id",
//             btnDelete: "id",
//             inputContainer: "id",
//             inputField: "id",
//             messageDelete: "id"
//         }
//     }
// ]



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

function createDeleteMessage(messageDeleteId, btnDelete, type) {
    // ---Variables
    let deleteMessage_container;
    let deleteMessage_btnClose;
    let deleteMessage_btn;
    // ---Functions
    // Create the container
    deleteMessage_container = createElementHTML('div', 'quiz-gen-delete-message', 'd-none', '', '');
    deleteMessage_container.dataset.type = "delete-message";
    deleteMessage_container.dataset.messageDelete = messageDeleteId;
    // Create the close button
    deleteMessage_btnClose = createElementHTML('p', 'quiz-gen-delete-message--close', '', '', '', '<i class="fas fa-times"></i>');
    deleteMessage_btnClose.addEventListener('click', (e) => {
        let item = e.target.closest('[data-type="delete-message"]');
        item.classList.add('d-none')
    })
    deleteMessage_container.appendChild(deleteMessage_btnClose);
    // Create the message text
    createElementHTML('p', '', '', '', deleteMessage_container, '¿Estás seguro de que quieres borrar este campo?');
    // Create the delete button
    deleteMessage_btn = createElementHTML('button', 'quiz-gen-confirm-delete-btn', '', '', '', 'Eliminar');
    deleteMessage_btn.dataset.btnDelete = btnDelete;
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
            case "delete-info":
                addButton = settingsOfParentArticle.querySelector('[data-name="settings-btn-info"]');
                break;   
        }
        addButton.classList.remove('quiz-gen-btn--settings-clicked');
        // Hide the question item
        e.target.parentNode.parentNode.parentNode.classList.add('d-none');
        // Set the value of the respectiv input field to 0
        e.target.parentNode.parentNode.children[0].value = "";
    });
    // Upload the button
    deleteMessage_container.appendChild(deleteMessage_btn);
    // Return the container
    return deleteMessage_container;
}