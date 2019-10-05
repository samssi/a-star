import React from 'react';
import * as R from 'ramda';
import Cell from './Cell';

class GridView extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    
    renderTd(item, x, y) {
        console.log("item: " + item);
        console.log("x: " + x);
        console.log("y: " + y);
        const cell = <Cell item={item} x={x} y={y}/>;
        return cell;
    }

    renderTr(objects, y) {
        const tds = R.map(cells => this.renderTd(cells, 0, y), objects);
        return <tr>{tds}</tr>;
    }

    renderTable() {
        const mapIndexed = R.addIndex(R.map)
        const tr = mapIndexed((val, idx) => this.renderTr(val, idx), this.props.table.table)
        return <table><tbody>{tr}</tbody></table>
    }

    render() {
        return <div>{this.renderTable()}</div>;
    }
}

export default GridView;