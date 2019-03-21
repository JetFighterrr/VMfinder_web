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
    this.state = {
      Vms:[
              {name:'Ivan', leaseeId: '123', status: 'Busy', notes: 'Automation'},
              {name:'Alex', leaseeId: '987', status: 'Available', notes: 'Automation'},
              {name:'Peter', leaseeId: '543', status: 'Available', notes: 'Automation'},
              {name:'Ara', leaseeId: '789', status: 'Available', notes: 'Automation'},
              {name:'Ivan', leaseeId: '123', status: 'Busy', notes: 'Manual'},
              {name:'Alex', leaseeId: '987', status: 'Available', notes: 'Manual'},
              {name:'Peter', leaseeId: '543', status: 'Available', notes: 'Not clean'},
              {name:'Ara', leaseeId: '789', status: 'Available', notes: 'Manual'},
              {name:'Ivan', leaseeId: '123', status: 'Busy', notes: 'Automation'},
              {name:'Alex', leaseeId: '987', status: 'Available', notes: 'Automation'},
              {name:'Peter', leaseeId: '543', status: 'Available', notes: 'Manual'},
              {name:'Ara', leaseeId: '789', status: 'Available', notes: 'Manual'},
              {name:'Ivan', leaseeId: '123', status: 'Available', notes: 'Manual'},
              {name:'Alex', leaseeId: '987', status: 'Available', notes: 'Manual'},
              {name:'Peter', leaseeId: '543', status: 'Available', notes: 'Manual'},
              {name:'Ara', leaseeId: '789', status: 'Available', notes: 'Do not use'}, 
              {name:'Ivan', leaseeId: '123', status: 'Busy', notes: 'Need Snapshot update'},
              {name:'Alex', leaseeId: '987', status: 'Available', notes: 'Manual'},
              {name:'Peter', leaseeId: '543', status: 'Available', notes: 'Manual'},
              {name:'Ara', leaseeId: '789', status: 'Busy', notes: 'Manual'},                                                       
              {name:'Ivan', leaseeId: '123', status: 'Busy', notes: 'Manual'},
              {name:'Alex', leaseeId: '987', status: 'Available', notes: 'Manual'},
              {name:'Peter', leaseeId: '123', status: 'Available', notes: 'Manual'},
              {name:'Ara', leaseeId: '789', status: 'Busy', notes: 'Manual'},
              {name:'Ivan', leaseeId: '123', status: 'Busy', notes: 'Manual'},
              {name:'Alex', leaseeId: '123', status: 'Available', notes: 'Manual'},
              {name:'Peter', leaseeId: '543', status: 'Available', notes: 'Manual'},
              {name:'Ara', leaseeId: '789', status: 'Busy', notes: 'Manual'},
              {name:'Ivan', leaseeId: '123', status: 'Busy', notes: 'Manual'},
              {name:'Alex', leaseeId: '987', status: 'Available', notes: 'Manual'},
              {name:'Peter', leaseeId: '123', status: 'Available', notes: 'Manual'},
              {name:'Ara', leaseeId: '789', status: 'Busy', notes: 'Manual'},
              {name:'Ivan', leaseeId: '123', status: 'Busy', notes: 'Manual'},
              {name:'Alex', leaseeId: '123', status: 'Available', notes: 'Manual'},
            ],
        users:[
            {first:'Bradley', last: 'Greer', id: '123'},
            {first:'Bruno', last: 'Nash', id: '456'},
            {first:'Paul', last: 'Byrd', id: '789'},
            {first:'Michael', last: 'Bruce', id: '987'},
            {first:'Shad', last: 'Decker', id: '543'},

        ]

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

  render() {
    return (
      <div className = 'main'>
        <div className = 'fw-background'></div>
        <div className = 'fw-container'>
          <TableReact Vms = {this.state.Vms} users = {this.state.users} save = {this.saveVm} remove = {this.deleteVm} maxNumber = {this.state.Vms.length} />
        </div>
        <div className = 'fw-background-bottom'></div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
