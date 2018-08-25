import React from 'react'
import Auth from 'services/AuthService';
import { Route, Redirect } from 'react-router-dom';

const RouteSaved = ({ component: Component, ...rest }) => {
    const wrapped = (props) => {
        return Auth.isAuthenticated()
            ? <Component { ...props } />
            : <Redirect to={ { pathname: '/auth/login', state: { from: props.location } } } />
    }

    return <Route { ...rest } render={ wrapped }/>
}

export default RouteSaved;