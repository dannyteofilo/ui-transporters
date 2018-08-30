import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
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
      name:'',
      lastName:'',
      numDocument:'',
      typeDocument:'',
      id:''
    };

    this.toggle = this.toggle.bind(this);
    this.handleTouched = this.handleTouched.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.messageError = this.messageError.bind(this);
  }

  componentWillMount() {
    const { driver } = this.props;
    if (driver) {
      this.setState({
        ...this.state,
        id:driver._id,
        name: driver.name,
        lastName: driver.lastName,
        numDocument: driver.numDocument,
        typeDocument: driver.typeDocument,
        modal: true,
        title: "Update Driver"
      });
    } else {
      this.setState({
        ...this.state,
        title: "Create Driver"
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
    const { id } = this.state;
    let data = {
      name: this.refs.name.getValue(),
      lastName: this.refs.lastName.getValue(),
      numDocument: this.refs.numDocument.getValue(),
      typeDocument: this.refs.typeDocument.getValue()
    };
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
    const { requesting, error, success, driver } = this.props;
    const {
      validator,
      name,
      lastName,
      numDocument,
      typeDocument,      
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
                  <FormRow
                    inputType="text"
                    labelText="Name"
                    isRequired={true}
                    value={name}
                    touched={this.handleTouched}
                    ref="name"
                  />
                </div>
                <div className="col-md-6">
                  <FormRow
                    inputType="text"
                    labelText="Last Name"
                    isRequired={true}
                    value={lastName}
                    touched={this.handleTouched}
                    // onChange={this.handleChange}
                    ref="lastName"
                  />
                </div>
              </div>
              <div className="row">                
                <div className="col-md-6">
                  <FormRow
                    inputType="number"
                    labelText="Number Document"
                    isRequired={true}
                    value={numDocument}
                    touched={this.handleTouched}
                    ref="numDocument"
                  />
                </div>
                <div className="col-md-6">
                  <FormRow
                    inputType="text"
                    labelText="Type Document"
                    isRequired={true}
                    value={typeDocument}
                    touched={this.handleTouched}
                    ref="typeDocument"
                  />
                </div>
              </div>
              <div className="row">                
              </div>
              <div className="row btn-update">
                <div className="btn-container">
                  {driver && (
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
                  {!driver && (
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
  const { profile } = store.drivers;
  return {
    data:profile ? profile.message : '',
    requesting: profile.requesting,
    error: profile.error,
    success: profile.success
  };
};

export default connect(mapStateToProps)(FormDriver);
