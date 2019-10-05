import React from 'react';
import * as R from 'ramda';
import Cell from './Cell';

const mapIndexed = R.addIndex(R.map)

class GridView extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    
    renderTd(item, x, y) {
        const key = `${x},${y}`
        const cell = <Cell key={key} plotCell={this.props.plotCell} item={item} x={x} y={y}/>;
        return cell;
    }

    renderTr(objects, x) {
        const tds = mapIndexed((val, y) => this.renderTd(val, x, y), objects);
        return <tr key={x}>{tds}</tr>;
    }

    renderTable(table) {
        const tr = mapIndexed((val, x) => this.renderTr(val, x), table)
        return <table><tbody>{tr}</tbody></table>
    }

    render() {
        return <div>{this.renderTable(this.props.table.table)}</div>;
    }
}

export default GridView;