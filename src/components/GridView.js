import React from 'react';
import * as R from 'ramda';
import Cell from './Cell';

class GridView extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    
    renderTd(item, x, y) {
        return <Cell item={item} x={x} y={y}/>;
    }

    renderTr(objects, y) {
        return <tr>{R.map(array => this.renderTd(array, 0, y), objects)}</tr>;
    }

    renderTable() {
        const tr = R.map(row => this.renderTr(row), this.props.table.table)
        return <table><tbody>{tr}</tbody></table>
    }

    render() {
        return <div>{this.renderTable()}</div>;
    }
}

export default GridView;