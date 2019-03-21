import React, { Component } from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';

class TableRow extends Component {
  constructor(props){
    super(props);

  }

  // getUser(userId){
  //   return this.props.users.find( (user) => user.id === userId );
  // }

  //name, leasee, status, notes

  // getUserById = (userId) =>  { this.props.users.find( (user) => user.id === userId ) }

  // getUserIdByName = (name) => {
  //   let result = this.props.users.find((user) => (user.first + ' ' + user.last) === name);
  //   return result }

  // renderUser = (userId) => {
  //   let user = this.getUserById(userId);
  //   return user.first + ' ' + user.last;
  // }

  render() {
    return (
      <tr 
      onClick = { () => this.props.selectThisRow(this.props.id) }
      className = {this.props.givenClassName}
      >
        <th scope='row'>{this.props.Vm.name}</th>
        <td>{this.props.user}</td>
        <td>{this.props.Vm.status}</td>
        <td>{this.props.Vm.notes}</td>
        <td>{this.props.id}</td>
      </tr>
    );
  }
}

export {TableRow};