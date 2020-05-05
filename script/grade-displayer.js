
//  <form action="">
//  <label>Usuario:</label>
//  <input data-input="input--username" type="text">
//  <label>Contraseña:</label>
//  <input data-input="input--password" type="password">
//  <button data-btn="btn--submit">Enviar</button>
// </form>
// <div data-form="form--show-grades" class="">
//  <p>Your grade is: <span data-output="output--grade"></span></p>
// </div>

/*==================
VARIABLES
==================*/
const iCourseNr = document.querySelector('[data-input="input--course-nr"]');
const iStudentName = document.querySelector('[data-input="input--student-name"]');
const iPassword = document.querySelector('[data-input="input--password"]');

// ==Forms / Placeholders==
const fLoginToggle = document.querySelector('[data-form="form--user-login-toggle"]');
const fGradesWelcome = document.querySelector('[data-form="form--grades-welcome"]');
const fGrades = document.querySelector('[data-form="form--grades"]');
const fGradesTable = document.querySelector('[data-form="form--grades-table"]');

// ==Outputs==
const oFullName = document.querySelector('[data-output="output--full-name"]');
const oGradeNumber = document.querySelector('[data-output="output--grade-number"]');
const oAverageScore = document.querySelector('[data-output="output--average-score"]');

// ==Buttons==
const btnLoginToggle = document.querySelector('[data-btn="btn--user-login-toggle"]');
const btnSubmit = document.querySelector('[data-btn="btn--submit"]');

// const oGrade = document.querySelector('[data-output="output--grade"]')

const userdataArray = [
    {user: "veronica", password: "1234"},
    {user: "john", password: "5678"},
    {user: "laura", password: "3456"},
];

let userDataArraySelected = [];
const userDataArray_gradeFive = [
    {
        "id": "0001028820", 
        "firstName": "MARIA ANTONIA", 
        "lastName": "AGUILAR PUERTA", 
        "pin": "958744"}, 
    {
        "id": "0001028821", 
        "firstName": "MIGUEL ANGEL", 
        "lastName": "ARBELAEZ HINCAPIE", 
        "pin": "517603"}, 
    {
        "id": "0001101108", 
        "firstName": "EMILIANO", 
        "lastName": "ECHEVERRI GIL", 
        "pin": "730483"}, 
    {
        "id": "0001028822", 
        "firstName": "JUAN JOSE", 
        "lastName": "ESTRADA JARAMILLO", 
        "pin": "323012"}, 
    {
        "id": "0001073253", 
        "firstName": "EMILIANO", 
        "lastName": "HERRERA GOMEZ", 
        "pin": "990766"}, 
    {
        "id": "0001180166", 
        "firstName": "MARIA JOSE", 
        "lastName": "HERRERA GOMEZ", 
        "pin": "575164"}, 
    {
        "id": "0001028823", 
        "firstName": "EMMANUEL", 
        "lastName": "MORALES VILLEGAS", 
        "pin": "318471"}, 
    {
        "id": "0001028824", 
        "firstName": "JUAN JOSE", 
        "lastName": "RAMIREZ MONTOYA", 
        "pin": "585439"}, 
    {
        "id": "0001028825", 
        "firstName": "SIMON", 
        "lastName": "SANCHEZ RESTREPO", 
        "pin": "123577"}, 
    {
        "id": "0001028826", 
        "firstName": "JUAN MANUEL", 
        "lastName": "VASCO VARGAS", 
        "pin": "919250"}
    ];

let currentUser_id = "";
let currentUser_authenticated = false;
// Variables for Excel Access
let _JsonData = [];
let _JsonDataReturned;




/*==================
RANDOM NUMBER
==================*/

// console.log(`${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}`)
// console.log(`${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}`)
// console.log(`${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}`)
// console.log(`${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}`)
// console.log(`${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}`)
// console.log(`${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}`)
// console.log(`${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}`)
// console.log(`${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}`)
// console.log(`${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}`)
// console.log(`${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}`)
// console.log(`${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}`)





/*==================
FETCH THE EXCEL FILE
==================*/

// const myHeaders = new Headers();
// https://fibonacho-preview.netlify.app/

const myRequest = new Request('./../../script/files/student_grades.xlsx', {
  method: 'GET',
//   headers: myHeaders,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "text/plain"
  },
  mode: 'no-cors',
  cache: 'default',
});

function fetchExcelFile() {
    return fetch(myRequest)
    .then(function (res) {
        /* get the data as a Blob */
        if (!res.ok) throw new Error("fetch failed");
        return res.arrayBuffer();
    })
    .then(function (ab) {
        /* parse the data when it is received */
        var data = new Uint8Array(ab);
        var workbook = XLSX.read(data, {
            type: "array"
        });

        /* *****************************************************************
        * DO SOMETHING WITH workbook: Converting Excel value to Json       *
        ********************************************************************/
        var first_sheet_name = workbook.SheetNames[0];
        /* Get worksheet */
        var worksheet = workbook.Sheets[first_sheet_name];

        _JsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        // var _JsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        /************************ End of conversion ************************/

        console.log(_JsonData);
        return _JsonData;
    })
}



/*==================
EVENT LISTENER
==================*/

btnLoginToggle.addEventListener('click', () => {
    fLoginToggle.classList.toggle('user-login-grades-hidden');
    btnLoginToggle.classList.toggle('btn-login-toggle-inverted');
})

iCourseNr.addEventListener('change', () => {
    switch(iCourseNr.value) {
        case "1":
            // Code
            break;
        case "2":
            // Code
            break;
        case "3":
            // Code
            break;
        case "4":
            // Code
            break;
        case "5":
            userDataArraySelected = userDataArray_gradeFive;
            console.log(userDataArray_gradeFive)
            break;
    }
    // for(let i=0; i<userDataArraySelected.length; i++) {
    //     let studentNameOption = document.createElement('option');
    //     iStudentName.appendChild(studentNameOption);
    // }
    userDataArraySelected.forEach( student => {
        let studentNameOption = document.createElement('option');
        studentNameOption.value = student.id;
        studentNameOption.innerText = `${student.firstName} ${student.lastName}`;
        studentNameOption.classList.add('select-box__option');
        iStudentName.appendChild(studentNameOption);
    })
})


btnSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    authenticateUser();
    console.log(currentUser_id);
    console.log(currentUser_authenticated);
    if(currentUser_authenticated) {
        fGradesWelcome.classList.add('grades-hidden');
        fLoginToggle.classList.add('user-login-grades-hidden');
        btnLoginToggle.classList.add('btn-login-toggle-inverted');
        fGrades.classList.remove('grades-hidden');
        fGradesTable.innerHTML = "";
        displayGrade();
        console.log("Yes, it works")
    } else if(!currentUser_authenticated) {
        fGrades.classList.add('grades-hidden')
    }
});


/*==================
FUNCTIONS
==================*/

function authenticateUser() {
    // console.log(Number(iStudentName.value));
    // console.log(Number(iPassword.value));
    let falseCount = 0;
    for(let i=0; i<userDataArraySelected.length; i++) {
        // console.log(userDataArraySelected[i].id);
        if(iStudentName.value === userDataArraySelected[i].id && iPassword.value === userDataArraySelected[i].pin) {
            currentUser_id = iStudentName.value;
            currentUser_authenticated = true;
            return currentUser_id, currentUser_authenticated;
        } else {
            falseCount++;
            if(falseCount === userDataArraySelected.length) {
                currentUser_authenticated = false;
            }
        }
    }
}

function displayGrade() {
    // Important Variables
    let infoObject;   // <= This Object contains the info data (our first object)
    let keyWorkArray; // <= This Array contains the key names for data related to WORK
    let keyCommentArray; // <= This Array contains the key names for data related to COMMENTs

    _JsonDataReturned = fetchExcelFile();
    _JsonDataReturned.then(function(result) {
        // console.log(result)
        // console.log(result[0])
        result.forEach(resultItem => {
            // Get additional information
            if(resultItem.id === "info") {
                // Let us save our info data into the info Object
                infoObject = resultItem;
                // Get the Grade Number
                let gradeString = resultItem.lastName;
                let gradeNumber = gradeString.charAt(gradeString.length-1);
                oGradeNumber.innerText = gradeNumber;
                // Get the descriptions:
                // WORK: We filter for all keys that contain "work"
                keyWorkArray = Object.keys(resultItem).filter(function(e) {
                    return e.indexOf('work') == 0;
                })
                // COMMENTS: We filter for all keys that contain "comment"
                keyCommentArray = Object.keys(resultItem).filter(function(e) {
                    return e.indexOf('comment') == 0;
                })

                // keyWorkArray.forEach( workItem => {
                //     console.log(resultItem[workItem])
                // //     for(let i=0; i<Object.keys(item).length; i++) {
                // //         if()
                // // })
                // });
            }
            // when the id in the excel file equals our current user, access its' data
            if(resultItem.id === currentUser_id) {
                // Variables for Average Score
                let averageScoreTotal = 0;
                let gradeRowCount = 0;
                // Get the Full Name
                oFullName.innerHTML = `${resultItem.firstName} <span class="grades-student-data--highlighted">${resultItem.lastName}</span>`;
                // Get the Text
                keyWorkArray.forEach( workItem => {
                    // =====COMMENTS=====
                    // If workitem contains a suffix, we will save this suffix(later we will look for the equivalent)
                    let workItemSuffix;
                    // the includes method returns a boolean (true / false)
                    if(workItem.includes('_')) {
                        workItemSuffix = workItem.substring(workItem.indexOf('_'));
                        console.log(workItemSuffix)
                    }

                    // =====GRADES ROW=====
                    // Create the <div> container
                    let oTableGradesRow = document.createElement('div');
                    oTableGradesRow.classList.add('table-grades-row');
                    // Create the <title> that contains work description
                    let oTableGradesRow_Title = document.createElement('p');
                    oTableGradesRow_Title.classList.add('table-grades-item');
                    oTableGradesRow_Title.innerText = infoObject[workItem];
                    oTableGradesRow.appendChild(oTableGradesRow_Title);
                    // Create the <score> of the current user's work
                    let oTableGradesRow_Score = document.createElement('p');
                    oTableGradesRow_Score.classList.add('table-grades-item');
                    oTableGradesRow_Score.innerText = (resultItem[workItem] || "NO ENTREGADO");  // resultItem corresponds to the data of the currentUser
                    if(resultItem[workItem] === undefined || resultItem[workItem] === "") {
                        oTableGradesRow_Score.id = 'table-grades-empty';
                    }
                    oTableGradesRow.appendChild(oTableGradesRow_Score);

                    // =====AVERAGE SCORE=====
                    // These variables count the total score and the number of rows
                    averageScoreTotal += (Number(resultItem[workItem]) || 0);
                    gradeRowCount++;

                    // =====COMMENTS=====
                    // Create the <div> container
                    let oTableGradesRow_Comment = document.createElement('div');
                    oTableGradesRow_Comment.classList.add('table-grades-comment', 'grades-hidden');
                    // Create the comment title
                    let oTableGradesRow_CommentTitle = document.createElement('p');
                    oTableGradesRow_CommentTitle.classList.add('table-grades-comment__title');
                    oTableGradesRow_CommentTitle.innerText = "Comentario:";
                    oTableGradesRow_Comment.appendChild(oTableGradesRow_CommentTitle);
                    // Create the comment body
                    let oTableGradesRow_CommentText = document.createElement('p');
                    oTableGradesRow_CommentText.innerText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti quaerat commodi eos aut? Omnis assumenda nisi velit.";
                    oTableGradesRow_Comment.appendChild(oTableGradesRow_CommentText);
                    // Add the EventListener
                    oTableGradesRow.addEventListener('click', () => {
                        oTableGradesRow_Comment.classList.toggle('grades-hidden');
                    })

                    // =====UPLOAD OF GRADES ROW & COMMENTS=====
                    // Finally we upload the created items to our grades table
                    fGradesTable.appendChild(oTableGradesRow);
                    fGradesTable.appendChild(oTableGradesRow_Comment);
                    
                })
                // Output the average Score
                oAverageScore.innerText = (averageScoreTotal / gradeRowCount).toFixed(1);
                console.log(averageScoreTotal)
                console.log(gradeRowCount)

                console.log(resultItem)
                // In the case of a comment
                if (resultItem.comment === undefined) {
                    console.log('There is no comment, bro')
                }
                // console.log(`Her grade is: ${item.Grade}`);
                // oGrade.innerText = item.Grade;
            }
        });
    });
    

}








/*==================
OLD
==================*/


// Access-Control-Allow-Origin: 'https://fibonacho-preview.netlify.app';

// read Excel file and convert to json format using fetch
// fetch('http://127.0.0.1:5500/script/excel.xls').then(function (res) {




// fetch('./script/excel.xls').then(function (res) {
//     /* get the data as a Blob */
//     if (!res.ok) throw new Error("fetch failed");
//     return res.arrayBuffer();
// })
// .then(function (ab) {
//     /* parse the data when it is received */
//     var data = new Uint8Array(ab);
//     var workbook = XLSX.read(data, {
//         type: "array"
//     });

//     /* *****************************************************************
//     * DO SOMETHING WITH workbook: Converting Excel value to Json       *
//     ********************************************************************/
//     var first_sheet_name = workbook.SheetNames[0];
//     /* Get worksheet */
//     var worksheet = workbook.Sheets[first_sheet_name];

//     var _JsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
//     /************************ End of conversion ************************/

//     console.log(_JsonData);

//     $.each(_JsonData, function (index, value) {

//         $('#showExcel').append(

//             '<tr>' +
//                 '<th scope="row">' +
//                     value['FIRST NAME'] +
//                 '</th>' + 
//                 '<td>' +
//                     value['LAST NAME'] +
//                 '</td>' +  
//                 '<td>' +
//                     '<span class="badge badge-primary badge-pill p-2">' +
//                         value.AGE +
//                     '</span>' +
//                 '</td>' +
//                 '<td>' +
//                     value.CLUB +
//                 '</td>' +
//                 '<td>' +
//                     value.CITY +
//                 '</td>' +
//             '</tr>'
//         );
//     });
// });