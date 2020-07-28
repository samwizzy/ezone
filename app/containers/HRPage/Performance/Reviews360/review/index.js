/*
 * HRPage
 *
 * This is the first thing users see of our App, at the '/' route
 */
import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as AppSelectors from '../../../../App/selectors';
import * as AppActions from '../../../../App/actions';
import * as Actions from './../../actions';
import * as Selectors from './../../selectors';
import Feedback360Details from './Feedback360Details'

export function Feedback360DetailsApp(props) {
  const { getRecognitionById, match } = props;
  const { params } = match

  React.useEffect(() => {
    getRecognitionById(params.id)
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>Feedback360 Details Page</title>
        <meta name="description" content="ezone application feedback360 details page" />
      </Helmet>

      <Feedback360Details />

    </React.Fragment>
  );
}

Feedback360DetailsApp.propTypes = {
  token: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
}

const mapStateToProps = createStructuredSelector({
  token: AppSelectors.makeSelectAccessToken(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getRecognitionById: (id) => dispatch(Actions.getRecognitionById(id)),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(Feedback360DetailsApp);
