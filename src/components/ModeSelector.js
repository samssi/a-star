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
        return <Runner />
    }

    renderObjectTypes() {
        return R.map(element => <Editor key={element.value} {...this.props} objectValue={element.value} objectDescription={element.description} objectColor={element.color}/>, objectTypes.allTypes);
    }

    renderEditor() {
        return <span>
            {this.renderObjectTypes()}
        </span>       
    }

    renderMode() {
        return this.props.table.mode === modes.RUN ? this.renderRunner() : this.renderEditor()
    }

    render() {
        return <div className="modeSelection">
                <ModeToggler {...this.props} />
                {this.renderMode()}
               </div>;
    }
}

export default ModeSelector;