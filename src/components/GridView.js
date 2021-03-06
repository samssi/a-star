import React from 'react';
import Table from './Table';
import ModeSelector from './ModeSelector';
import StepInfo from './StepInfo';

const gridStyle = {
  margin: "0 auto"
};

class GridView extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <div style={gridStyle}>
                 <Table {...this.props} />
                 <ModeSelector {...this.props} />
                 <StepInfo {...this.props} />
               </div>;
    }
}

export default GridView;