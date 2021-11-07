import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar } from "./components/Common/Navbar";
import { Login } from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";
import { RouterPath } from "./enums/UrlPath";
import { AuthProvider } from "./components/Authentication/AuthProvider";
import "./index.scss";

const App = () => {
  return (
     <AuthProvider>
    <Router>
      <Navbar />
      <Switch>
        <Route exact path={RouterPath.Login} component={Login} />
        <Route exact path={RouterPath.Home} component={Home} />
      </Switch>
    </Router>
    </AuthProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("react-init"));
