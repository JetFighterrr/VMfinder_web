import React, { Component } from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import {TableRow} from './TableRow.js';
import {TableHead} from './TableHead.js';
import {ModalNew} from './ModalNew.js';
import {ModalEdit} from './ModalEdit.js';
import {ModalDelete} from './ModalDelete.js';
import {ButtonGroupCustom} from './ButtonGroupCustom.js';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import InputGroup from 'react-bootstrap/InputGroup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

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
    this.updateCurrentPage = this.updateCurrentPage.bind(this);
    this.pageNavigation = this.pageNavigation.bind(this);
    this.changeSelectedVM = this.changeSelectedVM.bind(this);
    this.returnEmptyVm = this.returnEmptyVm.bind(this);
    this.renderUser = this.renderUser.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.getUserByName = this.getUserByName.bind(this);
    this.state = {
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
  
  handleChangeNew = () => { this.setState({showModalNew: !this.state.showModalNew}); };
  
  handleChangeEdit = () => { this.setState({showModalEdit: !this.state.showModalEdit}); };
  
  handleChangeDelete = () => { this.setState({showModalDelete: !this.state.showModalDelete});  };
  
  pageIncrease = () => {this.setState({ currentPage: this.state.currentPage + 1 });};
 
  pageDecrease = () => {this.setState({ currentPage: this.state.currentPage - 1 });};

  updateCurrentPage = () => { if ( this.state.currentPage > Math.ceil((this.props.maxNumber - 1)/10) ) this.pageDecrease(); };

  rowIsSelected(id){
      if ( this.state.rowSelectedId === id + (this.state.currentPage - 1) * 10 ) {
        this.setState({
          rowSelectedId: -1,
          selectedVm: this.returnEmptyVm() ,
        });
        return;
      }    
      this.setState({
          rowSelectedId: id + (this.state.currentPage - 1) * 10,
          selectedVm: this.props.Vms[id + (this.state.currentPage - 1) * 10],
      });
  }

  returnEmptyVm = () => { return {
    name:'',
    leaseeId:'',
    status:'',
    notes:'',
  }};

  getUserById = (userId) =>  { return  this.props.users.find( (user) => user.id === userId ) };

  getUserByName = (name) =>  { return  this.props.users.find( (user) => ( user.first + ' ' + user.last) === name ) };

  renderUser = (userId) => {
    let user = this.getUserById(userId);
    return user.first + ' ' + user.last;
  };
  
  getClassName(num){
    if (this.state.rowSelectedId === num + (this.state.currentPage - 1) * 10) {
        return 'table-primary';
      }
    else if (this.props.Vms[num + (this.state.currentPage - 1) * 10].status === 'Busy') return 'table-danger';
    return '';
  }

  updateSearchField(value){
    this.props.changeSearchField(value);
  }

  pageNavigation(){
    const maxPages = Math.max(1, Math.min(Math.ceil(this.props.maxNumber / 10) , 10));
    const pages = [];
    for(let i = 0; i < maxPages; i++) { pages[i] = (i + 1); }
    return(
      
      <ButtonToolbar className="mb-3" aria-label="Toolbar with Button groups">
      <InputGroup>
             <Form.Label column sm = "3">
                   Search
             </Form.Label>
        <Form.Control type="text" 
            value = {this.props.searchField}
            onChange={(e)=> this.updateSearchField(e.target.value)}/>
      </InputGroup>
      <Nav className="mr-auto"/>
      <ButtonGroup>
        <Button variant="outline-primary" onClick ={() => this.pageDecrease()} disabled = {this.state.currentPage <= 1}>Previous</Button>
        {pages.map( (num) => <Button variant={ num === this.state.currentPage ? "primary" : "outline-primary"} onClick = {() => {this.setState({currentPage:num})} }  disabled = {num === this.state.currentPage }>{num}</Button> ) }
        <Button variant="outline-primary" onClick ={() => this.pageIncrease()} disabled = { this.state.currentPage * 10 >= this.props.maxNumber}>Next</Button>
      </ButtonGroup>
    </ButtonToolbar>
    );
  }
  
render() {
    return (
      <div>
        <Navbar>
          <Navbar.Brand><strong>VM Finder</strong></Navbar.Brand>
          <Nav className="mr-auto"/>
          <ButtonGroupCustom onlyNewRow = { this.state.rowSelectedId < 0 } addModal = {this.handleChange}/>
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
                id = {position} key = {position} user = {this.renderUser(singleVm.leaseeId)}/>
                 ) 
            }
          </tbody>
        </Table>
        {this.pageNavigation()}
        <ModalNew   showHere = {this.state.showModalNew} operateModal = {this.handleChangeNew} 
                    createNewVm = {this.props.save} users = {this.props.users} 
                    getUserByName = {this.getUserByName}/>

        <ModalEdit  showHere = {this.state.showModalEdit} operateModal = {this.handleChangeEdit} 
                    editVm = {this.props.save} users = {this.props.users}
                    changeSelectedVM = {this.changeSelectedVM} selectedVm = {this.state.selectedVm}
                    selectedVmId = {this.state.rowSelectedId} getUserByName = {this.getUserByName}/>

        <ModalDelete  showHere = {this.state.showModalDelete} operateModal = {this.handleChangeDelete} 
                      deleteVm = {this.props.remove} selectedVmId = {this.state.rowSelectedId}
                      updateCurrentPage = {this.updateCurrentPage}/>
      </div>

    );
  }
}

export {TableReact};