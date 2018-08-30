import React, { Component } from 'react';
import Auth from 'services/AuthService';
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2'
import { Card, CardTitle, Button, FormGroup } from 'reactstrap'
import FormRow from 'components/form-row/FormRow';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from 'shared/login/redux/actions';



import './styles.css'
class Register extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(e) {
        e.preventDefault()
        let add = {
            name: this.refs.name.getValue(),
            lastName: this.refs.lastName.getValue(),
            email: this.refs.email.getValue(),
            password: this.refs.pass.getValue()
        }
        this.props.dispatch(actions.fetchRegister(add));

    }

    messageError(error) {
        { Swal("Error", error.response ? error.response.data.message : error.message, "error") }
        setTimeout(() => {
            this.props.dispatch(actions.reset())
        }, 1000);
    }

    render() {

        const { from } = this.props.location.state || { from: { pathname: '/home' } }
        console.log('From:  ', from)
        if (Auth.isAuthenticated()) {
            return (
                <Redirect to={from} />
            )
        }
        const { error, requesting } = this.props
        if (error) {
            this.messageError(error)
        }

        return (
            <div className="section-register">

                <div className="content-register">
                    <div className="register-content">
                        <Card>
                            <form onSubmit={this.onSubmit}>
                                <CardTitle className="submit">Register</CardTitle>
                                <FormRow inputType='text' labelText='Name' isRequired={true} ref='name' />
                                <FormRow inputType='text' labelText='LastName' isRequired={true} ref='lastName' />
                                <FormRow inputType='email' labelText='Email' isRequired={true} ref='email' />
                                <FormRow inputType='password' labelText='Password' isRequired={true} ref='pass' />
                                <FormGroup className="submit">

                                    {
                                        requesting &&
                                        <Button color="primary" size="lg">
                                            Register...
                                            <i className="fa fa-spin fa-sync"></i>
                                        </Button>
                                    }
                                    {
                                        !requesting &&
                                        <Button color="primary" size="lg">
                                            Register
                                        </Button>
                                    }
                                </FormGroup>
                            </form>

                            <div className="link-register">
                                <p style={{ marginTop: '8px' }}>You already have an account?</p>
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

export default connect((store) => {
    const { data } = store.login;

    return {
        requesting: data.requesting,
        error: data.error,
        response: data.response,
        token: data.token
    }
})(Register);

