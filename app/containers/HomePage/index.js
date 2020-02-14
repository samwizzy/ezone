/*
 * HomePage
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
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CssBaseline,
  Grid,
  Link,
  Paper,
  Typography,
  TextField
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import * as Selectors from '../App/selectors';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';
import logo from '../../images/logo.svg';


const key = 'home';

const useStyles = makeStyles(theme => ({
  root: {
    // height: '100vh',
    backgroundColor: theme.palette.grey[50],
    borderRadius: theme.spacing(5),
    overflow: 'hidden',
  }
}));

export function HomePage(props) {
  const classes = useStyles();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  // const { user, token } = props;

  // console.log(user, 'user from home');
  // console.log(token, 'token from home');

  return (
    <React.Fragment>
      <CssBaseline />
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="ezone application homepage" />
      </Helmet>
      <div>

        <Grid container style={{padding: '20px'}}>
          <Grid item xs={12} md={9}>
            <Typography variant='h4'>EZONE</Typography>
            <Typography variant='h6'>Welcome Page</Typography>
            <Typography variant='body2'>Enterprise Resource Planning</Typography>
          </Grid>
          <Grid item xs={12} md={4}></Grid>
        </Grid>

      </div>
    </React.Fragment>
  );
}

HomePage.propTypes = {
  // loading: PropTypes.bool,
  // user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // token: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  // user: Selectors.makeSelectCurrentUser(),
  // token: Selectors.makeSelectAccessToken(),
});

export function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
