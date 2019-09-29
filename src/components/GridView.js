import React from 'react';
import * as R from 'ramda'
import Cell from './Cell'
import { connect } from "react-redux";

const objectColor = (color) => {
    return {
        backgroundColor: color
    }
}

const objectColors = {
    0: "white",
    1: "grey",
    8: "lightgreen",
    9: "lightblue"
}

class GridView extends React.Component {
    constructor(props, context) {
        super(props, context);
        //console.log(this.props.table);
    }

    setCellColor(cellValue) {
        return objectColors[cellValue];
    }
    
    renderTd(item) {
        return <td style={objectColor(this.setCellColor(item))}>{item}</td>;
    }

    renderTr(objects) {
        return <tr>{R.map(array => this.renderTd(array), objects)}</tr>;
    }

    renderTable() {
        const some = R.map(row => this.renderTr(row), this.props.table.table)
        console.log(some)
        return <table><tbody>{some}</tbody></table>
    }

    render() {
        return <div>{this.renderTable()}</div>;
    }
}

export default GridView;