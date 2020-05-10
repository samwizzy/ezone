/*
 * HRPage
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
import * as AppSelectors from '../../../App/selectors';
import * as AppActions from '../../../App/actions';
import * as Actions from './../actions';
import * as Selectors from './../selectors';
import EmployeeShiftList from './EmployeeShiftList'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

export function EmployeeShiftPage(props) {
  const { getAttendances, getEmployees } = props;

  React.useEffect(() => {
    getAttendances();  
    getEmployees();
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>Employee Shift Page</title>
        <meta name="description" content="ezone application employee shift page" />
      </Helmet>

      <EmployeeShiftList />

    </React.Fragment>
  );
}

EmployeeShiftPage.propTypes = {
  token: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  token: AppSelectors.makeSelectAccessToken(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getAttendances: () => dispatch(Actions.getAttendances()),
    getEmployees: () => dispatch(Actions.getEmployees()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(EmployeeShiftPage);
