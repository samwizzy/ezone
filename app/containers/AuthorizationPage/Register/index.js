/**
 *
 * RegistrationPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectRegistrationPage from '../selectors';
import reducer from '../reducer';
import saga from '../saga';
import RegistrationForm from './components/RegistrationForm';
import Snackbar from '../../../components/layouts/shared-components/Snackbar';

export function RegistrationPage() {
  useInjectReducer({ key: 'authorizationPage', reducer });
  useInjectSaga({ key: 'authorizationPage', saga });

  return (
    <div>
      <Helmet>
        <title>Registration</title>
        <meta name="description" content="Description of Registration" />
      </Helmet>
      <RegistrationForm />
      <Snackbar />
    </div>
  );
}

RegistrationPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  registrationPage: makeSelectRegistrationPage(),
});

function mapDispatchToProps(dispatch) {
  return {
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
)(RegistrationPage);
