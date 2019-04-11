import React, { Component } from "react";

import "./DashBoard.css";
import DashBoardNavbar from "./topnav.js";
import DashboardControl from "./DashboardControl";

const classes = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  }
});
class DashBoard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        style={{ backgroundColor: "#d9d9d9", paddingTop: this.addedPadding }}
      >
        <DashBoardNavbar className={classes.appBar} />
        <div>
          <DashboardControl style={{ marginTop: 50 }} />
          <div>THis is me!!!</div>
        </div>
      </div>
    );
  }
}

export default DashBoard;
