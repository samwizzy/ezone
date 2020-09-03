/**
 *
 * Crm
 *
 */

import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCrm from './selectors';
import reducer from './reducer';
import saga from './saga';
import Dashboard from './Dashboard';
import Activities from './Activities';
import Contacts from './Contacts';
import Companies from './Companies';
import ContactGroups from './ContactGroups';
import Campaigns from './Campaigns';
import Leads from './Leads';
import Reports from './Reports';
import Schedules from './Schedules';
import SocialMedia from './SocialMedia';

export function Crm({ match }) {
  useInjectReducer({ key: 'crm', reducer });
  useInjectSaga({ key: 'crm', saga });
  const { path, url } = match

  return (
    <div>
      <Helmet>
        <title>Crm</title>
        <meta name="description" content="Description of Crm" />
      </Helmet>

      <Fragment>
        <Route exact path={path} component={Dashboard} />
        <Route exact path={`${path}/dashboard`} component={Dashboard} />
        <Route exact path={`${path}/activities`} component={Activities} />
        <Route exact path={`${path}/contacts`} component={Contacts} />
        <Route exact path={`${path}/companies`} component={Companies} />
        <Route exact path={`${path}/contact-groups`} component={ContactGroups} />
        <Route exact path={`${path}/contact-groups/:contactId`} component={ContactGroups} />
        <Route exact path={`${path}/campaigns`} component={Campaigns} />
        <Route path={`${path}/leads`} component={Leads} />
        <Route exact path={`${path}/reports`} component={Reports} />
        <Route path={`${path}/schedules`} component={Schedules} />
        <Route path={`${path}/social-media`} component={SocialMedia} />
      </Fragment>

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
  withRouter,
  withConnect,
  memo,
)(Crm);
