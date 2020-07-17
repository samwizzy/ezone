/**
 *
 * Companies
 *
 */

import React, { Fragment, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Route, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCrmSocialMedia from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as Actions from './actions';
import SocialMediaList from './SocialMediaList';
import SocialMediaTabs from './SocialMediaTabs';
import ModuleLayout from '../components/ModuleLayout';
import SocialMediaDialog from './components/SocialMediaDialog';

const key = 'crmSocialMedia'

export function SocialMedia(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const { getFacebookAccessToken, getEmployees, match } = props;
  const { path, url } = match

  useEffect(() => {
    getFacebookAccessToken();
    getEmployees();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Social Media</title>
        <meta name="description" content="Description of Campaign" />
      </Helmet>

      <ModuleLayout>
        <Fragment>
          <Route exact path={path} component={SocialMediaList} />
          <Route path={`${path}/setup`} component={SocialMediaTabs} />
        </Fragment>
      </ModuleLayout>

      <SocialMediaDialog />
    </div>
  );
}

SocialMedia.propTypes = {
  getFacebookAccessToken: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  crmSocialMedia: makeSelectCrmSocialMedia(),
});

function mapDispatchToProps(dispatch) {
  return {
    getFacebookAccessToken: () => dispatch(Actions.getFacebookAccessToken()),
    getEmployees: () => dispatch(Actions.getEmployees()),
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
)(SocialMedia);
