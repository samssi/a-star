import React from 'react';

class Editor extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <span className="modeSelect" onClick={() => this.props.editType(this.props.objectValue)} >{this.props.objectDescription}</span>;
    }
}

export default Editor;