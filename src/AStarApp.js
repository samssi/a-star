import React from "react";
import "./main.css";

import Grid from "./container/Grid"

class AStarApp extends React.Component {
  render() { 
    return (
      <div className="astar-app">
        <Grid />
      </div>
    );
  }
}

export default AStarApp;