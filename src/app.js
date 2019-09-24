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
    [0, 0, 0, 0, 9, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
];

const objectColors = {
    0: "white",
    1: "grey",
    8: "lightgreen",
    9: "lightblue"
}

const setCellColor = (cellValue) => {
    return objectColors[cellValue];
}

const createDataElement = (item) => {
    const td = document.createElement("td");
    td.bgColor = setCellColor(item);
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