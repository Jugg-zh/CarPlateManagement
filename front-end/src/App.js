
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar.component"
import RoomList from "./components/room-list.component";
import AddRoom from "./components/add-room.component";
import EditRoom from "./components/edit-room.component";
import RecordList from "./components/record-list.component";
import SyncRoom from "./components/sync-room.component";
import UploadRecord from "./components/upload-record.component";
import DownloadRecord from './components/download-record.component';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/view/room" exact component={RoomList} />
        <Route path="/add/room"  component={AddRoom} />
        <Route path="/edit/room/:name"  exact component={EditRoom} />
        <Route path="/download/room" component={SyncRoom} />
        <Route path="/view/record" exact component={RecordList} />
        <Route path="/upload/record" component={UploadRecord} />
        <Route path="/download/record" component={DownloadRecord} />
      </div>
    </Router>
  );
}

export default App;