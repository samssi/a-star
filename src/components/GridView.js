import React from 'react';
import * as R from 'ramda';
import Table from './Table';
import ModeSelector from './ModeSelector'

class GridView extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <div>
                 <Table {...this.props} />
                 <ModeSelector {...this.props} />
               </div>;
    }
}

export default GridView;