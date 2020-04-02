/**
 *
 * AccountJournal
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
import makeSelectAccountJournal from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import AddJournal from './components/AddJournal';

export function AccountJournal() {
  useInjectReducer({ key: 'accountJournal', reducer });
  useInjectSaga({ key: 'accountJournal', saga });

  return (
    <div>
      <Helmet>
        <title>AccountJournal</title>
        <meta name="description" content="Description of AccountJournal" />
      </Helmet>
      {/* <FormattedMessage {...messages.header} /> */}
      <AddJournal />
    </div>
  );
}

AccountJournal.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  accountJournal: makeSelectAccountJournal(),
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
)(AccountJournal);
