import React from 'react';

class Editor extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <span className="modeSelect">{this.props.objectDescription}</span>;
    }
}

export default Editor;