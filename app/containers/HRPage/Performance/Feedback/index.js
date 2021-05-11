import React, { useEffect, memo, Fragment } from 'react';
import { Helmet } from 'react-helmet';
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

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>Feedback Page</title>
        <meta name="description" content="ezone application feedback page" />
      </Helmet>

      <ReviewsList />

      <ReviewDialog />

    </Fragment>
  );
}

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
