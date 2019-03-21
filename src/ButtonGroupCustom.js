import React, { Component } from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

class ButtonGroupCustom extends Component {
  
render() {
  return (
      <ButtonGroup>
        <Button variant="primary" onClick = {() => this.props.addModal('New')}>New</Button>
        <Button variant="primary" onClick = {() => this.props.addModal('Edit')} disabled = {this.props.onlyNewRow}>Edit</Button>
        <Button variant="primary" onClick = {() => this.props.addModal('Delete')} disabled = {this.props.onlyNewRow}>Delete</Button>
      </ButtonGroup>
    );
  }
}

export {ButtonGroupCustom};