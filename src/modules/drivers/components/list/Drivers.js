import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import * as actions from "./redux/actions";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import FormDriver from "../create/FormDriver";
import DeleteDriver from "../delete/DeleteDriver";

import "./styles.css";

class Drivers extends Component {
  constructor(props) {
    super();
    this.state = {
      profile: null,
      remove: ""
    };
    this.hanldeCreateSuccess = this.hanldeCreateSuccess.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleDeleteDriver = this.handleDeleteDriver.bind(this);
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

  handleDeleteDriver(vehicle) {
    this.setState({
      remove: vehicle._id
    });
  }

  render() {
    const { error, data } = this.props;
    const { profile, remove } = this.state;
    if (error) {
      this.messageError();
    }
    return (
      <div>
        <Table responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Last Name</th>
              <th>Number Document</th>
              <th>Type Document</th>              
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((value, index) => {
              return (
                <tr key={index}>
                  <td>{value.name}</td>
                  <td>{value.lastName}</td>
                  <td>{value.numDocument}</td>
                  <td>{value.typeDocument}</td>
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
                        this.handleDeleteDriver(value);
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
            <FormDriver driver={profile} created={this.hanldeCreateSuccess} />
          </div>
        )}

        {!profile && (
          <div className="row btn-update">
            <FormDriver created={this.hanldeCreateSuccess} />
          </div>
        )}

        {remove && <DeleteDriver id={remove} deleted={this.hanldeCreateSuccess} />}
      </div>
    );
  }
}

const mapStatetoProps = store => {
  const { list } = store.drivers;
  return {
    data: list.data ? list.data : [],
    requesting: list.requesting,
    error: list.error,
    response: list.response
  };
};

export default connect(mapStatetoProps)(Drivers);
