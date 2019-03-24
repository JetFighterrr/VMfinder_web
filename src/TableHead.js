import React, { Component } from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';

class TableHead extends Component {
   render() {
    return (
      <tr>
            <th>Name</th>
            <th>Leasee</th>
            <th>Status</th>
            <th>Notes</th>
      </tr>
     );
    }
  }
  
  export {TableHead};