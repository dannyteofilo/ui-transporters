import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Input
} from "reactstrap";
import * as actions from "./redux/actions";
import { connect } from "react-redux";
import FormRow from "components/form-row/FormRow";
import Swal from "sweetalert2";

import "./styles.css";

class FormDriver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      title: "",
      validator: false,
      typeVehicle: [
        { value: "Typo 1" },
        { value: "Tipo 2" },
        { value: "Tipo 3" }
      ],
      statusVehicle: [
        { value: true, label: "Active" },
        { value: false, label: "Inactive" }
      ],
      type: "Typo 1",
      status: true,
      plates: "",
      soat: "",
      brand: "",
      model: "",
      id:''
    };

    this.toggle = this.toggle.bind(this);
    this.handleTouched = this.handleTouched.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.messageError = this.messageError.bind(this);
  }

  componentWillMount() {
    console.log("Component initialized");
    const { vehicle } = this.props;
    if (vehicle) {
      console.log("vehicle: ", vehicle);
      this.setState({
        ...this.state,
        id:vehicle._id,
        type: vehicle.type,
        status: vehicle.status,
        plates: vehicle.plates,
        soat: vehicle.soat,
        brand: vehicle.brand,
        model: vehicle.model,
        modal: true,
        title: "Update Vehicle"
      });
    } else {
      this.setState({
        ...this.state,
        title: "Create Vehicle"
      });
    }
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
    this.props.created();
  }

  handleChange(e) {
    const {validator} =this.state
    if(!validator){
      this.handleTouched()
    }
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleTouched() {
    this.setState({
      validator: true
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { type, status,id } = this.state;
    let data = {
      type,
      status,
      plates: this.refs.plates.getValue(),
      brand: this.refs.brand.getValue(),
      model: this.refs.model.getValue(),
      soat: this.refs.soat.getValue()
    };
    console.log(data);
    if(id){
      this.props.dispatch(actions.fetchUpdate(id,data))
    }else{
      this.props.dispatch(actions.fetch(data));
    }
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
    const {data}=this.props
    {
      Swal({
        position: "center",
        type: "success",
        title: data ? data : 'Success',
        showConfirmButton: false,
        timer: 1500
      });
    }
    setTimeout(() => {
      this.setState({
        validator: false,
        modal: false
      });
      this.props.dispatch(actions.resetError());
      this.props.created();
    }, 1000);
  }
  render() {
    const { requesting, error, success, vehicle } = this.props;
    const {
      validator,
      typeVehicle,
      statusVehicle,
      type,
      status,
      plates,
      soat,
      brand,
      model,
      title
    } = this.state;

    if (error) {
      this.messageError(error);
    }
    if (success === true) {
      this.messageSuccess(error);
    }
    return (
      <div>
        <Button outline color="success" onClick={this.toggle}>
          <i className="fa fa-icon fa-plus" />
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
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
                    value={plates}
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
                    value={soat}
                    touched={this.handleTouched}
                    // onChange={this.handleChange}
                    ref="soat"
                  />
                </div>
                <div className="col-md-6">
                  <FormRow
                    inputType="text"
                    labelText="Brand"
                    isRequired={true}
                    value={brand}
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
                    value={model}
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
                  {vehicle && (
                    <div>
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
                  )}
                  {!vehicle && (
                    <div>
                      {requesting && (
                        <Button color="danger" size="lg">
                          Creating ...
                          <i className="fa fa-spin fa-sync" />
                        </Button>
                      )}
                      {!requesting && (
                        <Button color="danger" size="lg">
                          Create
                        </Button>
                      )}
                    </div>
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

const mapStateToProps = store => {
  const { profile } = store.vehicles;
  return {
    data:profile ? profile.message : '',
    requesting: profile.requesting,
    error: profile.error,
    success: profile.success
  };
};

export default connect(mapStateToProps)(FormDriver);
