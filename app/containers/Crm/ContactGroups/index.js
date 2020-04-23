/**
 *
 * Crm
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
import * as Actions from './actions';
import makeSelectCrm from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from '../messages';
import ContactGroupsList from './components/ContactGroupsList';
import ContactGroupsDetails from './components/ContactGroupsDetails';
import ModuleLayout from '../components/ModuleLayout';

export function CrmContactGroups(props) {
  useInjectReducer({ key: 'crmContactGroups', reducer });
  useInjectSaga({ key: 'crmContactGroups', saga });
  const { params } = props.match;

  const { getAllContactsGroupAction } = props;
  useEffect(() => {
    getAllContactsGroupAction();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Crm - Contact Groups</title>
        <meta name="description" content="Description of Crm Contact Groups" />
      </Helmet>

      <ModuleLayout>
        {params.contactId ? <ContactGroupsDetails /> : <ContactGroupsList />}
      </ModuleLayout>
    </div>
  );
}

CrmContactGroups.propTypes = {
  dispatch: PropTypes.func.isRequired,
  getAllContactsGroupAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  // crmContactGroups: makeSelectCrm(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAllContactsGroupAction: () => dispatch(Actions.getAllContactsGroup()),
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
)(CrmContactGroups);
