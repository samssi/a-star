import React from 'react';

class Mode extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <span className="modeSelect">{this.props.mode}</span>;
    }
}

export default Mode;