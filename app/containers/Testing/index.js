/**
 *
 * Testing
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
import makeSelectTesting from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function Testing() {
  useInjectReducer({ key: 'testing', reducer });
  useInjectSaga({ key: 'testing', saga });

  return (
    <div>
      <Helmet>
        <title>Testing</title>
        <meta name="description" content="Description of Testing" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

Testing.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  testing: makeSelectTesting(),
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
)(Testing);
