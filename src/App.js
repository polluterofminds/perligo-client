import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import PrivateRoute from './components/PrivateRoute';
import Alert from './components/Alert';
import Home from './components/Home';
import Verify from './components/Verify';
//  Redux
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { checkSession } from './actions/auth';

const token = localStorage.token;
if(token) {
  setAuthToken(token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(checkSession());
  }, []);
  return (
    <Provider store={store}>
      <Alert />
      <Fragment>
        <Router>
          <Fragment>
            {/* <PrivateRoute path='/' component={Navbar} /> */}
            <section>
              <Switch>
                <PrivateRoute exact path='/' component={Home} />
                <Route exact path='/verify' component={Verify} />
              </Switch>
            </section>
          </Fragment>
        </Router>
      </Fragment>
    </Provider>
  )
};

export default App;
