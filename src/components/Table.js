import React from 'react';
import * as R from 'ramda';
import Cell from './Cell';

const tableStyle = {
    margin: 0,
    padding: 0,
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
        const cell = <Cell key={key} {...this.props} item={item} x={x} y={y} />;
        return cell;
    }

    renderTr(items, y) {
        const tds = mapIndexed((item, x) => this.renderTd(item, x, y), items);
        return <tr key={y}>{tds}</tr>;
    }

    renderTable(table) {
        const tr = mapIndexed((val, y) => this.renderTr(val, y), table);
        return <table style={tableStyle}><tbody>{tr}</tbody></table>
    }

    render() {
        return <div>{this.renderTable(this.props.table.table)}</div>;
    }
}

export default Table;