/* eslint-disable prettier/prettier */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Backdrop,
  CircularProgress,
  Paper,
  Table, TableBody, TableRow, TableCell,
  Toolbar,
  List,
  Icon,
  Button,
  Typography
} from '@material-ui/core';
import { Add, Visibility } from '@material-ui/icons';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import InstagramIcon from '@material-ui/icons/Instagram'
import FacebookImage from '../../../../images/facebook.jpg'
import Rectangle from '../../../../images/Rectangle.jpg'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  table: {
    "& img": {
      marginRight: theme.spacing(1)
    },
    "& tr:first-child": {
      borderTop: `1px solid ${theme.palette.divider}`
    }
  },
  paperGrid: {
    whiteSpace: "nowrap",
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center'
  },
  paper: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    whiteSpace: "nowrap",
    padding: theme.spacing(2, 2, 2, 10),
    margin: theme.spacing(2),
    borderRadius: theme.spacing(1),
    position: 'relative',
    overflow: 'hidden',
    "& div": {
      margin: 0,
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      width: 50,
      backgroundColor: '#3A559F',
      flex: '2 1 auto',
      textAlign: "center",
      "& .MuiSvgIcon-root": {
        position: 'relative',
        top: '50%',
        '-ms-transform': 'translateY(-50%)',
        transform: 'translateY(-50%)',
      }
    },
  },
  icon: {
    position: 'absolute',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const SocialMediaList = props => {
  const classes = useStyles();

  const {
    loading,
  } = props;

  useEffect(() => {
  }, []);

  return (
    <React.Fragment>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className={classes.paperGrid}>
        <Paper className={classes.paper} onClick={() => { }}>
          <div className={classes.icon}><FacebookIcon fontSize="large" /></div>

          <Typography variant="subtitle1">First Marine</Typography>
          <Typography variant="body2">Facebook</Typography>
        </Paper>

        <Paper className={classes.paper}>
          <div className={classes.icon}><InstagramIcon fontSize="large" /></div>

          <Typography variant="subtitle1">First Marine</Typography>
          <Typography variant="body2">Instagram</Typography>
        </Paper>

        <Paper className={classes.paper}>
          <div className={classes.icon}><TwitterIcon fontSize="large" /></div>

          <Typography variant="subtitle1">First Marine</Typography>
          <Typography variant="body2">Twitter</Typography>
        </Paper>
      </div>

      <Toolbar variant="dense">
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Activity Logs
        </Typography>
      </Toolbar>
      <Table className={classes.table}>
        <TableBody>
          {[0, 1, 2].map((stat, i) =>
            <TableRow key={i}>
              <TableCell>
                Funke Joshua likes a post
            </TableCell>
              <TableCell>
                <img alt='' src={Rectangle} />
                <span>
                  This is the post tht Funke liked with a picture thumbnail
              </span>
              </TableCell>
              <TableCell>Time  Date</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

    </React.Fragment>
  );
};

SocialMediaList.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  socialMedia: Selectors.makeSelectSocialMedia(),
});

function mapDispatchToProps(dispatch) {
  return {
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SocialMediaList);
