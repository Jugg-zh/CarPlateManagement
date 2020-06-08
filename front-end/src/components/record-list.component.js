import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';

export default class RecordList extends Component {

  constructor(props) {
    super(props);
    this.state = {records :[]};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/records/')
    .then(response => {
      // console.log(this.state.records)
      var tmp = response.data;
      var i;
      
      for(i = 0; i < tmp.length;i++){
        tmp[i]['timeStamp'] = new Date(tmp[i]['timeStamp']).toLocaleString()
      }
      this.setState({ records : tmp});
      // console.log(this.state.records)
     })
     .catch((error) => {
        console.log(error);
     })
  }

  render() {
    const columns = [
      {
        Header :"Plate",
        accessor:"plateNumber",
        style:{
          textAlign:"center"
        }
      },
      {
        Header :"Room",
        accessor:"roomNumber",
        style:{
          textAlign:"center"
        }
      },
      {
        Header :"Slot",
        accessor:"slotNumber",
        style:{
          textAlign:"center"
        }
      },
      {
        Header :"Time",
        accessor:"timeStamp",
        style:{
          textAlign:"center"
        },
      },
      {
        Header :"Shift",
        accessor:"shift",
        style:{
          textAlign:"center"
        }
      },
    ]

    return(

        <ReactTable

          columns = {columns}
          data = {this.state.records}
          filterable
          defaultPageSize ={20}
          showPaginationTop
          noDataText={'No data'}
          showPaginationBottom={false}
        >

        </ReactTable>
        
    );
  }
}