//A + B
function plusAnB(calculation = '+', tableIDA = 'matrixA', tableIDB = 'matrixB', tableResultID = 'resultC') {
    const tableA = document.getElementById(tableIDA)
    const tableB = document.getElementById(tableIDB)
    const resultC = document.getElementById(tableResultID)
    if(tableA.rows.length == tableB.rows.length && tableA.rows[0].cells.length == tableB.rows[0].cells.length){
        refreshMatrixResult(calculation)
        for (let i = 0; i < tableA.rows.length; i++) {
            const rowA = tableA.rows[i]
            const rowB = tableB.rows[i]
            let rowCells = ''
            for (let j = 0; j < rowA.cells.length; j++) {
                const cellA = Number(rowA.cells[j].firstChild.value)
                const cellB = Number(rowB.cells[j].firstChild.value)
                calculation == '+'
                ? rowCells += `<td><input type="number" class="form-control border-radius-0" value= '${cellA + cellB}'></td>`
                : rowCells += `<td><input type="number" class="form-control border-radius-0" value= '${cellA - cellB}'></td>`
            }
            resultC.insertRow(-1).innerHTML = rowCells
        }
    } else {
        $('#resultHeader').replaceWith('<h5 id="resultHeader" class="text-warning">*Kích cỡ ma trận A phải bằng ma trận B</h5>')
        hideResult()
    }
}

// A times B
function AtimesB(matrixL = 'matrixA', matrixR = 'matrixB', matrixResult = 'resultC', pow = false) {
    const tabA = document.getElementById(matrixL)
    const tabB = document.getElementById(matrixR)
    const resC = document.getElementById(matrixResult)
    if (tabA.rows[0].cells.length == tabB.rows.length) {
        pow ? {} : refreshMatrixResult('*')
        for (let tabArow of tabA.rows) {
            let newCellC = ''
            for (let j = 0; j < tabA.rows[0].cells.length; j++) {
                let cellC = 0
                for (let k = 0; k < tabB.rows.length; k++) {
                    cellC += tabArow.cells[k].firstChild.value * tabB.rows[k].cells[j].firstChild.value
                }
                newCellC += `<td><input type="number" class="form-control border-radius-0" value= '${cellC}'></td>`
            }
            resC.insertRow(-1).innerHTML = newCellC
        }
    } else{
        $('#resultHeader').replaceWith('<h5 id="resultHeader" class="text-warning">*Số cột của ma trận A phải bằng số hàng của ma trận B</h5>')
        hideResult()
    }
}

//Raiser to the power of value 
function powMatrix(tableID, powValue, tableResultID){
    if(powValue < -1){
        return document.getElementById(tableResultID).insertRow(-1).innerHTML = `<td><p>SORRY, NO TECHNICAL SUPPORT HERE 07</p></td>`
    } else if (powValue < 2){
        switch(powValue){
        case -1:
            document.getElementById(tableResultID).insertRow(-1).innerHTML = `<td><p>TÌM ĐỊNH THỨC KHÁC 0</p></td>`
            break
        case 0:
            identityMatrix(tableID, 1, tableResultID)
            break
        case 1:
            copyMatrixTo(tableID, tableResultID)
            break
        }
    } else{
        copyMatrixTo(tableID, 'tempA')
        powValue = powValue - 2
        for (let i = 0; i < powValue; i++) {
            if (i % 2 == 0) {
                AtimesB('tempA', tableID, 'tempB', true)
                delTable('tempA')
            } else {
                AtimesB('tempB', tableID, 'tempA', true)
                delTable('tempB')
            }
        }
        if (powValue % 2 == 0) {
            AtimesB('tempA', tableID, tableResultID, true)
            delTable('tempA')
        } else {
            AtimesB('tempB', tableID, tableResultID, true)
            delTable('tempB')
        }
    }
}

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
