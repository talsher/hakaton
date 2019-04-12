import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const CustomTableCell = withStyles({
  head: {
    backgroundColor: "#279ec7",
    color: "white",
    fontSize: 20
  },
  body: {
    fontSize: 16
  }
})(TableCell);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});

class Orders extends Component {
  state = { orders: [] };

  componentDidMount() {
    fetch(
      "http://34.222.158.120:4000/get/orders?customer_name=" +
        this.props.customerName
    )
      .then(response => response.json())
      .then(resData => {
        console.log(resData);
        this.setState({
          orders: resData.map((data, index) => {
            return {
              order_id: data.order_id,
              supplier_name: data.supplier_name,
              cost: data.total_cost,
              status: data.status
            };
          })
        }); //this is an asynchronous function
      });
  }
  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell align="center">Order ID</CustomTableCell>
              <CustomTableCell align="center">Supplier Name</CustomTableCell>
              <CustomTableCell align="center">Cost</CustomTableCell>
              <CustomTableCell align="center">Status</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.orders.map((row, index) => (
              <TableRow className={classes.row} key={index}>
                <CustomTableCell align="center" component="th" scope="row">
                  {row.order_id}
                </CustomTableCell>
                <CustomTableCell align="center">
                  {row.supplier_name}
                </CustomTableCell>
                <CustomTableCell align="center">{row.cost}</CustomTableCell>
                <CustomTableCell align="center">{row.status}</CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

Orders.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Orders);
