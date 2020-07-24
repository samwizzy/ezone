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
import Feedback360List from './Feedback360List'
import Feedback360Details from './feedback'
import Feedback360Dialog from './components/Feedback360Dialog'

export function Feedback360Page(props) {
  const { getRecognitions, match } = props;
  const { params } = match

  useEffect(() => {
    getRecognitions();
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>Feedback360 Page</title>
        <meta name="description" content="ezone application employee feedback360 page" />
      </Helmet>

      <Feedback360List />

      <Feedback360Dialog />
    </React.Fragment>
  );
}

Feedback360Page.propTypes = {
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
)(Feedback360Page);
