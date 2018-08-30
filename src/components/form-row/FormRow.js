import React, { Component } from "react";
import PropTypes from "prop-types";
import { Label, Input, FormGroup } from "reactstrap";

class FormRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    };
    this.onChange = this.onChange.bind(this);
    this.getValue = this.getValue.bind(this);
    this.handleTouch = this.handleTouch.bind(this);
  }

  componentWillMount() {
    const { value } = this.props;
    if (value) {
      this.setState({
        inputValue: value
      });
    }
  }
  onChange(e) {
    this.setState({ inputValue: e.target.value });
    if (this.props.touched) {
      this.props.touched();
    }
  }
  getValue() {
    return this.state.inputValue;
  }
  setValue() {
    this.setState({ inputValue: "" });
  }
  handleTouch() {
    this.props.touched();
  }
  render() {
    const { inputValue } = this.state;
    return (
      <FormGroup>
        <Label>{this.props.labelText}</Label>
        <Input
          type={this.props.inputType}
          value={inputValue}
          onChange={this.onChange}
          required={this.props.isRequired}
        />
      </FormGroup>
    );
  }
}

FormRow.propTypes = {
  inputType: PropTypes.string,
  labelText: PropTypes.string,
  isRequired: PropTypes.bool
};

export default FormRow;
