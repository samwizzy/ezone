import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Avatar, Box, Button, IconButton, List, ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction, Table, TableRow, TableCell, TableBody, Grid, Paper, Typography, Toolbar, Stepper, Step, StepLabel } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { green, orange } from '@material-ui/core/colors'
import classNames from 'classnames'
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import * as AppSelectors from '../../App/selectors';
import EditOutlined from '@material-ui/icons/EditOutlined';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import RefreshSharp from '@material-ui/icons/RefreshSharp';
import AddIcon from '@material-ui/icons/Add';
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
  header: {
    backgroundImage: 'linear-gradient(111.61deg, #1A88E1 38.84%, #3F0A96 101.73%)',
    padding: theme.spacing(2),
    margin: theme.spacing(1, 0),
    color: '#fff'
  },
  paper: {
    padding: theme.spacing(2),
    boxShadow: theme.shadows[0]
  },
  table: {  
    whiteSpace: 'nowrap',
    '& .MuiTableCell-root': {
      border: "0 !important"
    },
    '& th.MuiTableCell-root': {
      fontWeight: theme.typography.fontWeightMedium,
      "&:after": {
        content: "':'"
      }
    },
  },
  list: {
    flexGrow: 1
  },
  toolbar: {
    backgroundColor: theme.palette.grey[100],
  },
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

const EmployeeDetails = props => {
  const classes = useStyles();
	const { loading, openWorkExperienceDialog, openEducationBackgroundDialog, getEmployee, employees, employee } = props;

  React.useEffect(() => {
  }, [employee]);

  return (
    <div className={classes.root}>
      <Grid
        container
      >
				<Grid item xs={12}>
          <AppBar position="static" color="inherit" elevation={1}>
            <Toolbar variant="dense">
              <Typography variant="h6" className={classes.title}>
                Employee Details
              </Typography>
              <IconButton onClick={()=>{}}><RefreshSharp /></IconButton>
              <IconButton onClick={()=>{}}><DeleteOutlined /></IconButton>
              <IconButton onClick={()=>{}}><EditOutlined /></IconButton>
            </Toolbar>
          </AppBar>
				</Grid>
        <Grid item md={12}>
          <Paper square className={classes.header}>
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
              <Grid item xs={6}></Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper square className={classes.paper}>
            <Toolbar className={classes.toolbar} variant="dense"><Typography variant="subtitle1" color="inherit">Basic Information</Typography></Toolbar>
            <Table className={classes.table}>
              <TableBody>
                <TableRow>
                  <TableCell component="th">Firstname</TableCell>
                  <TableCell>Joy Essien</TableCell>
                  <TableCell component="th">Lastname</TableCell>
                  <TableCell>Joy Essien</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Email</TableCell>
                  <TableCell>joyessien@gmail.com</TableCell>
                  <TableCell component="th">Phone Number</TableCell>
                  <TableCell>09123566788</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Nickname</TableCell>
                  <TableCell>Jessieny</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>  
        </Grid>
        <Grid item xs={12}>
          <Paper square className={classes.paper}>
            <Toolbar className={classes.toolbar} variant="dense"><Typography variant="subtitle1" color="inherit">Work Information</Typography></Toolbar>
            <Table className={classes.table}>
              <TableBody>
                <TableRow>
                  <TableCell component="th">Employee ID</TableCell>
                  <TableCell>Joy Essien</TableCell>
                  <TableCell component="th">Date Hired</TableCell>
                  <TableCell>09, May 2029</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Branch</TableCell>
                  <TableCell>Lagos</TableCell>
                  <TableCell component="th">Employment Status</TableCell>
                  <TableCell>Active</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Department</TableCell>
                  <TableCell>Marketing</TableCell>
                  <TableCell component="th">Employment Type</TableCell>
                  <TableCell>Full time</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Reporting To</TableCell>
                  <TableCell>Joy Essien</TableCell>
                  <TableCell component="th">Job Role</TableCell>
                  <TableCell>Accountant</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Job Level</TableCell>
                  <TableCell>Beginner</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Job Description</TableCell>
                  <TableCell>I am the best there is, don't say i didn't tell you</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>  
        </Grid>
        <Grid item xs={12}>
          <Paper square className={classes.paper}>
            <Toolbar className={classes.toolbar} variant="dense"><Typography variant="subtitle1" color="inherit">Personal Information</Typography></Toolbar>
            <Table className={classes.table}>
              <TableBody>
                <TableRow>
                  <TableCell component="th">Date of Birth</TableCell>
                  <TableCell>11th, June 1990</TableCell>
                  <TableCell component="th">Marital Status</TableCell>
                  <TableCell>Single</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Gender</TableCell>
                  <TableCell>Male</TableCell>
                  <TableCell component="th">State of Origin</TableCell>
                  <TableCell>Akwa-Ibom</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Website</TableCell>
                  <TableCell>optisoft.ng</TableCell>
                  <TableCell component="th">Other Email</TableCell>
                  <TableCell>jessieny@gmail.com</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Country</TableCell>
                  <TableCell>Nigeria</TableCell>
                  <TableCell component="th">City</TableCell>
                  <TableCell>Victoria Island</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Postal Code</TableCell>
                  <TableCell>101241</TableCell>
                  <TableCell component="th">Location 1</TableCell>
                  <TableCell>36 Marina</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Location 2</TableCell>
                  <TableCell>808 Marina</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Bio</TableCell>
                  <TableCell>We tell you what we can do but we deliver what you weren't expecting</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>  
        </Grid>
        <Grid item xs={12}>
          <Paper square className={classes.paper}>
            <Toolbar className={classes.toolbar} variant="dense">
              <Typography variant="subtitle1" color="inherit" className={classes.title}>Work Experience</Typography>
              <Button color="primary" startIcon={<AddIcon />} onClick={openWorkExperienceDialog}>Add</Button>
            </Toolbar>
            <List dense={false}>
                {[0,1].map((work, i) => 
                <ListItem key={i}>
                  <ListItemText
                    primary={<Typography variant="h6">UI/UX Designer</Typography>}
                    secondary={
                      <React.Fragment>
                        <Typography
                          variant="subtitle1"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          Octiver Limited
                        </Typography>
                        <Typography
                          variant="caption"
                          color="textSecondary"
                        >
                          <em>Nov 2017 - Nov 2020</em>
                        </Typography>
                        <Typography>— Wish I could come, but I'm out of town this…</Typography>
                      </React.Fragment>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <EditOutlined />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                )}
            </List>
          </Paper>  
        </Grid>
        <Grid item xs={12}>
          <Paper square className={classes.paper}>
            <Toolbar className={classes.toolbar} variant="dense">
              <Typography variant="subtitle1" color="inherit" className={classes.title}>Educational Background</Typography>
              <Button color="primary" startIcon={<AddIcon />} onClick={openEducationBackgroundDialog}>Add</Button>
            </Toolbar>
            <List dense={false}>
                {[0,1].map((work, i) => 
                <ListItem key={i}>
                  <ListItemText
                    primary={<Typography variant="h6">University Of Lagos</Typography>}
                    secondary={
                      <React.Fragment>
                        <Typography
                          variant="subtitle1"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          BSC — Computer Science
                        </Typography>
                        <Typography
                          variant="caption"
                          color="textSecondary"
                        >
                          <em>Nov 2017 - Nov 2020</em>
                        </Typography>
                      </React.Fragment>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <EditOutlined />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                )}
            </List>
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

EmployeeDetails.propTypes = {
  loading: PropTypes.bool,
  getEmployees: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  employees: Selectors.makeSelectEmployees(),
  employee : Selectors.makeSelectEmployee(),
  user: AppSelectors.makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    openWorkExperienceDialog: () => dispatch(Actions.openWorkExperienceDialog()),
    openEducationBackgroundDialog: () => dispatch(Actions.openEducationBackgroundDialog()),
    openNewEmployeeDialog: () => dispatch(Actions.openNewEmployeeDialog()),
    openEditEmployeeDialog: () => dispatch(Actions.openEditEmployeeDialog()),
    getEmployees: () => dispatch(Actions.getEmployees()),
    getEmployee: (uuid) => dispatch(Actions.getEmployee(uuid)),
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
)(EmployeeDetails);
