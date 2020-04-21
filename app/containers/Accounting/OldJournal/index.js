/**
 *
 * Accounting
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './../reducer';
import saga from './../saga';
import * as Actions from './../actions';
import * as Selectors from './../selectors';
import LoadingIndicator from './../../../components/LoadingIndicator';
import JournalListing from '../Journal/components/JournalListing'
import JournalDetails from './JournalDetails'
import ModuleLayout from './../components/ModuleLayout'

export function JournalApp(props) {
//   useInjectReducer({ key: 'accounting', reducer });
//   useInjectSaga({ key: 'accounting', saga });

  useEffect(() => {
  }, []);

  const { loading, match } = props;
  const { params } = match
  console.log(params, "params")

  return (
    <React.Fragment>
        <Helmet>
            <title>Journal Page</title>
            <meta name="description" content="ezone accounting journal" />
        </Helmet>
        <ModuleLayout>
            {
            params.statusId?
                <JournalDetails />
                :
                <JournalListing />
            }
        </ModuleLayout>
    </React.Fragment>
  )

}

JournalApp.propTypes = {};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  accountingSetupData: Selectors.makeSelectGetAccountingSetupData(),
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
  withRouter,
  withConnect,
  memo,
)(JournalApp);
