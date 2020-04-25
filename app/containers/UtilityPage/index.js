/**
 *
 * OrgPage
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
import reducer from './reducer';
import saga from './saga';
import makeSelectUtilityPage from './selectors';
import * as Actions from './actions';

export function UtilityPage(props) {
  useInjectReducer({ key: 'utilityPage', reducer });
  useInjectSaga({ key: 'utilityPage', saga });

  const { dispatchGetUserChats, dispatchGetAllEmployees } = props;

  React.useEffect(() => {
    dispatchGetAllEmployees();
    dispatchGetUserChats();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Utility Page</title>
        <meta name="description" content="Utility Page" />
      </Helmet>
    </div>
  );
}

UtilityPage.propTypes = {
  dispatchGetAllEmployees: PropTypes.func,
  dispatchGetUserChats: PropTypes.func,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  utilityPage: makeSelectUtilityPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchGetAllEmployees: () => dispatch(Actions.getAllUsers()),
    dispatchGetUserChats: () => dispatch(Actions.getAllUsersChat()),
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
)(UtilityPage);
