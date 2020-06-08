import React, { Component } from 'react';
import axios from 'axios';

export default class SyncRoom extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    axios.post('http://localhost:5000/rooms/save')
     .then()
     .catch((error) => {
      console.log(error);
     })
    window.location = '/view/room';
  }

  render() {
    return (
      <div>
        <h3 style={{marginLeft: '13em',}}>Download The File</h3>
        <form onSubmit={this.onSubmit}>
            <div className="form-group" style={{marginLeft: '25em' }}>
                <input type="submit" value="download" className="btn btn-primary" />
            </div>
        </form>
      </div>
    )
  }
}