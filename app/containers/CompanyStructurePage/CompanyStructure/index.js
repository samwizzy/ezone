/**
 *
 * CompanyStructurePage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectOrgPage from '../selectors';
import reducer from '../reducer';
import saga from '../saga';
import TabsPage from './components2/TabsPage';

import PartyGroupDialog from './components2/PartyGroupDialog';
import PartyDialog from './components2/PartyDialog';
import RoleDialog from './components2/RoleDialog';

// import PartyGroupDialog from './components/PartyGroupDialog';
// import PartyDialog from './components/PartyDialog';

import * as Actions from '../actions';

export function CompanyStructurePage(props) {
  const { dispatchGetPartyGroups, dispatchGetAllUsersAction } = props;

  useInjectReducer({ key: 'companyStructurePage', reducer });
  useInjectSaga({ key: 'companyStructurePage', saga });

  useEffect(() => {
    dispatchGetPartyGroups();
    dispatchGetAllUsersAction();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Company Structure Page</title>
        <meta
          name="description"
          content="Description of CompanyStructurePage"
        />
      </Helmet>
      <TabsPage />

      <PartyGroupDialog />
      <PartyDialog />
      <RoleDialog />
    </div>
  );
}

CompanyStructurePage.propTypes = {
  dispatchGetPartyGroups: PropTypes.func,
  dispatchGetAllUsersAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  companyStructurePage: makeSelectOrgPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchGetPartyGroups: () => dispatch(Actions.getPartyGroupAction()),
    dispatchGetAllUsersAction: () => dispatch(Actions.getAllUsers()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CompanyStructurePage);
