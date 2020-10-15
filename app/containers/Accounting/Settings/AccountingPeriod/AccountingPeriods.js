import React, { Fragment, memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import classNames from 'classnames';
import {
  makeStyles,
  AppBar,
  Avatar,
  Button,
  Chip,
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
  Tooltip,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import SettingsIcon from '@material-ui/icons/Settings';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import moment from 'moment';
import _ from 'lodash';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import { CircleLoader } from '../../../../components/LoadingIndicator';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginBottom: theme.spacing(1),
    boxShadow: theme.shadows[0],
  },
  table: {
    width: '100% !important',
    whiteSpace: 'nowrap',
    '& tr': {
      borderTop: `1px solid ${theme.palette.divider}`,
      '& th': {
        fontWeight: theme.typography.fontWeightBold, // 500 + 100, bold=700
      },
    },
    '& td, & th': {
      border: `1px solid ${theme.palette.divider}`,
    },
  },
  toolbar: {
    ...theme.mixins.toolbar,
    marginTop: theme.spacing(1),
    alignItems: 'center',
    '& svg, & h6': {
      marginRight: theme.spacing(1),
      color: theme.palette.primary.main,
    },
  },
  toolbarHead: {
    alignItems: 'center',
    '& .MuiAvatar-root': {
      color: theme.palette.primary.main,
      marginRight: theme.spacing(1),
      background: theme.palette.background.paper,
    },
  },
  status: {
    '&.active': { color: green[500] },
  },
  title: {
    flexGrow: 1,
  },
}));

const initialState = {
  orgId: '',
  startDate: moment().format('YYYY-MM-DDTHH:mm:ss'),
  year: moment().format('YYYY'),
};

const AccountingPeriods = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const {
    accountingSetupData,
    accountingPeriods,
    openAccountPeriodDialog,
    setAccountPeriodAsActive,
    updateAccountPeriodStatus,
    openEditAccountPeriodDialog,
    openAccountPeriodCloseDialog,
  } = props;

  const [values, setValues] = useState({ ...initialState });
  const [selectedPeriod, setSelectedPeriod] = useState({ ...initialState });

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDateChange = name => date => {
    setValues({
      ...values,
      [name]: moment(date).format('YYYY-MM-DDTHH:mm:ss'),
      year: moment(date).format('YYYY'),
    });
  };

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedPeriod(_.find(accountingPeriods, { id }));
  };

  const handleChangeStatus = () => {
    const data = { status: !selectedPeriod.status, id: selectedPeriod.id };
    updateAccountPeriodStatus(data);
    handleClose();
  };

  const handleActivatePeriod = () => {
    const data = { id: selectedPeriod.id };
    setAccountPeriodAsActive(data);
    handleClose();
  };

  if (!accountingSetupData || !accountingPeriods) {
    return <CircleLoader />;
  }

  const currentAccountingPeriod = _.find(accountingPeriods, { activeYear: true })

  console.log(accountingSetupData, 'accountingSetupData');
  console.log(accountingPeriods, 'accountingPeriods');

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <AppBar color="inherit" position="static" elevation={1}>
            <Toolbar variant="dense" className={classes.toolbarHead}>
              <Avatar><SettingsIcon /></Avatar>
              <Typography variant="h5">Settings</Typography>
            </Toolbar>
          </AppBar>

          <Toolbar variant="dense" className={classes.toolbar}>
            <Typography variant="h6" className={classes.title}>
              Accounting Period
            </Typography>
          </Toolbar>

          <Paper square className={classes.paper}>
            <Table className={classes.table}>
              <TableBody>
                <TableRow>
                  <TableCell component="th">Financial Year Start</TableCell>
                  <TableCell>
                    {moment(currentAccountingPeriod.startDate).format('Do, MMM')}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Accounting Method</TableCell>
                  <TableCell>
                    {accountingSetupData && accountingSetupData.accountMethod}
                  </TableCell>
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
                  <TableCell>
                    {accountingSetupData && accountingSetupData.taxType}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Toolbar variant="dense">
            <Chip label="Current Financial Year" variant="outlined" icon={<EventAvailableIcon />} />
            <Typography variant="h6" className={classes.title} />
          </Toolbar>

          <Paper square className={classes.paper}>
            <Table className={classes.table}>
              <TableBody>
                <TableRow>
                  <TableCell component="th">Start Date</TableCell>
                  <TableCell>
                    {moment(currentAccountingPeriod.startDate).format('ll')}
                  </TableCell>
                  <TableCell component="th">End Date</TableCell>
                  <TableCell>
                    {moment(currentAccountingPeriod.endDate).format('ll')}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>

          <Paper square className={classes.paper}>
            <Toolbar variant="dense">
              <Typography variant="h6" className={classes.title}>
                Financial Years
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={openAccountPeriodDialog}
                startIcon={<AddIcon />}
              >
                Add Period
              </Button>
            </Toolbar>

            <Table size="small" className={classes.table}>
              <TableBody>
                {accountingPeriods &&
                  accountingPeriods.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell component="th">Account Year</TableCell>
                      <TableCell>{item.year}</TableCell>
                      <TableCell component="th">Start Date</TableCell>
                      <TableCell>
                        {moment(item.startDate).format('ll')}
                      </TableCell>
                      <TableCell component="th">End Date</TableCell>
                      <TableCell>{moment(item.endDate).format('ll')}</TableCell>
                      <TableCell>{item.status ? 'Open' : 'Closed'}</TableCell>
                      <TableCell>
                        {item.activeYear
                          ? <CheckCircleIcon className={classNames(classes.status, { active: item.activeYear })} />
                          : <RadioButtonUncheckedIcon />
                        }
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
        <MenuItem
          onClick={handleChangeStatus}
          disabled={selectedPeriod && selectedPeriod.status}
        >
          Open
        </MenuItem>
        <MenuItem
          onClick={handleActivatePeriod}
          disabled={selectedPeriod && selectedPeriod.activeYear}
        >
          Set as active
        </MenuItem>
        <MenuItem
          onClick={handleChangeStatus}
          disabled={selectedPeriod && !selectedPeriod.status}
        >
          Close
        </MenuItem>
      </Menu>
    </div>
  );
};

AccountingPeriods.propTypes = {};

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
)(AccountingPeriods);
