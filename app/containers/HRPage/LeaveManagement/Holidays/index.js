import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as AppSelectors from '../../../App/selectors';
import * as AppActions from '../../../App/actions';
import * as Actions from './../actions';
import * as Selectors from './../selectors';
import HolidaysList from './HolidaysList';
import HolidayDialog from './components/HolidayDialog';

export function HolidaysPage(props) {
  const { getAttendance } = props;

  useEffect(() => {
    getAttendance();
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>Human Resource — Holidays</title>
        <meta
          name="description"
          content="ezone application employee holidays"
        />
      </Helmet>

      <HolidaysList />

      <HolidayDialog />
    </React.Fragment>
  );
}

HolidaysPage.propTypes = {
  token: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  token: AppSelectors.makeSelectAccessToken(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getAttendance: () => dispatch(Actions.getLeaveRequest()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HolidaysPage);
