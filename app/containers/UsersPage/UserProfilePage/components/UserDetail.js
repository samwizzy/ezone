import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  makeStyles,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import * as AppSelector from '../../../App/selectors';
import * as Actions from '../../actions';

const useStyles = makeStyles(theme => ({
  root: {
    "& tr": {
      "& td:last-child": {
        color: theme.palette.text.secondary
      }
    }
  }
}))

const UserDetail = props => {
  // eslint-disable-next-line react/prop-types
  const { currentUser } = props;
  const classes = useStyles()

  console.log(currentUser, 'currentUser');
  return (
    <React.Fragment>
      {currentUser && (
        <Table aria-label="simple table" className={classes.root}>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Full Name
              </TableCell>
              <TableCell>
                {currentUser.firstName} {currentUser.lastName}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                E-mail
              </TableCell>
              <TableCell>{currentUser.emailAddress}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Gender
              </TableCell>
              <TableCell>{currentUser.gender}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Phone Number
              </TableCell>
              <TableCell>{currentUser.phoneNumber}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Address
              </TableCell>
              <TableCell>{currentUser.address}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </React.Fragment>
  );
};

UserDetail.prototypes = {
  classes: PropTypes.object.isRequired,
  openNewEmployeeDialogAction: PropTypes.func,
  currentUser: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  currentUser: AppSelector.makeSelectCurrentUser(),
});

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
