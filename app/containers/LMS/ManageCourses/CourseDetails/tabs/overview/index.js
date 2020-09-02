import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Avatar, List, ListSubheader, ListItem, ListItemText, ListItemAvatar, Grid, Paper, Toolbar, Typography } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { green, orange } from '@material-ui/core/colors'
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import moment from 'moment'
import _ from 'lodash'
import * as Actions from '../../../actions';
import * as Selectors from '../../../selectors';
import * as AppSelectors from '../../../../../App/selectors';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import LensIcon from '@material-ui/icons/Lens';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  list: {
    "& .MuiListItemAvatar-root": {
      minWidth: "30px !important"
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    color: theme.palette.grey[800],
  },
  toolbar: {
    justifyContent: "space-between",
    padding: theme.spacing(1),
  }
}));

const Overview = props => {
  const classes = useStyles();
  const { loading, history, course } = props;

  if (!course) {
    return ""
  }

  const requirements = course.courseDetails && course.courseDetails.filter(d => d.type === 'REQUIREMENT')
  const whatYouWillLearns = course.courseDetails && course.courseDetails.filter(d => d.type === 'WHAT_WILL_LEARN')

  return (
    <Grid
      container
      justify='space-between'
    >
      <Grid item md={12}>
        <div className={classes.content}>
          {course.courseDetails.length > 0 ?
            <List
              className={classes.list}
              component="nav"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  What will you learn
                </ListSubheader>
              }
            >
              {whatYouWillLearns.map((row, i) =>
                <ListItem key={i}>
                  <ListItemAvatar>
                    <CheckCircleOutlineIcon />
                  </ListItemAvatar>
                  <ListItemText primary={row.details} />
                </ListItem>
              )}
            </List>
            :
            <Typography variant="subtitle2" color="textSecondary">Course Details has not been added yet</Typography>
          }
        </div>
        <div className={classes.content}>
          <List
            className={classes.list}
            component="nav"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Requirement
              </ListSubheader>
            }
          >
            {requirements.map((row, i) =>
              <ListItem key={i}>
                <ListItemAvatar>
                  <LensIcon />
                </ListItemAvatar>
                <ListItemText primary={row.details} />
              </ListItem>
            )}
          </List>
        </div>
        <div className={classes.content}>
          <List
            className={classes.list}
            component="nav"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                About Course
              </ListSubheader>
            }
          >
            <ListItem>
              <ListItemText
                primary={
                  <Typography vraint="subtitle1">
                    {course.fullDescription}
                  </Typography>
                }
              />
            </ListItem>
          </List>
        </div>
      </Grid>
    </Grid>
  );
};

Overview.propTypes = {
  loading: PropTypes.bool,
  getEmployees: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(Overview);
