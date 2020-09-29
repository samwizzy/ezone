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

// import * as ContactActions from '../Contacts/actions';
// import * as ContactSelector from '../Contacts/selectors';

// import contactReducer from '../Contacts/reducer';
// import contactSaga from '../Contacts/saga';

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
};

const mapStateToProps = createStructuredSelector({
  // crmContactGroups: makeSelectCrm(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAllContactsGroupAction: () => dispatch(Actions.getAllContactsGroup()),
    // getAllContacts: () => dispatch(ContactActions.getAllContacts()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

// const withContactSaga = useInjectReducer({
//   key: 'crmContacts',
//   contactReducer,
// });
// const withContactReducer = useInjectSaga({ key: 'crmContacts', contactSaga });

export default compose(
  // withContactSaga,
  // withContactReducer,
  withConnect,
  memo,
)(CrmContactGroups);
