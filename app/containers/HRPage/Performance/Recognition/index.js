/*
 * HRPage
 *
 * This is the first thing users see of our App, at the '/' route
 */
import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import {withRouter} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as AppSelectors from '../../../App/selectors';
import * as AppActions from '../../../App/actions';
import * as Actions from './../actions';
import * as Selectors from './../selectors';
import RecognitionList from './RecognitionList'
import RecognitionDetails from './RecognitionDetails'
import RecognitionDialog from './components/RecognitionDialog'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

export function RecognitionPage(props) {
  const { getLeaveType, match } = props;
  const { params } = match

  React.useEffect(() => {
    getLeaveType();  
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>Recognition Page</title>
        <meta name="description" content="ezone application recognition page" />
      </Helmet>

      {params.recognitionId ?
        <RecognitionDetails /> : <RecognitionList />
      }

      <RecognitionDialog />
    </React.Fragment>
  );
}

RecognitionPage.propTypes = {
  token: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  token: AppSelectors.makeSelectAccessToken(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getLeaveType: () => dispatch(Actions.getLeaveRequest()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(RecognitionPage);
