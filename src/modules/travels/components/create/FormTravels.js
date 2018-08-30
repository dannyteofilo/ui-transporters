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
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import Map from "../map/Map";

import "./styles.css";

class FormTravel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      address: "",
      title: "",
      step: 1,
      id: "",
      validator: false,
      addressOrigin: "",
      addressDestination: "",
      latOrigin: "",
      lngOrigin: "",
      latDestination: "",
      lngDestination: ""
    };

    this.toggle = this.toggle.bind(this);
    this.handleTouched = this.handleTouched.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.messageError = this.messageError.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleUpdateLatLng = this.handleUpdateLatLng.bind(this);
    this.handleSetNewAddress = this.handleSetNewAddress.bind(this);
    this.handleNextStep = this.handleNextStep.bind(this);
  }

  componentWillMount() {
    console.log("Component initialized");
    const { travel } = this.props;
    if (travel) {
      console.log("vehicle: ", travel);
      this.setState({
        ...this.state,
        id: travel._id,
        addressOrigin: travel.addressOrigin,
        addressDestination: travel.addressDestination,
        latOrigin: travel.latOrigin,
        lngOrigin: travel.lngOrigin,
        latDestination: travel.latDestination,
        lngDestination: travel.lngDestination,
        modal: true,
        title: "Update Travel",
        address: travel.addressOrigin
      });
    } else {
      this.setState({
        ...this.state,
        title: "Create Travel"
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
    const { validator } = this.state;
    if (!validator) {
      this.handleTouched();
    }
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleChangeAddress = address => {
    console.log("address", address);
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => {
        console.log("results: ", results);
        this.refs.mapa.setNewMarker(results);
        getLatLng(results[0]).then(latLng => {
          console.log("Success", latLng);
          const { step } = this.state;
          if (step === 1) {
            this.setState({
              ...this.state,
              latOrigin: latLng.lat,
              lngOrigin: latLng.lng,
              addressOrigin: address
            });
          } else {
            this.setState({
              ...this.state,
              latDestination: latLng.lat,
              lngDestination: latLng.lng,
              addressDestination: address
            });
          }
        });
      })
      .catch(error => console.error("Error", error));
  };

  handleSetNewAddress(address, lat, lng) {
    this.handleChangeAddress(address);
    this.handleUpdateLatLng(lat, lng);
  }

  handleUpdateLatLng(lat, lng) {
    this.setState({
      latOrigin: lat,
      lngOrigin: lng
    });
  }
  handleTouched() {
    this.setState({
      validator: true
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      id,
      addressOrigin,
      addressDestination,
      latOrigin,
      lngOrigin,
      latDestination,
      lngDestination
    } = this.state;
    let data = {
      addressOrigin,
      addressDestination,
      latOrigin,
      lngOrigin,
      latDestination,
      lngDestination
    };
    console.log(data);
    if (id) {
      this.props.dispatch(actions.fetchUpdate(id, data));
    } else {
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

  handleNextStep() {
    console.log(this.state);
    const { travel } = this.props;
    this.setState({
      step: 2,
      // address:''
      address: travel ? travel.addressDestination : ""
    });
  }

  messageSuccess() {
    const { data } = this.props;
    {
      Swal({
        position: "center",
        type: "success",
        title: data ? data : "Success",
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
    const { requesting, error, success, travel } = this.props;
    const {
      address,
      validator,
      title,
      step,
      latOrigin,
      lngOrigin,
      latDestination,
      lngDestination
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
                <div className="col-md-12">
                  <Label for="exampleSelect">
                    {step === 1 ? "Origin address" : "Destination address"}
                  </Label>
                  <PlacesAutocomplete
                    value={address}
                    onChange={this.handleChangeAddress}
                    onSelect={this.handleSelect}
                  >
                    {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                      loading
                    }) => (
                      <div>
                        <Input
                          {...getInputProps({
                            placeholder: "Search Places ...",
                            className: "location-search-input"
                          })}
                        />
                        <div>
                          {loading && <div>Loading...</div>}
                          {suggestions.map(suggestion => {
                            const className = suggestion.active
                              ? "suggestion-item--active"
                              : "suggestion-item";
                            // inline style for demonstration purpose
                            const style = suggestion.active
                              ? {
                                  backgroundColor: "#fafafa",
                                  cursor: "pointer"
                                }
                              : {
                                  backgroundColor: "#ffffff",
                                  cursor: "pointer"
                                };
                            return (
                              <div
                                {...getSuggestionItemProps(suggestion, {
                                  className,
                                  style
                                })}
                              >
                                <span>{suggestion.description}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </PlacesAutocomplete>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 container-map">
                  <div className="marker">
                    <img
                      src="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                      alt=""
                    />
                  </div>
                  {step === 1 && (
                    <Map
                      ref="mapa"
                      lat={latOrigin}
                      lng={lngOrigin}
                      // position={data.location.position}
                      setAddress={this.handleSetNewAddress}
                    />
                  )}
                  {step === 2 && (
                    <Map
                      ref="mapa"
                      lat={latDestination}
                      lng={lngDestination}
                      // position={data.location.position}
                      setAddress={this.handleSetNewAddress}
                    />
                  )}
                </div>
              </div>
              <div className="row btn-update">
                <div className="btn-container">
                  {travel && (
                    <div>
                      {step === 1 && (
                        <Button
                          color="danger"
                          size="lg"
                          disabled={!latOrigin}
                          onClick={this.handleNextStep}
                        >
                          Next
                        </Button>
                      )}
                      {step === 2 && (
                        <div>
                          {requesting && (
                            <Button color="danger" size="lg">
                              Update ...
                              <i className="fa fa-spin fa-sync" />
                            </Button>
                          )}
                          {!requesting && (
                            <Button
                              color="danger"
                              size="lg"
                              disabled={!latDestination}
                            >
                              Update
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  {!travel && (
                    <div>
                      {step === 1 && (
                        <Button
                          color="danger"
                          size="lg"
                          disabled={!latOrigin}
                          onClick={this.handleNextStep}
                        >
                          Next
                        </Button>
                      )}
                      {step === 2 && (
                        <div>
                          {requesting && (
                            <Button color="danger" size="lg">
                              Creating ...
                              <i className="fa fa-spin fa-sync" />
                            </Button>
                          )}
                          {!requesting && (
                            <Button
                              color="danger"
                              size="lg"
                              disabled={!latDestination}
                            >
                              Create
                            </Button>
                          )}
                        </div>
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
  const { profile } = store.travels;
  return {
    data: profile ? profile.message : "",
    requesting: profile.requesting,
    error: profile.error,
    success: profile.success
  };
};

export default connect(mapStateToProps)(FormTravel);
