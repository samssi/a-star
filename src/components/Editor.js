import React from 'react';

const selectedStyle = (color) => {
    return {
        backgroundColor: color
    }
};

class Editor extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    selected() {
        return this.props.table.editObjectType.value === this.props.object.value ? selectedStyle(this.props.object.color) : selectedStyle("white");
    }

    render() {
        return <span key={this.props.objectValue} style={this.selected()} className="modeSelect" onClick={() => this.props.editType(this.props.object)} >{this.props.object.description}</span>;
    }
}

export default Editor;