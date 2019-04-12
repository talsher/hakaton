import React, { Component } from "react";
import logo from "../../assets/logo.jpeg";
import HowFlow from "../../assets/How_flow.png"
import "./MainPage.css";
import ButtonAppBar from "./topnav.js";
import { Paper, Typography, Grid, GridList, GridListTile, Button } from "@material-ui/core";
import SvgIcon from "@material-ui/core/SvgIcon";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import partners from '../../assets/partners.png';
import car_sup from '../../assets/MainPageImages/car_sup2.png';
import off_sup from '../../assets/MainPageImages/off_sup2.png';
import veg_sup from '../../assets/MainPageImages/veg_sup2.png';
import Buying from '../../assets/MainPageImages/buying.png';
import cart from '../../assets/MainPageImages/shoppingcart.png';
import email from '@material-ui/icons'

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
        <ButtonAppBar anchors={this.anchors} addedPadding={this.addedPadding} />
        <div className="MainPage-body">
          <Slider autoplay={2000} infinite={true}>
            <div key={0}>
              <div className='container'>
                <img width='80%' height='100%' src={veg_sup}></img>
                <div className="centered">
                <div>Get more out of your suplier today</div>
                <Button variant="outlined" style={{backgroundColor: '#ffff'}}>More info</Button>
                </div>
              </div>
            </div>
            <div key={1}>
              <div className='container'>
                <img width='80%' height='100%' src={car_sup}></img>
                <div className='centered'>for every service you need</div>
              </div>
            </div>
            <div key={2}>
            <div className='container'>
              <img width='80%' height='100%' src={off_sup}></img>
              <div className='centered'>Supply.Me is here for you</div>
              </div>
            </div>
          </Slider>
          <PagePart headline="About" anchors={this.anchors.about}>
          <div>
          <Typography variant='h4' align='center' >Suplly.Me enables multiple businesses to act as a single purchaser through the power of community</Typography>
          <img className='center' src={Buying} />
          <Typography variant='h4' align='center'>Buying products together increases order quantity, unlocks otherwise unreachable wholesale prices, removes minimum order limits, and improves purchase terms
          </Typography>
            </div>
          </PagePart>

          <PagePart headline="Benifits" anchors={this.anchors.benifits}>
            <div className='HomeList'>
              <img src={cart} />
              <li>Significant discount on all services and supplies</li>
              <li>Improved purchase conditions</li>
              <li>Yearly purchase refund</li>
            </div>
          </PagePart>
          <PagePart
            headline="How it works"
            anchors={this.anchors.how_it_works}
          >
            <img width='100%' height='100%' src={HowFlow} />
          </PagePart>
          
          <PagePart headline="Contants" anchors={this.anchors.contants}>
          <a style={{fontSize: 30}} href='info@Suplly.Me'>info@Suplly.Me</a>
          <img className='center' src={logo} />
          </PagePart>
        </div>
      </div>
    );
  }
}

export default MainPage;


/**
 *           <PagePart className='ImagePartner' headline="Partners" anchors={this.anchors.partners}>
              <img src={partners} />
          </PagePart>
 * 
 */