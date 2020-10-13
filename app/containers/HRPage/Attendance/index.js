import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withRouter, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import * as AppSelectors from '../../App/selectors';
import * as AppActions from '../../App/actions';
import * as Actions from './actions';
import makeSelectAttendancePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import ModuleLayout from './components/ModuleLayout';

const key = 'attendance';

export function AttendancePage(props) {
  const { getAttendances, getDays, getShifts, days, getEmployees, getRoles, getBranches, getDepartments } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  React.useEffect(() => {
    getAttendances();
    getDays();
    getShifts();
    getEmployees();
    getRoles();
    getBranches();
    getDepartments();
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>Attendance Page</title>
        <meta name="description" content="ezone application attendance page" />
      </Helmet>

      <ModuleLayout />
    </React.Fragment>
  );
}

AttendancePage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  attendance: makeSelectAttendancePage(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getAttendances: () => dispatch(Actions.getAttendances()),
    getDays: () => dispatch(Actions.getDays()),
    getShifts: () => dispatch(Actions.getShifts()),
    getEmployees: () => dispatch(Actions.getEmployees()),
    getDepartments: () => dispatch(Actions.getDepartments()),
    getBranches: () => dispatch(Actions.getBranches()),
    getRoles: () => dispatch(Actions.getRoles()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AttendancePage);
