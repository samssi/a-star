import React from 'react';

const tableStyle = {
  fontSize: "10px"
}

class CellValues extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return <table style={tableStyle}>
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
                  <td>10</td>
                  <td>15</td>
                  <td>10</td>
                </tr>
              </tbody>
            </table>
  }
}

export default CellValues;