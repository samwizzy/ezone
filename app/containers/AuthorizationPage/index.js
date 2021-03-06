/**
 *
 * AuthorizationPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAuthorizationPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function AuthorizationPage() {
  useInjectReducer({ key: 'authorizationPage', reducer });
  useInjectSaga({ key: 'authorizationPage', saga });

  return (
    <div>
      <Helmet>
        <title>AuthorizationPage</title>
        <meta name="description" content="Description of AuthorizationPage" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

AuthorizationPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  authorizationPage: makeSelectAuthorizationPage(),
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
)(AuthorizationPage);
