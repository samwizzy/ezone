import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import * as AppSelectors from '../App/selectors';
import * as AppActions from '../App/actions';
import * as Actions from './actions';
import makeSelectHRPage, * as Selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import HumanResourcePage from './HumanResourcePage';

const key = 'hrPage';
export function HumanResourceApp(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const {
    getEmployees,
    getDepartmentsByOrgIdApi,
    getEnrollmentTypes,
    getLocations,
    getAnnouncements,
    getJobOpenings,
    getApplicants,
    getAttendances,
    getEmployeeTypes,
    getSourceOfHire,
    getPayRates,
    getPayTypes,
    getRoles,
    getBranches,
    getPartyGroups,
  } = props;

  useEffect(() => {
    getEmployees();
    getDepartmentsByOrgIdApi();
    getEmployeeTypes();
    getSourceOfHire();
    getPayRates();
    getPayTypes();
    getRoles();
    getBranches();
    getEnrollmentTypes();
    getLocations();
    getJobOpenings();
    getApplicants();
    getAttendances();
    getPartyGroups();
    getAnnouncements();
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>Human Resource Page</title>
        <meta name="description" content="ezone application human resource" />
      </Helmet>

      <HumanResourcePage />

    </React.Fragment>
  );
}

HumanResourceApp.propTypes = {};

const mapStateToProps = createStructuredSelector({
  hrPage: makeSelectHRPage(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getEmployees: () => dispatch(Actions.getEmployees()),
    getDepartmentsByOrgIdApi: () => dispatch(Actions.getDepartmentsByOrgIdApi()),
    getEmployeeTypes: () => dispatch(Actions.getEmployeeTypes()),
    getSourceOfHire: () => dispatch(Actions.getSourceOfHire()),
    getPayRates: () => dispatch(Actions.getPayRates()),
    getPayTypes: () => dispatch(Actions.getPayTypes()),
    getRoles: () => dispatch(Actions.getRoles()),
    getBranches: () => dispatch(Actions.getBranches()),
    getEnrollmentTypes: () => dispatch(Actions.getEnrollmentTypes()),
    getLocations: () => dispatch(Actions.getLocations()),
    getJobOpenings: () => dispatch(Actions.getJobOpenings()),
    getApplicants: () => dispatch(Actions.getApplicants()),
    getAttendances: () => dispatch(Actions.getAttendances()),
    getPartyGroups: () => dispatch(Actions.getPartyGroups()),
    getAnnouncements: () => dispatch(Actions.getAnnouncements()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(HumanResourceApp);
