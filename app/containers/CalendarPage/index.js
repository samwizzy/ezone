/*
 * Calendar
 *
 * This is the first thing users see of our App, at the '/' route
 */
import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import * as AppSelectors from '../App/selectors';
import {
  CssBaseline
} from '@material-ui/core';
import * as AppActions from '../App/actions';
import * as Actions from './actions';
import makeSelectCalendar, * as Selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import CalendarView from './components/CalendarView'
import ModuleLayout from './ModuleLayout'

const key = 'calendar';
export function CalendarPage() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
    <React.Fragment>
      <CssBaseline />
      <Helmet>
        <title>Calendar Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application calendar page"
        />
      </Helmet>

      <ModuleLayout>
        <CalendarView />
      </ModuleLayout>
    </React.Fragment>
  );
}

CalendarPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  calendar: makeSelectCalendar(),
  username: Selectors.makeSelectUsername(),
  loading: Selectors.makeSelectLoading(),
});

export function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CalendarPage);
