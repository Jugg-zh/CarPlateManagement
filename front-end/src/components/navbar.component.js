import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand"></Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/view/room" className="nav-link">Room Management</Link>
          </li>
          <li className="navbar-item">
          <Link to="/view/record" className="nav-link">Rocord Viewer</Link>
          </li>
          <li className="navbar-item">
            <Link to="/download/record" className="nav-link">Sync Record</Link>
          </li>
          {/* <li className="navbar-item">
          <Link to="/download/room" className="nav-link">Sync To Mobile</Link>
          </li>
          <li className="navbar-item">
          <Link to="/upload/record" className="nav-link">Sync From Mobile</Link>
          </li> */}
        </ul>
        </div>
      </nav>
    );
  }
}