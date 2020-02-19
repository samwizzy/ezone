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
import reducer from './reducer';
import saga from './saga';
import LoginForm from './components/LoginForm';

// import { useAuth } from '../context/AppContext';
import * as Selectors from '../App/selectors';
import * as AppActions from '../App/actions';
import Snackbar from '../App/components/Snackbar';

export function LoginPage(props) {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });

  const { tokens } = props;
  console.log(tokens, 'tokens');

  if (tokens) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div>
      <Helmet>
        <title>LoginPage</title>
        <meta name="description" content="Description of LoginPage" />
      </Helmet>
      <LoginForm />
      <Snackbar />
    </div>
  );
}

LoginPage.propTypes = {
  tokens: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  dispatchLogoutAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  tokens: Selectors.makeSelectAccessToken(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchLogoutAction: () => dispatch(AppActions.logout()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LoginPage);
