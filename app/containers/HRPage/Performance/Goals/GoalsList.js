import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Avatar, Breadcrumbs, Box, Button, IconButton, Link, List, ListItem, ListItemText, ListItemAvatar, Table, TableRow, TableCell, TableBody, Grid, Paper, Typography, Toolbar, Stepper, Step, StepLabel } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { green, orange } from '@material-ui/core/colors'
import classNames from 'classnames'
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import * as AppSelectors from '../../../App/selectors';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import LensIcon from '@material-ui/icons/Lens';
import Check from '@material-ui/icons/Check';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

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
  table: {  
    whiteSpace: 'nowrap',
    '& .MuiTableCell-root': {
      border: "0 !important"
    },
  },
  toolbar: theme.mixins.toolbar,
  icon: {
    width: 20,
    height: 20,
    marginRight: theme.spacing(0.5),
    '&.active': {color: green[500]},
  },
  link: {
    display: 'flex',
  },
  button: { 
    borderRadius: theme.shape.borderRadius * 5,
    padding: theme.spacing(1, 4)
  },
}));

function getSteps() {
  return ['Screening', 'Phone Interview', 'Face Interview', 'Make Offer'];
}

const menus = [
	{id: 1, title: "Basic Information"},
	{id: 2, title: "CV"},
	{id: 3, title: "Interview"},
	{id: 4, title: "History"},
]

const GoalsList = props => {
  const classes = useStyles();
	const { loading, openNewGoalsDialog } = props;
	const [activeStep, setActiveStep] = React.useState(1);
  const steps = getSteps();

  React.useEffect(() => {
  }, []);

  const handleClick = () => {}

  return (
    <div className={classes.root}>
      <Grid container>
				<Grid item xs={12}>
          <AppBar position="static" color="inherit" elevation={2}>
            <Toolbar variant="dense">
              <Typography variant="h6" className={classes.title}>
                Goals
              </Typography>
              <Button variant="contained" color="primary" onClick={openNewGoalsDialog}>Add Goal</Button>
            </Toolbar>
          </AppBar>
				</Grid>
        <Grid item md={12}>
          <Paper square className={classes.paper}>
            <Typography variant="h6" color="primary">Customer follow up session</Typography>
            <Typography variant="body1" color="textPrimary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            </Typography>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" href="/" onClick={handleClick} className={classes.link}>
                Priority :
                <LensIcon className={classes.icon} />
                Low
              </Link>
              <Link
                color="inherit"
                href="/getting-started/installation/"
                onClick={handleClick}
                className={classes.link}
              >
                <TodayIcon className={classes.icon} />
                Due Date : 2020/06/23
              </Link>
              <Typography color="textPrimary" className={classes.link}>
                Key Result :
                <CheckCircleOutlineIcon className={classes.icon} />
                7/10
              </Typography>
            </Breadcrumbs>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper square className={classes.paper}>
          </Paper>
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
