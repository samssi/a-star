import React from 'react';
import Editor from './Editor'
import Toggler from './Toggler'
import * as objectTypes from '../redux/objectTypes'

class ModeSelector extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <div className="modeSelection">
                <Toggler />
                <Editor {...this.props} objectValue={objectTypes.START.value} objectDescription={objectTypes.START.description} />
                <Editor {...this.props} objectValue={objectTypes.END.value} objectDescription={objectTypes.END.description} />
                <Editor {...this.props} objectValue={objectTypes.OBSTACLE.value} objectDescription={objectTypes.OBSTACLE.description} />
                <Editor {...this.props} objectValue={objectTypes.FREE.value} objectDescription={objectTypes.FREE.description} />
               </div>;
    }
}

export default ModeSelector;