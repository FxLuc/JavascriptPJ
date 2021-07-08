//make row + cell
function mkCells(tableID, tagTD = '<td><input type="number" class="form-control border-radius-0"></td>', insertRow = true, insertCol = true){
    const table = document.getElementById(tableID)
    if (insertCol && table.rows[0].cells.length < 10){
        for (const row of table.rows) {
            row.insertCell(-1).innerHTML = tagTD
        }
    }
    if (insertRow && table.rows.length < 10){
        let rowCells = ''
        for (const _ of table.rows[0].cells) {
            rowCells += tagTD
        }
        table.insertRow(table.rows.length).innerHTML = rowCells
    }
}

//remove row + cell
function rmCells(tableID, removeRow = true, removeCol = true){
    const table = document.getElementById(tableID)
    if (removeCol && table.rows[0].cells.length > 1){
        for (const row of table.rows) {
            row.deleteCell(-1)
        }
    }
    if (removeRow && table.rows.length > 1){
        table.deleteRow(-1)
    }
}

//delete all row + cell
function delTable(tableID){
    const table = document.getElementById(tableID)
    while (table.rows.length > 0) {
        table.deleteRow(0)
    }
}

//fill cell = value++
function fillTable(tableID, value = 1){
    const table = document.getElementById(tableID)
    for (const row of table.rows) {
        for( const cell of row.cells){
            cell.firstChild.value = value++
        }
    }
}

//copy value from matrix X to table X / Multiply by value
function copyMatrixTo(tableCopyID, tablePasteID, value = 1){
    const tableCopy = document.getElementById(tableCopyID)
    const tablePaste = document.getElementById(tablePasteID)
    for (const row of tableCopy.rows) {
        let rowCells = ''
        for( const cell of row.cells){
            rowCells += `<td><input type="number" class="form-control border-radius-0" value= '${cell.firstChild.value * value}'></td>`
        }
        tablePaste.insertRow(-1).innerHTML = rowCells
    }
}

function swapAnB(){
    copyMatrixTo('matrixA', 'tempA')
    copyMatrixTo('matrixB', 'tempB')
    delTable('matrixA')
    delTable('matrixB')
    copyMatrixTo('tempB', 'matrixA')
    copyMatrixTo('tempA', 'matrixB')
    delTable('tempA')
    delTable('tempB')
}

$('.answerA').hide()
$('.answerB').hide()
$('#plus').hide()
$('#minus').hide()
$('#times').hide()
$('#equal').hide()
$('#delResult').hide();

//show Answer Matrix
function optionChanged(matrixName, value){
    $(`.answer${matrixName}`).slideUp()
    $(`.answer${matrixName}${value}`).slideDown('slow')
}

//refresh table
function refreshMatrixResult(calculation){
    $('#resultHeader').replaceWith('<h4 id="resultHeader">KẾT QUẢ CHUNG</h4>')
    hideResult()
    copyMatrixTo('matrixA', 'resultA')
    copyMatrixTo('matrixB', 'resultB' )
    if(calculation == '+'){
        $('#plus').show()
    } else if (calculation == '-'){
        $('#minus').show()
    } else{
        $('#times').show()
    }
    $('#equal').show()
    $('#delResult').show();
}

//hide result
function hideResult(){
    delTable('resultA')
    delTable('resultB')
    delTable('resultC')
    $('#plus').hide()
    $('#minus').hide()
    $('#times').hide()
    $("#equal").hide();
    $('#delResult').hide();
}


//fill by Identity matrix
function identityMatrix(tableID, value, tableResultID){
    const table = document.getElementById(tableID)
    const tableResult = document.getElementById(tableResultID)

    for (let i = 0; i < table.rows.length; i++) {
        let rowCells = ''
        for (let j = 0; j < table.rows[i].cells.length; j++) {
            let cell = ''
            j == i ?  cell = value : cell = 0
            rowCells += `<td><input type="number" class="form-control border-radius-0" value= '${cell}'></td>`
        }
        tableResult.insertRow(-1).innerHTML = rowCells
    }
}