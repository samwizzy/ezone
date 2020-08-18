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
import makeSelectLmsEnrollments from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as Actions from './actions';
import EnrollmentsList from './components/EnrollmentsList';
import EnrollmentDialog from './components/EnrollmentDialog';
import ModuleLayout from '../components/ModuleLayout';

const key = "lmsEnrollments"

export function EnrollmentsApp(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const { } = props;

  useEffect(() => {
  }, []);

  return (
    <div>
      <Helmet>
        <title>Enrollments</title>
        <meta name="description" content="Description of Enrollments" />
      </Helmet>

      <ModuleLayout>
        <EnrollmentsList />
      </ModuleLayout>

      <EnrollmentDialog />
    </div>
  );
}

EnrollmentsApp.propTypes = {
  getAllCompaniesAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  lmsEnrollments: makeSelectLmsEnrollments(),
});

function mapDispatchToProps(dispatch) {
  return {
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(EnrollmentsApp);
