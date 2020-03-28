/**
 *
 * Accounting
 *
 */

import React, { memo, useEffect } from 'react';
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
import AccountChart from './components/AccountChart';
import NewAccountDialog from './components/NewAccountDialog';
import * as Actions from './actions';

export function Accounting(props) {
  useInjectReducer({ key: 'accounting', reducer });
  useInjectSaga({ key: 'accounting', saga });

  const {
    dispatchGetAllChartOfAccountTypeAction,
    dispatchGetAllAccountTypeAction
  } = props;

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    dispatchGetAllChartOfAccountTypeAction();
    dispatchGetAllAccountTypeAction();
  }, []);


  return (
    <div>
      <Helmet>
        <title>Accounting</title>
        <meta name="description" content="Description of Accounting" />
      </Helmet>
      <AccountChart />
      <NewAccountDialog />
    </div>
  );
}

Accounting.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  accounting: makeSelectAccounting(),
  // accountTypeData: Selectors.makeSelectAccountTypeData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchGetAllChartOfAccountTypeAction: () => dispatch(Actions.getAllChartOfAccountTypeAction()),
    dispatchGetAllAccountTypeAction: () => dispatch(Actions.getAllAccountTypeAction()),
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
