import React from 'react';

class Toggler extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <span className="modeSelect">Edit</span>;
    }
}

export default Toggler;