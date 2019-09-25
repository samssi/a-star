import * as R from 'ramda'

const objectColors = {
    0: "white",
    1: "grey",
    8: "lightgreen",
    9: "lightblue"
}

const tableColumn = (content) => {
    const col = document.createElement("div");
    col.innerHTML = content || "&nbsp;";
    col.className = "column";
    return col;
}

const tableRow = (contentLeft, contentMiddle, contentRight) => {
    const row = document.createElement("div");
    row.className = "row";

    row.appendChild(tableColumn(contentLeft));
    row.appendChild(tableColumn(contentMiddle));
    row.appendChild(tableColumn(contentRight));
    
    return row;
}

// f = g + h
// g = distance from starting point
// h = distance from end point
const pointCell = () => {
    const div = document.createElement("div");
    div.appendChild(tableRow("15", "10", "15"));
    div.appendChild(tableRow("10", "total", "10"));
    div.appendChild(tableRow("15", "10", "15"));
    return div;
} 

const setCellColor = (td, cellValue) => {
    if (cellValue == 9) {
        td.appendChild(pointCell());
    }
    return objectColors[cellValue];
}

const td = (item) => {
    const td = document.createElement("td");
    td.bgColor = setCellColor(td, item);
    return td;
}

const tr = array => {
    const tr = document.createElement("tr");
    R.forEach(item => tr.appendChild(td(item)), array)
    return tr;
}

const renderTr = (objects) => {
    const table = R.map(tr, objects);
    return table;
}

export const renderTable = (objects, parent) => {
    const table = document.createElement("table");
    parent.appendChild(table);
    R.forEach(row => table.appendChild(row), renderTr(objects));
    return table;
}