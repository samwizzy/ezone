import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import EzoneUtils from '../../../../utils/EzoneUtils';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import {
  makeStyles,
  Button,
  Chip,
  Menu,
  MenuItem,
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

const payrunsData = [
  {
    id: 1,
    payPeriod: '2020',
    refCode: '#AD9730BG',
    payment: '200000',
    paymentDate: '2020-10-23',
    employees: 'Samuel',
    status: true,
  },
];

const PayrunsList = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPayrun, setSelectedPayrun] = useState(null);

  const {
    loading,
    history,
    match,
    payrollSetupData,
    getPayrunById,
    openNewPayrunDialog,
    openEditPayrunDialog,
    openDeletePayrunDialog,
    activateDeactivatePayrun,
    payruns,
  } = props;

  const handleClick = (event, id) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedPayrun(_.find(payruns, { id }));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleActivateDeactivatePayrun = () => {
    const data = {
      id: selectedPayrun.id,
      status: !selectedPayrun.status,
    };
    activateDeactivatePayrun(data);
    setAnchorEl(null);
  };

  const handleView = () => {
    const { id } = selectedPayrun;
    getPayrunById(id);
    history.push(`${match.url}/view/${id}`);
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    openEditPayrunDialog(selectedPayrun);
    setAnchorEl(null);
  };

  const handleRoute = id => {
    getPayrunById(id);
    history.push(`${match.url}/view/${id}`);
  };

  const orderedPayruns = _.orderBy(payruns, 'dateCreated', 'desc');

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
      name: 'payPeriod',
      label: 'Pay period',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'refCode',
      label: 'Ref code',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'paymentDate',
      label: 'Payment date',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'employees',
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
          const payrun = payrunsData.find(payrun => payrun.id === value);
          return EzoneUtils.formatCurrency(payrun.payment, 'NGN');
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
        noMatch: 'Sorry, no payruns found',
        toolTip: 'Sort',
        columnHeaderTooltip: column => `Sort for ${column.label}`,
      },
    },
    customToolbar: () => (
      <Tooltip title="Create new payrun">
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => history.push(`${match.url}/new`)}
        >
          Add Pay Run
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
        title="Pay runs"
        data={payrunsData}
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
          onClick={handleActivateDeactivatePayrun}
          disabled={selectedPayrun && !Boolean(selectedPayrun.transfers.length)}
        >
          {selectedPayrun && selectedPayrun.status ? 'Deactivate' : 'Activate'}
        </MenuItem>
        <MenuItem
          onClick={() => openDeletePayrunDialog(selectedPayrun)}
          disabled={selectedPayrun && Boolean(selectedPayrun.transfers.length)}
        >
          Delete
        </MenuItem>
        <MenuItem
          onClick={handleEditClick}
          disabled={selectedPayrun && Boolean(selectedPayrun.transfers.length)}
        >
          Edit
        </MenuItem>
        <MenuItem onClick={handleView}>View</MenuItem>
      </Menu>
    </div>
  );
};

PayrunsList.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  payruns: Selectors.makeSelectPayrunData(),
  payrollSetupData: PayrollSelectors.makeSelectGetPayrollSetupData(),
});

function mapDispatchToProps(dispatch) {
  return {
    getPayrunById: data => dispatch(Actions.getPayrunById(data)),
    openNewPayrunDialog: () => dispatch(Actions.openNewPayrunDialog()),
    openEditPayrunDialog: data => dispatch(Actions.openEditPayrunDialog(data)),
    openDeletePayrunDialog: data =>
      dispatch(Actions.openDeletePayrunDialog(data)),
    activateDeactivatePayrun: data =>
      dispatch(Actions.activateDeactivatePayrun(data)),
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
)(PayrunsList);
