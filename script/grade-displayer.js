
// read Excel file and convert to json format using fetch
fetch('http://oss.sheetjs.com/test_files/formula_stress_test.xlsx').then(function (res) {
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

    console.log(_JsonData);

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