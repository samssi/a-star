import React from "react";

export default class StepInfo extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return <div className="stepInfo">{this.props.main.stepInfo}</div>
    }
}