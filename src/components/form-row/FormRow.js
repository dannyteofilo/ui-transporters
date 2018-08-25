import React , { Component } from 'react'
import PropTypes from 'prop-types'
import {Label,Input, FormGroup} from 'reactstrap'

class FormRow extends Component {
  constructor(props) {
    super(props)
    this.state={
      inputValue:''
    }
    this.onChange=this.onChange.bind(this)
    this.getValue=this.getValue.bind(this)
  }
  onChange(e){
    this.setState({inputValue:e.target.value})
  }
  getValue(){
    return this.state.inputValue
  }
  setValue(){    
    this.setState({inputValue:''})
  }
  render(){
    return(
        <FormGroup>
        <Label>{this.props.labelText}</Label>
          <Input  type={this.props.inputType} value={this.state.inputValue} onChange={this.onChange} required={this.props.isRequired}></Input>
        </FormGroup>
    )
  }
}

FormRow.propTypes={
  inputType: PropTypes.string,
  labelText: PropTypes.string,
  isRequired: PropTypes.bool
}

export default FormRow;