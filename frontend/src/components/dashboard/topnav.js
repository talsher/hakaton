import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import "./topnav.css";
import { Tabs, Tab } from "@material-ui/core";
import mini_logo from "../../assets/mini_logo.jpeg";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  margin: {
    margin: theme.spacing.unit
  },
  menuButton: {
    marginLeft: 20,
    marginRight: 50
  }
});

function scrollToAnchor(anchorRef, addedPadding) {
  window.scrollTo({
    top: anchorRef.current.offsetTop - addedPadding,
    behavior: "smooth"
  });
}

function NavbarTab(props) {
  const { value, anchor, addedPadding } = props;
  return (
    <Tab
      label={<h2>{value}</h2>}
      value={value}
      onClick={() => {
        scrollToAnchor(anchor, addedPadding);
      }}
    />
  );
}

function DashBoardNavbar(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="fixed" style={{ backgroundColor: "#279ec7" }}>
        <Toolbar>
          <Typography
            variant="h3"
            color="inherit"
            className={classes.menuButton}
          >
            <img
              src={mini_logo}
              alt="logo"
              width="60"
              height="50"
              style={{ verticalAlign: "middle", marginRight: 5 }}
            />
            Supply.Me
          </Typography>

          <Tabs color="inherit" variant="fullWidth" className={classes.grow} />

          <div style={{ marginLeft: 50 }} className={styles.grow}>
            <Button variant="outlined" color="inherit">
              Logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

DashBoardNavbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DashBoardNavbar);
