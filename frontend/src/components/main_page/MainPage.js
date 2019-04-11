import React, { Component } from "react";
import logo from "../../assets/logo.jpeg";
import HowFlow from "../../assets/How_flow.png"
import "./MainPage.css";
import ButtonAppBar from "./topnav.js";
import { Paper, Typography, Grid, GridList, GridListTile } from "@material-ui/core";
import SvgIcon from "@material-ui/core/SvgIcon";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import partners from '../../assets/partners.png'

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
          <Slider autoplay={1000} infinite={true}>
            <div key={0}>
              <div className='container'>
                <img width='80%' height='100%' src='https://images.unsplash.com/photo-1441123285228-1448e608f3d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'></img>
                <div className="centered">Centered</div>
              </div>
            </div>
            <div key={1}>
              <div className='container'>
                <img width='80%' height='100%' src='https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80'></img>
              </div>
            </div>
            <div key={2}>
              <img width='80%' height='100%' src='https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png'></img>
            </div>
            <div key={3}>
              <img width='80%' height='100%' src='https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png'></img>
            </div>
          </Slider>
          <PagePart headline="About" anchors={this.anchors.about}>
            <Typography variant='h4' align='center'>Suplly.Me enables multiple businesses to act as a single purchaser through the power of community</Typography>
          </PagePart>

          <PagePart headline="Benifits" anchors={this.anchors.benifits}>
            <div className='HomeList'>
              <li>Significant discount on all services and supplies</li>
              <li>Improved purchase conditions</li>
              <li>Yearly purchase refund</li>
            </div>
          </PagePart>
          <PagePart
            headline="How does it work"
            anchors={this.anchors.how_it_works}
          >
            <img width='100%' height='100%' src={HowFlow} />
          </PagePart>
          <PagePart className='ImagePartner' headline="Partners" anchors={this.anchors.partners}>
              <img src={partners} />
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
