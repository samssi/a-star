import React from 'react';
import * as objectTypes from "../redux/objectTypes";

const contentStyle = {
  fontSize: "10px",
  textAlign: "center"
};

class CellValues extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  directionCosts() {
    return <table style={contentStyle}>
      <tbody>
      <tr>
        <td>15</td>
        <td>10</td>
        <td>15</td>
      </tr>
      <tr>
        <td>10</td>
        <td>100</td>
        <td>10</td>
      </tr>
      <tr>
        <td>15</td>
        <td>10</td>
        <td>15</td>
      </tr>
      </tbody>
    </table>
  }

  empty() {
    return <div>&nbsp;</div>
  }


  render() {
    const objectType = objectTypes.findByValue(this.props.item)
    if (objectType === objectTypes.START) {
      return this.directionCosts();
    }
    else {
      return this.empty();
    }
  }
}

export default CellValues;