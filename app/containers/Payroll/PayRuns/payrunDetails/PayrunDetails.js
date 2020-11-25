import React, { Fragment, useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import EzoneUtils from '../../../../utils/EzoneUtils';
import { withRouter } from 'react-router-dom';
import {
  makeStyles,
  Button,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Paper,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  ListItemText,
} from '@material-ui/core';
import classNames from 'classnames';
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { CircleLoader } from '../../../../components/LoadingIndicator';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import _ from 'lodash';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import * as PayrollSelectors from '../../selectors';
import ControlledButtons from './components/ControlledButtons';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    marginBottom: theme.spacing(1),
    '& .MuiCardActions-root': {
      justifyContent: 'flex-start',
      padding: theme.spacing(2)
    }
  },
  title: { flexGrow: 1 },
  toolbar: {
    ...theme.mixins.toolbar,
    paddingLeft: 0,
  },
  table: {
    whiteSpace: 'nowrap',
    '& .MuiToolbar-regular': {
      paddingLeft: 0
    },
  },
}));

const payrunData = [
  { id: 1, employee: 'Justin', department: 'IT', role: 'Admin', grossSalary: '350000', earnings: '1500000', deduction: '2570', tax: '9200', netSalary: '500000' }
]

const PayrunDetails = props => {
  const classes = useStyles(props);
  const [anchorEl, setAnchorEl] = useState(null);
  const { history, match, payrollSetupData, payrun } = props;

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePayrunTo = () => {
    setAnchorEl(null);
  }

  const handlePayrunFrom = () => {
    setAnchorEl(null);
  }

  const handleBack = () => {
    history.goBack()
  }

  console.log(payrun, "payrun")
  console.log(payrollSetupData, "payrollSetupData")

  if (!payrun) {
    // return <CircleLoader />;
  }

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader
          title={
            <Toolbar className={classes.toolbar}>
              <IconButton color="primary" onClick={handleBack}><ArrowBackIcon /></IconButton>
              <Typography variant="h6">Pay Run Name</Typography>
            </Toolbar>
          }
          subheader="Approved : 1st Jul 2019 - 30 Jul 2019"
        />

        <CardContent>
          <Grid container>
            <Grid item xs={12}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell component="th">Employee</TableCell>
                    <TableCell component="th">Department</TableCell>
                    <TableCell component="th">Role</TableCell>
                    <TableCell component="th">Gross Salary</TableCell>
                    <TableCell component="th">Earnings</TableCell>
                    <TableCell component="th">Deduction</TableCell>
                    <TableCell component="th">Tax</TableCell>
                    <TableCell component="th">Net salary</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {payrunData.map((item, i) =>
                    <TableRow key={i}>
                      <TableCell>{item.employee}</TableCell>
                      <TableCell>{item.department}</TableCell>
                      <TableCell>{item.role}</TableCell>
                      <TableCell>{item.grossSalary}</TableCell>
                      <TableCell>{item.earnings}</TableCell>
                      <TableCell>{item.deduction}</TableCell>
                      <TableCell>{item.tax}</TableCell>
                      <TableCell>{item.netSalary}</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </CardContent>

        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handlePayrunFrom}>
            <ListItemText primary="Option 1" secondary="Option 1" />
          </MenuItem>
          <MenuItem onClick={handlePayrunTo}>
            <ListItemText primary="Option 2" secondary="Option 2" />
          </MenuItem>
        </Menu>
      </Card>

      <Card className={classes.card}>
        <CardHeader title="Actions" />
        <CardActions>
          <Button disableElevation color="primary" variant="contained" onClick={() => history.push(`${match.url}/payslip`)}>
            Send Payslips
          </Button>
          <Button disableElevation color="primary" variant="contained" onClick={() => history.push(`${match.url}/summary`)}>
            View Pay Run Summary
          </Button>
          <Button disableElevation color="primary" variant="contained">
            Pay Now
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  payrun: Selectors.makeSelectPayrunByIdData(),
  payrollSetupData: PayrollSelectors.makeSelectGetPayrollSetupData(),
});

function mapDispatchToProps(dispatch) {
  return {
    getPayrunById: data => dispatch(Actions.getPayrunById(data)),
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
)(PayrunDetails);
