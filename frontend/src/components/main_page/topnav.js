import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Tabs, Tab } from "@material-ui/core";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

function scrollToAnchor(anchorRef) {
  window.scrollTo({
    top: anchorRef.current.offsetTop,
    behavior: "smooth"
  });
}

function ButtonAppBar(props) {
  const { classes } = props;
  const { anchors } = props; // anchor is a dict of actionName: actionAncorCallback
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.menuButton}
          >
            Supply.Me
          </Typography>
          <Tabs
            value="About"
            color="inherit"
            variant="fullWidth"
            className={classes.grow}
          >
            <Tab
              label="About"
              value="About"
              onClick={() => {
                scrollToAnchor(anchors.about);
              }}
            />
            <Tab
              label="Benifits"
              value="Benifits"
              onClick={() => {
                scrollToAnchor(anchors.benifits);
              }}
            />
            <Tab
              label="How it works"
              value="How it works"
              onClick={() => {
                scrollToAnchor(anchors.how_it_works);
              }}
            />
            <Tab
              label="Partners"
              value="Partners"
              onClick={() => {
                scrollToAnchor(anchors.partners);
              }}
            />
            <Tab
              label="Contants"
              value="Contants"
              onClick={() => {
                scrollToAnchor(anchors.contants);
              }}
            />
          </Tabs>
          <div style={{ marginLeft: 30 }}>
            <Button color="inherit">Login</Button>
            <Button color="inherit">Register</Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonAppBar);
