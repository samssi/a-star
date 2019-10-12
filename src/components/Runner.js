import React from 'react';

class Runner extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <span>
                 <span className="modeSelect">Full speed</span>
                 <span className="modeSelect" onClick={() => this.props.nextStep()}>Next step</span>
                 <span className="modeSelect">Every 500ms</span>
               </span>
                
    }
}

export default Runner;