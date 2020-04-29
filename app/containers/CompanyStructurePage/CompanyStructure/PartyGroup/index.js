/**
 *
 * CompanyStructure Party Group
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import PartyGroupList from './PartyGroupList';
import PartyGroupDetails from './PartyGroupDetails';
import PartyGroupDialog from './components/PartyGroupDialog';
import PartyDialog from  '../Party/components/PartyDialog'

export function PartyGroupApp(props) {
  const {match} = props;
  const {params} = match;

  useEffect(() => {
  }, []);

  return (
    <div>
      <Helmet>
        <title>Party Group Page</title>
        <meta
          name="description"
          content="Description of Party Group"
        />
      </Helmet>
			{
				params.groupId?
				<PartyGroupDetails /> : <PartyGroupList />
			}
      <PartyDialog />
      <PartyGroupDialog />
    </div>
  );
}

PartyGroupApp.propTypes = {
  dispatchGetPartyGroups: PropTypes.func,
  dispatchGetAllUsersAction: PropTypes.func,
  getAllTagsAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

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
)(PartyGroupApp);
