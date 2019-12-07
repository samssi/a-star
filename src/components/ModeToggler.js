import React from 'react';

class ModeToggler extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <span className="modeSelect" onClick={() => this.props.toggleMode(this.props.main.mode)}>{this.props.main.mode}</span>;
    }
}

export default ModeToggler;