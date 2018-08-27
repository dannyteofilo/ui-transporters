import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Jumbotron, Card } from "reactstrap";
import NavComponent from "components/nav-bar/NavBar";
import Home from "modules/home/Home";
import Vehicles from "modules/vehicles/components/list/Vehicles";
import Drivers from "modules/drivers/Drivers";
import Routes from "modules/routes/Routes"
import Profile from 'modules/user/profile/Profile'
import Auth from "services/AuthService";

import "./styles.css";

class Admin extends Component {
  logout() {
    return Auth.logout() && this.props.history.replace("/auth/login");
  }
  render() {
    return (
      <div>
        <NavComponent logout={() => this.logout()} />
        <main>
          {/* <Jumbotron> */}
            <div className="container">
            <Card>
              <Switch>
                <Route path={"/home"} name="home" component={Home} />
                <Route
                  path="/vehicles"
                  name="vehicles"
                  component={Vehicles}
                />
                <Route
                  path="/drivers"
                  name="drivers"
                  component={Drivers}
                />
                <Route
                  path="/routes"
                  name="routes"
                  component={Routes}
                />
                <Route path={"/profile"} name="profile" component={Profile}/>
                <Redirect from="/" to="/home" />
              </Switch>
            </Card>
            </div>
          {/* </Jumbotron> */}
        </main>
      </div>
    );
  }
}

export default Admin;
