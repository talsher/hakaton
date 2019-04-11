import React, { Component } from "react";
import MainPage from "./components/main_page/MainPage.js";
import DashBoard from "./components/dashboard/DashBoard";
import "./App.css";
import SupplierCard from './components/dashboard/SupplierCard.jsx'

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // return <MainPage />;
    return <SupplierCard/>
  }
}

export default App;
