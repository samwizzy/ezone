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
import EmailHome from './EmailHome';
import TestConnectionDialog from './components/TestConnectionDialog';
import ModuleLayout from './components/ModuleLayout';
import * as Actions from './actions';

export function EmailConfig(props) {
  useInjectReducer({ key: 'emailConfig', reducer });
  useInjectSaga({ key: 'emailConfig', saga });

  const {
    dispatchGetEmailConfigAction,
    dispatchGetSmsProviderAction,
    dispatchGetSmsConfigAction
  } = props;

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    dispatchGetEmailConfigAction();
    dispatchGetSmsProviderAction();
    dispatchGetSmsConfigAction();
  }, []);

  return (
    <div>
      <Helmet>
        <title>EmailConfig</title>
        <meta name="description" content="Description of EmailConfig" />
      </Helmet>

      <ModuleLayout>
        <EmailHome />
      </ModuleLayout>
      <TestConnectionDialog />
    </div>
  );
}

EmailConfig.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  emailConfig: makeSelectEmailConfig(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchGetEmailConfigAction: evt => dispatch(Actions.getEmailConfigAction(evt)),
    dispatchGetSmsProviderAction: evt => dispatch(Actions.getSmsProviderAction(evt)),
    dispatchGetSmsConfigAction: evt => dispatch(Actions.getSmsConfigAction(evt)),
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
)(EmailConfig);
