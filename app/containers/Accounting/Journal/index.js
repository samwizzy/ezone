/**
 *
 * Journal
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
import makeSelectJournal from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import ModuleLayout from '../components/ModuleLayout';
import JournalListing from './components/JournalListing';
<<<<<<< HEAD
import JournalDetails from './components/JournalDetails';
=======
import * as Actions from './actions';
import * as Selectors from './selectors';
import LoadingIndicator from '../../../components/LoadingIndicator';
>>>>>>> 0e8f12818250e91b543dc81b9044f9f09cee5f65

export function Journal(props) {
  useInjectReducer({ key: 'journal', reducer });
  useInjectSaga({ key: 'journal', saga });

  const {
    loading,
    dispatchGetJournalListAction
  } = props;

  console.log('Journal index.js loaded');

  useEffect(() => {
    dispatchGetJournalListAction();
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div>
      <Helmet>
        <title>Journal</title>
        <meta name="description" content="Description of Journal" />
      </Helmet>
      <ModuleLayout>
        <JournalDetails />
      </ModuleLayout>
    </div>
  );
}

Journal.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  journal: makeSelectJournal(),
  loading: Selectors.makeSelectLoading()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchGetJournalListAction: () => dispatch(Actions.getJournalListAction()),
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
)(Journal);
