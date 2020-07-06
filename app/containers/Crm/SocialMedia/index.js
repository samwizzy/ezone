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

  const { getSocialMedias, getEmployees } = props;

  useEffect(() => {
    getSocialMedias();
    getEmployees();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Social Media</title>
        <meta name="description" content="Description of Campaign" />
      </Helmet>

      <ModuleLayout>
        {/* <SocialMediaList /> */}
        <SocialMediaTabs />
      </ModuleLayout>

      <SocialMediaDialog />
    </div>
  );
}

SocialMedia.propTypes = {
  getSocialMedias: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  crmSocialMedia: makeSelectCrmSocialMedia(),
});

function mapDispatchToProps(dispatch) {
  return {
    getSocialMedias: () => dispatch(Actions.getSocialMedias()),
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
)(SocialMedia);
