/**
 *
 * Crm
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
import * as Actions from './actions';
import * as Selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import ContactsList from './components/ContactsList';
import ModuleLayout from '../components/ModuleLayout';

export function Crm(props) {
  useInjectReducer({ key: 'crmContacts', reducer });
  useInjectSaga({ key: 'crmContacts', saga });

  const { getAllContacts, getContactsGroups, getEmployees } = props;
  useEffect(() => {
    getAllContacts();
    getContactsGroups();
    getEmployees();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Crm - Contacts</title>
        <meta name="description" content="Description of Crm" />
      </Helmet>
      <ModuleLayout>
        <ContactsList />
      </ModuleLayout>
    </div>
  );
}

Crm.propTypes = {
  getAllContacts: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  // crmContacts: Selectors.makeSelectCrm(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAllContacts: () => dispatch(Actions.getAllContacts()),
    getContactsGroups: () => dispatch(Actions.getContactsGroups()),
    getEmployees: () => dispatch(Actions.getEmployees()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Crm);
