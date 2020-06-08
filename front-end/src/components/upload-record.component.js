import React, { Component } from 'react';
import axios from 'axios';

export default class UploadRecord extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    axios.post('http://localhost:5000/records/read')
    .then(res => console.log(res.data));
    
    window.location = '/view/record';
  }

  render() {
    return (
      <div>
        <h3 style={{marginLeft: '13em',}}>Upload The File</h3>
        <form onSubmit={this.onSubmit}>
            <div className="form-group" style={{marginLeft: '25em' }}>
                <input type="submit" value="upload" className="btn btn-primary" />
            </div>
        </form>
      </div>
    )
  }
}