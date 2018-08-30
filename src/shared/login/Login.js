import React, { Component } from "react";
import Auth from "services/AuthService";
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";
import { Card, CardTitle, Button, FormGroup } from "reactstrap";
import FormRow from "components/form-row/FormRow";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./redux/actions";

import "./styles.css";
class Login extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    let add = {
      email: this.refs.email.getValue(),
      password: this.refs.pass.getValue(),
      gettoken: true
    };
    this.props.dispatch(actions.fetch(add));
    // this.refs.email.setValue(),
    // this.refs.pass.setValue()
  }

  messageError(error) {
    {
      Swal(
        "Error",
        error.response ? error.response.data.message : error.message,
        "error"
      );
    }
    setTimeout(() => {
      this.props.dispatch(actions.reset());
    }, 1000);
  }

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: "/home" }
    };
    if (Auth.isAuthenticated()) {
      return <Redirect to={from} />;
    }

    const { error, requesting } = this.props;
    if (error) {
      this.messageError(error);
    }
    return (
      <div className="section-login">
        <div className="content-login">
          <div className="login-content">
            <Card>
              <form onSubmit={this.onSubmit}>
                <CardTitle className="submit">Login</CardTitle>
                <FormRow
                  inputType="email"
                  labelText="Email"
                  isRequired={true}
                  ref="email"
                />
                <FormRow
                  inputType="password"
                  labelText="Password"
                  isRequired={true}
                  ref="pass"
                />
                <FormGroup className="submit">
                  {requesting && (
                    <Button color="primary" size="lg">
                      Login ...
                      <i className="fa fa-spin fa-sync" />
                    </Button>
                  )}
                  {!requesting && (
                    <Button color="primary" size="lg">
                      Login
                    </Button>
                  )}
                </FormGroup>
              </form>

              <div className="link-login">
                <p style={{ marginTop: "8px" }}>Create an account?</p>
                <Link to="/auth/register" className="nav-link">
                  Sign up
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(store => {
  const { data } = store.login;

  return {
    requesting: data.requesting,
    error: data.error,
    response: data.response,
    token: data.token
  };
})(Login);
