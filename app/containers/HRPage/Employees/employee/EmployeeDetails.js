import React, { memo } from 'react';
import PropTypes from 'prop-types';
import EzoneUtils from '../../../../utils/EzoneUtils'
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Avatar, Box, Button, IconButton, List, ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction, Table, TableRow, TableCell, TableBody, Grid, Paper, Typography, Toolbar, Stepper, Step, StepLabel } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { green, orange } from '@material-ui/core/colors'
import classNames from 'classnames'
import moment from 'moment'
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import * as AppSelectors from '../../../App/selectors';
import { fade, darken, lighten } from '@material-ui/core/styles/colorManipulator';
import EditOutlined from '@material-ui/icons/EditOutlined';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import RefreshSharp from '@material-ui/icons/RefreshSharp';
import AddIcon from '@material-ui/icons/Add';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

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
    flexGrow: 1,
    "& p": {
      color: '#fff'
    },
    "& .MuiListItemAvatar-root": {
      marginRight: theme.spacing(1)
    }
  },
  toolbar: {
    backgroundColor: theme.palette.grey[100],
  },
  titleCase: {
    textTransform: "capitalize"
  },
  icon: {
    width: 20,
    height: 20,
    '&.active': { color: green[500] },
  },
  avatar: {
    width: 100,
    height: 100,
    border: `1px solid ${lighten(theme.palette.primary.main, 0.3)}`,
  },
  container: {
    position: "relative",
    "&:hover > $overlay": {
      opacity: 1,
    }
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
    width: "100%",
    opacity: 0,
    transition: ".3s ease",
  },
  icon: {
    color: theme.palette.text.secondary,
    position: "absolute",
    zIndex: theme.zIndex.drawer + 1,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    "-ms-transform": "translate(-50%, -50%)",
    textAlign: "center",
  },
  button: {
    borderRadius: theme.shape.borderRadius * 5,
    padding: theme.spacing(1, 4)
  },
}));

const EmployeeDetails = props => {
  const classes = useStyles();
  const {
    loading,
    match,
    openEditEmployeeDialog,
    openWorkExperienceDialog,
    openEducationBackgroundDialog,
    getEmployee,
    updateEmployee,
    employees,
    employee
  } = props;
  const { params } = match
  const emp = employee ? employee : employees && employees.find(emp => emp.uuId === params.status)

  const [form, setForm] = React.useState({ ...emp })

  const handleImageChange = ({ target }) => {
    const { name, files } = target
    console.log(name, "name")
    const result = EzoneUtils.toBase64(files[0])
    result.then(data => updateEmployee({ ...emp, [name]: data }))
  }

  console.log(employee, "get details gotten employee")
  console.log(form, "get details form")

  if (!emp) {
    return ''
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <AppBar position="static" color="inherit" elevation={1}>
            <Toolbar variant="dense">
              <Typography variant="h6" className={classes.title}>
                Employee Details
              </Typography>
              <IconButton onClick={() => { }}><RefreshSharp /></IconButton>
              <IconButton onClick={() => { }}><DeleteOutlined /></IconButton>
              <IconButton onClick={() => openEditEmployeeDialog(emp)}><EditOutlined /></IconButton>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item md={12}>
          <Paper square className={classes.header}>
            <Grid container alignItems="center">
              <Grid item xs={6}>
                <List className={classes.list}>
                  <ListItem alignItems="center">
                    <ListItemAvatar>
                      <div className={classes.container}>
                        <div className={classes.overlay}>
                          <IconButton
                            component="label"
                            className={classes.icon}
                          >
                            <PhotoCameraIcon />
                            <input
                              name="employeeImage"
                              type="file"
                              style={{ display: "none" }}
                              onChange={handleImageChange}
                            />
                          </IconButton>
                        </div>
                        <label htmlFor="contained-button-file">
                          <Avatar
                            alt={emp.lastName}
                            src={`data:image/jpg;base64,${emp.employeeImage}`}
                            className={classes.avatar}
                          />
                        </label>
                      </div>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="h5" component="span" color="inherit" className={classes.titleCase}>
                          {emp.firstName + ' ' + emp.lastName}
                        </Typography>
                      }
                      secondary={'IT Project Manager' /*'designation'*/}
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
            <Toolbar className={classes.toolbar} variant="dense">
              <Typography variant="subtitle1" color="inherit">Basic Information</Typography>
            </Toolbar>
            <Table className={classes.table}>
              <TableBody>
                <TableRow>
                  <TableCell component="th">Firstname</TableCell>
                  <TableCell>{emp.firstName}</TableCell>
                  <TableCell component="th">Lastname</TableCell>
                  <TableCell>{emp.lastName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Email</TableCell>
                  <TableCell>{emp.emailAddress}</TableCell>
                  <TableCell component="th">Phone Number</TableCell>
                  <TableCell>{emp.phoneNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Nickname</TableCell>
                  <TableCell>{emp.nickName && emp.nickName}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper square className={classes.paper}>
            <Toolbar className={classes.toolbar} variant="dense">
              <Typography variant="subtitle1" color="inherit">Work Information</Typography>
            </Toolbar>
            <Table className={classes.table}>
              <TableBody>
                <TableRow>
                  <TableCell component="th">Employee ID</TableCell>
                  <TableCell>{emp.employeeId && emp.employeeId}</TableCell>
                  <TableCell component="th">Date Hired</TableCell>
                  <TableCell>{emp.employmentDate && emp.employmentDate}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Branch</TableCell>
                  <TableCell>{emp.branch && emp.branch.name}</TableCell>
                  <TableCell component="th">Employment Status</TableCell>
                  <TableCell>{emp.status && emp.status}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Department</TableCell>
                  <TableCell>{emp.department && emp.department.name}</TableCell>
                  <TableCell component="th">Employment Type</TableCell>
                  <TableCell>{emp.employeeType && emp.employeeType.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Reporting To</TableCell>
                  <TableCell>{emp.reportingTo && emp.reportingTo.name}</TableCell>
                  <TableCell component="th">Job Role</TableCell>
                  <TableCell>{emp.role && emp.role.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Job Level</TableCell>
                  <TableCell>Beginner</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Job Description</TableCell>
                  <TableCell>{emp.jobDesc && emp.jobDesc}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper square className={classes.paper}>
            <Toolbar className={classes.toolbar} variant="dense">
              <Typography variant="subtitle1" color="inherit">Personal Information</Typography>
            </Toolbar>
            <Table className={classes.table}>
              <TableBody>
                <TableRow>
                  <TableCell component="th">Date of Birth</TableCell>
                  <TableCell>{emp.dob && emp.dob}</TableCell>
                  <TableCell component="th">Marital Status</TableCell>
                  <TableCell>{emp.maritalStatus && emp.maritalStatus}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Gender</TableCell>
                  <TableCell>{emp.gender && emp.gender}</TableCell>
                  <TableCell component="th">State of Origin</TableCell>
                  <TableCell>{emp.state && emp.state}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Website</TableCell>
                  <TableCell>{emp.website && emp.website}</TableCell>
                  <TableCell component="th">Other Email</TableCell>
                  <TableCell>{emp.emailAddress && emp.emailAddress}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Country</TableCell>
                  <TableCell>{emp.country && emp.country}</TableCell>
                  <TableCell component="th">City</TableCell>
                  <TableCell>{emp.city && emp.city}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Postal Code</TableCell>
                  <TableCell>{emp.organisation && emp.organisation.postalCode}</TableCell>
                  <TableCell component="th">Location 1</TableCell>
                  <TableCell>{emp.address && emp.address}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Bio</TableCell>
                  <TableCell>{emp.about && emp.about}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper square className={classes.paper}>
            <Toolbar className={classes.toolbar} variant="dense">
              <Typography variant="subtitle1" component="span" color="inherit" className={classes.title}>Work Experience</Typography>
              <Button color="primary" startIcon={<AddIcon />} onClick={() => openWorkExperienceDialog(emp)}>Add</Button>
            </Toolbar>
            {emp.workExperience && emp.workExperience.length > 0 ?
              <List dense={false}>
                {emp.workExperience.map((work, i) =>
                  <ListItem key={i}>
                    <ListItemText
                      primary={
                        <Typography variant="h6" component="legend">{work.jobTitle}</Typography>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography
                            variant="subtitle1"
                            component="legend"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            {work.companyName}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="textSecondary"
                            component="legend"
                          >
                            <em>{`${moment(work.fromDate).format('MMM YYYY')} - ${moment(work.toDate).format('MMM YYYY')}`}</em>
                          </Typography>
                          <Typography component="span">— Wish I could come, but I'm out of town this…</Typography>
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
              </List> :
              <Box p={2}>
                <Typography variant="subtitle2" color="textSecondary" align="center">You do not have any work experience yet</Typography>
              </Box>
            }
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper square className={classes.paper}>
            <Toolbar className={classes.toolbar} variant="dense">
              <Typography variant="subtitle1" color="inherit" className={classes.title}>Educational Background</Typography>
              <Button color="primary" startIcon={<AddIcon />} onClick={() => openEducationBackgroundDialog(emp)}>Add</Button>
            </Toolbar>
            {emp.education && emp.education.length > 0 ?
              <List dense={false}>
                {emp.education.map((edu, i) =>
                  <ListItem key={i}>
                    <ListItemText
                      primary={<Typography variant="h6" component="span">University Of Lagos</Typography>}
                      secondary={
                        <React.Fragment>
                          <Typography
                            variant="subtitle1"
                            className={classes.inline}
                            color="textPrimary"
                            component="legend"
                          >
                            {`${edu.degree} — ${edu.fieldOfStudy}`}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="textSecondary"
                            component="legend"
                          >
                            <em>{`Nov 2017 - ${moment(edu.dateOfCompletion).format('MMM YYYY')}`}</em>
                          </Typography>
                          <Typography component="span">— {edu.note}…</Typography>
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
              </List> :
              <Box p={2}>
                <Typography variant="body1" color="textSecondary" align="center">You do not have any educational background yet</Typography>
              </Box>
            }
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
  employee: Selectors.makeSelectEmployee(),
  user: AppSelectors.makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    openWorkExperienceDialog: (data) => dispatch(Actions.openWorkExperienceDialog(data)),
    openEducationBackgroundDialog: (data) => dispatch(Actions.openEducationBackgroundDialog(data)),
    openNewEmployeeDialog: () => dispatch(Actions.openNewEmployeeDialog()),
    openEditEmployeeDialog: (data) => dispatch(Actions.openEditEmployeeDialog(data)),
    getEmployees: () => dispatch(Actions.getEmployees()),
    getEmployee: (uuid) => dispatch(Actions.getEmployee(uuid)),
    updateEmployee: (data) => dispatch(Actions.updateEmployee(data)),
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
