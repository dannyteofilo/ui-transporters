import React, { Component } from 'react';
import Auth from 'services/AuthService';
import { Redirect } from 'react-router-dom';
import { Card, CardTitle, Button, FormGroup } from 'reactstrap'
import FormRow from 'components/form-row/FormRow'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from './redux/actions'




import './styles.css'
class Login extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(e) {
        e.preventDefault()
        let add = {
            email: this.refs.email.getValue(),
            password: this.refs.pass.getValue(),
            gettoken:true
        }
        this.props.dispatch(actions.fetch(add));
        // this.refs.email.setValue(),
        // this.refs.pass.setValue()

    }

    render() {

        const { from } = this.props.location.state || { from: { pathname: '/home' } }
        console.log('From:  ', from)
        console.log('istokenExpire: ',Auth.isAuthenticated())
        if (Auth.isAuthenticated()) {
            return (
                <Redirect to={from} />
            )
        }
        return (
            <div className="section-login">

                <div className="content-login">
                    <div className="login-content">
                        <Card>
                            <form onSubmit={this.onSubmit}>
                                <CardTitle className="submit">Login</CardTitle>
                                <FormRow inputType='text' labelText='Email' isRequired={true} ref='email' />
                                <FormRow inputType='password' labelText='Password' isRequired={true} ref='pass' />
                                <FormGroup className="submit">
                                    <Button color="primary" size="lg">Login</Button>
                                </FormGroup>
                            </form>

                            <div className="link-login">
                                <p style={{marginTop:'8px'}}>Create an account?</p>
                            <Link
                                to="/auth/register"
                                className="nav-link"
                            >
                                Sign up
                            </Link>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}


export default connect((store) => {
    const { login } = store;

    return {
        requesting: login.requesting,
        error: login.error,
        response: login.response,
        token: login.token
    }
})(Login);

