import React from 'react';
import * as R from 'ramda';
import Cell from './Cell';

class GridView extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    
    renderTd(item) {
        return <Cell item={item}/>;
    }

    renderTr(objects) {
        return <tr>{R.map(array => this.renderTd(array), objects)}</tr>;
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