import React, { Component } from "react";
import FormRow from "components/form-row/FormRow";
import * as actions from "shared/login/redux/actions";
import { connect } from "react-redux";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Row,
  Col
} from "reactstrap";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validator: false
    };

    this.handleTouched = this.handleTouched.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTouched() {
    this.setState({
      validator: true
    });
  }

  handleSubmit(e) {
      const {profile}=this.props
    e.preventDefault();
    let add = {
      name:this.refs.name.getValue(),
      lastName: this.refs.lastName.getValue(),
      email: this.refs.email.getValue(),
    };
    this.props.dispatch(actions.fetchUpdate(profile._id, add));
  }
  render() {
    const { profile, requesting } = this.props;
    const { validator } = this.state;
    console.log("Profile: ", profile);
    return (
      <div className="container row">
        <div className="col-md-4">image</div>
        <div className="col-md-8">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <FormRow
                  inputType="text"
                  labelText="Name"
                  isRequired={true}
                  value={profile.name ? profile.name : ""}
                  touched={this.handleTouched}
                  ref="name"
                />
              </div>
              <div className="col-md-6">
                <FormRow
                  inputType="text"
                  labelText="Last Name"
                  isRequired={true}
                  value={profile.lastName ? profile.lastName : ""}
                  touched={this.handleTouched}
                  ref="lastName"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <FormRow
                  inputType="email"
                  labelText="Email"
                  isRequired={true}
                  value={profile.email ? profile.email : ""}
                  touched={this.handleTouched}
                  ref="email"
                />
              </div>
              {/* <div className="col-md-6">
                <FormRow
                  inputType="password"
                  labelText="Password"
                  isRequired={true}
                  ref="pass"
                />
              </div> */}
            </div>
            <div className="row">
              <div className="btn-container">
                {requesting && (
                  <Button color="primary" size="lg">
                    Login ...
                    <i className="fa fa-spin fa-sync" />
                  </Button>
                )}
                {!requesting && (
                  <Button color="primary" size="lg" disabled={!validator}>
                    Login
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  const { login } = store;
  return {
    profile: login.user ? login.user : "",
    requesting: login.requesting,
    error: login.error
  };
};

export default connect(mapStateToProps)(UserProfile);
