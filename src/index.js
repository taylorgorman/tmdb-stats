import React from "react";
import ReactDOM from "react-dom"

import "./styles/index.scss"
import { Provider } from "./Context"
import App from "./components/App"


ReactDOM.render(
  <Provider><App /></Provider>,
  document.getElementById( "root" )
)