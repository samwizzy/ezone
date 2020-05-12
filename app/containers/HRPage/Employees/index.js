/*
 * HRPage Employee
 *
 * This is the first thing users see of our App, at the '/' route
 */
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
import * as AppSelectors from '../../App/selectors';
import * as AppActions from '../../App/actions';
import * as Actions from './../actions';
import makeSelectHRPage from './../selectors';
import reducer from './../reducer';
import saga from './../saga';
import ModuleLayout from './ModuleLayout'
import EmployeeList from './EmployeeList';
import EmployeeDetails from './EmployeeDetails';
import WorkExperienceDialog from './components/WorkExperienceDialog';
import EducationBackgroundDialog from './components/EducationBackgroundDialog';

const key = 'hrPage';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

export function EmployeePage(props) {
  const { getEmployees, match } = props;
  const { params } = match
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
    <React.Fragment>
      <Helmet>
        <title>Employee Page</title>
        <meta name="description" content="ezone application employee page" />
      </Helmet>

      <ModuleLayout>
        {params.status?
        <EmployeeDetails /> : <EmployeeList />
        }
      </ModuleLayout>

      <WorkExperienceDialog />
      <EducationBackgroundDialog />
    </React.Fragment>
  );
}

EmployeePage.propTypes = {
  token: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  hrPage: makeSelectHRPage(),
  token: AppSelectors.makeSelectAccessToken(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getEmployees: () => dispatch(Actions.getEmployees()),
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
)(EmployeePage);
