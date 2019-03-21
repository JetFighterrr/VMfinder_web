import React, { Component } from 'react';
import {render} from 'react-dom';
import {TableReact} from './TableReact.js';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';


class App extends Component {
  constructor(props){
    super(props);
    this.saveVm = this.saveVm.bind(this);
    this.deleteVm = this.deleteVm.bind(this);
    this.changeSearchField = this.changeSearchField.bind(this);
    this.state = {
      Vms:[
              {name:'o-w10-a6', leaseeId: '123', status: 'Busy', notes: 'Automation'},
              {name:'Alex-3', leaseeId: '987', status: 'Available', notes: 'Automation'},
              {name:'o-cob01-w10-2', leaseeId: '543', status: 'Available', notes: 'Automation'},
              {name:'Ara-2', leaseeId: '789', status: 'Available', notes: 'Automation'},
              {name:'o-cob02-w7-2', leaseeId: '123', status: 'Busy', notes: 'Manual'},
              {name:'Alex-4', leaseeId: '987', status: 'Available', notes: 'Manual'},
              {name:'o-rest-w10-1', leaseeId: '543', status: 'Available', notes: 'Not clean'},
              {name:'o-rest-2k16-1', leaseeId: '789', status: 'Available', notes: 'Manual'},
              {name:'o-cob01-w10-1', leaseeId: '123', status: 'Busy', notes: 'Automation'},
              {name:'o-rest-2k16-2', leaseeId: '987', status: 'Available', notes: 'Automation'},
              {name:'o-w10-a5', leaseeId: '543', status: 'Available', notes: 'Manual'},
              {name:'o-w10-a3', leaseeId: '789', status: 'Available', notes: 'Manual'},
              {name:'Ivan-6', leaseeId: '123', status: 'Available', notes: 'Manual'},
              {name:'o-rest-w10-2', leaseeId: '987', status: 'Available', notes: 'Manual'},
              {name:'Peter-9', leaseeId: '543', status: 'Available', notes: 'Manual'},
              {name:'Ara-8', leaseeId: '789', status: 'Available', notes: 'Do not use'}, 
              {name:'Ivan-5', leaseeId: '123', status: 'Busy', notes: 'Need Snapshot update'},
              {name:'Alex-3', leaseeId: '987', status: 'Available', notes: 'Manual'},
              {name:'o-rest-w10-4', leaseeId: '543', status: 'Available', notes: 'Manual'},
              {name:'Ara-6', leaseeId: '789', status: 'Busy', notes: 'Manual'},                                                       
              {name:'o-w10-a1', leaseeId: '456', status: 'Busy', notes: 'Manual'},
              {name:'Alex', leaseeId: '987', status: 'Available', notes: 'Manual'},
              {name:'o-cob02-w7-2', leaseeId: '123', status: 'Available', notes: 'Manual'},
              {name:'Ara-2', leaseeId: '789', status: 'Busy', notes: 'Manual'},
              {name:'Ivan', leaseeId: '456', status: 'Busy', notes: 'Manual'},
              {name:'Alex', leaseeId: '123', status: 'Available', notes: 'Manual'},
              {name:'o-rest-w10-3', leaseeId: '543', status: 'Available', notes: 'Manual'},
              {name:'Ara', leaseeId: '789', status: 'Busy', notes: 'Manual'},
              {name:'Ivan', leaseeId: '123', status: 'Busy', notes: 'Manual'},
              {name:'Alex-5', leaseeId: '987', status: 'Available', notes: 'Manual'},
              {name:'o-rest-w10-5', leaseeId: '456', status: 'Available', notes: 'Manual'},
              {name:'Ara-4', leaseeId: '789', status: 'Busy', notes: 'Manual'},
              {name:'Ivan-2', leaseeId: '123', status: 'Busy', notes: 'Manual'},
              {name:'Alexis', leaseeId: '123', status: 'Available', notes: 'Manual'},
            ],
        users:[
            {first:'Bradley', last: 'Greer', id: '123'},
            {first:'Bruno', last: 'Nash', id: '456'},
            {first:'Paul', last: 'Byrd', id: '789'},
            {first:'Michael', last: 'Bruce', id: '987'},
            {first:'Shad', last: 'Decker', id: '543'},
        ],
        searchField: '',
      };
  }

  saveVm(newVm,id){
      if (id === -1){
        this.setState( { Vms: this.state.Vms.concat(newVm) } );
        return;
      }
      this.setState( { Vms: this.state.Vms.map( (oldVm, i) => i === id ? newVm : oldVm) } );
    }

  deleteVm = (id) => { this.setState( { Vms: this.state.Vms.filter( (vm, index) => index !== id ) } ); }

  changeSearchField(value){
    this.setState({
        searchField: value || '',
      });
  }

  itHasSearchCriteria(singleVm){
    let localName = singleVm.name;
    let localNotes = singleVm.notes;
    let localStatus = singleVm.status;
    let localSearchCriteria = this.state.searchField;
    return  localName.toLowerCase().includes( localSearchCriteria.toLowerCase() ) 
            || localNotes.toLowerCase().includes( localSearchCriteria.toLowerCase() )
            || localStatus.toLowerCase().includes( localSearchCriteria.toLowerCase() );
  }

  render() {
    return (
      <div className = 'main'>
        <div className = 'fw-background'></div>
        <div className = 'fw-container'>
          <TableReact Vms = { this.state.searchField === '' ? this.state.Vms : this.state.Vms.filter( (vm) => this.itHasSearchCriteria(vm) )}
                      users = {this.state.users} save = {this.saveVm} remove = {this.deleteVm}
                      maxNumber =  { this.state.searchField === '' ? this.state.Vms.length : this.state.Vms.filter( (vm) => this.itHasSearchCriteria(vm) ).length }
                      searchField = {this.state.searchField} changeSearchField = {this.changeSearchField}
                      />
        </div>
        {/* <Form>
        <Form.Group as={Row} controlId =  "Notes">
          <Form.Label column sm = "2">
                Search
          </Form.Label>
          <Col sm ="10">
              <Form.Control type="text" placeholder="Type to Start Search"
                  value = {this.state.searchField}
                  onChange={(e)=> this.changeSearchField(e.target.value)}/>
          </Col>
          </Form.Group>
        </Form> */}
        <div className = 'fw-background-bottom'></div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
