import React from 'react';
import * as R from 'ramda';
import Table from './Table';

class ModeSelector extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <div className="modeSelection">
                <span className="modeSelect">Step</span>
                <span className="modeSelect">Obstacle</span>
                <span className="modeSelect">Start</span>
                <span className="modeSelect">End</span>
               </div>;
    }
}

export default ModeSelector;