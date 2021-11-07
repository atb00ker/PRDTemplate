import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Navbar } from './components/Common/Navbar';
import { RouterPath } from './enums/UrlPath';
import { AuthProvider } from './components/Authentication/AuthProvider';
import { Login } from './pages/Login/Login';
import { SignUp } from './pages/SignUp/SignUp';
import { Home } from './pages/Home/Home';
import './index.scss';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path={RouterPath.SignUp} component={SignUp} />
          <Route exact path={RouterPath.Login} component={Login} />
          <Route exact path={RouterPath.Home} component={Home} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('react-init'));
