import React, { Component } from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'

class ModalNew extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            user:'Paul Byrd',
            status:'',
            notes:'',
            errorState: false,
        }
    }
    
    putNewVm(){
        if (this.state.name === '') {
            this.setState( { errorState: true } );
            return;    
        }
        this.setState( { errorState: false } );
        let currentVm = {
            name: this.state.name,
            leaseeId: this.props.getUserByName(this.state.user).id,
            status: this.state.status,
            notes: this.state.notes,
        }
        this.props.createNewVm(currentVm,-1);
        this.props.operateModal();
    }

    errorMessage(){
        if(this.state.errorState){ return (<div className = 'form-text text-danger small'> Vm name is required </div>); }
        return null;
    }

    changeInputName(value){
        this.setState( { name: value } );
    }

    changeInputLeasee(value){
        this.setState( { user: value } );
    }
    
    changeInputStatus(value){
        this.setState( { status: value } );
    }
    
    changeInputNotes(value){
        this.setState( { notes: value } );
    }

    render() {
        return (

                <Modal show = {this.props.showHere} onHide = {() => this.props.operateModal()}>
                    <Modal.Header closeButton>
                        <Modal.Title id="modalNewTitle"> Create New Vm </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                        <Form.Group as={Row} controlId="inputName">
                            <Form.Label column sm = "2">
                                Name 
                            </Form.Label>
                            <Col sm ="10">
                                <Form.Control type="text" placeholder="Type Name Here"        
                                    value = {this.state.name}
                                    onChange={(e)=> this.changeInputName(e.target.value)}/>
                            </Col>
                            {this.errorMessage()}
                        </Form.Group>
                        <Form.Group as={Row} controlId="Leasee">
                            <Form.Label column sm = "2">
                                Leasee 
                            </Form.Label>
                            <Col sm ="10">
                                <Form.Control as="select"
                                    value = {this.state.user}
                                    onChange={(e)=> this.changeInputLeasee(e.target.value)}>
                                    {this.props.users.map((user) => <option key = {user.id} id  = {user.id} value = {user.first + ' ' + user.last}> {user.first + ' ' + user.last} </option>)}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="Status">
                            <Form.Label column sm = "2">
                                Status 
                            </Form.Label>
                            <Col sm ="10">
                                <Form.Control as="select"
                                    value = {this.state.status} 
                                    onChange={(e)=> this.changeInputStatus(e.target.value)}>
                                    <option value = 'Available'>Available</option>
                                    <option value = 'Busy'>Busy</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId =  "Notes">
                            <Form.Label column sm = "2">
                                Notes
                            </Form.Label>
                            <Col sm ="10">
                                <Form.Control type="text" placeholder="Type Notes Here"
                                    value = {this.state.notes}
                                    onChange={(e)=> this.changeInputNotes(e.target.value)}/>
                            </Col>
                        </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer  id="modalNewFooter">
                        <Button onClick={() => this.putNewVm()} bsstyle="primary" id="addButton"> Create </Button>
                    </Modal.Footer>
                </Modal>

        );
    }
}

export {ModalNew};