import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Avatar, Box, Button, Grid, Paper, Typography, Toolbar } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { green, orange } from '@material-ui/core/colors'
import classNames from 'classnames'
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import * as AppSelectors from '../../../App/selectors';
import GoalsItem from './goals/GoalsItem'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(4, 6),
    margin: theme.spacing(1, 0)
  },
  toolbar: theme.mixins.toolbar,
}));

const GoalsList = props => {
  const classes = useStyles();
  const { loading, goals, openNewGoalsDialog } = props;

  React.useEffect(() => {
  }, []);

  console.log(goals, "goals")

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <AppBar position="static" color="inherit" elevation={1}>
            <Toolbar variant="dense">
              <Typography variant="h6" className={classes.title}>
                Goals
              </Typography>
              <Button variant="contained" color="primary" onClick={openNewGoalsDialog}>Add Goal</Button>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item md={12}>
          {goals && goals.map((goal, i) =>
            <GoalsItem key={i} goal={goal} />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

GoalsList.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  goals: Selectors.makeSelectGoals()
});

function mapDispatchToProps(dispatch) {
  return {
    openNewGoalsDialog: () => dispatch(Actions.openNewGoalsDialog())
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
)(GoalsList);
