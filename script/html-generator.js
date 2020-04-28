/*==================
VARIABLES
==================*/
/*=== DOM & Input Fields ===*/
const htmlCode = document.querySelector('.real-block');
const inputNivel = document.querySelector('[data-input="input--nivel"]');
const inputTitle = document.querySelector('[data-input="input--title"]');
const inputSubtitle = document.querySelector('[data-input="input--subtitle"]');
const inputHeroImage = document.querySelector('[data-input="input--hero-img"]');
const inputHeroImageAlt = document.querySelector('[data-input="input--hero-img-alt"]');
const inputIntro = document.querySelector('[data-input="input--intro"]');
const inputIntroVideo = document.querySelector('[data-input="input--intro__video"]');
const inputIntroTitle = document.querySelector('[data-input="input--intro__title"]');
const inputIntroVideo_Url = document.querySelector('[data-input="input--intro__video-url"]');
const inputIntroVideo_Nr = document.querySelector('[data-input="input--intro__video-nr"]');
const inputIntroAddInput = document.querySelector('[data-input="input--intro-add-input"]');
const inputObjectivesTitle = document.querySelector('[data-input="input--objectives__title"]');


/*=== Image Settings ===*/
const inputImgFolder = document.querySelector('[data-input="input--img-folder"]');
const inputImgName = document.querySelector('[data-input="input--img-name"]');
const inputImgNumber = document.querySelector('[data-input="input--img-number"]');
const inputCourseNumber = document.querySelector('[data-input="input--course-nr"]');
let imageCount;
const inputImgFormat = document.querySelector('[data-input="input--img-format"]');
const inputHeroImgFormat = document.querySelector('[data-input="input--hero-img-format"]');

/*=== Output HTML ===*/
const outputHtml = document.querySelector('[data-output="output--html"]');
const outputImgDirection = document.querySelector('[data-output="output--img-direction"]');


/*=== Buttons ===*/
const btnSubmitGeneral = document.querySelector('[data-btn="btn--create-document"]');
const btnDeleteAll = document.querySelector('[data-btn="btn--delete-all"]');
const btnIntroAddInput = document.querySelector('[data-btn="btn--intro-add-input"]');
const btnAddObjective = document.querySelector('[data-btn="btn--add-objective"]');
const btnSectionAddInput = document.querySelector('[data-btn="btn--section-add-input"]');


/*=== Toggle Buttons ===*/
const btnGeneralToggle = document.querySelector('.btn-general-toggle')
const btnIntroToggle = document.querySelector('[data-btn="btn--intro-toggle"]');
const btnImageSettingsToggle = document.querySelector('[data-btn="btn--image-settings-toggle"]');
const btnObjectivesToggle = document.querySelector('[data-btn="btn--objectives-toggle"]');


/*=== Form ===*/
const formGeneral = document.querySelector('[data-form="form--general"]');
const formImageSettings = document.querySelector('[data-form="form--image-settings"]');
const formIntroGeneral = document.querySelector('[data-form="form--intro-general"]');
const formIntro = document.querySelector('[data-form="form--intro"]');
const formIntroVideo = document.querySelector('[data-form="form--intro-video"]');
const formObjectives = document.querySelector('[data-form="form--objectives"]');

const formIntroAddInputContainer = document.querySelector('[data-form="form--intro-add-input"]');
const formAddObjectiveContainer = document.querySelector('[data-form="form--add-objective"]');
const formAddSectionsContainer = document.querySelector('[data-form="form--section-add-input"]');

/*=== Form: CHAPTER ===*/
let pageSectionInput_chapterNr = 1;

/*=== Internal Arrays ===*/
let introElementArray = [];
let sectionElementArray = [];


/*==================
EVENT LISTENERS
==================*/
btnSubmitGeneral.addEventListener('click', createDocument);
btnDeleteAll.addEventListener('click', clearDocument);
btnIntroAddInput.addEventListener('click', addIntroInput);
btnAddObjective.addEventListener('click', addIntroInput);
btnSectionAddInput.addEventListener('click', addSectionInput);


/*=== Toggle Edit Window ===*/
btnGeneralToggle.addEventListener('click', () => formGeneral.classList.toggle('hidden-html-gen'));
btnImageSettingsToggle.addEventListener('click', (e) => {
    e.preventDefault();
    formImageSettings.classList.toggle('hidden-html-gen');
})
btnIntroToggle.addEventListener('click', (e) => {
    e.preventDefault();
    formIntroGeneral.classList.toggle('hidden-html-gen');
})
btnObjectivesToggle.addEventListener('click', (e) => {
    e.preventDefault();
    formObjectives.classList.toggle('hidden-html-gen');
})
inputIntro.addEventListener('click', () => {
    if(inputIntro.value === "yes") {
        formIntro.classList.remove('hidden-html-gen');
    } else{
        formIntro.classList.add('hidden-html-gen');
    }
});
inputIntroVideo.addEventListener('click', () => {
    if(inputIntroVideo.value === "yes") {
        formIntroVideo.classList.remove('hidden-html-gen');
    } else{
        formIntroVideo.classList.add('hidden-html-gen');
    }
});

/*==================
FUNCTIONS
==================*/

function clearDocument(e) {
    e.preventDefault();
    clearPreviewHtml();
    clearOutputHtml();
}

function clearPreviewHtml() {
    htmlCode.innerHTML = "";
}

function clearOutputHtml() {
    outputHtml.innerText = "";
    // imageCount = Number(inputImgNumber.value);
}

function createDocument(e) {
    e.preventDefault();
    clearPreviewHtml(e);
    // Create Section
    const  pageSection = createSection('chapter', '', 'Intro');
    imageCount = Number(inputImgNumber.value || 1);
    outputImgDirection.innerText = `./../../img/${inputCourseNumber.value}/${inputImgFolder.value}/${inputImgName.value}-${imageCount}.${inputImgFormat.value}`;
    // Create Nivel
    createNivel();
    // Create Title
    createSingleElement('h1', 'chapter-title', inputTitle);
    // Create Subtitle
    createSingleElement('p', 'subtitle', inputSubtitle);
    // Create Hero-Image
    createHeroImage(inputHeroImage, inputHeroImageAlt);
    if(inputIntro.value === "yes") {
        createIntroVideoBtn(pageSection);
    
    // console.log(introElementArray);
    // ********* Create the elements for each of our added fields
        introElementArray.forEach( (item) => {
            // console.log(item);
            // console.log(item.type);
            let inputField;
            switch(item.type) {
                case "p":
                    inputField = document.querySelector(`[data-input="${item.id}"]`);
                    createSingleElement('p', 'main-text', inputField);
                    // htmlElementClass = "main-text";
                    break;
                case "observa":
                    inputField = document.querySelector(`[data-input="${item.id}"]`);
                    createSingleElement('p', 'example', inputField);
                    break;
                case "img":
                    inputField = document.querySelector(`[data-input="${item.id}"]`);
                    inputField_Alt = document.querySelector(`[data-input="${item.id_2}"]`);
                    createImage(inputField, 'img-diagram', inputField_Alt);
                    break;
                case "ul":
                    inputField = document.querySelector(`[data-input="${item.id}"]`);
                    createSingleElement('ul', 'main-list', inputField, item.array);
                    console.log(item.id);
                    console.log(item.array);
                    // item.array.forEach( (child) => {
                    //     console.log("Hi");
                    //     console.log(child);
                    //     createSingleElement('li', 'list-dot', child);
                    // })
                    break;
                case "learnbox":
                    inputField = document.querySelector(`[data-input="${item.id}"]`);
                    createSingleElement('div', 'chapter-box', inputField);
                    break;
                case "quote":
                    inputField = document.querySelector(`[data-input="${item.id}"]`);
                    createSingleElement('p', 'main-text-quote', inputField);
                    break;
            }
        });
    }
    if(inputObjectivesTitle.value !== "") {
        createObjectives();
    }
    createSectionHtmlEnd();
}



function createObjectives() {
        // Create the <ul> list
    const pageElementContainer = document.createElement('ul');
    pageElementContainer.classList.add('goals');
    // Create the list title <span>
    const pageElement_Title = document.createElement('span');
    pageElement_Title.classList.add('goal-text');
    pageElement_Title.innerText = inputObjectivesTitle.value;
    pageElementContainer.appendChild(pageElement_Title);
    // Create the list items
    introElementArray.forEach( (item) => {
        let inputField;
        switch(item.type) {
            case "objective":
                inputField = document.querySelector(`[data-input="${item.id}"]`);
                createSingleElement('li', 'goal-list-dot', inputField, null ,pageElementContainer);
                break;
        }
    });
    // Upload the <ul> list to the section
    pageSection.appendChild(pageElementContainer);
    /*=== HTML Output ===*/
    let htmlElementComment;
    let htmlElement;
    let htmlElementClosing;
    // ********* Upload Comment & Title
    htmlElementComment = document.createTextNode(`    <!--=======Goals=======-->\r`);
    htmlElement = document.createTextNode(`    <ul class="goals"><span class="goal-text">${inputObjectivesTitle.value}</span>\r`);
    outputHtml.appendChild(htmlElementComment);
    outputHtml.appendChild(htmlElement);
    // ********* Upload each list item
    introElementArray.forEach( (item) => {
        let inputField;
        let htmlElement_Child
        switch(item.type) {
            case "objective":
                inputField = document.querySelector(`[data-input="${item.id}"]`);
                htmlElement_Child = document.createTextNode(`        <li class="goal-list-dot">${inputField.value}</li>\r`);
                outputHtml.appendChild(htmlElement_Child);
        }
    });
    // ********* Upload the closing tag
    htmlElementClosing = document.createTextNode(`    </ul>\r`);
    outputHtml.appendChild(htmlElementClosing);
}

function createIntroVideoBtn(pageSection) {
    // console.log("Video Button created");
    // Create the general <div> container
    const pageElementContainer = document.createElement('div');
    pageElementContainer.classList.add('flex-video');
    // Create the title <div>
    const pageElementContainerTitle = document.createElement('div');
    pageElementContainerTitle.classList.add('flex-video-title');
    pageElementContainer.appendChild(pageElementContainerTitle);
    // ********* Create the title number
    const pageElementTitle_Number = document.createElement('div');
    const pageElementTitle_NumberSpan = document.createElement('span');
    pageElementTitle_NumberSpan.classList.add('chapter__number');
    pageElementTitle_NumberSpan.innerText = "Introducción";
    pageElementTitle_Number.appendChild(pageElementTitle_NumberSpan);
    pageElementContainerTitle.appendChild(pageElementTitle_Number);
    // ********* Create the actual title
    const pageElementTitle = document.createElement('h2');
    pageElementTitle.classList.add('section-title');
    pageElementTitle.innerText = inputIntroTitle.value;
    pageElementContainerTitle.appendChild(pageElementTitle);
    if(inputIntroVideo.value === "yes"){
        // Create the video button <div>
        const pageElementContainerVideo = document.createElement('div');
        pageElementContainerVideo.classList.add('flex-video-btn');
        pageElementContainer.appendChild(pageElementContainerVideo);
        // ********* Create the video button
        const pageElementVideoButton = document.createElement('a');
        pageElementVideoButton.classList.add('test-button', 'shadow-btn');
        if(inputIntroVideo_Url.value === "") {
            pageElementVideoButton.href = "#";
        } else {
            pageElementVideoButton.href = inputIntroVideo_Url.value;
        }
        pageElementVideoButton.target = `_blank`;
        pageElementVideoButton.innerText = `Vídeo ${inputIntroVideo_Nr.value}`;
        pageElementContainerVideo.appendChild(pageElementVideoButton);
    }
    /*=== HTML Output ===*/
        // <!--=======Title & Video Button=======-->
        // <div class="flex-video">
        //     <div class="flex-video-title">
        //         <div><span class="chapter__number">Introducción</span></div>
        //         <h2 class="section-title">¿Qué es la fracción de un número y para qué nos sirve?</h2>
        //     </div>
        //     <div class="flex-video-btn">
        //         <a class="test-button shadow-btn" href="#" target="_blank">Vídeo 01</a>
        //     </div>
        // </div> <!--=======/Title & Video Button=======-->
    if(inputIntroVideo.value === "yes"){
        let htmlElement;
        htmlElement = document.createTextNode(`    <!--=======Title & Video Button=======-->\r    <div class="flex-video">\r        <div class="flex-video-title">\r            <div><span class="chapter__number">Introducción</span></div>\r            <h2 class="section-title">${inputIntroTitle.value}</h2>\r        </div>\r        <div class="flex-video-btn">\r            <a class="test-button shadow-btn" href="${inputIntroVideo_Url.value || "#"}" target="_blank">Vídeo ${inputIntroVideo_Nr.value}</a>\r        </div>\r    </div>\r`);
        outputHtml.appendChild(htmlElement);
    } else {
        let htmlElement;
        htmlElement = document.createTextNode(`    <!--=======Title (No Video Button)=======-->\r    <div class="flex-video">\r        <div class="flex-video-title">\r            <div><span class="chapter__number">Introducción</span></div>\r            <h2 class="section-title">${inputIntroTitle.value}</h2>\r        </div>\r    </div>\r`);
        outputHtml.appendChild(htmlElement);
    }
    // Upload the general <div> container
    pageSection.appendChild(pageElementContainer);
}

function addIntroInput(e) {
    console.log(e);
    console.log(e.target);
    console.log(e.target.dataset.btn);

    e.preventDefault();
    // let htmlElement;
    let htmlElementMessage;
    let htmlElementData;
    let htmlElementMessage_2;
    let htmlElementData_2;
    let htmlElementData_Array = [];
    
    // let htmlElementClass;    
    // Define the cases
    if (e.target.dataset.btn === "btn--add-objective") {
        htmlElementMessage = "Escribe el objetivo:";
        htmlElementData = Math.random();
        /*=== Saving our changes into an array ===*/
        updateIntroElementArray("objective", htmlElementData)
    } else {
        switch(inputIntroAddInput.value.toLowerCase()) {
            case "p":
                // htmlElement = "p";
                htmlElementMessage = "Escribe el parágrafo:";
                htmlElementData = Math.random();
                /*=== Saving our changes into an array ===*/
                updateIntroElementArray("p", htmlElementData)
                // htmlElementClass = "main-text";
                break;
            case "observa":
                // htmlElement = "p";
                htmlElementMessage = "Escribe qué vas a observar:";
                htmlElementData = Math.random();
                /*=== Saving our changes into an array ===*/
                updateIntroElementArray("observa", htmlElementData)
                // htmlElementClass = "main-text";
                break;
            case "img":
                // htmlElement = "p";
                htmlElementMessage = "La url de la imagen es:";
                htmlElementData = Math.random();
                htmlElementMessage_2 = "Describe la imagen:";
                htmlElementData_2 = Math.random();
                /*=== Saving our changes into an array ===*/
                updateIntroElementArray("img", htmlElementData, htmlElementData_2)
                // htmlElementClass = "main-text";
                break;
            case "ul":
                // htmlElement = "p";
                htmlElementMessage = "Si la lista tiene un título, escríbalo aquí:";
                htmlElementData = Math.random();
                htmlElementMessage_2 = "Agrega un punto de la lista:";
                htmlElementData_2 = Math.random();
                /*=== Saving our changes into an array ===*/
                updateIntroElementArray("ul", htmlElementData, "", htmlElementData_Array)
                // htmlElementClass = "main-text";
                break;
            case "learnbox":
                // htmlElement = "p";
                // htmlElementMessage = "El learnbox tiene el título (e.g. Regla, Regla 01 etc.):";
                htmlElementMessage = "La regla es:";
                htmlElementData = Math.random();
                /*=== Saving our changes into an array ===*/
                updateIntroElementArray("learnbox", htmlElementData)
                // htmlElementClass = "main-text";
                break;
            case "quote":
                // htmlElement = "p";
                // htmlElementMessage = "El learnbox tiene el título (e.g. Regla, Regla 01 etc.):";
                htmlElementMessage = "El tip es:";
                htmlElementData = Math.random();
                /*=== Saving our changes into an array ===*/
                updateIntroElementArray("quote", htmlElementData)
                // htmlElementClass = "main-text";
                break;
        }
    }
    
    // Create an html container
    const  pageIntroInput = document.createElement('div');
    // Create the title
    const  pageIntroInput_Title = document.createElement('p');
    pageIntroInput_Title.classList.add('html-gen-instruction');
    pageIntroInput_Title.innerText = htmlElementMessage;
    // Create the input field
    const  pageIntroInput_Field = document.createElement('input');
    pageIntroInput_Field.setAttribute('data-input', htmlElementData);
    pageIntroInput_Field.type = "text";
    pageIntroInput_Field.classList.add('html-gen-input');
    // Update the html container
    pageIntroInput.appendChild(pageIntroInput_Title);
    pageIntroInput.appendChild(pageIntroInput_Field);
    switch(inputIntroAddInput.value.toLowerCase()) {
        case "img":
            /*=== Saving our changes into an array ===*/
            addIntroInputSpecial(pageIntroInput, htmlElementMessage_2, htmlElementData_2)
            break;
        case "ul":
            /*=== Saving our changes into an array ===*/
            addButtonField(pageIntroInput, htmlElementMessage_2, htmlElementData_2, htmlElementData_Array);
            // const addListItemButton = document.querySelector(`[data-input="${htmlElementData_2}"]`);
            // addListItemButton.addEventListener('click', addListField);
            break;
    }
    // Update the form
    console.log(htmlElementData_Array);
    console.log(introElementArray);
    // if (e.target.dataset.btn)
    switch(e.target.dataset.btn) {
        case "btn--intro-add-input":
            formIntroAddInputContainer.appendChild(pageIntroInput);
            break;
        case "btn--add-objective":
            formAddObjectiveContainer.appendChild(pageIntroInput);
    }
    
}

function addIntroInputSpecial(container, message, data) {
    // Create the title
    const  pageIntroInput_Title = document.createElement('p');
    pageIntroInput_Title.classList.add('html-gen-instruction');
    pageIntroInput_Title.innerText = message;
    // Create the input field
    const  pageIntroInput_Field = document.createElement('input');
    pageIntroInput_Field.setAttribute('data-input', data);
    pageIntroInput_Field.type = "text";
    pageIntroInput_Field.classList.add('html-gen-input');
     // Update the html container
    container.appendChild(pageIntroInput_Title);
    container.appendChild(pageIntroInput_Field);
}

/*====== Add Section Button (btnSectionAddInput) ======*/
function addSectionInput(e) {
    e.preventDefault();
    addSectionInput_Form();

    /* let myParentObject = [];
    testOnObjects(myParentObject);
    testOnObjects(myParentObject);
    testOnObjects(myParentObject);
    console.log(myParentObject);

    let myParentObject_2 = [];
    testOnObjects(myParentObject_2);
    testOnObjects(myParentObject_2);
    console.log(myParentObject_2);

    sectionElementArray.push(myParentObject);
    sectionElementArray.push(myParentObject_2);
    console.log(sectionElementArray);

    sectionElementArray.forEach(item => {
        console.log("hi");
    });
    console.log(sectionElementArray[0]);
 */


}

// function testOnObjects(myParentObject) {
    
//     // let myChildObject = {};
//     // myChildObject = updateSectionElementArray("p", "0001", "", "", myChildObject, myParentObject);
//     // console.log(myChildObject);

//     // myParentObject.push(myChildObject);
//     // console.log(myParentObject);

//     // sectionElementArray.push(myParentObject);
//     // console.log(sectionElementArray);
//     // console.log(sectionElementArray[0][0]);

    
//     const myObject = updateSectionElementArray("p", "0001", "", "", "", "");
//     console.log(myObject);
//     return myParentObject.push(myObject);
// }

// function updateSectionElementArray(type, id, id_2, itemList, childArray, parentArray) {
//     let childObject = {};
//     childObject.type = type;
//     childObject.id = id;
//     if(id_2 !== "") {
//         childObject.id_2 = id_2;
//     }
//     if(itemList !== "") {
//         childObject.array = itemList;
//     }
//     console.log(childObject);
//     return childObject;
//     const parentArrayUpdated = parentArray.push(childArray);
//     return parentArrayUpdated;
//     console.log(parentArray);
// }

// function testOnObjects() {
//     let myParentObject = [];
//     let myChildObject = {};
//     myChildObject = updateSectionElementArray("p", "0001", "", "", myChildObject, myParentObject);
//     console.log(myChildObject);

//     myParentObject.push(myChildObject);
//     console.log(myParentObject);

//     sectionElementArray.push(myParentObject);
//     console.log(sectionElementArray);
//     console.log(sectionElementArray[0][0]);
// }

// function updateSectionElementArray(type, id, id_2, itemList, childArray, parentArray) {
//     // let htmlElementObject = {};
//     childArray.type = type;
//     childArray.id = id;
//     if(id_2 !== "") {
//         childArray.id_2 = id_2;
//     }
//     if(itemList !== "") {
//         childArray.array = itemList;
//     }
//     console.log(childArray);
//     return childArray;
//     const parentArrayUpdated = parentArray.push(childArray);
//     return parentArrayUpdated;
//     console.log(parentArray);
// }

/*====== CHAPTER: CREATE INPUT FORM - Create the new sectionInputForm ======*/
function addSectionInput_Form() {
    /*====== Variables ======*/
    let pageSectionInput_placeholder;
    let pageSectionInput_placeholderSelect;
    let pageSectionInput_placeholderSelect_div;
    let pageSectionInput_placeholderSelect_div_2;
    let htmlElementData;
    let htmlElementData_2;
    let htmlElementData_submitBtn;
    let htmlElementMessage;
    let htmlElementList_container = [];
    let htmlElementChapter_Object = {};
    // Subsections
    let pageSectionInput_subsection_placeholder;
    let pageSectionInput_subChapterNr = 1;

    /*====== Create the container "html-gen-box" ======*/
    const  pageSectionInput = document.createElement('div');
    pageSectionInput.classList.add('html-gen-box');

        /*====== (1) Create a div container ======*/
        const pageSectionInput_titleDiv = addSectionInput_Form_Elements('div', 'd-flex', 'jc-space', pageSectionInput, '', '', '', '');
            // Create a title inside the div container 
            addSectionInput_Form_Elements('h3', 'html-gen-subtitle', '', pageSectionInput_titleDiv, `Capítulo ${pageSectionInput_chapterNr}`, '', '', '');
            pageSectionInput_chapterNr++;
            // Create a button inside the div container
            const pageSectionInput_toggleBtn = addSectionInput_Form_Elements('button', 'html-gen-btn', 'btn-general-toggle', pageSectionInput_titleDiv, '<i class="fas fa-edit"></i>', '', '', '');
            pageSectionInput_toggleBtn.addEventListener('click', () => {
                pageSectionInput_form.classList.toggle('hidden-html-gen');
                pageSectionInput_subsectionContainer.classList.toggle('hidden-html-gen');
            });

        /*====== (2) Create the container "form" ======*/
        const pageSectionInput_form = addSectionInput_Form_Elements('form', 'html-gen-form', 'hidden-html-gen', pageSectionInput, '', '', '', '');
            // Create the input [title] field
            pageSectionInput_placeholder = addSectionInput_Form_Elements('div', '', '', pageSectionInput_form, '', '', '', '');
                addSectionInput_Form_Elements('p', 'html-gen-instruction', '', pageSectionInput_placeholder, 'Elige un título para el capítulo:', '', '', '');
                htmlElementData = Math.random();
                addSectionInput_Form_Elements('input', 'html-gen-input', '', pageSectionInput_placeholder, '', 'data-input', htmlElementData, 'text');
                updateSectionElement_childContainer('h2', htmlElementData, '', htmlElementList_container, '')
            // Create the input [section number] field
            pageSectionInput_placeholder = addSectionInput_Form_Elements('div', '', '', pageSectionInput_form, '', '', '', '');
            addSectionInput_Form_Elements('p', 'html-gen-instruction', '', pageSectionInput_placeholder, 'Número del capítulo (1, 2, 3 etc.):', '', '', '');
            htmlElementData = Math.random();
            addSectionInput_Form_Elements('input', 'html-gen-input', '', pageSectionInput_placeholder, '(ej. 1)', 'data-input', htmlElementData, 'text');
            updateSectionElement_childContainer('chapter-nr', htmlElementData, '', htmlElementList_container, '')
            // Create the input [has video] select option
            pageSectionInput_placeholder = addSectionInput_Form_Elements('div', 'form__selection', 'd-flex', pageSectionInput_form, '', '', '', '');
            addSectionInput_Form_Elements('p', 'html-gen-instruction', '', pageSectionInput_placeholder, 'El capítulo tiene vídeo:', '', '', '');
            htmlElementData = Math.random();
            pageSectionInput_placeholderSelect = addSectionInput_Form_Elements('select', 'select-box', 'select-box--small', pageSectionInput_placeholder, '', 'data-input', htmlElementData, '');
            updateSectionElement_childContainer('has-video', htmlElementData, '', htmlElementList_container, '') 
                addSectionInput_Form_Elements('option', 'select-box__option', '', pageSectionInput_placeholderSelect, 'Sí', '', '', 'yes');
                addSectionInput_Form_Elements('option', 'select-box__option', '', pageSectionInput_placeholderSelect, 'No', '', '', 'no');
                // Create the input [video number] field
                pageSectionInput_placeholder = addSectionInput_Form_Elements('div', '', '', pageSectionInput_form, '', '', '', '');
                addSectionInput_Form_Elements('p', 'html-gen-instruction', '', pageSectionInput_placeholder, 'Número del vídeo (01, 02, 03 etc.):', '', '', '');
                htmlElementData = Math.random();
                addSectionInput_Form_Elements('input', 'html-gen-input', '', pageSectionInput_placeholder, '(ej. 01)', 'data-input', htmlElementData, 'text');
                updateSectionElement_childContainer('video-nr', htmlElementData, '', htmlElementList_container, '') 
                // Create the input [video url] field
                pageSectionInput_placeholder = addSectionInput_Form_Elements('div', '', '', pageSectionInput_form, '', '', '', '');
                addSectionInput_Form_Elements('p', 'html-gen-instruction', '', pageSectionInput_placeholder, 'La url del vídeo es:', '', '', '');
                htmlElementData = Math.random();
                addSectionInput_Form_Elements('input', 'html-gen-input', '', pageSectionInput_placeholder, '', 'data-input', htmlElementData, 'text');
                updateSectionElement_childContainer('video-url', htmlElementData, '', htmlElementList_container, '')
            // Create the input [add text] select option
            pageSectionInput_placeholder = addSectionInput_Form_Elements('div', 'form__selection', 'form__selection--add-elements', pageSectionInput_form, '', '', '', 'd-flex');
            addSectionInput_Form_Elements('p', 'html-gen-instruction', '', pageSectionInput_placeholder, 'Agrega elemento:', '', '');
            htmlElementData = Math.random();
            pageSectionInput_placeholderSelect = addSectionInput_Form_Elements('select', 'select-box', 'select-box--small', pageSectionInput_placeholder, '', 'data-input', htmlElementData, '');
                addSectionInput_Form_Elements('option', 'select-box__option', '', pageSectionInput_placeholderSelect, 'p (Texto)', '', '', 'p');
                addSectionInput_Form_Elements('option', 'select-box__option', '', pageSectionInput_placeholderSelect, 'Observa:', '', '', 'observa');
                addSectionInput_Form_Elements('option', 'select-box__option', '', pageSectionInput_placeholderSelect, 'img (Imagen)', '', '', 'img');
                addSectionInput_Form_Elements('option', 'select-box__option', '', pageSectionInput_placeholderSelect, 'ul (Lista)', '', '', 'ul');
                addSectionInput_Form_Elements('option', 'select-box__option', '', pageSectionInput_placeholderSelect, 'Learnbox (Regla)', '', '', 'learnbox');
                addSectionInput_Form_Elements('option', 'select-box__option', '', pageSectionInput_placeholderSelect, 'Quote (Tip)', '', '', 'quote');
            addSectionInput_Form_Elements('button', 'html-gen-btn', 'btn-add-element', pageSectionInput_placeholder, '<i class="fas fa-plus-circle"></i>', '', '', '').addEventListener('click', (e) => {
                e.preventDefault();
                switch(pageSectionInput_placeholderSelect.value) {
            

            // case "ul":
            //     // htmlElement = "p";
            //     htmlElementMessage = "Si la lista tiene un título, escríbalo aquí:";
            //     htmlElementData = Math.random();
            //     htmlElementMessage_2 = "Agrega un punto de la lista:";
            //     htmlElementData_2 = Math.random();
            //     /*=== Saving our changes into an array ===*/
            //     updateIntroElementArray("ul", htmlElementData, "", htmlElementData_Array)
            //     // htmlElementClass = "main-text";
            //     break;

                    case "p":
                        pageSectionInput_placeholderSelect_div = addSectionInput_Form_Elements('div', '', '', pageSectionInput_form, '', '', '', '');
                        addSectionInput_Form_Elements('p', 'html-gen-instruction', '', pageSectionInput_placeholderSelect_div, 'Escribe el parágrafo:', '', '', '');
                        htmlElementData = Math.random();
                        addSectionInput_Form_Elements('input', 'html-gen-input', '', pageSectionInput_placeholderSelect_div, '', 'data-input', htmlElementData, 'text');
                        // Upload element to array:
                        updateSectionElement_childContainer('p', htmlElementData, '', htmlElementList_container, '')
                        break;
                    case "observa":
                        pageSectionInput_placeholderSelect_div = addSectionInput_Form_Elements('div', '', '', pageSectionInput_form, '', '', '', '');
                        addSectionInput_Form_Elements('p', 'html-gen-instruction', '', pageSectionInput_placeholderSelect_div, 'Escribe qué vas a observar:', '', '', '');
                        htmlElementData = Math.random();
                        addSectionInput_Form_Elements('input', 'html-gen-input', '', pageSectionInput_placeholderSelect_div, '(ej. "Observa:", "Ejemplo:" etc.)', 'data-input', htmlElementData, 'text');
                        // Upload element to array:
                        updateSectionElement_childContainer('observa', htmlElementData, '', htmlElementList_container, '')
                        break;
                    case "img":
                        pageSectionInput_placeholderSelect_div = addSectionInput_Form_Elements('div', '', '', pageSectionInput_form, '', '', '', '');
                        addSectionInput_Form_Elements('p', 'html-gen-instruction', '', pageSectionInput_placeholderSelect_div, 'La url de la imagen es:', '', '', '');
                        htmlElementData = Math.random();
                        addSectionInput_Form_Elements('input', 'html-gen-input', '', pageSectionInput_placeholderSelect_div, '(Nota: Esta url sirve solo para la prevista.)', 'data-input', htmlElementData, 'text');
                        addSectionInput_Form_Elements('p', 'html-gen-instruction', '', pageSectionInput_placeholderSelect_div, 'Describe la imagen:', '', '', '');
                        htmlElementData_2 = Math.random();
                        addSectionInput_Form_Elements('input', 'html-gen-input', '', pageSectionInput_placeholderSelect_div, '', 'data-input', htmlElementData_2, 'text');
                        // Upload element to array:
                        updateSectionElement_childContainer('img', htmlElementData, htmlElementData_2, htmlElementList_container, '')
                        break;
                    case "ul":
                        // <div class="form__selection form__selection--add-list-items d-flex">
                        //     <p class="html-gen-instruction">Agrega subsección:</p>
                        //     <button data-btn="btn--add-objective" class="html-gen-btn btn-add-element"><i class="fas fa-plus-circle"></i></button>
                        // </div>
                        pageSectionInput_placeholderSelect_div = addSectionInput_Form_Elements('div', '', '', pageSectionInput_form, '', '', '', '');
                        addSectionInput_Form_Elements('p', 'html-gen-instruction', '', pageSectionInput_placeholderSelect_div, 'Si la lista tiene un título, escríbalo aquí:', '', '', '');
                        htmlElementData = Math.random();
                        addSectionInput_Form_Elements('input', 'html-gen-input', '', pageSectionInput_placeholderSelect_div, '', 'data-input', htmlElementData,'text');
                        pageSectionInput_placeholderSelect_div = addSectionInput_Form_Elements('div', 'form__selection', 'form__selection--add-list-items', pageSectionInput_form, '', '', '', 'd-flex');
                        // let testElement = document.querySelector(`[data-form="${testId}"]`);
                        // console.log(testElement);
                        // pageSectionInput_placeholderSelect_div.setAttribute('data-form', testId);
                        addSectionInput_Form_Elements('p', 'html-gen-instruction', '', pageSectionInput_placeholderSelect_div, 'Agrega un punto de la lista:', '', '', '');
                        addSectionInput_Form_Elements('button', 'html-gen-btn', 'btn-add-element', pageSectionInput_placeholderSelect_div, '<i class="fas fa-plus-circle"></i>', 'data-btn', '').addEventListener('click', (e) => {
                            e.preventDefault();
                            // const newTest = addSectionInput_Form_Elements('div', '', '', pageSectionInput_form, '', '', '');
                            // let testId = Math.random();
                            // newTest.setAttribute('data-form', testId);

                            pageSectionInput_placeholderSelect_div_2 = addSectionInput_Form_Elements('div', '', '', pageSectionInput_form, '', '', '', '');
                            addSectionInput_Form_Elements('p', 'html-gen-instruction', '', pageSectionInput_placeholderSelect_div_2, 'Escribe el punto:', '', '', '');
                            htmlElementData = Math.random();
                            addSectionInput_Form_Elements('input', 'html-gen-input', '', pageSectionInput_placeholderSelect_div_2, '', 'data-input', htmlElementData, 'text');
                        });
                        
                        break;
                    case "learnbox":
                        pageSectionInput_placeholderSelect_div = addSectionInput_Form_Elements('div', '', '', pageSectionInput_form, '', '', '', '');
                        // addSectionInput_Form_Elements('p', 'html-gen-instruction', '', pageSectionInput_placeholderSelect_div, 'El learnbox tiene el título:', '', '', '');
                        // htmlElementData = Math.random();
                        // addSectionInput_Form_Elements('input', 'html-gen-input', '', pageSectionInput_placeholderSelect_div, '(ej. "Regla", "Definición" etc.)', 'data-input', htmlElementData, 'text');
                
                        addSectionInput_Form_Elements('p', 'html-gen-instruction', '', pageSectionInput_placeholderSelect_div, 'La regla es:', '', '', '');
                        htmlElementData = Math.random();
                        addSectionInput_Form_Elements('input', 'html-gen-input', '', pageSectionInput_placeholderSelect_div, '', 'data-input', htmlElementData, 'text');
                        // Upload element to array:
                        updateSectionElement_childContainer('learnbox', htmlElementData, '', htmlElementList_container, '')
                        break;
                    case "quote":
                        pageSectionInput_placeholderSelect_div = addSectionInput_Form_Elements('div', '', '', pageSectionInput_form, '', '', '', '');
                        addSectionInput_Form_Elements('p', 'html-gen-instruction', '', pageSectionInput_placeholderSelect_div, 'El tip es:', '', '', '');
                        htmlElementData = Math.random();
                        addSectionInput_Form_Elements('input', 'html-gen-input', '', pageSectionInput_placeholderSelect_div, '', 'data-input', htmlElementData, 'text');
                        updateSectionElement_childContainer('quote', htmlElementData, '', htmlElementList_container, '')
                        break;
                }
            });
        /*====== (3) Create the container "form" ======*/
        const pageSectionInput_subsectionContainer = addSectionInput_Form_Elements('div', 'hidden-html-gen', '', pageSectionInput, '', '', '', '');
            pageSectionInput_subsection_placeholder = addSectionInput_Form_Elements('div', 'd-flex', 'jc-start', pageSectionInput_subsectionContainer, '', '', '', '');
                addSectionInput_Form_Elements('h3', 'html-gen-subtitle', 'html-gen-subtitle--more', pageSectionInput_subsection_placeholder, `Subcapítulos`, '', '', '');
                addSectionInput_Form_Elements('button', 'html-gen-btn', 'html-gen-btn-inside', pageSectionInput_subsection_placeholder, `<i class="fas fa-pen"></i>`, '', '', '');
            
            pageSectionInput_subsection_placeholder = addSectionInput_Form_Elements('div', 'form__selection', 'form__selection--add-list-items', pageSectionInput_subsectionContainer, '', '', '', 'd-flex');
                addSectionInput_Form_Elements('p', 'html-gen-instruction', '', pageSectionInput_subsection_placeholder, `Agrega subsección:`, '', '', '');
                addSectionInput_Form_Elements('button', 'html-gen-btn', 'btn-add-element', pageSectionInput_subsection_placeholder, `<i class="fas fa-plus-circle"></i>`, '', '', '').addEventListener('click', () => {
                    const pageSectionInput_subsection_form = addSectionInput_Form_Elements('div', '', '', pageSectionInput_subsectionContainer, '', '', '', '');
                    addSectionInput_Form_Elements('h3', 'html-gen-subtitle', 'html-gen-subtitle--more', pageSectionInput_subsection_form, `Subcapítulo ${pageSectionInput_subChapterNr}`, '', '', '');
                    pageSectionInput_subChapterNr++;
                });
            


        /*====== (4) Create the container "button" ======*/
        const myArray = "45";
        const  pageSectionInput_btnDiv = addSectionInput_Form_Elements('div', 'html-gen-btn-container', 'd-flex', pageSectionInput, '', '', '', 'jc-center');
            // Create the submit button
            htmlElementData_submitBtn = Math.random();
            addSectionInput_Form_Elements('button', 'html-gen-btn', 'btn-submit-general', pageSectionInput_btnDiv, 'Agrega capítulo', 'data-btn', htmlElementData_submitBtn,  '').addEventListener('click', createDocumentSection);

    /*====== Upload the container to the placeholder in the html file ======*/
    formAddSectionsContainer.appendChild(pageSectionInput);

    htmlElementChapter_Object.id = htmlElementData_submitBtn;
    htmlElementChapter_Object.array = htmlElementList_container;
    sectionElementArray.push(htmlElementChapter_Object);
    console.log(htmlElementChapter_Object.id);
    console.log(htmlElementChapter_Object.array);
    console.log(htmlElementChapter_Object);
    console.log(sectionElementArray);



    // console.log(htmlElementList_container[0].id);
    // const htmlElementList_containerValue = document.querySelector(`[data-input="${htmlElementList_container[0].id}"]`);
    // console.log(htmlElementList_containerValue.value);
}

/*====== CHAPTER: UPDATE ARRAY DOCUMENT - Create the preview document ======*/
function updateSectionElement_childContainer(type, id, id_2, parentArray, itemList) {
    let htmlElementObject = {};
    htmlElementObject.type = type;
    htmlElementObject.id = id;
    if(id_2 !== "") {
        htmlElementObject.id_2 = id_2;
    }
    if(itemList !== "") {
        htmlElementObject.array = itemList;
    }
    parentArray.push(htmlElementObject);
    return parentArray;
}


/*====== CHAPTER: PREVIEW DOCUMENT - Create the preview document ======*/
function createDocumentSection(e) {
    /*====== (1) Select the target button ======*/
    // Iterate through the array
    for(let i=0; i<sectionElementArray.length; i++) {
        // Select only the childArray that belongs to the button clicked
        if(sectionElementArray[i].id === Number(e.target.dataset.btn)) {
            // Create a new section [Remember: createSection (className_1, className_2, commentTitle)]
            // To number it we save the index of our selected array
            const internalChapterIndex = (sectionElementArray.indexOf(sectionElementArray[i]) + 1);
            console.log(internalChapterIndex);
            const  pageSection = createSection('chapter', 'chapter-new', `Chapter 0${internalChapterIndex}`);
            // Save the corresponding ElementList in a new variable
            const sectionElementList = sectionElementArray[i].array;
            // Create the video button
            createSectionVideoBtn(sectionElementList, pageSection);
            // Check this variable against the possible cases
            sectionElementList.forEach(item => {
                let inputfield;
                switch(item.type) {
                    case "p":
                        inputField = document.querySelector(`[data-input="${item.id}"]`);
                        createSingleElement('p', 'main-text', inputField);
                        break;
                    case "img":
                        inputField = document.querySelector(`[data-input="${item.id}"]`);
                        inputField_Alt = document.querySelector(`[data-input="${item.id_2}"]`);
                        createImage(inputField, 'img-diagram', inputField_Alt);
                        break;
                    // case "ul":
                    //     inputField = document.querySelector(`[data-input="${item.id}"]`);
                    //     createSingleElement('ul', 'main-list', inputField, item.array);
                    //     console.log(item.id);
                    //     console.log(item.array);
                    //     break;
                    case "learnbox":
                        inputField = document.querySelector(`[data-input="${item.id}"]`);
                        createSingleElement('div', 'chapter-box', inputField);
                        break;
                    case "observa":
                        inputField = document.querySelector(`[data-input="${item.id}"]`);
                        createSingleElement('p', 'example', inputField);
                        break;
                    }
                    
            })
            // Create the html closing
            createSectionHtmlEnd();
        }
    }
}

/*====== CHAPTER: VIDEO BUTTON - Create the title / video buttons ======*/
function createSectionVideoBtn(item, parent) {
    // <!--=======Title & Video Button=======-->
    // <div class="flex-video">
    //     <div class="flex-video-title">
    //         <h2 class="section-title"><span class="chapter__number">(1)</span>¿Cómo calcular la fracción de un número?</h2>
    //     </div>
    //     <div class="flex-video-btn">
    //         <a class="test-button shadow-btn" href="https://www.youtube.com/watch?v=ae6nualyank" target="_blank">Vídeo 02</a>
    //     </div>
    // </div> <!--=======/Title & Video Button=======-->
    console.log(item);
    console.log(item.type);
    const index = item.findIndex(x => x.type === "h2");
    console.log(item[index].id);

    // Create the div container
    const createSectionVideoBtn_divContainer = addSectionInput_Form_Elements('div', 'flex-video', '', '', '', '', '', '')
    for(let i=0; i<item.length; i++) {
        switch(item[i].type) {
            case "h2":
                // Get the chapter number
                const createSectionVideoBtn_chapterNrIndex = item.findIndex(x => x.type === "chapter-nr");
                const createSectionVideoBtn_chapterNrId = document.querySelector(`[data-input="${item[createSectionVideoBtn_chapterNrIndex].id}"]`)
                const createSectionVideoBtn_chapterNr = createSectionVideoBtn_chapterNrId.value;
                // Create the title container
                const createSectionVideoBtn_div_title = addSectionInput_Form_Elements('div', 'flex-video-title', '', createSectionVideoBtn_divContainer, '', '', '', '');
                const createSectionVideoBtn_div_titleMessage = document.querySelector(`[data-input="${item[i].id}"]`).value;
                addSectionInput_Form_Elements('h2', 'section-title', '', createSectionVideoBtn_div_title, createSectionVideoBtn_div_titleMessage, '', '', `<span class="chapter__number">(${createSectionVideoBtn_chapterNr})</span>`);
                // UPLOAD HTML COMMENTS - this uploads the title part:
                createSectionComments('div','flex-video','','','1','newLine','','Title & Video Button', '');
                createSectionComments('div','flex-video-title','','','2','newLine','','', '');
                createSectionComments('h2','section-title','', '','3','','','', '');
                createSectionComments('span','chapter__number','', `(${createSectionVideoBtn_chapterNr})`,'','','','', 'closing');
                createSectionComments('h2','','', createSectionVideoBtn_div_titleMessage,'','newLine','','', 'only');
                createSectionComments('div','','', '','2','newLine','','', 'only');
                // This is the selector for the value:
                // console.log(document.querySelector(`[data-input="${item[i].id}"]`).value);
                break;
            // case "video-url":
            //     createSectionVideoBtn_div_videoUrl = document.querySelector(`[data-input="${item[i].id}"]`).value;
            //     console.log(createSectionVideoBtn_div_videoUrl);
            case "has-video":
                const createSectionVideoBtn_div_hasVideo = document.querySelector(`[data-input="${item[i].id}"]`).value;
                if (createSectionVideoBtn_div_hasVideo === "yes") {
                    const createSectionVideoBtn_div_title = addSectionInput_Form_Elements('div', 'flex-video-btn', '', createSectionVideoBtn_divContainer, '', '', '', '');
                    for(let i=0; i<item.length; i++) {
                        // if(item[i].type === "video-nr") {
                        //     createSectionVideoBtn_videoNr = document.querySelector(`[data-input="${item[i].id}"]`).value;
                        // }
                        // const createSectionVideoBtn_videoNrId = item.findIndex(x => x.type === "video-nr");
                        const createSectionVideoBtn_videoNrIndex = item.findIndex(x => x.type === "video-nr");
                        const createSectionVideoBtn_videoNrId = document.querySelector(`[data-input="${item[createSectionVideoBtn_videoNrIndex].id}"]`)
                        const createSectionVideoBtn_videoNr = createSectionVideoBtn_videoNrId.value;
                    
                        if(item[i].type === "video-url") {
                            const createSectionVideoBtn_videoUrl = document.querySelector(`[data-input="${item[i].id}"]`).value;
                            addSectionInput_Form_Elements('a', 'test-button', 'shadow-btn', createSectionVideoBtn_div_title, `Vídeo ${createSectionVideoBtn_videoNr}`, '', '', '', createSectionVideoBtn_videoUrl);
                            // UPLOAD HTML COMMENTS - this uploads the button part:
                            createSectionComments('div','flex-video-btn','','','2','newLine','','', '');
                            createSectionComments('a','test-button','shadow-btn', `Vídeo ${createSectionVideoBtn_videoNr}`,'3','newLine', createSectionVideoBtn_videoUrl,'', 'closing');
                            createSectionComments('div','','', '','2','newLine','','', 'only');
                            createSectionComments('div','','', '','1','newLine','','', 'only');
                        }
                    }
                    
                }
                
            }
    }
    

    // Upload the div container
    parent.appendChild(createSectionVideoBtn_divContainer);
}

/*====== CHAPTER: COMMENTS ======*/
// ***CLOSING*** can have the states: (1) ""    /    (2) "yes", "closing" etc.  /    (3) "only"
function createSectionComments(tagName, className_1, className_2, message, space, newLine, link_attribute, title, closing) {
    let htmlElementComment;
    let htmlElement;
    const htmlElement_tagEnd = document.createTextNode(`>`);

    let commentSpace;
    switch (space) {
        case "": 
            commentSpace = ""; 
            break;
        case "1": 
            commentSpace = "    "; 
            break;
        case "2": 
            commentSpace = "        "; 
            break;
        case "3": 
            commentSpace = "            "; 
            break;
    }
    console.log(commentSpace);

    if(title !== "") {
        htmlElementComment = document.createTextNode(`${commentSpace}<!--=======${title}=======-->\r`);
        outputHtml.appendChild(htmlElementComment);
    }
    if(className_1 !== "" && closing !== "only") {
        if(className_2 !== "") {
            htmlElement = document.createTextNode(`${commentSpace}<${tagName} class="${className_1} ${className_2}"`);
        } else {
            htmlElement = document.createTextNode(`${commentSpace}<${tagName} class="${className_1}"`);
        }
        outputHtml.appendChild(htmlElement);
    }
    if(tagName === "a") {
        if(link_attribute !== "") {
            htmlElement = document.createTextNode(` href="${link_attribute}" target="_blank"`);
        } else {
            htmlElement = document.createTextNode(` href="#" target="_blank"`);
        }
        outputHtml.appendChild(htmlElement);
    }
    if (closing !== "only") {
        outputHtml.appendChild(htmlElement_tagEnd);
    }
    if(message !== "") {
        htmlElement = document.createTextNode(`${message}`);
        outputHtml.appendChild(htmlElement);
    }
    if(closing !== "") {
        if(closing === "only") {
            htmlElement = document.createTextNode(`${commentSpace}</${tagName}>`);
            outputHtml.appendChild(htmlElement);
        } else {
            htmlElement = document.createTextNode(`</${tagName}>`);
            outputHtml.appendChild(htmlElement);
        }
    }
    if(newLine !== "") {
        htmlElement = document.createTextNode(`\r`);
        outputHtml.appendChild(htmlElement);
    }
}


// if(comment !== "") {
//     let commentSpace;
//     switch (comment) {
//         case "1": commentSpace === "    "; break;
//         case "2": commentSpace === "        "; break;
//         case "3": commentSpace === "            "; break;
//     }
//     // <div class="flex-video">
//     console.log(commentSpace);
//     const htmlElement = document.createTextNode(`${commentSpace}<${tagName} class="${className_1} ${className_2}"><b>Tip: </b>${inputField.value}</${tagName}>\r`);

    /*=== HTML Output ===*/
    // const test0 = document.createTextNode(`<!--Here comes the text--> \r`);
    // let htmlElementComment;
    // let htmlElement;
    // let htmlElementExtra;
    // let htmlElementClosing;
    // switch(className) {
    //     case "main-text-quote":
    //         htmlElementComment = document.createTextNode(`    <!--=======Quote=======-->\r`);
    //         htmlElement = document.createTextNode(`    <${tagName} class="${className}"><b>Tip: </b>${inputField.value}</${tagName}>\r`);
    //         outputHtml.appendChild(htmlElementComment);
    //         outputHtml.appendChild(htmlElement);
    //         break;


/*====== CHAPTER: CREATE FORM INPUT ELEMENTS - Create inputElements for sectionInputForm ======*/
function addSectionInput_Form_Elements(tagName, className_1, className_2, parent, message, dataAttribute, htmlElementData, type, link, comment) {
    const  pageSectionInput_Form_Element = document.createElement(tagName);
    if(tagName === "input" && message !== "") {
        pageSectionInput_Form_Element.placeholder = message;
    };
    if(tagName === "option" && type !== "") {
        pageSectionInput_Form_Element.value = type;
    };
    if(className_1 !== "") {
        pageSectionInput_Form_Element.classList.add(className_1);
    };
    if(className_2 !== "") {
        pageSectionInput_Form_Element.classList.add(className_2);
    };
    if(tagName === "div" && type !== "") {
        pageSectionInput_Form_Element.classList.add(type);
    };
    if((message !== "" && tagName !== "button") || (message !== "" && tagName !== "h2")) {
        pageSectionInput_Form_Element.innerText = message;
    };
    if(message !== "" && tagName === "button" ) {
        pageSectionInput_Form_Element.innerHTML = message;
    };
    if(tagName === "h2" && type !== "") {
        pageSectionInput_Form_Element.innerHTML = `${type} ${message}`;
    };
    if(dataAttribute !== "") {
        pageSectionInput_Form_Element.setAttribute(dataAttribute, htmlElementData);
    };
    if(type !== "") {
        pageSectionInput_Form_Element.type = type;
    };
    if(link !== "") {
        pageSectionInput_Form_Element.href = `${link}`;
        if(tagName === "a") {
            pageSectionInput_Form_Element.target = `_blank`;
        }
    };
    if(parent === "") {
        return pageSectionInput_Form_Element;
    } else {
        return parent.appendChild(pageSectionInput_Form_Element);
    }
}

// function sectionInput_addElements(e) {
//     e.preventDefault();
//     console.log("new element");
// }

function addButtonField(container, message, data, listItem) {
    // <!--====== ADD TEXT ======-->
    // <div class="form__selection form__selection--add-elements d-flex">
    //     <p class="html-gen-instruction">Agrega elemento:</p>
    //     <button data-btn="btn--intro-add-input" class="html-gen-btn btn-add-element"><i class="fas fa-plus-circle"></i></button>
    // </div>
    // Create an html container
    console.log(listItem);
    const  pageIntroInput_Div = document.createElement('div');
    pageIntroInput_Div.classList.add("form__selection", "form__selection--add-list-items", "d-flex");
    // Create the title
    const  pageIntroInput_Title = document.createElement('p');
    pageIntroInput_Title.classList.add('html-gen-instruction');
    pageIntroInput_Title.innerText = message;
    // Create the button
    const  pageIntroInput_Btn = document.createElement('button');
    pageIntroInput_Btn.classList.add('html-gen-btn', 'btn-add-element');
    pageIntroInput_Btn.setAttribute('data-btn', data);
    pageIntroInput_Btn.addEventListener('click', test)
    function test(e) {
        e.preventDefault();
        console.log("I'm a list item");
        
        const listItemId = Math.random();
        listItem.push(listItemId);
        console.log(listItem);
        console.log(introElementArray);
        addIntroInputSpecial(container, message, listItemId);
    };
    // Create the icon
    const  pageIntroInput_Btn_Icon = document.createElement('i');
    pageIntroInput_Btn_Icon.classList.add('fas', 'fa-plus-circle');
    // Update the button
    pageIntroInput_Btn.appendChild(pageIntroInput_Btn_Icon);
    // Create the input field
    // const  pageIntroInput_Field = document.createElement('input');
    // pageIntroInput_Field.setAttribute('data-input', htmlElementData);
    // pageIntroInput_Field.type = "text";
    // pageIntroInput_Field.classList.add('html-gen-input');
    // Update the html container
    pageIntroInput_Div.appendChild(pageIntroInput_Title);
    pageIntroInput_Div.appendChild(pageIntroInput_Btn);
    // Update the form
    container.appendChild(pageIntroInput_Div);
}

// function addListField(e) {
//     e.preventDefault();
//     console.log("I'm a list item");
//     console.log(listItem);
// }

function updateIntroElementArray(type, id, id_2, itemList) {
    let htmlElementObject = {};
    htmlElementObject.type = type;
    htmlElementObject.id = id;
    if(id_2 !== "") {
        htmlElementObject.id_2 = id_2;
    }
    if(itemList !== "") {
        htmlElementObject.array = itemList;
    }
    introElementArray.push(htmlElementObject);
    console.log(introElementArray);
}

// function createIntro(pageSection) {
//     console.log("Intro created");
// }

/*==================
FUNCTIONS CREATE HTML
==================*/

/*====== CHAPTER: CREATE A SECTION - This function serves to create any section of the document ======*/
function createSection(className_1, className_2, commentTitle){
    pageSection = document.createElement('section');
    pageSection.classList.add(className_1);
    if(className_2 !== "") {
        pageSection.classList.add(className_2);
    }
    htmlCode.appendChild(pageSection);

    /*=== HTML Output ===*/
    let htmlSection;
    const htmlSectionComment = document.createTextNode(`<!--=======${commentTitle}=======-->\r`);
    if(className_2 !== "") {
        htmlSection = document.createTextNode(`<section class="${className_1} ${className_2}">\r`);
    } else {
        htmlSection = document.createTextNode(`<section class="${className_1}">\r`);
    }
    outputHtml.appendChild(htmlSectionComment);
    outputHtml.appendChild(htmlSection);

    return pageSection;
}

function createSectionHtmlEnd() {
    const sectionHTML = document.createTextNode(`</section>\r\r`);
    outputHtml.appendChild(sectionHTML);
}

function createNivel(){
    const pageNivel = document.createElement('div');
    pageNivel.classList.add('chapter-level');
    pageNivel.innerText = `Nivel ${inputNivel.value}`;
    pageSection.appendChild(pageNivel);
    /*=== HTML Output ===*/
    let htmlElement;
    htmlElement = document.createTextNode(`    <div class="chapter-level">Nivel ${inputNivel.value}</div>\r`);
    outputHtml.appendChild(htmlElement);
}

function createSingleElement(tagName, className, inputField, array, parent, inputField_2){
    if(inputField.value === "") {
        return;
    } else {
        const pageElement = document.createElement(tagName);
        pageElement.classList.add(className);
        switch(className) {
            case "main-text-quote":
                const innerElement = "Tip: ";
                pageElement.innerHTML = `${innerElement.bold()} ${inputField.value}`;
                break;
            case "chapter-box":
                pageElement.classList.add("chapter-box--learn");
                // pageElement.innerText = inputField.value;
                // Create the icon <i>
                const innerElementIcon = document.createElement('i');
                innerElementIcon.classList.add("fas", "fa-user-astronaut", "chapter-box__icon", "chapter-box__icon--learn")
                // Create the icon <div> container
                const innerElementDiv = document.createElement('div');
                innerElementDiv.classList.add("chapter-box__text", "chapter-box__text--learn")
                // *********Add a title to our <div> container
                const innerElementDiv_Title = document.createElement('p');
                innerElementDiv_Title.classList.add("strong--box");
                innerElementDiv_Title.innerText = "Regla:";
                innerElementDiv.appendChild(innerElementDiv_Title);
                // *********Add the text to our <div> container
                const innerElementDiv_Text = document.createElement('p');
                innerElementDiv_Text.innerText = inputField.value;
                innerElementDiv.appendChild(innerElementDiv_Text);
                // Upload our pageElement
                pageElement.appendChild(innerElementIcon);
                pageElement.appendChild(innerElementDiv);
                break;
            case "main-list":
                console.log(array);
                // Create the <ul>
                pageElement.classList.add("main-text");
                pageElement.innerText = inputField.value;
                // Create the <li> for each list input field
                array.forEach( (item) => {
                    const pageListItem = document.createElement('li');
                    pageListItem.classList.add('list-dot');
                    let pageListItem_Input = document.querySelector(`[data-input="${item}"]`);
                    pageListItem.innerText = pageListItem_Input.value;
                    console.log(pageListItem_Input.value);
                    console.log(item);
                    pageElement.appendChild(pageListItem);
                })
                break;
                // // pageElement.innerText = inputField.value;
                // // Create the icon <i>
                // const innerElementIcon = document.createElement('i');
                // innerElementIcon.classList.add("fas", "fa-user-astronaut", "chapter-box__icon", "chapter-box__icon--learn")
                // // Create the icon <div> container
                // const innerElementDiv = document.createElement('div');
                // innerElementDiv.classList.add("chapter-box__text", "chapter-box__text--learn")
                // // *********Add a title to our <div> container
                // const innerElementDiv_Title = document.createElement('p');
                // innerElementDiv_Title.classList.add("strong--box");
                // innerElementDiv_Title.innerText = "Regla:";
                // innerElementDiv.appendChild(innerElementDiv_Title);
                // // *********Add the text to our <div> container
                // const innerElementDiv_Text = document.createElement('p');
                // innerElementDiv_Text.innerText = inputField.value;
                // innerElementDiv.appendChild(innerElementDiv_Text);
                // // Upload our pageElement
                // pageElement.appendChild(innerElementIcon);
                // pageElement.appendChild(innerElementDiv);
                // break;
            default:
                pageElement.innerText = inputField.value;
                break;
        }
        // pageElement.innerText = inputField.value;

        /*=== Update the Page Section ===*/
        switch(className) {
            case "goal-list-dot":
                parent.appendChild(pageElement);
                break;
            default:
                pageSection.appendChild(pageElement);
        }
        

        /*=== HTML Output ===*/
        // const test0 = document.createTextNode(`<!--Here comes the text--> \r`);
        let htmlElementComment;
        let htmlElement;
        let htmlElementExtra;
        let htmlElementClosing;
        switch(className) {
            case "main-text-quote":
                htmlElementComment = document.createTextNode(`    <!--=======Quote=======-->\r`);
                htmlElement = document.createTextNode(`    <${tagName} class="${className}"><b>Tip: </b>${inputField.value}</${tagName}>\r`);
                outputHtml.appendChild(htmlElementComment);
                outputHtml.appendChild(htmlElement);
                break;
            case "chapter-box":
                htmlElementComment = document.createTextNode(`    <!--=======LearnBox=======-->\r`);
                htmlElement = document.createTextNode(`    <${tagName} class="${className} chapter-box--learn">\r        <i class="fas fa-user-astronaut chapter-box__icon chapter-box__icon--learn"></i>\r        <div class="chapter-box__text chapter-box__text--learn">\r            <p class="strong--box">Regla:</p>\r            <p>${inputField.value}</p>\r        </div>\r    </div>\r`);
                outputHtml.appendChild(htmlElementComment);
                outputHtml.appendChild(htmlElement);
                break;
            case "main-list":
                htmlElementComment = document.createTextNode(`    <!--=======List=======-->\r`);
                htmlElement = document.createTextNode(`    <${tagName} class="${className} main-text">\r`);
                outputHtml.appendChild(htmlElementComment);
                outputHtml.appendChild(htmlElement);
                array.forEach( (item) => {
                    const htmlElementExtra_Value = document.querySelector(`[data-input="${item}"]`).value;
                    console.log(htmlElementExtra_Value);
                    htmlElementExtra = document.createTextNode(`        <li class="list-dot">${htmlElementExtra_Value}</li>\r`);
                    outputHtml.appendChild(htmlElementExtra);
                });
                htmlElementClosing = document.createTextNode(`    </${tagName}>\r`);
                outputHtml.appendChild(htmlElementClosing);
                break;
            case "goal-list-dot":
                break;
            default:
                htmlElement = document.createTextNode(`    <${tagName} class="${className}">${inputField.value}</${tagName}>\r`);
                outputHtml.appendChild(htmlElement);
                break;
        }
        // outputHtml.appendChild(htmlElement);
    }
}

function createHeroImage(inputField, inputAltTag){
    if(inputField.value === "") {
        return;
    } else {
    const pageElement = document.createElement('img');
    pageElement.src = inputField.value;    
    pageElement.alt = inputAltTag.value;
    pageSection.appendChild(pageElement);

    /*=== HTML Output ===*/
    const htmlSectionComment = document.createTextNode(`    <!--=======Hero Image=======-->\r`);
    const htmlImage = document.createTextNode(`    <img src="./../../img/${inputCourseNumber.value}/${inputImgFolder.value}/hero.${inputHeroImgFormat.value}" alt="${inputAltTag.value}">\r`);
    outputHtml.appendChild(htmlSectionComment);
    outputHtml.appendChild(htmlImage);
    }
}

function createImage(inputField, className, inputAltTag){
    if(inputField.value === "") {
        return;
    } else {
    const pageElement = document.createElement('img');
    pageElement.classList.add(className);
    pageElement.src = inputField.value;
    pageElement.alt = inputAltTag.value;
    pageSection.appendChild(pageElement);

    /*=== HTML Output ===*/
    const htmlImage = document.createTextNode(`    <img class="${className}" src="./../../img/${inputCourseNumber.value}/${inputImgFolder.value}/${inputImgName.value}-${imageCount}.${inputImgFormat.value}" alt="${inputAltTag.value}">\r`);
    outputHtml.appendChild(htmlImage);
    /*=== Set the image count ===*/
    imageCount++;
    }
}

/*==================
FUNCTIONS CREATE HTML (OLD)
==================*/


// function createTitle() {
//     const pageTitle = document.createElement('h1');
//     pageTitle.classList.add('chapter-title');
//     pageTitle.innerText = inputTitle.value;
//     htmlCode.appendChild(pageTitle);
// }

// function createSubtitle() {
//     const pageSubtitle = document.createElement('p');
//     pageSubtitle.classList.add('subtitle');
//     pageSubtitle.innerText = inputSubtitle.value;
//     htmlCode.appendChild(pageSubtitle);
// }