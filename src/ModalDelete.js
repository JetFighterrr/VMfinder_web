import React, { Component } from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
const ReactBootstrap = require("react-bootstrap");

var Button = ReactBootstrap.Button
var Modal = ReactBootstrap.Modal;

class ModalDelete extends Component {
    deleteVmButton(){
        this.props.deleteVm(this.props.selectedVmId);
        this.props.operateModal();
        this.props.updateCurrentPage();
    }

    render() {
        return (
            <div>
                <Modal show = {this.props.showHere} onHide = {() => this.props.operateModal()}>
                    <Modal.Header closeButton>
                        <Modal.Title id="modalTitle">Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <h5>Are sure want to delete this VM?</h5>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.deleteVmButton()} bsstyle="primary" id="addButton">Delete</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export {ModalDelete};