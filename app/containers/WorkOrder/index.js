/**
 *
 * WorkOrderPage
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
import makeSelectWorkOrderPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function WorkOrderPage() {
  useInjectReducer({ key: 'workOrderPage', reducer });
  useInjectSaga({ key: 'workOrderPage', saga });

  return (
    <div>
      <Helmet>
        <title>WorkOrderPage</title>
        <meta name="description" content="Description of WorkOrderPage" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

WorkOrderPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  workOrderPage: makeSelectWorkOrderPage(),
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
)(WorkOrderPage);
