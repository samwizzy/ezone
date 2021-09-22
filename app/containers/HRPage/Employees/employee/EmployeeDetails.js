import React, { memo } from 'react';
import PropTypes from 'prop-types';
import EzoneUtils from '../../../../utils/EzoneUtils';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Grid,
  Paper,
  Typography,
  Toolbar,
} from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { green } from '@material-ui/core/colors';
import moment from 'moment';
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import * as AppSelectors from '../../../App/selectors';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { CircleLoader } from '../../../../components/LoadingIndicator';
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
    flexGrow: 1,
  },
  header: {
    backgroundImage:
      'linear-gradient(111.61deg, #1A88E1 38.84%, #3F0A96 101.73%)',
    padding: theme.spacing(2),
    margin: theme.spacing(1, 0),
    color: '#fff',
  },
  paper: {
    padding: theme.spacing(0),
    boxShadow: theme.shadows[0],
  },
  table: {
    whiteSpace: 'nowrap',
    '& .MuiTableCell-root': {
      border: '0 !important',
    },
    '& th.MuiTableCell-root': {
      fontWeight: theme.typography.fontWeightMedium,
      '&:after': {
        content: "':'",
      },
    },
  },
  list: {
    flexGrow: 1,
    '& p': {
      color: '#fff',
    },
    '& .MuiListItemAvatar-root': {
      marginRight: theme.spacing(1),
    },
  },
  toolbar: {
    backgroundColor: theme.palette.grey[100],
  },
  titleCase: {
    textTransform: 'capitalize',
  },
  icon: {
    width: 20,
    height: 20,
    '&.active': { color: green[500] },
  },
  avatar: {
    width: 100,
    height: 100,
    fontSize: '40px',
    border: `1px solid ${lighten(theme.palette.primary.main, 0.3)}`,
  },
  container: {
    position: 'relative',
    '&:hover > $overlay': {
      opacity: 1,
    },
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    width: '100%',
    opacity: 0,
    transition: '.3s ease',
  },
  icon: {
    color: theme.palette.text.secondary,
    position: 'absolute',
    zIndex: theme.zIndex.drawer + 1,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    '-ms-transform': 'translate(-50%, -50%)',
    textAlign: 'center',
  },
  button: {
    borderRadius: theme.shape.borderRadius * 5,
    padding: theme.spacing(1, 4),
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
    updateEmployee,
    openConfirmDeleteEmployeeDialog,
    employees,
    employee,
  } = props;
  const { params } = match;
  const emp = employee
    ? employee
    : employees && employees.find(emp => emp.uuId === params.empId);

  const [form, setForm] = React.useState({ ...emp });

  const handleImageChange = ({ target }) => {
    const { name, files } = target;
    const result = EzoneUtils.toBase64(files[0]);
    result.then(data =>
      updateEmployee({
        ...emp,
        [name]: data,
        imageChanged: true,
        signatureChanged: false,
      }),
    );
  };

  console.log(employee, 'get details gotten employee');
  console.log(form, 'get details form');

  if (!emp || loading) {
    return <CircleLoader />;
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <AppBar position="static" color="inherit" elevation={0}>
            <Toolbar variant="regular">
              <Typography variant="h6" className={classes.title}>
                Employee details
              </Typography>
              <IconButton onClick={() => {}}>
                <RefreshSharp />
              </IconButton>
              <IconButton
                onClick={() => openConfirmDeleteEmployeeDialog(emp.id)}
              >
                <DeleteOutlined />
              </IconButton>
              <IconButton onClick={() => openEditEmployeeDialog(emp)}>
                <EditOutlined />
              </IconButton>
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
                              style={{ display: 'none' }}
                              onChange={handleImageChange}
                            />
                          </IconButton>
                        </div>
                        <label htmlFor="contained-button-file">
                          <Avatar
                            alt={emp.lastName}
                            src={emp.employeeImage}
                            className={classes.avatar}
                          />
                        </label>
                      </div>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography
                          variant="h5"
                          component="span"
                          color="inherit"
                          className={classes.titleCase}
                        >
                          {emp.firstName + ' ' + emp.lastName}
                        </Typography>
                      }
                      secondary={emp.position ? emp.position.name : '—'}
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={6} />
            </Grid>
          </Paper>
        </Grid>

        <Grid item md={12}>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-2 sm:px-6">
              <h3 className="text-lg leading-6 mb-2 font-bold text-gray-500 uppercase">
                Employee Information
              </h3>
              <hr className="h-0 w-full border-0 border-b border-gray-200 inline-block" />
            </div>

            <div className="px-4 pb-3 sm:px-6">
              <h3 className="text-lg leading-6 mb-2 font-bold text-gray-700 uppercase">
                Basic Information
              </h3>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    First name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {emp.firstName}
                  </dd>
                </div>
                <div className="bg-white px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Last name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {emp.lastName}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {emp.emailAddress}
                  </dd>
                </div>
                <div className="bg-white px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Phone number
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {emp.phoneNumber}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Nick name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {emp.nickName}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="px-4 py-2 sm:px-6">
              <h3 className="text-lg leading-6 mb-2 font-bold text-gray-700 uppercase">
                Work Information
              </h3>
            </div>

            <div className="border-t border-gray-200">
              <div className="sm:grid grid-cols-12 gap-8">
                <ul className="pl-0 md:col-span-6 col-span-12">
                  <li className="bg-white px-4 py-2 sm:flex flex-col sm:px-6">
                    <span className="text-sm font-medium text-gray-500">
                      Employee ID
                    </span>
                    <span className="text-sm text-gray-900 sm:mt-0">
                      {emp.employeeId}
                    </span>
                  </li>
                  <li className="bg-white px-4 py-2 sm:flex flex-col sm:px-6">
                    <span className="text-sm font-medium text-gray-500">
                      Branch
                    </span>
                    <span className="text-sm text-gray-900 sm:mt-0">
                      {emp.branch ? emp.branch.name : '—'}
                    </span>
                  </li>
                  <li className="bg-white px-4 py-2 sm:flex flex-col sm:px-6">
                    <span className="text-sm font-medium text-gray-500">
                      Department
                    </span>
                    <span className="text-sm text-gray-900 sm:mt-0">
                      {emp.department ? emp.department.name : '—'}
                    </span>
                  </li>
                  <li className="bg-white px-4 py-2 sm:flex flex-col sm:px-6">
                    <span className="text-sm font-medium text-gray-500">
                      Reporting to
                    </span>
                    <span className="text-sm text-gray-900 sm:mt-0">
                      {emp.reportingTo
                        ? emp.reportingTo.firstName +
                          ' ' +
                          emp.reportingTo.lastName
                        : '—'}
                    </span>
                  </li>
                  <li className="bg-white px-4 py-2 sm:flex flex-col sm:px-6">
                    <span className="text-sm font-medium text-gray-500">
                      Job level
                    </span>
                    <span className="text-sm text-gray-900 sm:mt-0">—</span>
                  </li>
                  <li className="bg-white px-4 py-2 sm:flex flex-col sm:px-6">
                    <span className="text-sm font-medium text-gray-500">
                      Job description
                    </span>
                    <span className="text-sm text-gray-900 sm:mt-0">
                      {emp.jobDesc || '—'}
                    </span>
                  </li>
                </ul>
                <ul className="pl-0 md:col-span-6 col-span-12">
                  <li className="bg-white px-4 py-2 sm:flex flex-col sm:px-6">
                    <span className="text-sm font-medium text-gray-500">
                      Date hired
                    </span>
                    <span className="text-sm text-gray-900 sm:mt-0">
                      {emp.employmentDate
                        ? moment(emp.employmentDate).format('ll')
                        : '—'}
                    </span>
                  </li>
                  <li className="bg-white px-4 py-2 sm:flex flex-col sm:px-6">
                    <span className="text-sm font-medium text-gray-500">
                      Employment status
                    </span>
                    <span className="text-sm text-gray-900 sm:mt-0">
                      {emp.status || '—'}
                    </span>
                  </li>
                  <li className="bg-white px-4 py-2 sm:flex flex-col sm:px-6">
                    <span className="text-sm font-medium text-gray-500">
                      Employee type
                    </span>
                    <span className="text-sm text-gray-900 sm:mt-0">
                      {emp.employeeType ? emp.employeeType.name : '—'}
                    </span>
                  </li>
                  <li className="bg-white px-4 py-2 sm:flex flex-col sm:px-6">
                    <span className="text-sm font-medium text-gray-500">
                      Position
                    </span>
                    <span className="text-sm text-gray-900 sm:mt-0">
                      {emp.position ? emp.position.name : '—'}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="px-4 py-2 sm:px-6">
              <h3 className="text-lg leading-6 mb-2 font-bold text-gray-700 uppercase">
                Personal Information
              </h3>
            </div>

            <div className="border-t border-gray-200">
              <div className="sm:grid grid-cols-12 gap-8">
                <ul className="pl-0 md:col-span-6 col-span-12">
                  <li className="bg-white px-4 py-2 sm:flex flex-col sm:px-6">
                    <span className="text-sm font-medium text-gray-500">
                      Date of birth
                    </span>
                    <span className="text-sm text-gray-900 sm:mt-0">
                      {emp.dob ? moment(emp.dob).format('Do, MMMM YYYY') : '—'}
                    </span>
                  </li>
                  <li className="bg-white px-4 py-2 sm:flex flex-col sm:px-6">
                    <span className="text-sm font-medium text-gray-500">
                      Gender
                    </span>
                    <span className="text-sm text-gray-900 sm:mt-0">
                      {emp.gender || '—'}
                    </span>
                  </li>
                  <li className="bg-white px-4 py-2 sm:flex flex-col sm:px-6">
                    <span className="text-sm font-medium text-gray-500">
                      Website
                    </span>
                    <span className="text-sm text-gray-900 sm:mt-0">
                      {emp.website || '—'}
                    </span>
                  </li>
                  <li className="bg-white px-4 py-2 sm:flex flex-col sm:px-6">
                    <span className="text-sm font-medium text-gray-500">
                      Country
                    </span>
                    <span className="text-sm text-gray-900 sm:mt-0">
                      {emp.country || '—'}
                    </span>
                  </li>
                  <li className="bg-white px-4 py-2 sm:flex flex-col sm:px-6">
                    <span className="text-sm font-medium text-gray-500">
                      Postal code
                    </span>
                    <span className="text-sm text-gray-900 sm:mt-0">
                      {emp.organisation ? emp.organisation.postalCode : '—'}
                    </span>
                  </li>
                  <li className="bg-white px-4 py-2 sm:flex flex-col sm:px-6">
                    <span className="text-sm font-medium text-gray-500">
                      About Me
                    </span>
                    <span className="text-sm text-gray-900 sm:mt-0">
                      {emp.about || '—'}
                    </span>
                  </li>
                </ul>
                <ul className="pl-0 md:col-span-6 col-span-12">
                  <li className="bg-white px-4 py-2 sm:flex flex-col sm:px-6">
                    <span className="text-sm font-medium text-gray-500">
                      Marital status
                    </span>
                    <span className="text-sm text-gray-900 sm:mt-0">
                      {emp.maritalStatus || '—'}
                    </span>
                  </li>
                  <li className="bg-white px-4 py-2 sm:flex flex-col sm:px-6">
                    <span className="text-sm font-medium text-gray-500">
                      State of origin
                    </span>
                    <span className="text-sm text-gray-900 sm:mt-0">
                      {emp.state || '—'}
                    </span>
                  </li>
                  <li className="bg-white px-4 py-2 sm:flex flex-col sm:px-6">
                    <span className="text-sm font-medium text-gray-500">
                      Other email
                    </span>
                    <span className="text-sm text-gray-900 sm:mt-0">
                      {emp.emailAddress ? emp.emailAddress : '—'}
                    </span>
                  </li>
                  <li className="bg-white px-4 py-2 sm:flex flex-col sm:px-6">
                    <span className="text-sm font-medium text-gray-500">
                      City
                    </span>
                    <span className="text-sm text-gray-900 sm:mt-0">
                      {emp.city || '—'}
                    </span>
                  </li>
                  <li className="bg-white px-4 py-2 sm:flex flex-col sm:px-6">
                    <span className="text-sm font-medium text-gray-500">
                      Address
                    </span>
                    <span className="text-sm text-gray-900 sm:mt-0">
                      {emp.address || '—'}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="px-4 py-2 sm:px-6 sm:flex justify-between item-start">
              <h3 className="text-lg leading-6 mb-2 font-bold text-gray-700 uppercase">
                Work Experience
              </h3>
              <Button
                size="small"
                startIcon={<AddIcon />}
                onClick={() => openWorkExperienceDialog(emp)}
              >
                Add
              </Button>
            </div>

            <div className="border-t border-gray-200">
              <div className="sm:grid grid-cols-12 gap-8">
                {emp.workExperience && emp.workExperience.length > 0 ? (
                  <List dense={false}>
                    {emp.workExperience.map((work, i) => (
                      <ListItem key={i}>
                        <ListItemText
                          primary={
                            <Typography variant="h6" component="legend">
                              {work.jobTitle}
                            </Typography>
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
                                <em>{`${moment(work.fromDate).format(
                                  'MMM YYYY',
                                )} - ${moment(work.toDate).format(
                                  'MMM YYYY',
                                )}`}</em>
                              </Typography>
                              <Typography component="span">
                                — Wish I could come, but I'm out of town this…
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
                    ))}
                  </List>
                ) : (
                  <Box p={2} className="col-span-12">
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      align="center"
                    >
                      You do not have any work experience yet
                    </Typography>
                  </Box>
                )}
              </div>
            </div>

            <div className="px-4 py-2 sm:px-6 sm:flex justify-between item-start">
              <h3 className="text-lg leading-6 mb-2 font-bold text-gray-700 uppercase">
                Educational Background
              </h3>
              <Button
                size="small"
                startIcon={<AddIcon />}
                onClick={() => openEducationBackgroundDialog(emp)}
              >
                Add
              </Button>
            </div>

            <div className="border-t border-gray-200">
              <div className="sm:grid grid-cols-12 gap-8">
                {emp.education && emp.education.length > 0 ? (
                  <List dense={false}>
                    {emp.education.map((edu, i) => (
                      <ListItem key={i}>
                        <ListItemText
                          primary={
                            <Typography variant="h6" component="span">
                              University of Lagos
                            </Typography>
                          }
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
                                <em>{`Nov 2017 - ${moment(
                                  edu.dateOfCompletion,
                                ).format('MMM YYYY')}`}</em>
                              </Typography>
                              <Typography component="span">
                                — {edu.note}…
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
                    ))}
                  </List>
                ) : (
                  <Box p={2} className="col-span-12">
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      align="center"
                    >
                      You do not have any educational background yet
                    </Typography>
                  </Box>
                )}
              </div>
            </div>
          </div>
        </Grid>

        <Grid item xs={12}>
          <Paper square className={classes.paper} />
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
    openWorkExperienceDialog: data =>
      dispatch(Actions.openWorkExperienceDialog(data)),
    openEducationBackgroundDialog: data =>
      dispatch(Actions.openEducationBackgroundDialog(data)),
    openNewEmployeeDialog: () => dispatch(Actions.openNewEmployeeDialog()),
    openEditEmployeeDialog: data =>
      dispatch(Actions.openEditEmployeeDialog(data)),
    getEmployees: () => dispatch(Actions.getEmployees()),
    updateEmployee: data => dispatch(Actions.updateEmployee(data)),
    openConfirmDeleteEmployeeDialog: data =>
      dispatch(Actions.openConfirmDeleteEmployeeDialog(data)),
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
