import React, { Component } from "react";
import logo from "../../assets/logo.jpeg";
import "./MainPage.css";
import ButtonMainPageBar from "./topnav.js";
import { Paper, Typography } from "@material-ui/core";
import SvgIcon from "@material-ui/core/SvgIcon";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";

function HomeIcon(props) {
  return (
    <IconButton
      {...props}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <SvgIcon fontSize="large">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    </IconButton>
  );
}

function PagePart(props) {
  const { headline, anchors } = props;
  return (
    <div ref={anchors} className="MainPage-body-part">
      <Paper>
        <div>
          <Typography variant="h4">
            <HomeIcon color="action" /> {headline}
          </Typography>
        </div>
        <Divider variant="middle" className="MainPage-divider" />
        <div>{props.children}</div>
      </Paper>
    </div>
  );
}

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.anchors = {
      about: React.createRef(),
      benifits: React.createRef(),
      how_it_works: React.createRef(),
      partners: React.createRef(),
      contants: React.createRef()
    };
    this.myRef = React.createRef();
  }

  render() {
    return (
      <div className="MainPage">
        <ButtonMainPageBar anchors={this.anchors} />
        <div className="MainPage-body">
          <div>
            <Paper>
              <img src={logo} />
            </Paper>
          </div>

          <PagePart headline="About" anchors={this.anchors.about} />
          <PagePart headline="Benifits" anchors={this.anchors.benifits} />
          <PagePart
            headline="How it works"
            anchors={this.anchors.how_it_works}
          />
          <PagePart headline="Partners" anchors={this.anchors.partners} />
          <PagePart headline="Contants" anchors={this.anchors.contants}>
            <img src={logo} />
          </PagePart>
        </div>
      </div>
    );
  }
}

export default MainPage;
