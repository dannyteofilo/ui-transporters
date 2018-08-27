import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FormRow from 'components/fomr-row/FormRow'

class UpdateVehicle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}><i className="fa fa-pencil-alt icon-file" /></Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Vehicle</ModalHeader>
          <ModalBody>
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
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default UpdateVehicle;
