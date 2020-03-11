import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import * as Actions from '../../actions';


const UserDetail = props => {
  const { classes, openNewEmployeeDialogAction } = props;

  return (
    <React.Fragment>
      <TableContainer>
        <Table aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Full Name
              </TableCell>
              <TableCell>teslim</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                E-mail
              </TableCell>
              <TableCell>teslim</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Gender
              </TableCell>
              <TableCell>teslim</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Phone Number
              </TableCell>
              <TableCell>teslim</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Address
              </TableCell>
              <TableCell>teslim</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

UserDetail.prototypes = {
  classes: PropTypes.object.isRequired,
  openNewEmployeeDialogAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    openNewBranchDialogAction: () => dispatch(Actions.openNewEmployeeDialog()),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(UserDetail);
