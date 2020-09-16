/*
 * HRPage Feedback
 */
import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as AppSelectors from '../../../App/selectors';
import * as AppActions from '../../../App/actions';
import * as Actions from './../actions';
import * as Selectors from './../selectors';
import Review360List from './Review360List'
import Feedback360Details from './review'
import Review360Dialog from './components/Review360Dialog'

export function Review360Page(props) {
  const { getRecognitions, match } = props;
  const { params } = match

  useEffect(() => {
    getRecognitions();
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>Review360 Page</title>
        <meta name="description" content="ezone application employee review360 page" />
      </Helmet>

      <Review360List />

      <Review360Dialog />
    </React.Fragment>
  );
}

Review360Page.propTypes = {
  token: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  token: AppSelectors.makeSelectAccessToken(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getRecognitions: () => dispatch(Actions.getRecognitions()),
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
)(Review360Page);
