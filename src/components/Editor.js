import React from 'react';

const selectedStyle = (color) => {
    return {
        backgroundColor: color
    }
}

class Editor extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    selected() {
        return this.props.table.editObjectType === this.props.objectValue ? selectedStyle(this.props.objectColor) : selectedStyle("white");
    }

    render() {
        return <span style={this.selected()} className="modeSelect" onClick={() => this.props.editType(this.props.objectValue)} >{this.props.objectDescription}</span>;
    }
}

export default Editor;