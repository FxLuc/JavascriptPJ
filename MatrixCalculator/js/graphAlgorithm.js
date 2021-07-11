function coverTableToMatrix(tableID){
    let table = document.getElementById(tableID)
    let matrixResult = []
    for (const row of table.rows) {
        let col = []
        for (const cell of row.cells) {
            col.push(Number(cell.firstChild.value))
        }
        matrixResult.push(col)
    }
    return matrixResult
}

function dijkstraFalseList(shortestDistances, addedVertices, nVertices ){
    for (let i = 0; i < nVertices; i++) {
      shortestDistances[i] = +Infinity
      addedVertices[i] = false;
    }
    return shortestDistances + addedVertices
}

function dijkstraUpdateVertices(adjacencyMatrix, shortestDistance, shortestDistances, parents, nearestVertex, nVertices, rowCells){
    let cell = ''
    for (let k = 0; k < nVertices; k++) {
        let edgeDistance = adjacencyMatrix[nearestVertex][k]
        if (edgeDistance > 0 && ((shortestDistance + edgeDistance) < shortestDistances[k])) {
            parents[k] = nearestVertex
            shortestDistances[k] = shortestDistance + edgeDistance
            cell+= (`<strong> (${shortestDistances[k]},${coverNumToAlpha(k)}) </strong>`)
        } else {
            cell += (`(${(shortestDistances[k] == Infinity)? '&infin;' :shortestDistances[k]},${coverNumToAlpha(k)}) `)
        }
    }
    rowCells.push(cell)
    return shortestDistances + parents + rowCells
}

function dijkstra(tableID ,startVertex, tablResultID) {
    let adjacencyMatrix = coverTableToMatrix(tableID)
    let rowCells = []
    let nVertices = adjacencyMatrix.length  //số đỉnh
    let shortestDistances = new Array(nVertices) //mảng khoảng cách ngắn nhất
    let addedVertices = new Array(nVertices)
    dijkstraFalseList(shortestDistances, addedVertices, nVertices )

    shortestDistances[startVertex] = 0
    let parents = new Array(nVertices)
    const NO_PARENT = -1
    parents[startVertex] = NO_PARENT
    for (let i = 1; i < nVertices; i++) {
        let nearestVertex = -1
        let shortestDistance = +Infinity
        for (let j = 0; j < nVertices; j++) {
            if (!addedVertices[j] && shortestDistances[j] < shortestDistance) {
                nearestVertex = j
                shortestDistance = shortestDistances[j]
            }
        }
        addedVertices[nearestVertex] = true
        dijkstraUpdateVertices(adjacencyMatrix, shortestDistance, shortestDistances, parents, nearestVertex, nVertices, rowCells)
    }
    mkTableResultDijkstra(startVertex, shortestDistances, parents, tablResultID, rowCells)
}

function mkTableResultDijkstra(startVertex, distances, parents, tablResultID, rowCells) {
    let tableResult = document.getElementById(tablResultID)
    let nVertices = distances.length
    tableResult.insertRow(-1).innerHTML = `<th scope="col">Đỉnh (Vertex)</th><th scope="col">Khoảng cách (Distance)</th><th scope="col">Đường đi (Path)</th><th scope="col">Các bước (Step by step)</th>`
    for (let i = 0; i < nVertices; i++) {
        if (i != startVertex) {
            tableResult.insertRow(-1).innerHTML =
            `<td>${coverNumToAlpha(startVertex)} -> ${coverNumToAlpha(i)}</td>
            <td>${distances[i]}</td>
            <td>${printDijkstraPath(i, parents)}</td>
            <td>${(startVertex == 0)? rowCells[i -1] : rowCells[i]}</td>`
        }
    }
}

function printDijkstraPath(currentVertex,parents) {
    const NO_PARENT = -1
    if (currentVertex == NO_PARENT) {
        return ''
    }
    return (`${printDijkstraPath(parents[currentVertex], parents)} ${coverNumToAlpha(currentVertex)}`)
}

function coverNumToAlpha(number){
    const alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K']
    for (const alphaIndex in alpha) {
        if (alphaIndex == number) {
            return alpha[alphaIndex]
        }
    }
}