import React, { Component } from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
const ReactBootstrap = require("react-bootstrap");

var Button = ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;
var Form = ReactBootstrap.Form;

class ModalNew extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            leasee:'',
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
            leasee: this.state.leasee,
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
        this.setState( { leasee: value } );
    }
    
    changeInputStatus(value){
        this.setState( { status: value } );
    }
    
    changeInputNotes(value){
        this.setState( { notes: value } );
    }

    render() {
        return (
            <div>
                <Modal show = {this.props.showHere} onHide = {() => this.props.operateModal()}>
                    <Modal.Header closeButton>
                        <Modal.Title id="modalNewTitle"> Create New Vm </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <div className = "form-group row">
                                <label form = "inputName" className = "col-sm-2 col-form-label">Name</label>
                                <div className = "col-sm-10">
                                    <input type="text" className = "form-control" id="inputName" placeholder="Type Name Here"               
                                        value = {this.state.name}
                                        onChange={(e)=> this.changeInputName(e.target.value)}/>
                                </div>
                                {this.errorMessage()}
                            </div>
                            <div className = "form-group row">
                                <label form="Leasee" className = "col-sm-2 col-form-label">Leasee</label>
                                <div className = "col-sm-10">
                                    <input type="text" className = "form-control" id="Leasee" placeholder="Choose leasee"
                                    value = {this.state.leasee}
                                    onChange={(e)=> this.changeInputLeasee(e.target.value)}/>
                                </div>
                            </div>
                            <div className = "form-group row">
                                <label form="Status" className = "col-sm-2 col-form-label">Status</label>
                                <div className = "col-sm-10">
                                    <input type="text" className = "form-control" id="Status" placeholder="Choose Status"
                                    value = {this.state.status}
                                    onChange={(e)=> this.changeInputStatus(e.target.value)}/>
                                </div>
                            </div>
                            <div className = "form-group row">
                                <label form="Notes" className = "col-sm-2 col-form-label">Notes</label>
                                <div className = "col-sm-10">
                                    <input type="text" className = "form-control" id="Notes" placeholder="Type Notes Here"
                                    value = {this.state.notes}
                                    onChange={(e)=> this.changeInputNotes(e.target.value)}/>
                                </div>
                            </div>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer  id="modalNewFooter">
                        <Button onClick={() => this.putNewVm()} bsstyle="primary" id="addButton"> Create </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export {ModalNew};