import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Jumbotron } from 'reactstrap'
import NavComponent from 'components/nav-bar/NavBar';
import Home from 'modules/home/Home';
import Dashboard from 'modules/dashboard/Dashboard';
import Auth from 'services/AuthService'

import './styles.css'

class Admin extends Component {

    logout() {
        return Auth.logout() && this.props.history.replace('/auth/login');
    }
    render() {
        return (
            <div className="container">
                <NavComponent
                    logout={() => this.logout()}
                />
                <main >
                    <Jumbotron>
                        <Switch>
                            <Route path={"/home"} name="home" component={Home} />
                            <Route path="/dashboard" name="dashboard" component={Dashboard} />
                            <Redirect from="/" to="/home" />
                        </Switch>
                    </Jumbotron>
                </main>
            </div>
        )
    }
}

export default Admin;