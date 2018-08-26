import React, { Component } from "react";
import FormRow from "components/form-row/FormRow";
import Swal from "sweetalert2";
import * as actions from "shared/login/redux/actions";
import * as actionsAvatar from './redux/actions'
import logo from "logo.svg";
import { connect } from "react-redux";
import {
  Button
} from "reactstrap";

import "./styles.css";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validator: false,
      file: null,
      imagePreviewUrl: null
    };

    this.handleTouched = this.handleTouched.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.filechangedHandler = this.filechangedHandler.bind(this);
  }


  componentWillMount(){
    const {profile}= this.props
    if(profile.image){
      this.props.dispatch(actionsAvatar.fetch(profile.image))
    }
  }

  handleTouched() {
    this.setState({
      validator: true
    });
  }

  handleSubmit(e) {
    const { profile } = this.props;
    e.preventDefault();
    let add = {
      name: this.refs.name.getValue(),
      lastName: this.refs.lastName.getValue(),
      email: this.refs.email.getValue()
    };
    if (this.state.file) {
      this.props.dispatch(
        actions.fetchUpdateWithImage(profile._id, add, this.state.file)
      );
    } else {
      this.props.dispatch(actions.fetchUpdate(profile._id, add));
    }
  }

  filechangedHandler(e) {
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
    this.handleTouched();
    console.log(this.state);
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
      this.props.dispatch(actions.resetError());
    }, 1000);
  }

  messageSuccess(message) {
    {
      Swal({
        position: 'center',
        type: 'success',
        title: 'Your profile has been updated',
        showConfirmButton: false,
        timer: 1500
      })
    }
    setTimeout(() => {
      this.setState({
        validator:false
      })
      this.props.dispatch(actions.resetError());
    }, 1000);
  }

  render() {
    const { profile, requesting, error, success } = this.props;
    const { validator } = this.state;

    if (error) {
      this.messageError(error);
    }
    if (success===true) {
      this.messageSuccess(error);
    }
    return (
      <div className="container row">
        <div className="col-md-4">
          <div className="content_1">
            <div className="sub_content_1">
              <img
                className="avatar"
                src={
                  this.state.imagePreviewUrl
                    ? this.state.imagePreviewUrl
                    : "https://www.shareicon.net/data/128x128/2016/06/25/786525_people_512x512.png"
                }
              />
              <div className="avatar-container" />
              <input
                accept="image/*"
                className="input-file"
                id="flat-button-file"
                multiple
                type="file"
                onChange={this.filechangedHandler}
              />
            </div>
            <div className="edit">
              <label htmlFor="flat-button-file">
                <i className="fa fa-pencil-alt icon-file" />
              </label>
            </div>
          </div>
        </div>
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
            <div className="row btn-update">
              <div className="btn-container">
                {requesting && (
                  <Button color="danger" size="lg">
                    Update ...
                    <i className="fa fa-spin fa-sync" />
                  </Button>
                )}
                {!requesting && (
                  <Button color="danger" size="lg" disabled={!validator}>
                    Update
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
  const { data } = store.login;
  return {
    profile: data.user ? data.user : "",
    requesting: data.requesting,
    error: data.error,
    success:data.success,
  };
};

export default connect(mapStateToProps)(UserProfile);
