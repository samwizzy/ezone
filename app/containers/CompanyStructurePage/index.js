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
import makeSelectOrgPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import TabsPage from './components/TabsPage';
import PartyDialog from './components/PartyDialog';
import SubPartyDialog from './components/SubPartyDialog';

import * as Actions from './actions';

export function CompanyStructurePage(props) {
  const { dispatchGetAllUsersAction, getPartyGroup } = props;

  useInjectReducer({ key: 'companyStructurePage', reducer });
  useInjectSaga({ key: 'companyStructurePage', saga });

  useEffect(() => {
    getPartyGroup();
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

      <PartyDialog />
      <SubPartyDialog />
    </div>
  );
}

CompanyStructurePage.propTypes = {
  getPartyGroup: PropTypes.func,
  dispatchGetAllUsersAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  companyStructurePage: makeSelectOrgPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getPartyGroup: () => dispatch(Actions.getPartyGroupAction()),
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
