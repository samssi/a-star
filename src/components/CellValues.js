import React from 'react';
import * as objectTypes from "../redux/objectTypes";

const contentStyle = {
  fontSize: "10px"
};

const leftCellStyle = {
  textAlign: "left",
  width: "33%"
};

const centerCellStyle = {
  textAlign: "center",
  width: "33%"
};

const rightCellStyle = {
  textAlign: "right",
  width: "33%"
};

class CellValues extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  directionCosts(item) {
    return <table style={contentStyle}>
      <tbody>
      <tr>
        <td style={leftCellStyle}>{item.gCost}</td>
        <td style={centerCellStyle}>&nbsp;</td>
        <td style={rightCellStyle}>{item.hCost}</td>
      </tr>
      <tr>
        <td style={leftCellStyle}>&nbsp;</td>
        <td style={centerCellStyle}>{item.fCost}</td>
        <td style={rightCellStyle}>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
      </tr>
      </tbody>
    </table>
  }

  empty() {
    return <div>&nbsp;</div>
  }

  objectTypeEquals(item, objectType) {
    return item.value === objectType.value;
  }

  openOrClosedObjectType() {
    return this.objectTypeEquals(this.props.item, objectTypes.OPEN())
        || this.objectTypeEquals(this.props.item, objectTypes.CLOSED());
  }

  render() {
    if (this.openOrClosedObjectType()) {
      return this.directionCosts(this.props.item);
    }
    else {
      return this.empty();
    }
  }
}

export default CellValues;