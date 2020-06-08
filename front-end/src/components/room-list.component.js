import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import matchSorter from 'match-sorter'
import Button from 'react-bootstrap/Button'
import { FilePicker } from "react-file-picker";
import readXlsxFile from 'read-excel-file'


export default class RoomList extends Component {

  constructor(props) {

    super(props);
    this.state = {rooms: []};

    this.handleFileChange = this.handleFileChange.bind(this);
  }
  componentDidMount() {
    axios.get('http://localhost:5000/rooms/')
     .then(response => {
       this.setState({ rooms : response.data });
     })
     .catch((error) => {
        console.log(error);
     })
  }

  editRoom(id){
    
  }

  handleFileChange = file => {
    const schema = {
      'Room': {
          prop: 'roomNumber',
          type: String
      },
      'Plate': {
          prop: 'plateList',
          type: String,
          required: false,
          default : ''
      },
    }
    readXlsxFile(file,{ schema }).then(({ rows, errors }) => {
      console.log(rows);
      console.log(rows[0]["plateNumber"]);
      console.log(rows[2]["plateNumber"]);
      axios.post('http://localhost:5000/rooms/addAllRooms', rows)
        .then(res => console.log(res.data));

    })
  };

  render() {
    const columns = [
      {
        Header :"Room",
        accessor:"roomNumber",
        style:{
          textAlign:"center"
        },
        width: 200,
        maxWidth: 100,
        minWidth: 100,
        
      },
      {
        Header :"PlateList",
        accessor:"plateList",
        style:{
          textAlign:"center"
        },
        filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["plateList"] }),
        filterAll: true
      },

      {
        Header :"Actions",
        Cell: props =>{
          return (
            <button 
              onClick={()=>{
                window.location.href="/edit/room/"+props.original._id;
              }}
            > Edit</button>
          )
        },
        sortable:false,
        filterable:false,
        width: 100,
        maxWidth: 100,
        minWidth: 100,
        style:{
          textAlign:"center"
        }
      },
    ]

    return(
      <div>
      <FilePicker
          extensions={["xlsx"]} 
          onChange={this.handleFileChange}
          onError={errMsg => console.log(errMsg)} 
        >
          <Button variant="outline-dark" size="lg" block>
            Add rooms
          </Button>
      </FilePicker>  
        <ReactTable

          columns = {columns}
          data = {this.state.rooms}
          filterable
          defaultPageSize ={20}
          showPaginationTop
          noDataText={'No data'}
          showPaginationBottom={false}
        >
        </ReactTable>
      </div>
    );
  }
}