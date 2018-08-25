import React, { Component } from 'react';
import Auth from 'services/AuthService';
import { Redirect } from 'react-router-dom';
import { Card, CardTitle, Button, FormGroup } from 'reactstrap'
import FormRow from 'components/form-row/FormRow';
import { Link } from 'react-router-dom'



import './styles.css'
class Register extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(e) {
        e.preventDefault()
        let add = {
            email: this.refs.email.getValue(),
            password: this.refs.pass.getValue()
        }
        this.refs.email.setValue(),
            this.refs.pass.setValue()

    }

    render() {

        const { from } = this.props.location.state || { from: { pathname: '/home' } }
        console.log('From:  ', from)
        if (Auth.isAuthenticated()) {
            return (
                <Redirect to={from} />
            )
        }
        return (
            <div className="section-register">

                <div className="content-register">
                    <div className="register-content">
                        <Card>
                            <form onSubmit={this.onSubmit}>
                                <CardTitle className="submit">Register</CardTitle>
                                <FormRow inputType='text' labelText='Name' isRequired={true} ref='name' />
                                <FormRow inputType='email' labelText='Email' isRequired={true} ref='email' />
                                <FormRow inputType='password' labelText='Password' isRequired={true} ref='pass' />
                                <FormGroup className="submit">
                                    <Button color="primary" size="lg">Register</Button>
                                </FormGroup>
                            </form>

                            <div className="link-register">
                                <p style={{marginTop:'8px'}}>Create an account?</p>
                            <Link
                                to="/auth/login"
                                className="nav-link"
                            >
                                Login
                            </Link>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;