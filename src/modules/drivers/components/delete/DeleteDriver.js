import React from "react";

import * as actions from "../create/redux/actions";
import { connect } from "react-redux";
import Swal from "sweetalert2";

class DeleteDriver extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
      const {id}=this.props
      this.props.dispatch(actions.fetchDelete(id))
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
      this.props.deleted();
    }, 1000);
  }
  render() {
    const {  error, success } = this.props;

    if (error) {
      this.messageError(error);
    }
    if (success === true) {
      this.messageSuccess(error);
    }
    return <div />;
  }
}

const mapStateToProps = store => {
  const { profile } = store.vehicles;
  return {
    data: profile ? profile.message : "",
    requesting: profile.requesting,
    error: profile.error,
    success: profile.success
  };
};

export default connect(mapStateToProps)(DeleteDriver);
