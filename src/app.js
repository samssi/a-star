import "./main.css"
import * as R from 'ramda'

const rootElement = document.getElementById("root");

// 0 free slot
// 1 obstacle
// 8 start
// 9 end
const objects = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 8, 0, 0, 0],
    [0, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 9, 0],
    [0, 0, 0, 0, 0, 0]
];

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

const createDataElement = (item) => {
    const td = document.createElement("td");
    td.bgColor = setCellColor(td, item);
    return td;
}

const row = array => {
    const tr = document.createElement("tr");
    R.forEach(item => tr.appendChild(createDataElement(item)), array)
    return tr;
}

const tr = () => {

    const table = R.map(row, objects);
    console.log(table);
    return table;
}

const main = () => {
    const table = document.createElement("table");
    rootElement.appendChild(table);
    R.forEach(row => table.appendChild(row), tr());
}

main()