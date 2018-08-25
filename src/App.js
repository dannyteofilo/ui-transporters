import React, { Component } from 'react';
import { HashRouter,Switch,Route } from 'react-router-dom'
import logo from './logo.svg';
import Admin from './layouts/AdminLayout'
import Login  from './shared/login/Login'
import Regiter from './shared/register/Register'
import RouteSaved from 'components/hocs/RouteSaved'

import { Provider } from "react-redux";
import { getStore } from "./shared/redux/store";

class App extends Component {
  render() {
    console.log(getStore())
    return (
      <Provider store={getStore()}>
      <div >
      <HashRouter>
                    <Switch>
                        <Route path="/auth/login" component={ Login } />
                        <Route path="/auth/register" component={ Regiter } />
                        <RouteSaved path="/" component={ Admin } />
                    </Switch>
                </HashRouter>
      </div>
      </Provider>
    );
  }
}

export default App;
