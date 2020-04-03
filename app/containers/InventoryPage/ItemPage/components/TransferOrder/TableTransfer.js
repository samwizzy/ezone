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
  Button,
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

const TableTransfer = props => {
  const classes = useStyles();
  const [rows, setRows] = React.useState([{}]);
  const {
    getAllItems,
    // rows,
    // setRows,
    values,
    setValues,
    transferQuantity,
    // handleItemChange,
    // handleQuantityChange,
  } = props;

  const handleQuantityChange = idx => e => {
    const { value } = e.target;
    const newRow = rows;
    newRow[idx].transferQuantity = value;
    setRows(newRow);
  };

  const handleItemChange = (e, value, idx) => {
    const newRoww = rows;
    newRoww[idx] = {
      itemId: value.id,
      itemSku: value.sku,
    };
    setRows(newRoww);
  };

  const addRow = () => {
    const item = {
      itemId: '',
      itemSku: '',
      transferQuantity: '',
    };
    setRows([...rows, item]);
  };

  const removeRow = idx => {
    setRows(rows.filter((item, id) => id !== idx));
  };

  console.log(rows, 'rows');

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Item Details</TableCell>
              <TableCell align="center">Current Availablilty</TableCell>
              <TableCell align="center">Transfer Quantity</TableCell>
              <TableCell align="center" />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, id) => (
              <TableRow key={id}>
                <TableCell component="th" scope="row">
                  <Autocomplete
                    id="combo-itemCategory"
                    options={getAllItems}
                    getOptionLabel={option => option.itemName}
                    onChange={(evt, ve) => handleItemChange(evt, ve, id)}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Source Warehouse"
                        variant="outlined"
                        name="itemId"
                        placeholder="Source Warehouse"
                        fullWidth
                      />
                    )}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    disabled
                    id="filled-disabled"
                    label="Source Stock"
                    defaultValue="0.00 Units"
                    variant="filled"
                  />
                  &nbsp; | &nbsp;
                  <TextField
                    disabled
                    id="filled-disabled"
                    label="Destination Stock"
                    defaultValue="0.00 Units"
                    variant="filled"
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    id="filled-disabled"
                    label=""
                    defaultValue="1.00"
                    variant="outlined"
                    name="transferQuantity"
                    onChange={handleQuantityChange(id)}
                  />
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => removeRow(id)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" onClick={() => addRow()}>
        Add Row
      </Button>
    </React.Fragment>
  );
};

TableTransfer.propTypes = {
  getAllItems: PropTypes.array,
};

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
