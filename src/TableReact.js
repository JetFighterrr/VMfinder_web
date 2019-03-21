import React, { Component } from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import {TableRow} from './TableRow.js';
import {TableHead} from './TableHead.js';
import {ModalNew} from './ModalNew.js';
import {ModalEdit} from './ModalEdit.js';
import {ModalDelete} from './ModalDelete.js';
import {ButtonGroupCustom} from './ButtonGroupCustom.js';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Jumbotron } from 'react-bootstrap';

class TableReact extends Component {
  constructor(props){
    super(props);
    this.rowIsSelected = this.rowIsSelected.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeNew = this.handleChangeNew.bind(this);
    this.handleChangeEdit = this.handleChangeEdit.bind(this);
    this.handleChangeDelete = this.handleChangeDelete.bind(this);
    this.pageDecrease = this.pageDecrease.bind(this);
    this.pageIncrease = this.pageIncrease.bind(this);
    this.pageNavigation = this.pageNavigation.bind(this);
    this.changeSelectedVM = this.changeSelectedVM.bind(this);
    this.returnEmptyVm = this.returnEmptyVm.bind(this);
    this.renderUser = this.renderUser.bind(this);
    this.getUser = this.getUser.bind(this);
    this.state = {
      //rowSelected: false,
      rowSelectedId: -1,
      showModalNew: false,
      showModalEdit: false,
      showModalDelete: false,
      currentPage:1,
      selectedVm: {
        name:'',
        leaseeId:'',
        status:'',
        notes:'',
      },
    }
  }
  
  handleChange(operation){
    switch(operation){
      case 'New':  this.handleChangeNew();
      break;
      case 'Edit': this.handleChangeEdit();
      break;
      case 'Delete': this.handleChangeDelete();
      break;
      default: console.log('Sorry, we found ' + operation + ' is not supported');
    }
  }
  
  changeSelectedVM = (childVm) => { this.setState({selectedVm: childVm}); }
  
  handleChangeNew = () => { this.setState({showModalNew: !this.state.showModalNew}); }
  
  handleChangeEdit = () => { this.setState({showModalEdit: !this.state.showModalEdit}); }
  
  handleChangeDelete = () => { this.setState({showModalDelete: !this.state.showModalDelete});  }
  
  pageIncrease = () => {this.setState({ currentPage: this.state.currentPage + 1 });}
 
  pageDecrease = () => {this.setState({ currentPage: this.state.currentPage - 1 });}
  
  rowIsSelected(id){
    if ( this.state.rowSelectedId > -1 ) {
      if ( this.state.rowSelectedId === id ) {
        this.setState({
         // rowSelected: false,
          rowSelectedId: -1,
          selectedVm: this.returnEmptyVm(),
        });
      }    
      else {
        this.setState({
          rowSelectedId: id + (this.state.currentPage - 1) * 10,
          selectedVm: this.props.Vms[id + (this.state.currentPage - 1) * 10],
        });
      }
    }
    else{
      this.setState({
        rowSelectedId: id + (this.state.currentPage - 1) * 10,
        //rowSelected: true,
        selectedVm: this.props.Vms[id + (this.state.currentPage - 1) * 10],
      });
    }
  }

  returnEmptyVm = () => { return {
    name:'',
    leaseeId:'',
    status:'',
    notes:'',
  }}

  getUser = (userId) =>  { return  this.props.users.find( (user) => user.id === userId ) }

  renderUser = (userId) => {
    let user = this.getUser(userId);
    return user.first + ' ' + user.last;
  }
  
  getClassName(num){
      if (this.state.rowSelectedId === num + (this.state.currentPage - 1) * 10) {
        return 'table-primary';
      }
    return this.props.Vms[num].status === 'Busy' ? 'table-danger' : '';
  }

  pageNavigation(){
    const maxPages = Math.min(Math.ceil(this.props.maxNumber / 10) , 10);
    const pages = Array(maxPages);
    for(let i = 0; i < maxPages; i++) { pages[i] = i + 1; }
    return(
      <ButtonGroup>
        <Button variant="outline-primary" onClick ={() => this.pageDecrease()} disabled = {this.state.currentPage <= 1}>Previous</Button>
        {pages.map( (num) => <Button variant="" className = { num == this.state.currentPage ? "btn btn-primary" : " btn btn-outline-primary"} onClick = {() => {this.setState({currentPage:num})} }  disabled = {num == this.state.currentPage }>{num}</Button> ) }
        <Button variant="outline-primary" onClick ={() => this.pageIncrease()} disabled = { this.state.currentPage * 10 > this.props.maxNumber}>Next</Button>
      </ButtonGroup>
    );
  }
  
render() {
    return (
      <div  className = "table-responsive">
        <Navbar>
          <Navbar.Brand href="#home"><strong>VM Finder</strong></Navbar.Brand>
          <Nav className="mr-auto">
          <Nav.Link href="#home"></Nav.Link>
          </Nav>
          <ButtonGroupCustom onlyNewRow = {!this.state.rowSelected} addModal = {this.handleChange}/>
        </Navbar>
        <Table responsive hover>
          <thead>
            <TableHead/>
          </thead>
          <tfoot>
            <TableHead/>
          </tfoot>
          <tbody>
            {this.props.Vms.slice( (this.state.currentPage - 1) * 10, this.state.currentPage * 10)
              .map( 
                (singleVm, position) => 
                <TableRow Vm = {singleVm}  selectThisRow = {this.rowIsSelected} givenClassName = {this.getClassName(position)} 
                id = {position} key = {position}  user = {this.renderUser(singleVm.leaseeId)}/>
                 ) 
            }
          </tbody>
        </Table>
        {this.pageNavigation()}
        <ModalNew showHere = {this.state.showModalNew} operateModal = {this.handleChangeNew} createNewVm = {this.props.save}/>
        <ModalEdit showHere = {this.state.showModalEdit} operateModal = {this.handleChangeEdit} 
                    editVm = {this.props.save} changeSelectedVM = {this.changeSelectedVM} 
                    selectedVm = {this.state.selectedVm} selectedVmId = {this.state.rowSelectedId}
                    users = {this.props.users}/>
        <ModalDelete showHere = {this.state.showModalDelete} operateModal = {this.handleChangeDelete} deleteVm = {this.props.remove} selectedVmId = {this.state.rowSelectedId}/>
      </div>

    );
  }
}

export {TableReact};