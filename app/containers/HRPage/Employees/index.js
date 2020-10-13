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
import EmployeeDetails from './employee';
import AddEmployeeDialog from './components/AddEmployeeDialog';
import WorkExperienceDialog from './components/WorkExperienceDialog';
import EducationBackgroundDialog from './components/EducationBackgroundDialog';

export function EmployeePage(props) {
  const { match } = props;
  const { params } = match

  return (
    <React.Fragment>
      <Helmet>
        <title>Employee Page</title>
        <meta name="description" content="ezone application employee page" />
      </Helmet>

      <ModuleLayout>
        {params.status ?
          <EmployeeDetails /> : <EmployeeList />
        }
      </ModuleLayout>

      <AddEmployeeDialog />
      <WorkExperienceDialog />
      <EducationBackgroundDialog />
    </React.Fragment>
  );
}

EmployeePage.propTypes = {};

const mapStateToProps = createStructuredSelector({});

export function mapDispatchToProps(dispatch) {
  return {};
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
