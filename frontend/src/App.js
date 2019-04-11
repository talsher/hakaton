import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DashBoard from './dashboard/DashBoard.js';
import SideBar from './dashboard/SideBar.js'

class App extends Component {
  render() {
    return (
      <div className="App">
          <div className = "header">
             <DashBoard/>
          </div>
       {/* <SideBar/> */}


      </div>
    );
  }
}

export default App;
