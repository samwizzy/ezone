import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectEmployeePage from '../selectors';
import * as Actions from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import SignatureDialog from './components/SignatureDialog';
import UserProfileDialog from './components/UserProfileDialog';
// import UserProfile from './components/UserProfile';
import ProfilePage from './ProfilePage';
import ModuleLayout from './../components/ModuleLayout';

export function EmployeePage(props) {
  useInjectReducer({ key: 'usersPage', reducer });
  useInjectSaga({ key: 'usersPage', saga });

  const { getAllEmployees } = props;

  useEffect(() => {
    getAllEmployees();
  }, []);

  return (
    <div>
      <Helmet>
        <title>User Profile</title>
        <meta name="description" content="Description of User Profile" />
      </Helmet>

      <ModuleLayout>
        <ProfilePage />
      </ModuleLayout>

      <SignatureDialog />
      <UserProfileDialog />
    </div>
  );
}

EmployeePage.propTypes = {
  dispatchGetAllEmployeesAction: PropTypes.func,
  openNewEmployeeDialogAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  employeePage: makeSelectEmployeePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAllEmployees: () => dispatch(Actions.getAllEmployees()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(EmployeePage);
