/**
 *
 * Crm
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCrm from './selectors';
import reducer from './reducer';
import saga from './saga';
import SchedulesList from './components/SchedulesList';
import ModuleLayout from './../components/ModuleLayout';

export function Schedules() {
  useInjectReducer({ key: 'crmSchedules', reducer });
  useInjectSaga({ key: 'crmSchedules', saga });

  return (
    <div>
      <Helmet>
        <title>Crm - Schedules</title>
        <meta name="description" content="Description of Crm Schedules" />
      </Helmet>
      
      <ModuleLayout>
        <SchedulesList />
      </ModuleLayout>
    </div>
  );
}

Schedules.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  crmSchedules: makeSelectCrm(),
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
)(Schedules);
