import React, { memo } from 'react';
import PropTypes from 'prop-types';
import EzoneUtils from '../../../../utils/EzoneUtils';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import {
  makeStyles,
  IconButton,
  Button,
  Chip,
  Menu,
  MenuItem,
  Grid,
  Tooltip,
} from '@material-ui/core';
import classNames from 'classnames';
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import MUIDataTable from 'mui-datatables';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { green } from '@material-ui/core/colors';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import * as PayrollSelectors from '../../selectors';
import { CircleLoader } from '../../../../components/LoadingIndicator';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  datatable: {
    whiteSpace: 'nowrap',
    '& tr:hover': {
      cursor: 'pointer',
    },
    '& td': { padding: theme.spacing(1, 2) },
    '& thead': {
      '& th': {
        color: theme.palette.common.white,
      },
      '& th:nth-child(odd)': {
        backgroundColor: theme.palette.primary.main,
      },
      '& th:nth-child(even)': {
        backgroundColor: darken(theme.palette.primary.main, 0.1),
      },
    },
  },
  status: {
    '&.active': { color: green[500] },
    '&.inactive': { color: theme.status.danger },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const SalaryAdvanceList = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedSalaryAdvance, setSelectedSalaryAdvance] = React.useState(
    null,
  );

  const {
    loading,
    history,
    match,
    getSalaryAdvanceById,
    openNewSalaryAdvanceDialog,
    openEditSalaryAdvanceDialog,
    openDeleteSalaryAdvanceDialog,
    activateDeactivateSalaryAdvance,
    salaryAdvances,
  } = props;

  const handleClick = (event, id) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedSalaryAdvance(_.find(salaryAdvances, { id }));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleView = () => {
    const { id } = selectedSalaryAdvance;
    getSalaryAdvanceById(id);
    history.push(`${match.url}/${id}`);
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    openEditSalaryAdvanceDialog(selectedSalaryAdvance);
    setAnchorEl(null);
  };

  const handleRoute = id => {
    getSalaryAdvanceById(id);
    history.push(`${match.url}/${id}`);
  };

  const orderedSalaryAdvances = _.orderBy(
    salaryAdvances,
    'dateCreated',
    'desc',
  );

  if (loading) {
    return <CircleLoader />;
  }

  const columns = [
    {
      name: 'id',
      label: ' ',
      options: {
        display: 'excluded',
        filter: true,
        sort: false,
      },
    },
    {
      name: 'accountName',
      label: 'Pay period',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'accountCode',
      label: 'Ref code',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'accountNumber',
      label: 'Payment date',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'bankName',
      label: 'Employees',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'id',
      label: 'Payment',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          const salaryAdvance = salaryAdvances.find(
            account => account.id === value,
          );
          return EzoneUtils.formatCurrency(salaryAdvance.bankBalance, 'NGN');
        },
      },
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        sort: true,
        customBodyRender: status => {
          return status ? (
            <Chip
              label="Active"
              variant="outlined"
              icon={
                <CheckCircleIcon
                  className={classNames(classes.status, { active: status })}
                />
              }
            />
          ) : (
            <Chip
              label="Inactive"
              variant="outlined"
              icon={<RadioButtonUncheckedIcon />}
            />
          );
        },
      },
    },
    {
      name: 'status',
      label: 'Payment status',
      options: {
        filter: true,
        sort: true,
        customBodyRender: status => {
          return status ? (
            <Chip
              label="Active"
              variant="outlined"
              icon={
                <CheckCircleIcon
                  className={classNames(classes.status, { active: status })}
                />
              }
            />
          ) : (
            <Chip
              label="Inactive"
              variant="outlined"
              icon={<RadioButtonUncheckedIcon />}
            />
          );
        },
      },
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'stacked',
    selectableRows: 'none',
    textLabels: {
      body: {
        noMatch: 'Sorry, no salary advances found',
        toolTip: 'Sort',
        columnHeaderTooltip: column => `Sort for ${column.label}`,
      },
    },
    customToolbar: () => (
      <Tooltip title="Create salary advance">
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => openNewSalaryAdvanceDialog()}
        >
          Add salary advance
        </Button>
      </Tooltip>
    ),
    onRowClick: (rowData, rowState) => {
      handleRoute(rowData[0]);
    },
    elevation: 0,
  };

  return (
    <div className={classes.root}>
      <MUIDataTable
        className={classes.datatable}
        title="Salary advances"
        data={[]}
        columns={columns}
        options={options}
      />

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => openDeleteSalaryAdvanceDialog(selectedSalaryAdvance)}
          disabled={
            selectedSalaryAdvance &&
            Boolean(selectedSalaryAdvance.transfers.length)
          }
        >
          Delete
        </MenuItem>
        <MenuItem
          onClick={handleEditClick}
          disabled={
            selectedSalaryAdvance &&
            Boolean(selectedSalaryAdvance.transfers.length)
          }
        >
          Edit
        </MenuItem>
        <MenuItem onClick={handleView}>View</MenuItem>
      </Menu>
    </div>
  );
};

SalaryAdvanceList.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  salaryAdvances: Selectors.makeSelectSalaryAdvanceData(),
  payrollSetupData: PayrollSelectors.makeSelectGetPayrollSetupData(),
});

function mapDispatchToProps(dispatch) {
  return {
    getSalaryAdvanceById: data => dispatch(Actions.getSalaryAdvanceById(data)),
    openNewSalaryAdvanceDialog: () =>
      dispatch(Actions.openNewSalaryAdvanceDialog()),
    openEditSalaryAdvanceDialog: data =>
      dispatch(Actions.openEditSalaryAdvanceDialog(data)),
    openDeleteSalaryAdvanceDialog: data =>
      dispatch(Actions.openDeleteSalaryAdvanceDialog(data)),
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
)(SalaryAdvanceList);
