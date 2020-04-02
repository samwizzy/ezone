import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { compose } from 'redux';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  textField: {
    margin: theme.spacing(1),
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const customizeUseStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  textField: {
    margin: theme.spacing(1),
  },
}));

const handleCategoryChange = (evt, value) => {
  // setValues({ ...values, itemCategory: value.name });
  console.log('welcome here');
};

const Customize = () => {
  const classes = customizeUseStyles();
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <Autocomplete
          id="combo-itemCategory"
          options={[]}
          getOptionLabel={option => option.name}
          onChange={(evt, ve) => handleCategoryChange(evt, ve)}
          renderInput={params => (
            <TextField
              {...params}
              label="Source Warehouse"
              variant="outlined"
              placeholder="Source Warehouse"
              fullWidth
              // className={classes.textField}
            />
          )}
        />
      </TableCell>
      <TableCell align="right">
        <TextField
          disabled
          id="filled-disabled"
          label="Disabled"
          defaultValue="Hello World"
          variant="filled"
        />
        &nbsp; | &nbsp;
        <TextField
          disabled
          id="filled-disabled"
          label="Disabled"
          defaultValue="Hello World"
          variant="filled"
        />
      </TableCell>
      <TableCell align="right">
        <TextField
          id="filled-disabled"
          label="Disabled"
          defaultValue="Hello World"
          variant="filled"
        />
      </TableCell>
    </TableRow>
  );
};

const TableTransfer = props => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Item Details</TableCell>
              <TableCell align="right">Current Availablilty</TableCell>
              <TableCell align="right">Transfer Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <Customize />
            {/* {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

TableTransfer.propTypes = {};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRouter(
  compose(
    withConnect,
    memo,
  )(TableTransfer),
);
