import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import * as actions from "./redux/actions";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import FormVehicle from "../create/FormVehicle";
import DeleteVehicle from "../delete/DeleteVehicle";

import "./styles.css";

class Vehicles extends Component {
  constructor(props) {
    super();
    this.state = {
      profile: null,
      remove: ""
    };
    this.hanldeCreateSuccess = this.hanldeCreateSuccess.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleDeleteVehicle = this.handleDeleteVehicle.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(actions.fetch());
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

  hanldeCreateSuccess() {
    this.setState({
      ...this.state,
      profile: null,
      remove:null
    });
    this.props.dispatch(actions.fetch());
  }

  handleOpenModal(profile) {
    this.setState({
      ...this.state,
      profile
    });
  }

  handleDeleteVehicle(vehicle) {
    this.setState({
      remove: vehicle._id
    });
  }

  render() {
    const { error, data } = this.props;
    // console.log("Erorororororo: ", error);
    const { profile, remove } = this.state;
    console.log("Profile vehicle: ", profile);
    if (error) {
      this.messageError();
    }
    return (
      <div>
        <Table responsive>
          <thead>
            <tr>
              <th>Type Vehicle</th>
              <th>Plates</th>
              <th>Date SOAT</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Satus</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((value, index) => {
              return (
                <tr key={index}>
                  <td>{value.type}</td>
                  <td>{value.plates}</td>
                  <td>{value.soat}</td>
                  <td>{value.brand}</td>
                  <td>{value.model}</td>
                  <td>{value.status ? 'Active' : 'Inactive'}</td>
                  <td>
                    <Button
                      color="primary"
                      outline
                      onClick={() => {
                        this.handleOpenModal(value);
                      }}
                    >
                      <i className="fa fa-pencil-alt icon-file" />
                    </Button>
                  </td>
                  <td>
                    <Button
                      color="danger"
                      outline
                      onClick={() => {
                        this.handleDeleteVehicle(value);
                      }}
                    >
                      <i className="far fa-trash-alt" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        {profile && (
          <div className="row btn-update">
            <FormVehicle vehicle={profile} created={this.hanldeCreateSuccess} />
          </div>
        )}

        {!profile && (
          <div className="row btn-update">
            <FormVehicle created={this.hanldeCreateSuccess} />
          </div>
        )}

        {remove && <DeleteVehicle id={remove} deleted={this.hanldeCreateSuccess} />}
      </div>
    );
  }
}

const mapStatetoProps = store => {
  const { list } = store.vehicles;
  return {
    data: list.data ? list.data : [],
    requesting: list.requesting,
    error: list.error,
    response: list.response
  };
};

export default connect(mapStatetoProps)(Vehicles);
