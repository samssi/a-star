import React from 'react';
import * as R from 'ramda';
import Cell from './Cell';

const tableStyle = {
    margin: 0,
    padding: 0,
    fontSize: "8px",
    width: "100%",
    height: "50%",
    border: "1px solid black",
    borderCollapse: "collapse",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
};

const mapIndexed = R.addIndex(R.map)

class Table extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    renderTd(item, x, y) {
        const key = `${x},${y}`
        const cell = <Cell key={key} {...this.props} item={item} x={x} y={y}/>;
        return cell;
    }

    renderTr(objects, x) {
        const tds = mapIndexed((val, y) => this.renderTd(val, x, y), objects);
        return <tr key={x}>{tds}</tr>;
    }

    renderTable(table) {
        const tr = mapIndexed((val, x) => this.renderTr(val, x), table)
        return <table style={tableStyle}><tbody>{tr}</tbody></table>
    }

    render() {
        return <div>{this.renderTable(this.props.table.table)}</div>;
    }
}

export default Table;