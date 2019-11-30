import React from "react";
import ReactTooltip from "react-tooltip";
import * as objectTypes from "../redux/objectTypes";
import CellValues from "./CellValues"

const objectColor = (color) => {
    return {
        border: "1px solid black",
        textAlign: "center",
        overflow: "hidden",
        whiteSpace: "nowrap",
        backgroundColor: color,
        width: "59px",
        height: "59px"
    }
}

class Cell extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    setCellColor(cellValue) {
        return cellValue.color;
    }

    selectCell(x, y) {
        this.props.plotCell(x, y);
    }

    render() {
        const coordinates = `(${this.props.x},${this.props.y})`;

        return (
            <td data-tip={coordinates} onClick={() => this.selectCell(this.props.x, this.props.y)} style={objectColor(this.setCellColor(this.props.item))}>
              <CellValues {...this.props} />
              <ReactTooltip />
            </td>
        );
    }
}

export default Cell;