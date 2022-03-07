import { createElement, render } from "preact";
import { App } from "./App";

import "./style.css";

let initial = createElement("div", { id: "root" }, App, "hello");

render(<App />, document.body);
