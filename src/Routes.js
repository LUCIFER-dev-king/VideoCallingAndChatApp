import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import SignUp from "./auth/signup";
import SignIn from "./auth/signin";
import Home from "./pages/Home";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/signup' exact component={SignUp} />
        <Route path='/signin' exact component={SignIn} />
      </Switch>
    </Router>
  );
};

export default Routes;
