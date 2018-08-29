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
import Swal from "sweetalert2";


import "./styles.css";

class UpdateVehicle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      validator: false,
      typeVehicle: [
        { value: "Typo 1" },
        { value: "Tipo 2" },
        { value: "Tipo 3" }
      ],
      statusVehicle: [
        { value: false, label: "Active" },
        { value: true, label: "Inactive" }
      ],
      type: "Typo 1",
      status: "",
      profile: {}
    };

    this.toggle = this.toggle.bind(this);
    this.handleTouched = this.handleTouched.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const { profile } = this.props;
    console.log("Profile: ", profile);
    this.setState({
      ...this.state,
      profile,
      type: profile.type,
      status:profile.status,
      modal:true
    });
  }

  componentWillUnmount(){
    console.log('Component distroyed')
  }

  toggle() {
    console.log('Closed modal')
    this.setState({
      modal: !this.state.modal
    });
    this.props.created()
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    this.handleTouched()
  }

  handleTouched() {
    this.setState({
      validator: true
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { type, status } = this.state;
    let data = {
      type,
      status,
      plates: this.refs.plates.getValue(),
      brand: this.refs.brand.getValue(),
      model: this.refs.model.getValue(),
      soat: this.refs.soat.getValue()
    };
    console.log(data);
    const {_id}=this.state.profile
    this.props.dispatch(actions.fetch(_id,data));
  }

  messageError() {
    const { error } = this.props;
    {
      Swal({
        position: "center",
        type: "error",
        title: error.message ? error.message : error,
        showConfirmButton: false,
        timer: 1500
      });
    }
    setTimeout(() => {
      this.props.dispatch(actions.resetError());
    }, 1000);
  }

  messageSuccess() {
    {
      Swal({
        position: "center",
        type: "success",
        title: "Vehicle has been updated",
        showConfirmButton: false,
        timer: 1500
      });
    }
    setTimeout(() => {
      this.setState({
        validator: false,
        modal:false
      });
      this.props.dispatch(actions.resetError());
      this.props.created()
    }, 1000);
  }

  render() {
    const { requesting,error,success } = this.props;
    const {
      validator,
      profile,
      typeVehicle,
      statusVehicle,
      type,
      status
    } = this.state;

    let date='2017-06-01'
    console.log('Profile:t: ',profile.soat)
    console.log('erro_ ',error)
    if (error) {
      this.messageError(error);
    }
    if (success === true) {
      this.messageSuccess(error);
    }
    return (
      <div>
        {/* <Button color="danger" onClick={this.toggle}>
          <i className="fa fa-pencil-alt icon-file" />
        </Button> */}
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
                    // value={profile ? profile.soat : ""}
                    value={date}
                    touched={this.handleTouched}
                    ref="soat"
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

const mapStateToProps = (store) => {
  const { update } = store.vehicles;
  return {
    requesting: update.requesting,
    error: update.error,
    success: update.success
  };
};

export default connect(mapStateToProps)(UpdateVehicle)
