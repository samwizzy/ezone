/**
 *
 * Accounting
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
import makeSelectAccounting from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function Accounting() {
  useInjectReducer({ key: 'accounting', reducer });
  useInjectSaga({ key: 'accounting', saga });

  return (
    <div>
      <Helmet>
        <title>Accounting</title>
        <meta name="description" content="Description of Accounting" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

Accounting.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  accounting: makeSelectAccounting(),
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
)(Accounting);
