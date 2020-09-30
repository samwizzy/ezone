import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { withRouter, Route } from 'react-router-dom';
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
import AddNewJournal from './components/AddNewJournal';
import * as Actions from './actions';
import * as Selectors from './selectors';

export function Journal(props) {
  useInjectReducer({ key: 'journal', reducer });
  useInjectSaga({ key: 'journal', saga });

  const { loading, match, getJournalList, getCurrencies, getChartOfAccounts, getAccountingPeriods } = props;
  const { path } = match

  useEffect(() => {
    getJournalList();
    getCurrencies();
    getChartOfAccounts();
    getAccountingPeriods();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Journal</title>
        <meta name="description" content="Description of Journal" />
      </Helmet>

      <ModuleLayout>
        <Route exact path={path} component={JournalListing} />
        <Route path={`${path}/add`} component={AddNewJournal} />
        <Route path={`${path}/edit/:journalId`} component={JournalListing} />
      </ModuleLayout>
    </div>
  );
}

Journal.propTypes = {
  loading: PropTypes.bool
}

const mapStateToProps = createStructuredSelector({
  journal: makeSelectJournal(),
  loading: Selectors.makeSelectLoading()
});

function mapDispatchToProps(dispatch) {
  return {
    getJournalList: () => dispatch(Actions.getJournalList()),
    getCurrencies: () => dispatch(Actions.getCurrencies()),
    getChartOfAccounts: () => dispatch(Actions.getChartOfAccounts()),
    getAccountingPeriods: () => dispatch(Actions.getAccountingPeriods()),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(Journal);
