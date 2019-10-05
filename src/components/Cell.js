import React from 'react';
import ReactTooltip from 'react-tooltip'

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

    render() {
        const coordinates = `(${this.props.x},${this.props.y})`
        return (
            <td data-tip={coordinates} style={objectColor(this.setCellColor(this.props.item))}>
                <ReactTooltip />
                {coordinates}
            </td>
        );
    }
}

export default Cell;