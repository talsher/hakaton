import React, { Component } from "react";
import MainPage from "./components/main_page/MainPage.js";
import DashBoard from "./components/dashboard/DashBoard";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <MainPage />;
  }
}

export default App;
