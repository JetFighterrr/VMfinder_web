import React, { Component } from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { Row } from 'react-bootstrap';
//import {TableReact} from './TableReact.js';
const ReactBootstrap = require("react-bootstrap");

var Button = ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;
//var Form = ReactBootstrap.Form;

class ModalEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
            errorState: false,
        }
    }
    
    editVm(){
        if (this.props.selectedVm.name === '') {
            this.setState( { errorState: true } );
            return;    
        }
        let currentVm = {
            name: this.props.selectedVm.name,
            leaseeId: this.props.selectedVm.leaseeId,
            status: this.props.selectedVm.status,
            notes: this.props.selectedVm.notes,
        }
        this.props.editVm(currentVm, this.props.selectedVmId);
        this.props.operateModal();
    }

    errorMessage(){
        if(this.state.errorState){ return (<div className = 'form-text text-danger small'> Vm name is required </div>); }
        return null;
    }

    changeInputName(value){
        this.props.changeSelectedVM( {
                name: value,
                leaseeId: this.props.selectedVm.leaseeId,
                status: this.props.selectedVm.status,
                notes: this.props.selectedVm.notes,
            }
        );
    }

    changeInputLeasee(value){
        console.log(value);
        this.props.changeSelectedVM( {
                name: this.props.selectedVm.name,
                leaseeId: value,
                status: this.props.selectedVm.status,
                notes: this.props.selectedVm.notes,
            }
        );
    }
    
    changeInputStatus(value){
        this.props.changeSelectedVM( {
                name: this.props.selectedVm.name,
                leaseeId: this.props.selectedVm.leaseeId,
                status: value,
                notes: this.props.selectedVm.notes,
            }
        );
    }
    
    changeInputNotes(value){
        this.props.changeSelectedVM( {
                name: this.props.selectedVm.name,
                leaseeId: this.props.selectedVm.leaseeId,
                status: this.props.selectedVm.status,
                notes: value,
            }
        );
    }



//name, leaseeId, status, notes
    render() {
        return (
            <div>
                <Modal show = {this.props.showHere} onHide = {() => this.props.operateModal()}>
                    <Modal.Header closeButton>
                        <Modal.Title id="modalTitle">Edit VM</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                        <Form.Group as={Row} controlId="inputName">
                            <Form.Label column sm = "2">
                                Name 
                            </Form.Label>
                            <Col sm ="10">
                                <Form.Control type="text" placeholder="Type Name Here"        
                                    value = {this.props.selectedVm.name}
                                    onChange={(e)=> this.changeInputName(e.target.value)}/>
                            </Col>
                            {this.errorMessage()}
                        </Form.Group>
                        <Form.Group as={Row} controlId="Leasee">
                            <Form.Label column sm = "2">
                                Leasee 
                            </Form.Label>
                            {/*  <Form.Control type="text" placeholder="Choose Leasee"               ></Form.Control>                            </Col>  */}
                            <Col sm ="10">
                                <Form.Control as="select"
                                    value = {this.props.selectedVm.leaseeId}
                                    onChange={(e)=> this.changeInputLeasee(e.target.value)}>
                                    
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="Status">
                            <Form.Label column sm = "2">
                                Status 
                            </Form.Label>
                            <Col sm ="10">
                                <Form.Control as="select" value = {this.props.selectedVm.status} onChange={(e)=> this.changeInputStatus(e.target.value)}>
                                    <option>Available</option>
                                    <option>Busy</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId =  "Notes">
                            <Form.Label column sm = "2">
                                Notes
                            </Form.Label>
                            <Col sm ="10">
                                <Form.Control type="text" placeholder="Type Notes Here"
                                 value = {this.props.selectedVm.notes}
                                 onChange={(e)=> this.changeInputNotes(e.target.value)}/>
                            </Col>
                        </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.editVm()} bsstyle="primary" id="editButton">Edit VM</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export {ModalEdit};