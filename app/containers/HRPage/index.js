/*
 * HRPage
 *
 * This is the first thing users see of our App, at the '/' route
 */
import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import * as AppSelectors from '../App/selectors';
import * as AppActions from '../App/actions';
import * as Actions from './actions';
import makeSelectHRPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import ModuleLayout from './components/ModuleLayout';
import HumanResourcePage from './HumanResourcePage'

const key = 'hrPage';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
}));

export function HRPage(props) {
<<<<<<< HEAD
  const {getEmployees, getDepartmentsByOrgIdApi, getEnrollmentTypes, getLocations, getJobOpenings, getEmployeeTypes, getRoles, getBranches} = props
=======
  const {getEmployees, getDepartmentsByOrgIdApi} = props
>>>>>>> 2a6078522d30a417cd4d0ce5e2f181662d41fa4c
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  React.useEffect(() => {
    getEmployees()
    getDepartmentsByOrgIdApi()
<<<<<<< HEAD
    getEmployeeTypes()
    getRoles()
    getBranches()
    getEnrollmentTypes()
    getLocations()
    getJobOpenings()
    
=======
>>>>>>> 2a6078522d30a417cd4d0ce5e2f181662d41fa4c
  }, [])

  return (
    <React.Fragment>
      <Helmet>
        <title>Human Resource Page</title>
        <meta name="description" content="ezone application homepage" />
      </Helmet>

      <ModuleLayout>
        <HumanResourcePage />
      </ModuleLayout>
    </React.Fragment>
  );
}

HRPage.propTypes = {
  token: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  hrPage: makeSelectHRPage(),
  token: AppSelectors.makeSelectAccessToken(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getEmployees: () => dispatch(Actions.getEmployees()),
    getDepartmentsByOrgIdApi: () =>dispatch(Actions.getDepartmentsByOrgIdApi()),
    getEmployeeTypes: () =>dispatch(Actions.getEmployeeTypes()),
    getRoles: () =>dispatch(Actions.getRoles()),
    getBranches: () =>dispatch(Actions.getBranches()),
    getEnrollmentTypes: () =>dispatch(Actions.getEnrollmentTypes()),
    getLocations: () =>dispatch(Actions.getLocations()),
    getJobOpenings: () =>dispatch(Actions.getJobOpenings()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HRPage);
