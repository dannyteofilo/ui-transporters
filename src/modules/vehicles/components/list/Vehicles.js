import React, { Component } from "react";
import { Table } from "reactstrap";
import * as actions from "./redux/actions";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import UpdateVehicle from '../update/FormUpdate'

import "./styles.css";

class Vehicles extends Component {
  constructor(props) {
    super();
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

  render() {
    const { error, data } = this.props;
    console.log("Erorororororo: ", error);
    if (error) {
      this.messageError();
    }
    return (
      <div>
        <Table responsive>
          <thead>
            <tr>
              <th>Type Vehicle</th>
              <th>Paltes</th>
              <th>Date SOAT</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Satus</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {data.map((value, index) => {
              return (
                <tr key={index}>
                  <td>{value.type}</td>
                  <td>{value.plates}</td>
                  <td>{value.date}</td>
                  <td>{value.brand}</td>
                  <td>{value.model}</td>
                  <td>{value.status}</td>
                  <td><UpdateVehicle/></td>
                </tr>
              );
            })}
          </tbody>
        </Table>
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
