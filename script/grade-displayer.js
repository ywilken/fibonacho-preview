
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
// ==ExcelFile==
let selectedExcelFile;

// ==Inputs==
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

// ==Arrays==
// This is the selected user data array
let userDataArraySelected = [];
// Arrays with data for different grades
// To create associative arrays from excel data: https://www.seabreezecomputers.com/excel2array/
const userDataArray_gradeOne = [
    {
        "id": "0001028774", 
        "firstName": "ANTONELLA", 
        "lastName": "VARGAS MONTOYA", 
        "pin": "421707"}, 
    {
        "id": "0001028772", 
        "firstName": "ANTONIA", 
        "lastName": "SERNA SEPULVEDA", 
        "pin": "011597"}, 
    {
        "id": "0001158486", 
        "firstName": "DANIELA", 
        "lastName": "GARCIA FLOREZ", 
        "pin": "622246"}, 
    {
        "id": "0001028770", 
        "firstName": "EMILIANO", 
        "lastName": "ARROYAVE MONTOYA", 
        "pin": "978260"}, 
    {
        "id": "0001100557", 
        "firstName": "EMILIANO", 
        "lastName": "VELEZ ORJUELA", 
        "pin": "782808"}, 
    {
        "id": "0001185968", 
        "firstName": "EMMANUEL", 
        "lastName": "ARANGO ZULETA", 
        "pin": "318529"}, 
    {
        "id": "0001158479", 
        "firstName": "GUADALUPE", 
        "lastName": "VILLEGAS BEDOYA", 
        "pin": "195244"}, 
    {
        "id": "0001028760", 
        "firstName": "JACOBO", 
        "lastName": "ARANGO SEPULVEDA", 
        "pin": "968682"}, 
    {
        "id": "0001178830", 
        "firstName": "JEISSON ANDRES", 
        "lastName": "LOPEZ VARGAS", 
        "pin": "532857"}, 
    {
        "id": "0001028763", 
        "firstName": "JOAQUIN", 
        "lastName": "BERMUDEZ GIRALDO", 
        "pin": "050026"}, 
    {
        "id": "0001028766", 
        "firstName": "LUNA", 
        "lastName": "GARCIA RUEDA", 
        "pin": "281747"}, 
    {
        "id": "0001073230", 
        "firstName": "MARIA PAULINA", 
        "lastName": "CASTAÑO SANCHEZ", 
        "pin": "127110"}, 
    {
        "id": "0001028761", 
        "firstName": "MARIANA", 
        "lastName": "BEDOYA ARROYAVE", 
        "pin": "603066"}, 
    {
        "id": "0001028762", 
        "firstName": "MATIAS", 
        "lastName": "BEDOYA GARCIA", 
        "pin": "687600"}, 
    {
        "id": "0001159706", 
        "firstName": "MATIAS", 
        "lastName": "LOPERA ORTEGA", 
        "pin": "655707"}, 
    {
        "id": "0001028769", 
        "firstName": "REBECA", 
        "lastName": "PEREZ LARROTTA", 
        "pin": "733228"}, 
    {
        "id": "0001158474", 
        "firstName": "ROXANA", 
        "lastName": "LONDOÑO CASTILLO", 
        "pin": "571673"}, 
    {
        "id": "0001103951", 
        "firstName": "SALOME", 
        "lastName": "JURADO PALACIO", 
        "pin": "984994"}, 
    {
        "id": "0001028785", 
        "firstName": "SANTIAGO", 
        "lastName": "CASTAÑEDA VÉLEZ", 
        "pin": "360277"}, 
    {
        "id": "0001028765", 
        "firstName": "SARAH", 
        "lastName": "GARCIA GAVIRIA", 
        "pin": "802916"}, 
    {
        "id": "0001028768", 
        "firstName": "SARAH SOFIA", 
        "lastName": "MEZA FLOREZ", 
        "pin": "320362"}, 
    {
        "id": "0001028825", 
        "firstName": "SIMON", 
        "lastName": "SANCHEZ RESTREPO", 
        "pin": "202376"}, 
    {
        "id": "0001028767", 
        "firstName": "SOFIA", 
        "lastName": "MEDINA MUNERA", 
        "pin": "852588"}, 
    {
        "id": "0001028773", 
        "firstName": "THOMAS", 
        "lastName": "MONTOYA ECHEVERRY", 
        "pin": "281424"}, 
    {
        "id": "0001158478", 
        "firstName": "THOMAS", 
        "lastName": "RESTREPO VARGAS", 
        "pin": "946857"}, 
    {
        "id": "0001158547", 
        "firstName": "VANESSA", 
        "lastName": "MANJARRES LOPEZ", 
        "pin": "683798"}, 
    {
        "id": "0001158546", 
        "firstName": "VICTORIA", 
        "lastName": "MANJARRES LOPEZ", 
        "pin": "400071"}
    ]
const userDataArray_gradeTwo = [
    {
        "id": "0001028797", 
        "firstName": "ALEJANDRO", 
        "lastName": "RAMÍREZ GARCÍA", 
        "pin": "387787"}, 
    {
        "id": "0001028794", 
        "firstName": "ANDRÉS DAVID", 
        "lastName": "ARBELÁEZ HINCAPIÉ", 
        "pin": "523267"}, 
    {
        "id": "0001028792", 
        "firstName": "ANTHONY", 
        "lastName": "ARROYAVE TANGARIFE", 
        "pin": "811875"}, 
    {
        "id": "0001028782", 
        "firstName": "ANTONIO", 
        "lastName": "GALLEGO BOTERO", 
        "pin": "191250"}, 
    {
        "id": "0001028790", 
        "firstName": "EMILIANA", 
        "lastName": "GONZALES PIEDRAHITA", 
        "pin": "791237"}, 
    {
        "id": "0001028780", 
        "firstName": "HENAO ISABELLA", 
        "lastName": "BUITRAGO", 
        "pin": "808942"}, 
    {
        "id": "0001028796", 
        "firstName": "ISABEL", 
        "lastName": "GARCIA OCHOA", 
        "pin": "599077"}, 
    {
        "id": "0001028791", 
        "firstName": "JACOBO", 
        "lastName": "RESTREPO MAZO", 
        "pin": "258267"}, 
    {
        "id": "0001028788", 
        "firstName": "JOSÉ MANUEL", 
        "lastName": "CIRO RIOS", 
        "pin": "035601"}, 
    {
        "id": "0001028787", 
        "firstName": "JUANITA", 
        "lastName": "PAEZ FRANCO", 
        "pin": "144954"}, 
    {
        "id": "0001080285", 
        "firstName": "MARIA ANTONIA", 
        "lastName": "GARCIA GARCIA", 
        "pin": "722994"}, 
    {
        "id": "0001028784", 
        "firstName": "MARÍA ANTONIA", 
        "lastName": "VILLEGAS CASTAÑEDA", 
        "pin": "563649"}, 
    {
        "id": "0001028779", 
        "firstName": "MARÍA JOSÉ", 
        "lastName": "ARBOLEDA ARANGO", 
        "pin": "385892"}, 
    {
        "id": "0001028777", 
        "firstName": "MARTIN", 
        "lastName": "CORREA VELEZ", 
        "pin": "607714"}, 
    {
        "id": "0001028793", 
        "firstName": "MARTÍN", 
        "lastName": "PALACIO GARCÍA", 
        "pin": "715328"}, 
    {
        "id": "0001028795", 
        "firstName": "MATÍAS", 
        "lastName": "LÓPEZ CARMONA", 
        "pin": "407187"}, 
    {
        "id": "0001028776", 
        "firstName": "MELANNY", 
        "lastName": "GIRALDO CASTAÑEDA", 
        "pin": "362711"}, 
    {
        "id": "0001161235", 
        "firstName": "MIGUEL ANGEL", 
        "lastName": "OCAMPO USUGA", 
        "pin": "802233"}, 
    {
        "id": "0001028783", 
        "firstName": "SALOMÓN", 
        "lastName": "RAMÍREZ ZULUAGA", 
        "pin": "486455"}, 
    {
        "id": "0001028786", 
        "firstName": "VIOLETA", 
        "lastName": "SERNA RAVE", 
        "pin": "774044"}, 
    {
        "id": "0001028775", 
        "firstName": "WAIRA  SILVANA", 
        "lastName": "ESPINOSA GUTIERREZ", 
        "pin": "157234"}
    ];
const userDataArray_gradeThree = [
    {
        "id": "0001159700", 
        "firstName": "AGUSTIN", 
        "lastName": "LOPERA ORTEGA", 
        "pin": "945944"}, 
    {
        "id": "0001028799", 
        "firstName": "ALLYSON", 
        "lastName": "OROZCO ZAPATA", 
        "pin": "473088"}, 
    {
        "id": "0001082686", 
        "firstName": "ANA SOPHIA", 
        "lastName": "CRUZ CASTAÑO", 
        "pin": "687254"}, 
    {
        "id": "0001159714", 
        "firstName": "BRAHIAN  ESTIVEN", 
        "lastName": "FLOREZ TUBERQUIA", 
        "pin": "313084"}, 
    {
        "id": "0001028807", 
        "firstName": "JERONIMO", 
        "lastName": "CARRILLO AGUDELO", 
        "pin": "184045"}, 
    {
        "id": "0001073240", 
        "firstName": "JUAN ANDRES", 
        "lastName": "ROMAN VARGAS", 
        "pin": "218909"}, 
    {
        "id": "0001028803", 
        "firstName": "JUAN ANTONIO", 
        "lastName": "MEJIA ZULUAGA", 
        "pin": "872662"}, 
    {
        "id": "0001028802", 
        "firstName": "JULIANA", 
        "lastName": "SANCHEZ SOTO", 
        "pin": "902000"}, 
    {
        "id": "0001178799", 
        "firstName": "JUSTIN STEVEN", 
        "lastName": "OSPINA VARGAS", 
        "pin": "738281"}, 
    {
        "id": "0001180161", 
        "firstName": "LUCIANA", 
        "lastName": "MEJIA ECHEVERRI", 
        "pin": "251442"}, 
    {
        "id": "0001028804", 
        "firstName": "MAXIMILIANO", 
        "lastName": "ECHEVERRI ESTRADA", 
        "pin": "819926"}, 
    {
        "id": "0001028805", 
        "firstName": "MAXIMILIANO", 
        "lastName": "VARGAS  GONZALES", 
        "pin": "706324"}, 
    {
        "id": "0001028798", 
        "firstName": "NICOLAS", 
        "lastName": "RIVERA SALAZAR", 
        "pin": "868369"}, 
    {
        "id": "0001028800", 
        "firstName": "SALOME", 
        "lastName": "GALLEGO  GARCIA", 
        "pin": "140172"}, 
    {
        "id": "0001158490", 
        "firstName": "SANTIAGO", 
        "lastName": "ELEJALDE MORALES", 
        "pin": "759906"}, 
    {
        "id": "0001213327", 
        "firstName": "SANTIAGO ALEJANDRO", 
        "lastName": "VELASQUEZ ZAPATA", 
        "pin": "952049"}
    ];
const userDataArray_gradeFour = [
    {
        "id": "0001028808", 
        "firstName": "ISABELLA", 
        "lastName": "ACOSTA BEDOYA", 
        "pin": "428328"}, 
    {
        "id": "0001028811", 
        "firstName": "JOSE FERNANDO", 
        "lastName": "MAYA RAMIREZ", 
        "pin": "134450"}, 
    {
        "id": "0001028817", 
        "firstName": "JUAN ANTONIO", 
        "lastName": "GUZMAN BERNAL", 
        "pin": "780727"}, 
    {
        "id": "0001028818", 
        "firstName": "MARIA FERNANDA", 
        "lastName": "GIRALDO GARCÍA", 
        "pin": "239121"}, 
    {
        "id": "0001028815", 
        "firstName": "MATEO", 
        "lastName": "VELASQUEZ ZAPATA", 
        "pin": "519415"}, 
    {
        "id": "0001028812", 
        "firstName": "MATIAS", 
        "lastName": "RAMIREZ MONTOYA", 
        "pin": "656755"}, 
    {
        "id": "0001028813", 
        "firstName": "MAXIMILIANO", 
        "lastName": "SALAZAR MORENO", 
        "pin": "640480"}, 
    {
        "id": "0001028816", 
        "firstName": "NICOLAS", 
        "lastName": "MEJIA HENAO", 
        "pin": "748573"}, 
    {
        "id": "0001028809", 
        "firstName": "SAMUEL", 
        "lastName": "CASTAÑEDA MONTOYA", 
        "pin": "723396"}, 
    {
        "id": "0001028819", 
        "firstName": "SEBASTIAN", 
        "lastName": "RENDON RENDON", 
        "pin": "038106"}, 
    {
        "id": "0001101118", 
        "firstName": "SIMONET", 
        "lastName": "RESTREPO MUÑOZ", 
        "pin": "614491"}, 
    {
        "id": "0001028814", 
        "firstName": "VALERY", 
        "lastName": "VARGAS VILLEGAS", 
        "pin": "850428"}
    ];
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
GRADE SELECTION (EVENT LISTENER)
==================*/

iCourseNr.addEventListener('change', () => {
    iStudentName.innerHTML = "";
    switch(iCourseNr.value) {
        case "1":
            // Update our user data
            userDataArraySelected = userDataArray_gradeOne;
            console.log(userDataArray_gradeOne)
            // Update our selected File
            selectedExcelFile = myRequest_G1;
            break;
        case "2":
            // Update our user data
            userDataArraySelected = userDataArray_gradeTwo;
            console.log(userDataArray_gradeTwo)
            // Update our selected File
            selectedExcelFile = myRequest_G2;
            break;
        case "3":
            // Update our user data
            userDataArraySelected = userDataArray_gradeThree;
            console.log(userDataArray_gradeThree)
            // Update our selected File
            selectedExcelFile = myRequest_G3;
            break;
        case "4":
            // Update our user data
            userDataArraySelected = userDataArray_gradeFour;
            console.log(userDataArray_gradeFour)
            // Update our selected File
            selectedExcelFile = myRequest_G4;
            break;
        case "5":
            // Update our user data
            userDataArraySelected = userDataArray_gradeFive;
            // Update our selected File
            selectedExcelFile = myRequest_G5;
            break;
        default:
            // Update our user data
            userDataArraySelected = userDataArray_gradeOne;
            console.log(userDataArray_gradeOne)
            // Update our selected File
            selectedExcelFile = myRequest_G1;
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

// const myRequest = new Request('./../../script/files/student_grades.xlsx', {


// ===REQUEST FOR EXCEL FILE===
// Here we find 1 request for each excel file
const myRequest_G1 = new Request('./../../_files/student_grades_g1.xlsx', {       // Here used to be a direct file link, it is now inside a variable
    method: 'GET',
    //   headers: myHeaders,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/plain"
    },
    mode: 'no-cors',
    cache: 'default',
});

const myRequest_G2 = new Request('./../../_files/student_grades_g2.xlsx', {       // Here used to be a direct file link, it is now inside a variable
    method: 'GET',
    //   headers: myHeaders,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/plain"
    },
    mode: 'no-cors',
    cache: 'default',
});

const myRequest_G3 = new Request('./../../_files/student_grades_g3.xlsx', {       // Here used to be a direct file link, it is now inside a variable
    method: 'GET',
  //   headers: myHeaders,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "text/plain"
    },
    mode: 'no-cors',
    cache: 'default',
});

const myRequest_G4 = new Request('./../../_files/student_grades_g4.xlsx', {       // Here used to be a direct file link, it is now inside a variable
    method: 'GET',
  //   headers: myHeaders,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "text/plain"
    },
    mode: 'no-cors',
    cache: 'default',
});

const myRequest_G5 = new Request('./../../_files/student_grades_g5.xlsx', {       // Here used to be a direct file link, it is now inside a variable
    method: 'GET',
  //   headers: myHeaders,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "text/plain"
    },
    mode: 'no-cors',
    cache: 'default',
});

function fetchExcelFile(requestFile) {
    return fetch(requestFile)
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

// This formula returns a date from an excel serial
function ExcelDateToJSDate(serial) {
    let myDate = new Date((serial - (25567 + 1))*86400*1000);
    let myMonth = myDate.getMonth() + 1;
    let myDay = myDate.getDate();
    let myYear = myDate.getFullYear();
    return `${myDay}/${myMonth}/${myYear}`;
}



function displayGrade() {
    // Important Variables
    let infoObject;   // <= This Object contains the info data (our first object)
    let keyWorkArray; // <= This Array contains the key names for data related to WORK
    let keyCommentArray; // <= This Array contains the key names for data related to COMMENTs
    let dateLastUpdate;
    
    _JsonDataReturned = fetchExcelFile(selectedExcelFile);    // The selected file is set above with the event lister course nr
    _JsonDataReturned.then(function(result) {
        // console.log(result)
        // console.log(result[0])
        result.forEach(resultItem => {
            // Get additional information
            if(resultItem.id === "info") {
                // Let us save our info data into the info Object
                infoObject = resultItem;
                // Get the Grade Number
                let gradeString = resultItem.lastName;         // In the info part lastName contains the information about the grade number
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
                // Date
                dateLastUpdate = ExcelDateToJSDate(resultItem.firstName);
                console.log(dateLastUpdate)

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
                    oTableGradesRow_Title.innerHTML = infoObject[workItem];
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