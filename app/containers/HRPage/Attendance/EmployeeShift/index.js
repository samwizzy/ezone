import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as AppSelectors from '../../../App/selectors';
import * as AppActions from '../../../App/actions';
import * as Actions from './../actions';
import * as Selectors from './../selectors';
import EmployeeShiftList from './EmployeeShiftList'
import AssignShiftDialog from './components/AssignShiftDialog'

export function EmployeeShiftPage(props) {
  const { getAttendances, getEmployees } = props;

  React.useEffect(() => {
    getAttendances();
    getEmployees();
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>Employee Shift Page</title>
        <meta name="description" content="ezone application employee shift page" />
      </Helmet>

      <EmployeeShiftList />

      <AssignShiftDialog />

    </React.Fragment>
  );
}

EmployeeShiftPage.propTypes = {};

const mapStateToProps = createStructuredSelector({});

export function mapDispatchToProps(dispatch) {
  return {
    getAttendances: () => dispatch(Actions.getAttendances()),
    getEmployees: () => dispatch(Actions.getEmployees()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(EmployeeShiftPage);
