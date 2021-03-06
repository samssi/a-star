import React from 'react';
import Editor from './Editor';
import Runner from './Runner';
import ModeToggler from './ModeToggler';
import * as R from 'ramda';
import * as objectTypes from '../redux/objectTypes';
import * as modes from '../redux/modes';

class ModeSelector extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    renderRunner() {
        return <Runner {...this.props} />
    }

    renderObjectTypes() {
        return R.map(element => <Editor key={element.value} {...this.props} object={element} />, objectTypes.allTypes);
    }

    renderEditor() {
        return <span>
            {this.renderObjectTypes()}
        </span>       
    }

    renderMode() {
        return this.props.main.mode === modes.RUN ? this.renderRunner() : this.renderEditor()
    }

    render() {
        return <div className="modeSelection">
                <ModeToggler {...this.props} />
                {this.renderMode()}
               </div>;
    }
}

export default ModeSelector;