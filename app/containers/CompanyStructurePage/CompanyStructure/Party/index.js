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
import PartyList from './PartyList';
import EmployeesList from './EmployeesList';
import PartyDialog from './components/PartyDialog';
import EmployeeDialog from './components/EmployeeDialog';

export function PartyApp({match}) {
  const { params } = match;

  useEffect(() => {
  }, []);



  return (
    <div>
      <Helmet>
        <title>Party Page</title>
        <meta
          name="description"
          content="Description of Party"
        />
      </Helmet>

      {
        params.positionId?
			  <EmployeesList /> : <PartyList />
      }

      <PartyDialog />
    </div>
  );
}

PartyApp.propTypes = {
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
)(PartyApp);
