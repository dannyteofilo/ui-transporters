import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input
} from "reactstrap";
import * as actions from "./redux/actions";
import { connect } from "react-redux";
import FormRow from "components/form-row/FormRow";

import "./styles.css";

class UpdateVehicle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      validator: false,
      typeVehicle: [{ value: 0 }, { value: 1 }, { value: 2 }],
      statusVehicle: [
        { value: false, label: "Active" },
        { value: true, label: "Inactive" }
      ],
      type: "",
      status: "",
      profile: {}
    };

    this.toggle = this.toggle.bind(this);
    this.handleTouched = this.handleTouched.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    const { profile } = this.props;
    console.log("Profile: ", profile);
    this.setState({
      ...this.state,
      profile,
      type: profile.type
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleTouched() {
    this.setState({
      validator: true
    });
  }

  render() {
    const { requesting } = this.props;
    const {
      validator,
      profile,
      typeVehicle,
      statusVehicle,
      type,
      status
    } = this.state;
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>
          <i className="fa fa-pencil-alt icon-file" />
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Update Vehicle</ModalHeader>
          <ModalBody>
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <Label for="exampleSelect">Type Vehicle</Label>
                  <Input
                    type="select"
                    name="type"
                    id="exampleSelect"
                    value={type}
                    onChange={this.handleChange}
                  >
                    {typeVehicle.map((val, index) => {
                      return (
                        <option key={index} value={val.value}>
                          {val.value}
                        </option>
                      );
                    })}
                  </Input>
                </div>
                <div className="col-md-6">
                  <FormRow
                    inputType="text"
                    labelText="Plates"
                    isRequired={true}
                    value={profile ? profile.plates : ""}
                    touched={this.handleTouched}
                    ref="plates"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <FormRow
                    inputType="date"
                    labelText="Date SOAT"
                    isRequired={true}
                    value={profile ? profile.soat : ""}
                    touched={this.handleTouched}
                    ref="date"
                  />
                </div>
                <div className="col-md-6">
                  <FormRow
                    inputType="text"
                    labelText="Brand"
                    isRequired={true}
                    value={profile ? profile.brand : ""}
                    touched={this.handleTouched}
                    ref="brand"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <FormRow
                    inputType="text"
                    labelText="Model"
                    isRequired={true}
                    value={profile ? profile.model : ""}
                    touched={this.handleTouched}
                    ref="model"
                  />
                </div>
                <div className="col-md-6">
                  <Label for="exampleSelect">Status</Label>
                  <Input
                    type="select"
                    name="status"
                    id="exampleSelect"
                    value={status}
                    onChange={this.handleChange}
                  >
                    {statusVehicle.map((val, index) => {
                      return (
                        <option key={index} value={val.value}>
                          {val.label}
                        </option>
                      );
                    })}
                  </Input>
                </div>
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
          </ModalBody>
          {/* <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              Do Something
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter> */}
        </Modal>
      </div>
    );
  }
}

const mapStateTopProps = store => {
  const { profile } = store.profile;
  return {
    requesting: profile.requesting,
    error: profile.error,
    success: profile.success
  };
};
export default UpdateVehicle;
