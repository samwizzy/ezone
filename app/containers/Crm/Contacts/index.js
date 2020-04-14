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
import makeSelectCrm from '../selectors';
import reducer from '../reducer';
import saga from '../saga';
import messages from '../messages';
import ContactsList from './components/ContactsList';
import ContactDialog from './components/ContactDialog';

export function Crm() {
  useInjectReducer({ key: 'crm', reducer });
  useInjectSaga({ key: 'crm', saga });

  return (
    <div>
      <Helmet>
        <title>Crm - Contacts</title>
        <meta name="description" content="Description of Crm" />
      </Helmet>
      {/* <ContactDialog /> */}
      <ContactsList />
    </div>
  );
}

Crm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  crm: makeSelectCrm(),
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
)(Crm);
