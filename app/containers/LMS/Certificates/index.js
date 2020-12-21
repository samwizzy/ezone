/** LMS Cateory **/
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as Actions from './actions';
import makeSelectCertificate from './selectors';
import reducer from './reducer';
import saga from './saga';
import CertificateList from './components/CertificateList';
import CertificateDialog from './components/CertificateDialog';
import ModuleLayout from '../components/ModuleLayout';

export function CertificateApp(props) {
  useInjectReducer({ key: 'lmsCertificate', reducer });
  useInjectSaga({ key: 'lmsCertificate', saga });

  return (
    <div>
      <Helmet>
        <title>LMS - Certificate</title>
        <meta name="description" content="Description of LMS Certificates" />
      </Helmet>

      <ModuleLayout>
        <CertificateList />
      </ModuleLayout>

      <CertificateDialog />
    </div>
  );
}

CertificateApp.propTypes = {};

const mapStateToProps = createStructuredSelector({
  lmsCertificate: makeSelectCertificate(),
});

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CertificateApp);
