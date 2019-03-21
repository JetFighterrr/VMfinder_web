import React, { Component } from 'react';
import {render} from 'react-dom';
import {TableReact} from './TableReact.js';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';

class App extends Component {
  constructor(props){
    super(props);
    this.saveUser = this.saveUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.state = {
      Vms:[
              {name:'Ivan', leasee: 'Sam', status: 'Busy', notes: '123'},
              {name:'Alex', leasee: 'Stan', status: 'Available', notes: '456'},
              {name:'Peter', leasee: 'Stem', status: 'Available', notes: '4563'},
              {name:'Ara', leasee: 'Santa', status: 'Available', notes: '4563'},
              {name:'Ivan', leasee: 'Sam', status: 'Busy', notes: '123'},
              {name:'Alex', leasee: 'Stan', status: 'Available', notes: '456'},
              {name:'Peter', leasee: 'Stem', status: 'Available', notes: '4563'},
              {name:'Ara', leasee: 'Santa', status: 'Available', notes: '4563'},
              {name:'Ivan', leasee: 'Sam', status: 'Busy', notes: '123'},
              {name:'Alex', leasee: 'Stan', status: 'Available', notes: '456'},
              {name:'Peter', leasee: 'Stem', status: 'Available', notes: '4563'},
              {name:'Ara', leasee: 'Santa', status: 'Available', notes: '4563'},
              {name:'Ivan', leasee: 'Sam', status: 'Available', notes: '123'},
              {name:'Alex', leasee: 'Stan', status: 'Available', notes: '456'},
              {name:'Peter', leasee: 'Stem', status: 'Available', notes: '4563'},
              {name:'Ara', leasee: 'Santa', status: 'Busy', notes: '4563'}, 
              {name:'Ivan', leasee: 'Sam', status: 'Busy', notes: '123'},
              {name:'Alex', leasee: 'Stan', status: 'Available', notes: '456'},
              {name:'Peter', leasee: 'Stem', status: 'Available', notes: '4563'},
              {name:'Ara', leasee: 'Santa', status: 'Busy', notes: '4563'},                                                       
              {name:'Ivan', leasee: 'Sam', status: 'Busy', notes: '123'},
              {name:'Alex', leasee: 'Stan', status: 'Available', notes: '456'},
              {name:'Peter', leasee: 'Stem', status: 'Available', notes: '4563'},
              {name:'Ara', leasee: 'Santa', status: 'Busy', notes: '4563'},
              {name:'Ivan', leasee: 'Sam', status: 'Busy', notes: '123'},
              {name:'Alex', leasee: 'Stan', status: 'Available', notes: '456'},
              {name:'Peter', leasee: 'Stem', status: 'Available', notes: '4563'},
              {name:'Ara', leasee: 'Santa', status: 'Busy', notes: '4563'},
              {name:'Ivan', leasee: 'Sam', status: 'Busy', notes: '123'},
              {name:'Alex', leasee: 'Stan', status: 'Available', notes: '456'},
              {name:'Peter', leasee: 'Stem', status: 'Available', notes: '4563'},
              {name:'Ara', leasee: 'Santa', status: 'Busy', notes: '4563'},
              {name:'Ivan', leasee: 'Sam', status: 'Busy', notes: '123'},
              {name:'Alex', leasee: 'Stan', status: 'Available', notes: '456'},
            ],
      };
  }

    saveUser(newUser,id){
      if (id === -1){
        this.setState(
          { Vms: this.state.Vms.concat(newUser) }
        );
        return;
      }
      this.setState(
        { Vms: this.state.Vms.map( (oldUser, i) => i === id ? newUser : oldUser) }
      );
    }

    deleteUser(id){
      this.setState(
        {
          Vms: this.state.Vms.filter((user, index) => index !== id) 
        }
      );
    }

  render() {
    return (
      <div className = 'main'>
        <div className = 'fw-background'></div>
        <div className = 'fw-container'>
          <TableReact Vms = {this.state.Vms} save = {this.saveUser} remove = {this.deleteUser} maxNumber = {this.state.Vms.length} />
        </div>
        <div className = 'fw-background-bottom'></div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
