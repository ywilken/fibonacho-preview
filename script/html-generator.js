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
const formObjectives = document.querySelector('[data-form="form--objectives"]');

const formIntroAddInputContainer = document.querySelector('[data-form="form--intro-add-input"]');
const formAddObjectiveContainer = document.querySelector('[data-form="form--add-objective"]');
const formAddSectionsContainer = document.querySelector('[data-form="form--section-add-input"]');


/*=== Internal Arrays ===*/
let introElementArray = [];


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
    const  pageSection = createSection();
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
        pageElementVideoButton.innerText = `Vídeo 0${inputIntroVideo_Nr.value}`;
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
}

/*====== Create the new sectionInputForm ======*/
function addSectionInput_Form() {
    /*====== Variables ======*/
    let pageSectionInput_placeholder;
    let pageSectionInput_placeholderSelect;
    let pageSectionInput_placeholderSelect_div;
    let pageSectionInput_placeholderSelect_div_2;

    let pageSectionInput_placeholderSelect_text;
    let pageSectionInput_placeholderSelect_input;
    let pageSectionInput_placeholderSelect_text2;
    let pageSectionInput_placeholderSelect_input2;
    /*====== Create the container "html-gen-box" ======*/
    const  pageSectionInput = document.createElement('div');
    pageSectionInput.classList.add('html-gen-box');

        /*====== (1) Create a div container ======*/
        const pageSectionInput_titleDiv = addSectionInput_Form_Elements('div', 'd-flex', 'jc-space', pageSectionInput, '', '', '');
            // Create a title inside the div container 
            addSectionInput_Form_Elements('h3', 'html-gen-subtitle', '', pageSectionInput_titleDiv, `Sección #`, '', '');
            // Create a button inside the div container
            const pageSectionInput_toggleBtn = addSectionInput_Form_Elements('button', 'html-gen-btn', 'btn-general-toggle', pageSectionInput_titleDiv, '<i class="fas fa-edit"></i>', '', '');
            pageSectionInput_toggleBtn.addEventListener('click', () => pageSectionInput_form.classList.toggle('hidden-html-gen'));

        /*====== (2) Create the container "form" ======*/
        const pageSectionInput_form = addSectionInput_Form_Elements('form', 'html-gen-form', 'hidden-html-gen', pageSectionInput, '', '', '');
            // Create the input [title] field
            pageSectionInput_placeholder = addSectionInput_Form_Elements('div', '', '', pageSectionInput_form, '', '', '');
            addSectionInput_Form_Elements('p', 'html-gen-instruction', '', pageSectionInput_placeholder, 'Elige un título para la sección:', '', '');
            addSectionInput_Form_Elements('input', 'html-gen-input', '', pageSectionInput_placeholder, '', 'data-input', 'text');
            // Create the input [section number] field
            pageSectionInput_placeholder = addSectionInput_Form_Elements('div', '', '', pageSectionInput_form, '', '', '');
            addSectionInput_Form_Elements('p', 'html-gen-instruction', '', pageSectionInput_placeholder, 'Número de la sección (1, 2, 3 etc.):', '', '');
            addSectionInput_Form_Elements('input', 'html-gen-input', '', pageSectionInput_placeholder, '(ej. 1)', 'data-input', 'text');
            // Create the input [has video] select option
            pageSectionInput_placeholder = addSectionInput_Form_Elements('div', 'form__selection', 'd-flex', pageSectionInput_form, '', '', '');
            addSectionInput_Form_Elements('p', 'html-gen-instruction', '', pageSectionInput_placeholder, 'La sección tiene vídeo:', '', '');
            pageSectionInput_placeholderSelect = addSectionInput_Form_Elements('select', 'select-box', 'select-box--small', pageSectionInput_placeholder, '', 'data-input', '');
                addSectionInput_Form_Elements('option', 'select-box__option', '', pageSectionInput_placeholderSelect, 'Sí', '', 'yes');
                addSectionInput_Form_Elements('option', 'select-box__option', '', pageSectionInput_placeholderSelect, 'no', '', 'no');
                // Create the input [video number] field
                pageSectionInput_placeholder = addSectionInput_Form_Elements('div', '', '', pageSectionInput_form, '', '', '');
                addSectionInput_Form_Elements('p', 'html-gen-instruction', '', pageSectionInput_placeholder, 'Número del vídeo (01, 02, 03 etc.):', '', '');
                addSectionInput_Form_Elements('input', 'html-gen-input', '', pageSectionInput_placeholder, '(ej. 01)', 'data-input', 'text');
                // Create the input [video url] field
                pageSectionInput_placeholder = addSectionInput_Form_Elements('div', '', '', pageSectionInput_form, '', '', '');
                addSectionInput_Form_Elements('p', 'html-gen-instruction', '', pageSectionInput_placeholder, 'La url del vídeo es:', '', '');
                addSectionInput_Form_Elements('input', 'html-gen-input', '', pageSectionInput_placeholder, '', 'data-input', 'text');
            
            // Create the input [add text] select option
            pageSectionInput_placeholder = addSectionInput_Form_Elements('div', 'form__selection', 'form__selection--add-elements', pageSectionInput_form, '', '', 'd-flex');
            addSectionInput_Form_Elements('p', 'html-gen-instruction', '', pageSectionInput_placeholder, 'Agrega elemento:', '', '');
            pageSectionInput_placeholderSelect = addSectionInput_Form_Elements('select', 'select-box', 'select-box--small', pageSectionInput_placeholder, '', 'data-input', '');
                addSectionInput_Form_Elements('option', 'select-box__option', '', pageSectionInput_placeholderSelect, 'p (Texto)', '', 'p');
                addSectionInput_Form_Elements('option', 'select-box__option', '', pageSectionInput_placeholderSelect, 'Observa:', '', 'observa');
                addSectionInput_Form_Elements('option', 'select-box__option', '', pageSectionInput_placeholderSelect, 'img (Imagen)', '', 'img');
                addSectionInput_Form_Elements('option', 'select-box__option', '', pageSectionInput_placeholderSelect, 'ul (Lista)', '', 'ul');
                addSectionInput_Form_Elements('option', 'select-box__option', '', pageSectionInput_placeholderSelect, 'Learnbox (Regla)', '', 'learnbox');
                addSectionInput_Form_Elements('option', 'select-box__option', '', pageSectionInput_placeholderSelect, 'Quote (Tip)', '', 'quote');
            addSectionInput_Form_Elements('button', 'html-gen-btn', 'btn-add-element', pageSectionInput_placeholder, '<i class="fas fa-plus-circle"></i>', '', '').addEventListener('click', (e) => {
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
                        pageSectionInput_placeholderSelect_div = addSectionInput_Form_Elements('div', '', '', pageSectionInput_form, '', '', '');
                        addSectionInput_Form_Elements('p', 'html-gen-instruction', '', pageSectionInput_placeholderSelect_div, 'Escribe el parágrafo:', '', '');
                        addSectionInput_Form_Elements('input', 'html-gen-input', '', pageSectionInput_placeholderSelect_div, '', 'data-input', 'text');
                        break;
                    case "observa":
                        pageSectionInput_placeholderSelect_div = addSectionInput_Form_Elements('div', '', '', pageSectionInput_form, '', '', '');
                        addSectionInput_Form_Elements('p', 'html-gen-instruction', '', pageSectionInput_placeholderSelect_div, 'Escribe qué vas a observar:', '', '');
                        addSectionInput_Form_Elements('input', 'html-gen-input', '', pageSectionInput_placeholderSelect_div, '(ej. "Observa:", "Ejemplo:" etc.)', 'data-input', 'text');
                        break;
                    case "img":
                        pageSectionInput_placeholderSelect_div = addSectionInput_Form_Elements('div', '', '', pageSectionInput_form, '', '', '');
                        addSectionInput_Form_Elements('p', 'html-gen-instruction', '', pageSectionInput_placeholderSelect_div, 'La url de la imagen es:', '', '');
                        addSectionInput_Form_Elements('input', 'html-gen-input', '', pageSectionInput_placeholderSelect_div, '(Nota: Esta url sirve solo para la prevista.)', 'data-input', 'text');
                        addSectionInput_Form_Elements('p', 'html-gen-instruction', '', pageSectionInput_placeholderSelect_div, 'Describe la imagen:', '', '');
                        addSectionInput_Form_Elements('input', 'html-gen-input', '', pageSectionInput_placeholderSelect_div, '', 'data-input', 'text');
                        break;
                    case "ul":
                        // <div class="form__selection form__selection--add-list-items d-flex">
                        //     <p class="html-gen-instruction">Agrega subsección:</p>
                        //     <button data-btn="btn--add-objective" class="html-gen-btn btn-add-element"><i class="fas fa-plus-circle"></i></button>
                        // </div>
                        pageSectionInput_placeholderSelect_div = addSectionInput_Form_Elements('div', '', '', pageSectionInput_form, '', '', '');
                        addSectionInput_Form_Elements('p', 'html-gen-instruction', '', pageSectionInput_placeholderSelect_div, 'Si la lista tiene un título, escríbalo aquí:', '', '');
                        addSectionInput_Form_Elements('input', 'html-gen-input', '', pageSectionInput_placeholderSelect_div, '', 'data-input', 'text');
                        pageSectionInput_placeholderSelect_div = addSectionInput_Form_Elements('div', 'form__selection', 'form__selection--add-list-items', pageSectionInput_form, '', '', 'd-flex');
                        // let testElement = document.querySelector(`[data-form="${testId}"]`);
                        // console.log(testElement);
                        // pageSectionInput_placeholderSelect_div.setAttribute('data-form', testId);
                        addSectionInput_Form_Elements('p', 'html-gen-instruction', '', pageSectionInput_placeholderSelect_div, 'Agrega un punto de la lista:', '', '');
                        addSectionInput_Form_Elements('button', 'html-gen-btn', 'btn-add-element', pageSectionInput_placeholderSelect_div, '<i class="fas fa-plus-circle"></i>', 'data-btn', '').addEventListener('click', (e) => {
                            e.preventDefault();
                            // const newTest = addSectionInput_Form_Elements('div', '', '', pageSectionInput_form, '', '', '');
                            // let testId = Math.random();
                            // newTest.setAttribute('data-form', testId);

                            pageSectionInput_placeholderSelect_div_2 = addSectionInput_Form_Elements('div', '', '', pageSectionInput_form, '', '', '');
                            addSectionInput_Form_Elements('p', 'html-gen-instruction', '', pageSectionInput_placeholderSelect_div_2, 'Escribe el punto:', '', '');
                            addSectionInput_Form_Elements('input', 'html-gen-input', '', pageSectionInput_placeholderSelect_div_2, '', 'data-input', 'text');
                        });
                        
                        break;
                    case "learnbox":
                        pageSectionInput_placeholderSelect_div = addSectionInput_Form_Elements('div', '', '', pageSectionInput_form, '', '', '');
                        addSectionInput_Form_Elements('p', 'html-gen-instruction', '', pageSectionInput_placeholderSelect_div, 'El learnbox tiene el título:', '', '');
                        addSectionInput_Form_Elements('input', 'html-gen-input', '', pageSectionInput_placeholderSelect_div, '(ej. "Regla", "Definición" etc.)', 'data-input', 'text');
                        addSectionInput_Form_Elements('p', 'html-gen-instruction', '', pageSectionInput_placeholderSelect_div, 'La regla es:', '', '');
                        addSectionInput_Form_Elements('input', 'html-gen-input', '', pageSectionInput_placeholderSelect_div, '', 'data-input', 'text');
                        break;
                    case "quote":
                        pageSectionInput_placeholderSelect_div = addSectionInput_Form_Elements('div', '', '', pageSectionInput_form, '', '', '');
                        addSectionInput_Form_Elements('p', 'html-gen-instruction', '', pageSectionInput_placeholderSelect_div, 'El tip es:', '', '');
                        addSectionInput_Form_Elements('input', 'html-gen-input', '', pageSectionInput_placeholderSelect_div, '', 'data-input', 'text');
                        break;
                }
            });


        /*====== (3) Create the container "button" ======*/
        const  pageSectionInput_btnDiv = addSectionInput_Form_Elements('div', 'html-gen-btn-container', 'd-flex', pageSectionInput, '', '', 'jc-center');
            // Create the submit button 
            addSectionInput_Form_Elements('button', 'html-gen-btn', 'btn-submit-general', pageSectionInput_btnDiv, 'Agrega sección', '', '');

    /*====== Upload the container to the placeholder in the html file ======*/
    formAddSectionsContainer.appendChild(pageSectionInput);
}

/*====== Create inputEelements for sectionInputForm ======*/
function addSectionInput_Form_Elements(tagName, className_1, className_2, parent, message, dataAttribute, type) {
    let htmlElementData;
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
    if(message !== "" && tagName !== "button" ) {
        pageSectionInput_Form_Element.innerText = message;
    };
    if(message !== "" && tagName === "button" ) {
        pageSectionInput_Form_Element.innerHTML = message;
    };
    if(dataAttribute !== "") {
        htmlElementData = Math.random();
        pageSectionInput_Form_Element.setAttribute(dataAttribute, htmlElementData);
    };
    if(type !== "") {
        pageSectionInput_Form_Element.type = type;
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
function createSection(){
    pageSection = document.createElement('section');
    pageSection.classList.add('chapter');
    htmlCode.appendChild(pageSection);

    /*=== HTML Output ===*/
    const htmlSectionComment = document.createTextNode(`<!--=======Intro=======-->\r`);
    const htmlSection = document.createTextNode(`<section class="chapter">\r`);
    outputHtml.appendChild(htmlSectionComment);
    outputHtml.appendChild(htmlSection);

    return pageSection;
}

function createSectionHtmlEnd() {
    const sectionHTML = document.createTextNode(`</section>\r`);
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

function createSingleElement(tagName, className, inputField, array, parent){
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
    const htmlImage = document.createTextNode(`    <img src="./../../img/${inputCourseNumber.value}/${inputImgFolder.value}/hero.${inputImgFormat.value}" alt="${inputAltTag.value}">\r`);
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