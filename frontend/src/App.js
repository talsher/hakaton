import React, { Component } from "react";
import MainPage from "./components/main_page/MainPage.js";
import DashBoard from "./components/dashboard/DashBoard";
import "./App.css";
import SupplierCard from "./components/dashboard/SupplierCard.jsx";

class App extends Component {
  state = { showDashboard: false };

  constructor(props) {
    super(props);
    //console.log("show: " + this.state.showDashboard);
  }
  moveToDashboard = () => {
    console.log("showing dashboard");
    this.setState({ showDashboard: true });
  };

  showDashboard() {
    console.log("show: " + this.state.showDashboard);
    if (!this.state.showDashboard) {
      return <MainPage moveToDashboard={this.moveToDashboard} />;
    } else {
      return <DashBoard />;
    }
  }

  render() {
    return this.showDashboard();
  }
}

export default App;
