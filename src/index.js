import React from "react";
import ReactDom from "react-dom";

import { Provider } from "react-redux";
import store from "./redux/store"

import AStarApp from "./AStarApp";

const rootElement = document.getElementById("root");

ReactDom.render(
    <Provider store={store}>
        <AStarApp />
    </Provider>,
    rootElement
)
