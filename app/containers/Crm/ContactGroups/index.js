/**
 *
 * Crm
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCrm from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from '../messages';
import ContactGroupsList from './components/ContactGroupsList';
import ModuleLayout from './../components/ModuleLayout';

export function CrmContactGroups() {
  useInjectReducer({ key: 'crmContactGroups', reducer });
  useInjectSaga({ key: 'crmContactGroups', saga });

  return (
    <div>
      <Helmet>
        <title>Crm - Contact Groups</title>
        <meta name="description" content="Description of Crm Contact Groups" />
      </Helmet>

      <ModuleLayout>
        <ContactGroupsList />
      </ModuleLayout>
    </div>
  );
}

CrmContactGroups.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  crmContactGroups: makeSelectCrm(),
});

function mapDispatchToProps(dispatch) {
  return {
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
