import React, { memo } from 'react';
import PropTypes from 'prop-types';
import EzoneUtils from '../../../../utils/EzoneUtils';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { green, orange } from '@material-ui/core/colors';
import { darken } from '@material-ui/core/styles/colorManipulator';
import moment from 'moment';
import MUIDataTable from 'mui-datatables';
import * as Actions from './../actions';
import * as Selectors from './../selectors';
import * as AppSelectors from '../../../App/selectors';
import { AddLeaveRequest } from '../components/AddButton';
import LeaveRequestDialog from './components/LeaveRequestDialog';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  datatable: {
    '& tr:hover': {
      cursor: 'pointer',
    },
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
  toolbar: theme.mixins.toolbar,
  icon: {
    color: theme.palette.grey[800],
    '&.approved': { color: theme.palette.primary.main },
    '&.inProgress': { color: orange[500] },
    '&.done': { color: green[500] },
  },
}));

const LeaveRequestList = props => {
  const classes = useStyles();
  const {
    loading,
    openNewLeaveRequestDialog,
    getLeaveRequest,
    getLeaveRequestById,
    leaveRequests,
  } = props;

  console.log(leaveRequests, 'leaveRequests');

  const columns = [
    {
      name: 'id',
      label: 'Id',
      options: {
        display: 'excluded',
        filter: true,
      },
    },
    {
      name: 'employeeName',
      label: 'Employee',
      options: {
        filter: true,
      },
    },
    {
      name: 'leaveTypeName',
      label: 'Leave type',
      options: {
        filter: true,
      },
    },
    {
      name: 'noOfDays',
      label: 'No. of days',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'leaveAllowance',
      label: 'Leave allowance',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => EzoneUtils.formatCurrency(value),
      },
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'addedBy',
      label: 'Added by',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'dateAdded',
      label: 'Date applied',
      options: {
        filter: true,
        sort: true,
        customBodyRender: createdAt =>
          createdAt ? moment(createdAt).format('ll') : '',
      },
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'stacked',
    selectableRows: 'none',
    print: false,
    download: true,
    viewColumns: false,
    filter: false,
    customToolbar: () => (
      <AddLeaveRequest openDialog={openNewLeaveRequestDialog} />
    ),
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 25, 50, 100],
    onRowClick: (rowData, rowState) => {
      getLeaveRequestById(rowData[0]);
    },
    elevation: 0,
  };

  return (
    <div className={classes.root}>
      <MUIDataTable
        className={classes.datatable}
        title="Leave requests"
        data={leaveRequests}
        columns={columns}
        options={options}
      />

      <LeaveRequestDialog />
    </div>
  );
};

LeaveRequestList.propTypes = {
  loading: PropTypes.bool,
  openNewLeaveRequestDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  user: AppSelectors.makeSelectCurrentUser(),
  leaveRequests: Selectors.makeSelectLeaveRequests(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLeaveRequest: () => dispatch(Actions.getLeaveRequest()),
    getLeaveRequestById: uuid => dispatch(Actions.getLeaveRequestById(uuid)),
    openNewLeaveRequestDialog: () =>
      dispatch(Actions.openNewLeaveRequestDialog()),
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
)(LeaveRequestList);
