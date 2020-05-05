/*
 * HRPage
 *
 * This is the first thing users see of our App, at the '/' route
 */
import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import * as AppSelectors from '../../App/selectors';
import * as AppActions from '../../App/actions';
import * as Actions from './actions';
import makeSelectAttendancePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import ModuleLayout from './components/ModuleLayout';

const key = 'attendance';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

export function AttendancePage(props) {
  const { getAttendance } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  React.useEffect(() => {
    getAttendance();  
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>Attendance Page</title>
        <meta name="description" content="ezone application attendance page" />
      </Helmet>

      <ModuleLayout />
    </React.Fragment>
  );
}

AttendancePage.propTypes = {
  token: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  attendance: makeSelectAttendancePage(),
  token: AppSelectors.makeSelectAccessToken(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getAttendance: () => dispatch(Actions.getAttendance()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AttendancePage);
