import React from "react";
import ReactTooltip from "react-tooltip";
import * as objectTypes from "../redux/objectTypes";

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

class Cell extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    setCellColor(cellValue) {
        return objectColors[cellValue];
    }

    selectCell(x, y) {
        this.props.plotCell(x, y, objectTypes.OBSTACLE);
    }

    render() {
        const coordinates = `(${this.props.x},${this.props.y})`
        return (
            <td data-tip={coordinates} onClick={() => this.selectCell(this.props.x, this.props.y)} style={objectColor(this.setCellColor(this.props.item))}>
                <ReactTooltip />
                {coordinates}
            </td>
        );
    }
}

export default Cell;