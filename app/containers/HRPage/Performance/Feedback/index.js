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
import ReviewsList from './ReviewsList'
import ReviewDialog from './components/ReviewDialog'

export function HolidaysPage(props) {
  const { getReviews } = props;

  React.useEffect(() => {
    getReviews();
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>Holidays Page</title>
        <meta name="description" content="ezone application employee holidays page" />
      </Helmet>

      <ReviewsList />

      <ReviewDialog />

    </React.Fragment>
  );
}

HolidaysPage.propTypes = {};

const mapStateToProps = createStructuredSelector({});

export function mapDispatchToProps(dispatch) {
  return {
    getReviews: () => dispatch(Actions.getRecognitions()),
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
