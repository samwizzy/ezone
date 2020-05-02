/**
 *
 * CompanyStructurePage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectOrgPage from '../selectors';
import reducer from '../reducer';
import saga from '../saga';
import ModuleLayout from './../components/ModuleLayout';
import PartyGroup from './PartyGroup/Loadable'
import Party from './Party/Loadable'
import * as Actions from '../actions';

export function CompanyStructurePage(props) {
  useInjectReducer({ key: 'companyStructurePage', reducer });
  useInjectSaga({ key: 'companyStructurePage', saga });

  const { dispatchGetPartyGroups, dispatchGetAllUsersAction, getAllTagsAction, match } = props;
  const { params } = match

  useEffect(() => {
    getAllTagsAction();
    dispatchGetPartyGroups();
    dispatchGetAllUsersAction();
  }, []);

  console.log(params, "home params")

  return (
    <div>
      <Helmet>
        <title>Company Structure Page</title>
        <meta
          name="description"
          content="Description of CompanyStructurePage"
        />
      </Helmet>

      <ModuleLayout>
        {params.partyId?
        <Party /> : <PartyGroup />
        }
      </ModuleLayout>
      {/* <RoleDialog />  */}
    </div>
  );
}

CompanyStructurePage.propTypes = {
  dispatchGetPartyGroups: PropTypes.func,
  dispatchGetAllUsersAction: PropTypes.func,
  getAllTagsAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  companyStructurePage: makeSelectOrgPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchGetPartyGroups: () => dispatch(Actions.getPartyGroupAction()),
    dispatchGetAllUsersAction: () => dispatch(Actions.getAllUsers()),
    getAllTagsAction: () => dispatch(Actions.getAllTags()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(CompanyStructurePage);
