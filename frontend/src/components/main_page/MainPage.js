import React, { Component } from "react";
import logo from "../../assets/logo.jpeg";
import "./MainPage.css";
import ButtonAppBar from "./topnav.js";
import { Paper, Typography } from "@material-ui/core";
import SvgIcon from "@material-ui/core/SvgIcon";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";

function HomeIcon(props) {
  return (
    <IconButton onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      <SvgIcon fontSize="large" {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    </IconButton>
  );
}

function PagePart(props) {
  const { headline, anchors } = props;
  return (
    <div ref={anchors}>
      <div className="MainPage-body-part">
        <div>
          <Typography variant="h4">
            <HomeIcon /> {headline}
          </Typography>
        </div>
        <Divider variant="middle" />
        <div className="MainPage-text">{props.children}</div>
      </div>
      <Divider variant="fullWidth" />
    </div>
  );
}

class MainPage extends Component {
  addedPadding = 80;

  importAll(r) {
    return r.keys().map(r);
  }

  constructor(props) {
    super(props);
    this.anchors = {
      about: React.createRef(),
      benifits: React.createRef(),
      how_it_works: React.createRef(),
      partners: React.createRef(),
      contants: React.createRef()
    };

    this.cont = require.context(
      "../../assets/MainPageImages",
      false,
      /\.(png|jpe?g|svg)$/
    );
    this.images = this.cont.keys().map(this.cont);
  }

  render() {
    return (
      <div
        style={{ backgroundColor: "#d9d9d9", paddingTop: this.addedPadding }}
      >
        <ButtonAppBar
          anchors={this.anchors}
          addedPadding={this.addedPadding}
          moveToDashboard={this.props.moveToDashboard}
        />
        <div className="MainPage-body">
          <Slider>
            {this.images.map(image => (
              <div key={0} backgroundImage={image} />
            ))}

            <div
              key={0}
              style={{
                backgroundimage: "../../assets/MainPageImages/logo.jpeg"
              }}
            >
              <h2>bla</h2>
              <div>bla bla bla</div>
            </div>
            <div key={1}>
              <h2>bla</h2>
              <div>bla bla bla</div>
            </div>
          </Slider>
          <PagePart headline="About" anchors={this.anchors.about} />
          <PagePart headline="Benifits" anchors={this.anchors.benifits} />
          <PagePart
            headline="How does it work"
            anchors={this.anchors.how_it_works}
          >
            <img src={logo} />
          </PagePart>
          <PagePart headline="Partners" anchors={this.anchors.partners}>
            <img src={logo} />
          </PagePart>
          <PagePart headline="Contants" anchors={this.anchors.contants}>
            <img src={logo} />
          </PagePart>
        </div>
      </div>
    );
  }
}

export default MainPage;
