$('.answerA').hide()
$('.answerB').hide()
$('#plus').hide()
$('#minus').hide()
$('#times').hide()
$('#equal').hide()
$('#delResult').hide()

//show Answer Matrix
function optionChanged(matrixName, value){
    $(`.answer${matrixName}`).slideUp()
    $(`.answer${matrixName}${value}`).slideDown('slow')
}

//swap table
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