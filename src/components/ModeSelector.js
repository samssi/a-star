import React from 'react';
import Editor from './Editor'
import ModeToggler from './ModeToggler'
import * as objectTypes from '../redux/objectTypes'
import * as modes from '../redux/modes'

class ModeSelector extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    renderRunner() {
        return <span></span>
    }

    renderEditor() {
        return <span>
            <Editor {...this.props} objectValue={objectTypes.START.value} objectDescription={objectTypes.START.description} />
            <Editor {...this.props} objectValue={objectTypes.END.value} objectDescription={objectTypes.END.description} />
            <Editor {...this.props} objectValue={objectTypes.OBSTACLE.value} objectDescription={objectTypes.OBSTACLE.description} />
            <Editor {...this.props} objectValue={objectTypes.FREE.value} objectDescription={objectTypes.FREE.description} />
        </span>       
    }

    renderMode() {
        return this.props.table.mode === modes.STEP ? this.renderRunner() : this.renderEditor()
    }

    render() {
        return <div className="modeSelection">
                <ModeToggler {...this.props} />
                {this.renderMode()}
               </div>;
    }
}

export default ModeSelector;