
// const myHeaders = new Headers();

const myRequest = new Request('https://fibonacho-preview.netlify.app/script/excel.xls', {
  method: 'GET',
//   headers: myHeaders,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "text/plain"
  },
  mode: 'no-cors',
  cache: 'default',
});


fetch(myRequest)
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

    var _JsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
    /************************ End of conversion ************************/

    // console.log(_JsonData);
    return _JsonData;

    $.each(_JsonData, function (index, value) {

        $('#showExcel').append(

            '<tr>' +
                '<th scope="row">' +
                    value['FIRST NAME'] +
                '</th>' + 
                '<td>' +
                    value['LAST NAME'] +
                '</td>' +  
                '<td>' +
                    '<span class="badge badge-primary badge-pill p-2">' +
                        value.AGE +
                    '</span>' +
                '</td>' +
                '<td>' +
                    value.CLUB +
                '</td>' +
                '<td>' +
                    value.CITY +
                '</td>' +
            '</tr>'
        );
    });
});

console.log(_JsonData);



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