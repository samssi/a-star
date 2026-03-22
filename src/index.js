import React from "react";
import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";
import store from "./redux/store"

import AStarApp from "./AStarApp";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <Provider store={store}>
        <AStarApp />
    </Provider>
)
