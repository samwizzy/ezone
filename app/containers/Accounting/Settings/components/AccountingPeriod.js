import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import classNames from 'classnames'
import {
  makeStyles,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Grid,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  Typography,
  Tooltip
} from '@material-ui/core';
import { green } from '@material-ui/core/colors'
import swal from 'sweetalert';
import Slide from '@material-ui/core/Slide';
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker,
  TimePicker,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import DialogOfAccountPeriod from './DialogOfAccountPeriod';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment';
import months from './../../../../utils/months';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(2, 0),
  },
  table: {
    minWidth: 200,
    whiteSpace: "nowrap",
    '& tr': {
      '& th': {
        fontWeight: theme.typography.fontWeightMedium, // 500 + 100, bold=700
      }
    },
    '& td': {
      // borderBottom: 0
    },
  },
  toolbar: {
    ...theme.mixins.toolbar,
    alignItems: 'center',
    '& svg': {
      marginRight: theme.spacing(1),
      color: theme.palette.primary.main
    }
  },
  status: {
    '&.active': { color: green[500] }
  },
  title: {
    flexGrow: 1
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const initialState = {
  orgId: "",
  startDate: moment().format('YYYY-MM-DDTHH:mm:ss'),
  year: moment().format('YYYY')
}

const AccountingPeriod = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const {
    accountingSetupData,
    accountingPeriods,
    openAccountPeriodDialog,
    setAccountPeriodAsActive,
    updateAccountPeriodStatus,
    openEditAccountPeriodDialog,
    openAccountPeriodCloseDialog
  } = props;

  const [values, setValues] = useState({ ...initialState })
  const [selectedPeriod, setSelectedPeriod] = useState({ ...initialState })

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleDateChange = name => date => {
    setValues({ ...values, [name]: moment(date).format('YYYY-MM-DDTHH:mm:ss'), year: moment(date).format('YYYY') })
  }

  useEffect(() => {

  }, [])

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedPeriod(_.find(accountingPeriods, { id }))
  };

  const handleChangeStatus = () => {
    const data = { status: !selectedPeriod.status, id: selectedPeriod.id }
    console.log(data, "data")
    updateAccountPeriodStatus(data)
    handleClose()
  }

  const handleActivatePeriod = () => {
    const data = { id: selectedPeriod.id }
    console.log(data, "data")
    setAccountPeriodAsActive(data)
    handleClose()
  }

  const currentAccountingPeriod = accountingPeriods.find(account => account.activeYear === true)

  console.log(accountingSetupData, "accountingSetupData")
  console.log(accountingPeriods, "accountingPeriods")

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Toolbar>
            <Typography variant="h5">Settings</Typography>
          </Toolbar>

          <Toolbar className={classes.toolbar}>
            <AccountTreeIcon />
            <Typography variant="h6">Accounting Period</Typography>
          </Toolbar>
          <Paper square className={classes.paper}>
            <Table className={classes.table}>
              <TableBody>
                <TableRow>
                  <TableCell component="th">Financial Year Start</TableCell>
                  <TableCell>{moment(currentAccountingPeriod.startDate).format('Do, MMM')}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Accounting Method</TableCell>
                  <TableCell>{accountingSetupData && accountingSetupData.accountMethod}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Tax Year Start</TableCell>
                  <TableCell>
                    {accountingSetupData && accountingSetupData.taxDay}
                    {accountingSetupData && accountingSetupData.taxMonth}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Tax Type</TableCell>
                  <TableCell>{accountingSetupData && accountingSetupData.taxType}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Toolbar className={classes.toolbar}>
            <EventAvailableIcon />
            <Typography variant="h6">Accounting Year</Typography>
          </Toolbar>

          <Paper square className={classes.paper}>
            <Toolbar>
              <Typography variant="subtitle1" className={classes.title} component="div">Current Accounting Year</Typography>
            </Toolbar>

            <Table className={classes.table}>
              <TableBody>
                <TableRow>
                  <TableCell component="th">Start Date</TableCell>
                  <TableCell>{moment(currentAccountingPeriod.startDate).format('ll')}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">End Date</TableCell>
                  <TableCell>{moment(currentAccountingPeriod.endDate).format('ll')}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>

          <Paper square className={classes.paper}>
            <Toolbar>
              <Typography variant="subtitle1" className={classes.title} component="div">Accounting Periods</Typography>
              <Button variant="contained" color="primary" onClick={openAccountPeriodDialog} startIcon={<AddIcon />}>
                Add Period
              </Button>
            </Toolbar>

            <Table size="small" className={classes.table}>
              <TableBody>
                {accountingPeriods && accountingPeriods.map(item => (
                  <TableRow>
                    <TableCell component="th">Account Year</TableCell>
                    <TableCell>{item.year}</TableCell>
                    <TableCell component="th">Start Date</TableCell>
                    <TableCell>{moment(item.startDate).format('ll')}</TableCell>
                    <TableCell component="th">End Date</TableCell>
                    <TableCell>{moment(item.endDate).format('ll')}</TableCell>
                    <TableCell>{item.status ? 'Open' : 'Closed'}</TableCell>
                    <TableCell>
                      {item.activeYear
                        ? <CheckCircleIcon className={classNames(classes.status, { 'active': item.activeYear })} />
                        : <CheckCircleOutlineIcon />}
                    </TableCell>
                    <TableCell component="th">
                      <IconButton
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={event => handleClick(event, item.id)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleChangeStatus}>
          Open
        </MenuItem>
        <MenuItem onClick={handleActivatePeriod}>
          Set as active
        </MenuItem>
        <MenuItem onClick={handleChangeStatus}>
          Close
        </MenuItem>
      </Menu>

      <DialogOfAccountPeriod />
    </div>
  );
};

AccountingPeriod.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  accountingSetupData: Selectors.makeSelectGetAccountingSetupData(),
  accountingPeriods: Selectors.makeSelectGetAccountingPeriods(),
});

function mapDispatchToProps(dispatch) {
  return {
    openAccountPeriodDialog: () => dispatch(Actions.openAccountPeriodDialog()),
    openEditAccountPeriodDialog: data => dispatch(Actions.openEditAccountPeriodDialog(data)),
    openAccountPeriodCloseDialog: data => dispatch(Actions.openAccountPeriodCloseDialog(data)),
    setAccountPeriodAsActive: data => dispatch(Actions.setAccountPeriodAsActive(data)),
    updateAccountPeriodStatus: data => dispatch(Actions.updateAccountPeriodStatus(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AccountingPeriod);
