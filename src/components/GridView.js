import React from 'react';
import * as R from 'ramda';
import Cell from './Cell';

const mapIndexed = R.addIndex(R.map)

class GridView extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    
    renderTd(item, x, y) {
        const cell = <Cell item={item} x={x} y={y}/>;
        return cell;
    }

    renderTr(objects, y) {
        const tds = mapIndexed((val, idx) => this.renderTd(val, idx, y), objects);
        return <tr>{tds}</tr>;
    }

    renderTable() {
        const tr = mapIndexed((val, idx) => this.renderTr(val, idx), this.props.table.table)
        return <table><tbody>{tr}</tbody></table>
    }

    render() {
        return <div>{this.renderTable()}</div>;
    }
}

export default GridView;