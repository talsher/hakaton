import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import GradeIcon from "@material-ui/icons/Grade";
import LocalShipping from "@material-ui/icons/LocalShipping";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Store from "@material-ui/icons/Store";

import Button from "@material-ui/core/Button";
import mini_logo from "../../assets/mini_logo.jpeg";

import "./DashBoard.css";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  toolbar: theme.mixins.toolbar,
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

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classes.appBar}
          style={{ backgroundColor: "#279ec7" }}
        >
          <Toolbar>
            <Typography variant="h3" color="inherit" className={classes.grow}>
              <img
                src={mini_logo}
                alt="logo"
                width="60"
                height="50"
                style={{ verticalAlign: "middle", marginRight: 5 }}
              />
              Supply.Me - Dashboard
            </Typography>

            <div style={{ marginLeft: 50 }} className={styles.grow}>
              <Button variant="outlined" color="inherit">
                Logout
              </Button>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolbar} />
          <List>
            <ListItem button key="Summary">
              <ListItemIcon>
                <GradeIcon />
              </ListItemIcon>
              <ListItemText primary="Summary" />
            </ListItem>

            <ListItem button key="My orders">
              <ListItemIcon>
                <LocalShipping />
              </ListItemIcon>
              <ListItemText primary="My orders" />
            </ListItem>

            <ListItem button key="New order">
              <ListItemIcon>
                <ShoppingCart />
              </ListItemIcon>
              <ListItemText primary="New order" />
            </ListItem>

            <ListItem button key="My suppliers">
              <ListItemIcon>
                <Store />
              </ListItemIcon>
              <ListItemText primary="My suppliers" />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
        </main>
      </div>
    );
  }
}

DashBoard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DashBoard);
