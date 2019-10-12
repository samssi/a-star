import React from "react";
import ReactTooltip from "react-tooltip";
import * as objectTypes from "../redux/objectTypes";

const objectColor = (color) => {
    return {
        border: "1px solid black",
        textAlign: "center",
        overflow: "hidden",
        whiteSpace: "nowrap",
        backgroundColor: color
    }
}

class Cell extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    setCellColor(cellValue) {
        return objectTypes.findByValue(cellValue).color;
    }

    selectCell(x, y) {
        this.props.plotCell(x, y, objectTypes.OBSTACLE);
    }

    render() {
        const coordinates = `(${this.props.x},${this.props.y})`;
        return (
            <td data-tip={coordinates} onClick={() => this.selectCell(this.props.x, this.props.y)} style={objectColor(this.setCellColor(this.props.item))}>
                <ReactTooltip />
                {coordinates}
            </td>
        );
    }
}

export default Cell;