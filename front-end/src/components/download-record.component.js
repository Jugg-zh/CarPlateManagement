import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; 
import Button from 'react-bootstrap/Button'


export default class DownloadRecord extends Component {

  constructor(props) {
    super(props);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDownload = this.onDownload.bind(this);
    this.state = {
      records :[],
      startDate : new Date().setHours(1),
      endDate :  new Date(),
    };
  }

  onChangeStartDate(date) {
    console.log(date)
    this.setState({
        startDate : new Date(date.toString().substring(0,16))
    });
  }
  onChangeEndDate(date) {
    this.setState({
        // endDate : new Date(date.toString().substring(0,16)).setHours(23,59,59)
        endDate : new Date(date.toString().substring(0,16))
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const dateRange = {
      startDate : this.state.startDate.toString(),
      endDate : this.state.endDate.toString()
    };

    axios.post('http://localhost:5000/records/search' , dateRange)
    .then(response => {
      var tmp = response.data;
      var i;
      for(i = 0; i < tmp.length;i++){
        tmp[i]['timeStamp'] = tmp[i]['timeStamp'].substring(0,10) + " " + tmp[i]['timeStamp'].substring(11,19);
      }
      this.setState({ records : tmp});
     })
     .catch((error) => {
        console.log(error);
     })
  }

  onDownload(e){
    e.preventDefault();
    var fileDownload = require('js-file-download');
    var records = this.state.records;
    console.log(records[0]);
    var stringList = [];
    var i;
    stringList.push("plateNumber,roomNumber,slotNumber,timeStamp,shift");
    for (i = 0; i < records.length; i++) {
      var rows = [];
      rows.push(records[i]["plateNumber"].trim());
      rows.push(records[i]["roomNumber"].trim());
      rows.push(records[i]["slotNumber"].trim());
      rows.push(records[i]["timeStamp"].substring(0,11).trim());
      rows.push(records[i]["shift"].trim());
      stringList.push(rows.join(","));
    }
    
    var fileName = this.state.startDate.toString().substring(4,15) + "-" + this.state.endDate.toString().substring(4,15) + ".csv";
    fileDownload(stringList.join("\n"), fileName);
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

        <div>    
          <DatePicker
              selected={this.state.startDate}
              onChange={this.onChangeStartDate}
          />
          <DatePicker 
              selected={this.state.endDate}
              onChange={this.onChangeEndDate}
          />
          <Button type="submit"style={{marginLeft: '%'} }
            onClick={this.onSubmit}
            >Search</Button>
          <Button type="submit"style={{marginLeft: '50%'} }
            onClick={this.onDownload}
            >Download</Button>
        <ReactTable
          columns = {columns}
          data = {this.state.records}
          filterable
          defaultPageSize ={20}
          showPaginationTop
          noDataText={'No data'}
          showPaginationBottom={false}
          useAbsoluteLayout={true}
        >
        </ReactTable>
        </div>
    );
  }
}