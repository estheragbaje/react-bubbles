import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";

import Login from "./components/Login";
import "./styles.scss";
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from "./components/BubblePage";

function App() {
  return (
    <ThemeProvider>
      {/* <CSSReset /> */}
      <Router>
        <div className="App">
          <Route exact path="/" component={Login} />
          {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
          <PrivateRoute
            exact
            path="/bubbles"
            render={props => <BubblePage {...props} />}
          />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
