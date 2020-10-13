import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Breadcrumbs, Table, TableRow, TableCell, TableBody, Grid, Link, Typography } from '@material-ui/core';
import TodayIcon from '@material-ui/icons/Today';
import { green } from '@material-ui/core/colors';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment'
import * as Actions from '../../../actions';
import * as Selectors from '../../../selectors';
import * as AppSelectors from '../../../../App/selectors';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  table: {
    "& .MuiTableCell-root": {
      // border: 0
    },
    "& .MuiTableRow-root:first-child": {
      "& .MuiTableCell-root": {
        borderBottom: `1px solid ${theme.palette.divider} !important`
      },
    },
  },
  tableRoot: {
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing(7),
  },
  box: {
    backgroundColor: theme.palette.grey[50],
    borderLeft: `4px solid ${green[500]}`
  },
  icon: {
    "&.active": {
      color: green[500]
    }
  },
  link: { textTransform: 'capitalize' },
  dateline: {
    display: 'flex',
    justifyContent: 'flex-end',
    "& .MuiTypography-root": {
      marginLeft: theme.spacing(2)
    }
  },
  breadcrumbs: {
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  }
}));

const DescriptionTab = props => {
  const classes = useStyles();
  const { loading, jobOpeningDetails } = props;
  console.log(jobOpeningDetails, "job details inside desc tab");

  const handleRoute = () => { }

  return (
    <div className={classes.root}>
      {jobOpeningDetails &&
        <Grid
          container
          justify='space-between'
        >
          <Grid item xs={12}>
            <div className={classes.tableRoot}>
              <Table className={classes.table} aria-label="a dense table">
                <TableBody>
                  <TableRow>
                    <TableCell align="right">
                      <div className={classes.dateline}>
                        <Typography variant="subtitle1"><TodayIcon /> Published {moment(jobOpeningDetails.dateCreated).format('lll')}</Typography>
                        <Typography variant="subtitle1"><TodayIcon /> Expires {moment(jobOpeningDetails.submissionDeadline).format('lll')}</Typography>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" colSpan={3}>
                      <Typography>Job Title</Typography>
                      <Box p={1} className={classes.box}>{jobOpeningDetails.jobTitle}</Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" colSpan={3}>
                      <Typography>Job Description</Typography>
                      <Box p={1} className={classes.box}> {jobOpeningDetails.jobDescription}</Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.tableRoot}>
              <Typography variant="subtitle1">Hiring Workflow</Typography>
              <div className={classes.breadcrumbs}>
                <Breadcrumbs separator={<ArrowRightAltIcon fontSize="small" />} aria-label="breadcrumb">
                  {jobOpeningDetails.hiringSteps.map((job, index) => (
                    <Link color="inherit" key={index} onClick={handleRoute} className={classes.link}>
                      {job.title}
                    </Link>
                  ))}
                  <Typography color="textPrimary">Make an offer</Typography>
                </Breadcrumbs>
              </div>

              <Table className={classes.table} aria-label="a dense table">
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={3} align="right">
                      <Typography variant="subtitle1">Status: <CheckCircleIcon className={classNames(classes.icon, { "active": true })} /> Active</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <Typography variant="subtitle1">Department</Typography>
                      <Box p={1} className={classes.box}>{jobOpeningDetails.department.name}</Box>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Typography variant="subtitle1">Enrolment Type</Typography>
                      <Box p={1} className={classes.box}>{jobOpeningDetails.enrollmentType.name}</Box>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <Typography variant="subtitle1">No of vacancy</Typography>
                      <Box p={1} className={classes.box}>{jobOpeningDetails.noOfVancancies}</Box>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Typography variant="subtitle1">Submission Deadline</Typography>
                      <Box p={1} className={classes.box}>{moment(jobOpeningDetails.submissionDeadline).format('ll')}</Box>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <Typography variant="subtitle1">Location</Typography>
                      <Box p={1} className={classes.box}>{jobOpeningDetails.location.name}</Box>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Typography variant="subtitle1">Created</Typography>
                      <Box p={1} className={classes.box}>{moment(jobOpeningDetails.dateCreated).format('ll')}</Box>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Grid>
        </Grid>
      }
    </div>
  );
};

DescriptionTab.propTypes = {
  loading: PropTypes.bool,
  getEmployees: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  employees: Selectors.makeSelectEmployees(),
  employee: Selectors.makeSelectEmployee(),
  user: AppSelectors.makeSelectCurrentUser(),
  jobOpenings: Selectors.makeSelectJobOpenings(),
  jobOpeningDetails: Selectors.makeSelectJobOpeningDetails(),
});

function mapDispatchToProps(dispatch) {
  return {
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
)(DescriptionTab);
