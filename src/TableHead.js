import React, { Component } from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';

class TableHead extends Component {
   render() {
    return (
      <tr>
            <th scope="col">Name</th>
            <th scope="col">Leasee</th>
            <th scope="col">Status</th>
            <th scope="col">Notes</th>
      </tr>
     );
    }
  }
  
  export {TableHead};