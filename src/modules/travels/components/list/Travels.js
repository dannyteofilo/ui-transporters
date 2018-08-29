import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import * as actions from "./redux/actions";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import FormTravel from "../create/FormTravels";
import DeleteTravel from "../delete/DeleteTravel";

import "./styles.css";

class Travels extends Component {
  constructor(props) {
    super();
    this.state = {
      profile: null,
      remove: ""
    };
    this.hanldeCreateSuccess = this.hanldeCreateSuccess.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleDeleteTravel = this.handleDeleteTravel.bind(this);
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

  handleDeleteTravel(vehicle) {
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
              <th>Origin</th>
              <th>Lat Origin</th>
              <th>Lng Origin</th>
              <th>Destination</th>
              <th>Lat Destination</th>
              <th>Lng Destination</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((value, index) => {
              return (
                <tr key={index}>
                  <td>{value.addressOrigin}</td>
                  <td>{value.latOrigin}</td>
                  <td>{value.lngOrigin}</td>
                  <td>{value.addressDestination}</td>
                  <td>{value.latDestination}</td>
                  <td>{value.lngDestination}</td>
                  <td>
                    <Button
                      color="primary"
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
                      onClick={() => {
                        this.handleDeleteTravel(value);
                      }}
                    >
                      <i class="far fa-trash-alt" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        {profile && (
          <div className="row btn-update">
            <FormTravel vehicle={profile} created={this.hanldeCreateSuccess} />
          </div>
        )}

        {!profile && (
          <div className="row btn-update">
            <FormTravel created={this.hanldeCreateSuccess} />
          </div>
        )}

        {remove && <DeleteTravel id={remove} deleted={this.hanldeCreateSuccess} />}
      </div>
    );
  }
}

const mapStatetoProps = store => {
  const { list } = store.travels;
  return {
    data: list.data ? list.data : [],
    requesting: list.requesting,
    error: list.error,
    response: list.response
  };
};

export default connect(mapStatetoProps)(Travels);
