import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Avatar, Box, Button, IconButton, List, ListItem, ListItemText, ListItemAvatar, Table, TableRow, TableCell, TableBody, Grid, Paper, Typography, Toolbar, Stepper, Step, StepLabel } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { green, orange } from '@material-ui/core/colors'
import classNames from 'classnames'
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import * as AppSelectors from '../../../App/selectors';
import EditOutlined from '@material-ui/icons/EditOutlined';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import RefreshSharp from '@material-ui/icons/RefreshSharp';
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
    padding: theme.spacing(2),
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
    '&.active': {color: green[500]},
  },
  avatar: {
    width: 100,
    height: 100,
    marginRight: theme.spacing(1)
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

const GoalsDetails = props => {
  const classes = useStyles();
	const { loading, openNewGoalsDialog } = props;
	const [activeStep, setActiveStep] = React.useState(1);
  const steps = getSteps();

  React.useEffect(() => {
  }, [employee]);

  return (
    <div className={classes.root}>
      <Grid container>
				<Grid item xs={12}>
          <AppBar position="static" color="inherit" elevation={2}>
            <Toolbar variant="dense">
              <Typography variant="h6" className={classes.title}>
                Goals Details
              </Typography>
              <Button variant="contained" color="primary" onClick={openNewGoalsDialog}>Add Goal</Button>
            </Toolbar>
          </AppBar>
				</Grid>
        <Grid item md={12}>
          <Paper square className={classes.paper}>
            <Grid container alignItems="center">
              <Grid item xs={6}>
                <List className={classes.list}>
                  <ListItem
                    alignItems="center"
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt="applicant avi"
                        src={''}
                        className={classes.avatar}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="h6" color="inherit">
                          Mike Adenuga
                        </Typography>
                      }
                      secondary={
                        <Typography variant="subtitle1" color="inherit">
                          IT Project Manager
                        </Typography>
                      }
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={6}>
                <Table className={classes.table}>
                  <TableBody>
                    <TableRow>
                      <TableCell align="right">
                        <Typography variant="subtitle1" color="textSecondary">Date applied: 3rd Jul, 2020</Typography>
                        <Typography variant="subtitle1" color="textSecondary"><CheckCircleIcon className={classNames(classes.icon, {"active": true})} /> Approved</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="right">
                        <Button className={classes.button} variant="contained" color="primary" disableElevation>Schedule an Interview</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper square className={classes.paper}>
            <Box mx={5}><Typography variant="subtitle1" color="inherit">Hiring Stage</Typography></Box>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
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

GoalsDetails.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
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
)(GoalsDetails);
