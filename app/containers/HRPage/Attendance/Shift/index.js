import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from './../actions';
import * as Selectors from './../selectors';
import ShiftList from './ShiftList'

export function ShiftPage(props) {
  const { getAttendances, getDays } = props;

  useEffect(() => {
    getAttendances();
    getDays();
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>Shift Page</title>
        <meta name="description" content="ezone application shift page" />
      </Helmet>

      <ShiftList />

    </React.Fragment>
  );
}

ShiftPage.propTypes = {};

const mapStateToProps = createStructuredSelector({});

export function mapDispatchToProps(dispatch) {
  return {
    getAttendances: () => dispatch(Actions.getAttendances()),
    getDays: () => dispatch(Actions.getDays()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ShiftPage);
