import React from 'react';

class Runner extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <span style={this.selected()} className="modeSelect" onClick={() => this.props.editType(this.props.objectValue)} >{this.props.objectDescription}</span>;
    }
}

export default Editor;