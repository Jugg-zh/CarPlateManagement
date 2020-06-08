import React, { Component } from 'react';
import axios from 'axios';

export default class EditRoom extends Component {
  constructor(props) {
    super(props);


    this.onChangeRoomNumber = this.onChangeRoomNumber.bind(this);
    this.onChangePlateList = this.onChangePlateList.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      roomNumber: '',
      plateList: '',
    }
  }

  componentDidMount() {

    axios.get('http://localhost:5000/rooms/'+this.props.match.params.name)
        .then(response => {
        this.setState({
            roomNumber: response.data.roomNumber,
            plateList: response.data.plateList,
        })
        console.log(response.data)
        })
        .catch(function (error) {
        console.log(error);
    })
}

  onChangeRoomNumber(e) {
    this.setState({
      roomNumber: e.target.value
    });
  }
  onChangePlateList(e) {
    this.setState({
      plateList : e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const room = {
      roomNumber: this.state.roomNumber,
      plateList: this.state.plateList,
      
    };

    axios.post('http://localhost:5000/rooms/update/' + this.props.match.params.name, room)
    .then(res => console.log(res.data));

    window.location = '/view/room';
  }

  render() {
      return (
        <div>
          <h3>Edit Room</h3>
          <form onSubmit={this.onSubmit}>
              <div className="form-group">
                  <label> Room Number </label>
                  <textarea 
                      type="text" 
                      className="form-control"
                      value={this.state.roomNumber}
                      onChange={this.onChangeRoomNumber}
                      />
              </div>

              <div className="form-group">
                  <label> PlateList </label>
                  <input 
                      type="text" 
                      className="form-control"
                      value={this.state.plateList}
                      onChange={this.onChangePlateList}
                  />
              </div>


              <div className="form-group">
                  <input type="submit" value="Confirm" className="btn btn-primary" />
              </div>
          </form>
        </div>
      )
    }
}