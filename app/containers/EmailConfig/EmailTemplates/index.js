/**
 *
 * EmailConfig
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
import makeSelectEmailConfig from './selectors';
import reducer from './reducer';
import saga from './saga';
import EmailTemplate from './EmailTemplate';
import ModuleLayout from './components/ModuleLayout';
import * as Actions from './actions';

export function EmailTemplateApp(props) {
  useInjectReducer({ key: 'emailConfig', reducer });
  useInjectSaga({ key: 'emailConfig', saga });

  const {} = props;

  useEffect(() => {
  }, []);

  return (
    <div>
      <Helmet>
        <title>Email Template</title>
        <meta name="description" content="Description of Email Templates" />
      </Helmet>

      <ModuleLayout>
        <EmailTemplate />
      </ModuleLayout>
    </div>
  );
}

EmailTemplateApp.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  emailConfig: makeSelectEmailConfig(),
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
)(EmailTemplateApp);
