/**
 *
 * Crm
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Route, withRouter } from 'react-router-dom'
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
import SchedulesLists from './SchedulesList';
import ModuleLayout from './../components/ModuleLayout';
import ScheduleDetailsDialog from './components/ScheduleDetailsDialog';
import ScheduleDialog from './components/ScheduleDialog';

const key = 'crmSchedules';
export function Schedules(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const { match, getEmployees, getContacts, getSchedules } = props
  const { path, url } = match

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
        <Route exact path={path} component={SchedulesList} />
        <Route path={`${path}/list`} component={SchedulesLists} />
      </ModuleLayout>

      <ScheduleDialog />
      <ScheduleDetailsDialog />
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
  withRouter,
  withConnect,
  memo,
)(Schedules);
