/**
 *
 * Companies
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
import makeSelectCrmCampaigns from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as Actions from './actions';
import ContactReportList from './components/ContactReportList';
import ModuleLayout from '../components/ModuleLayout';
import ContactReportDetailsDialog from './components/ContactReportDetailsDialog';
import ReportsList from './ReportsList';

const key = 'crmCampaigns'

export function ContactReport(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const { getCampaigns, getEmployees } = props;

  useEffect(() => {
    getCampaigns();
    getEmployees();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Campaign</title>
        <meta name="description" content="Description of Campaign" />
      </Helmet>

      <ModuleLayout>
        <ReportsList />
      </ModuleLayout>

      <ContactReportDetailsDialog />
    </div>
  );
}

ContactReport.propTypes = {
  getCampaigns: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  crmCampaigns: makeSelectCrmCampaigns(),
});

function mapDispatchToProps(dispatch) {
  return {
    getCampaigns: () => dispatch(Actions.getCampaigns()),
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
)(ContactReport);
