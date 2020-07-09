/**
 *
 * Crm
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
import makeSelectCrm from './selectors';
import reducer from './reducer';
import * as Actions from './actions';
import saga from './saga';
import SchedulesList from './components/SchedulesList';
import ModuleLayout from './../components/ModuleLayout';

const key = 'crmSchedules';
export function Schedules(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const { getEmployees, getContacts, getSchedules } = props

  useEffect(() => {
    getEmployees();
    getContacts();
    getSchedules();
  }, [])

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
  employees: PropTypes.array
};

const mapStateToProps = createStructuredSelector({
  crmSchedules: makeSelectCrm(),
});

function mapDispatchToProps(dispatch) {
  return {
    getEmployees: () => dispatch(Actions.getEmployees()),
    getContacts: () => dispatch(Actions.getContacts()),
    getSchedules: () => dispatch(Actions.getSchedules()),
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
