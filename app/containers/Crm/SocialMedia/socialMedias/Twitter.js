/* eslint-disable prettier/prettier */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  AppBar,
  Box,
  Button,
  CircularProgress,
  Grid,
  Toolbar,
  Typography,
  TextField,
} from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import * as Actions from './../actions';
import * as Selectors from './../selectors';
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import InstagramIcon from '@material-ui/icons/Instagram'
import TwIcon from '../../../../images/TwiIcon.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    alignItems: 'center',
    boxShadow: theme.shadows[1],
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius * 2,
    "& .MuiGrid-root": {
      padding: theme.spacing(4),
      textAlign: 'center'
    },
    "& .MuiGrid-root:last-child": {
      borderLeft: `1px solid ${theme.palette.divider}`,
      padding: theme.spacing(4),
    },
    "& img": {
      marginBottom: theme.spacing(2)
    }
  },
  toolbar: {
    justifyContent: 'center',
    ...theme.palette.toolbar,
    "& h6": {
      color: '#50ABF1'
    }
  },
  flex: {
    flexGrow: 1,
    margin: theme.spacing(2, 0),
    "& button": {
      marginTop: theme.spacing(1)
    }
  }
}));

function Twitter(props) {
  const { loading } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container className={classes.grid}>
        <Grid item xs={6}>
          <img alt="Twitter" src={TwIcon} className={classes.img} />
          <Typography variant="subtitle1" align="center">
            Connect your social media handle to get impression on posts
					</Typography>
        </Grid>
        <Grid item xs={6}>
          <Toolbar variant="dense" className={classes.toolbar}>
            <Typography variant="h6" align="center">
              Twitter
						</Typography>
          </Toolbar>
          <div className={classes.flex}>
            <TextField
              required
              id="username"
              name="username"
              label="Username"
              placeholder="Username"
              size="small"
              variant="outlined"
              margin="normal"
              fullWidth
              value=""
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className={classes.flex}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              placeholder="Password"
              size="small"
              variant="outlined"
              margin="normal"
              fullWidth
              value=""
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className={classes.flex}>
            <Button size="medium" variant="contained" fullWidth color="primary" disableElevation>
              Login
						</Button>
          </div>

        </Grid>
      </Grid>
    </div>
  );
}

Twitter.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  socialMedia: Selectors.makeSelectFacebook(),
});

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Twitter);
