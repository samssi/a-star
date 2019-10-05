import React from 'react';

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
        return (
            <td style={objectColor(this.setCellColor(this.props.item))}>{this.props.item}</td>
        );
    }
}

export default Cell;