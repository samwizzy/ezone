import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Breadcrumbs, Button, Divider, Table, TableRow, TableCell, TableBody, Grid, Link, Paper, Typography } from '@material-ui/core';
import TodayIcon from '@material-ui/icons/Today';
import { green } from '@material-ui/core/colors';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
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
      border: "none !important"
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
    padding: theme.spacing(0, 4)
  },
  box: {
    backgroundColor: theme.palette.grey[50]
  },
  icon: {
    "&.active": {
      color: green[500]
    }
  },
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
	const { loading, openNewEmployeeDialog, getEmployee, employees, employee, getJobOpenings, jobOpenings } = props;

  React.useEffect(() => {
  }, [employee]);

  const handleRoute = () => {}

  return (
    <div className={classes.root}>
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
                      <Typography variant="subtitle1"><TodayIcon/> Published 3rd Jul, 2019</Typography>
                      <Typography variant="subtitle1"><TodayIcon/> Expires 3rd Jul, 2019</Typography>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" colSpan={3}>Job Title</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}><Box p={1} className={classes.box}>Accountant</Box></TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" colSpan={3}>Job Description</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>
                    <Box p={1} className={classes.box}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrudLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrudLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                    </Box>
                  </TableCell>
                  <TableCell></TableCell>
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
                <Link color="inherit" onClick={handleRoute}>
                  Screening
                </Link>
                <Link color="inherit" onClick={handleRoute}>
                  Phone Interview
                </Link>
                <Link color="inherit" onClick={handleRoute}>
                  Face to Face
                </Link>
                <Typography color="textPrimary">Make an offer</Typography>
              </Breadcrumbs>
            </div>

            <Table className={classes.table} aria-label="a dense table">
              <TableBody>
                <TableRow>
                  <TableCell colSpan={3} align="right">
                    <Typography variant="subtitle1">Status: <CheckCircleIcon className={classNames(classes.icon, {"active": true})} /> Active</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Typography variant="subtitle1">Department</Typography>
                    <Box p={1} className={classes.box}>Accountant</Box>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography variant="subtitle1">Enrolment Type</Typography>
                    <Box p={1} className={classes.box}>Accountant</Box>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Typography variant="subtitle1">Experience</Typography>
                    <Box p={1} className={classes.box}>2 to 3 years</Box>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography variant="subtitle1">Submission Deadline</Typography>
                    <Box p={1} className={classes.box}>3rd Jul 2019</Box>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Typography variant="subtitle1">Salary</Typography>
                    <Box p={1} className={classes.box}>N  300,000</Box>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography variant="subtitle1">Salary Type</Typography>
                    <Box p={1} className={classes.box}>Employee payment</Box>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Grid>
      </Grid>
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
  employee : Selectors.makeSelectEmployee(),
  user: AppSelectors.makeSelectCurrentUser(),
  jobOpenings : Selectors.makeSelectJobOpenings(),
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
