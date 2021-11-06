import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        {/* <Route exact path="/" component={Home} /> */}
      </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('react-init'));
