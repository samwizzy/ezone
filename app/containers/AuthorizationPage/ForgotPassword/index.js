/**
 *
 * LoginPage
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from '../reducer';
import saga from '../saga';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import * as Selectors from '../../App/selectors';
import Snackbar from '../../App/components/Snackbar';

export function ForgotPasswordPage() {
  useInjectReducer({ key: 'authorizationPage', reducer });
  useInjectSaga({ key: 'authorizationPage', saga });

  return (
    <div>
      <Helmet>
        <title>Forgot Password</title>
        <meta name="description" content="Description of Forgot Password" />
      </Helmet>
      <ForgotPasswordForm />
      <Snackbar />
    </div>
  );
}

ForgotPasswordPage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  tokens: Selectors.makeSelectAccessToken(),
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
)(ForgotPasswordPage);
