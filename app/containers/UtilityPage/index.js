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
import makeSelectUtilityPage, * as Selectors from './selectors';
import * as Actions from './actions';
import UtilityApp from './UtilityApp'
import ModuleLayout from './components/ModuleLayout'

export function UtilityPage(props) {
  useInjectReducer({ key: 'utilityPage', reducer });
  useInjectSaga({ key: 'utilityPage', saga });

  const { dispatchGetUserChats, dispatchGetAllEmployees, dialog } = props;

  console.log(dialog, "dialog from utility root")

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

      {/* <ModuleLayout /> */}
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
  dialog: Selectors.makeSelectNewTaskDialog(),
  dialog2: Selectors.makeSelectNewFolderDialog(),
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
