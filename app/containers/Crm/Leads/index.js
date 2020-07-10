/**
 *
 * Crm
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as Actions from './actions';
import makeSelectCrmLeads, * as Selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import LeadsList from './leads';
import LeadSourcesList from './leadSources';
import LeadTagsList from './leadTags';
import ModuleLayout from '../components/ModuleLayout';

const key = 'crmLeads'

export function CrmLeads(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { getLeads, getLeadSources, getLeadTags, match } = props;

  console.log(match, "withRouter")
  const { path, url } = match

  useEffect(() => {
    getLeads();
    getLeadSources();
    getLeadTags();
  }, []);

  return (
    <div>
      <Helmet>
        <title>CRM - Leads</title>
        <meta name="description" content="Description of Crm Leads" />
      </Helmet>
      <ModuleLayout>
        <div>
          <Route exact path={path} component={LeadsList} />
          <Route exact path={`${path}/sources`} component={LeadSourcesList} />
          <Route exact path={`${path}/tags`} component={LeadTagsList} />
        </div>
      </ModuleLayout>
    </div>
  );
}

CrmLeads.propTypes = {
  getAllContacts: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  crmLeads: makeSelectCrmLeads(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLeads: () => dispatch(Actions.getLeads()),
    getLeadSources: () => dispatch(Actions.getLeadSources()),
    getLeadTags: () => dispatch(Actions.getLeadTags()),
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
)(CrmLeads);
