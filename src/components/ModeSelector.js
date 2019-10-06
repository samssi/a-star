import React from 'react';
import Mode from './Mode'
import * as modes from '../redux/modes'

class ModeSelector extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    /*const STEP = "Step"
const OBSTACLE = "Obstacle"
const START = "Start"
const END = "End"*/
    render() {
        return <div className="modeSelection">
                <Mode {...this.props} mode={modes.STEP}/>
                <Mode {...this.props} mode={modes.START}/>
                <Mode {...this.props} mode={modes.END}/>
                <Mode {...this.props} mode={modes.OBSTACLE}/>
               </div>;
    }
}

export default ModeSelector;