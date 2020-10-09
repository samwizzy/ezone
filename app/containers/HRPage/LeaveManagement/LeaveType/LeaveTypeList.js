import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button, TextField, Grid, Paper, Typography } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { createStructuredSelector } from 'reselect';
import { green, orange } from '@material-ui/core/colors'
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import moment from 'moment'
import MUIDataTable from 'mui-datatables'
import * as Actions from './../actions';
import * as Selectors from './../selectors';
import * as AppSelectors from '../../../App/selectors';
import { AddLeaveType } from '../components/AddButton'
import LeaveTypeDialog from './components/LeaveTypeDialog'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  datatable: {
    '& .MuiTableRow-root:hover': {
      cursor: 'pointer'
    },
    '& .MuiTableHead-root': {
      '& .MuiTableCell-head': {
        color: theme.palette.common.white,
      },
      '& .MuiTableCell-root:nth-child(odd)': {
        backgroundColor: theme.palette.primary.main,
      },
      '& .MuiTableCell-root:nth-child(even)': {
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
  }
}));

const LeaveTypeList = props => {
  const classes = useStyles();
  const { loading, openNewLeaveTypeDialog, getLeaveType, getLeaveTypeById, leaveTypes } = props;

  console.log(leaveTypes, "leaveTypes")

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
      name: 'name',
      label: 'Leave name',
      options: {
        filter: true,
      },
    },
    {
      name: 'id',
      label: 'Duration',
      options: {
        filter: true,
        sort: true,
        customBodyRender: id => {
          const selected = leaveTypes && leaveTypes.find(type => type.id === id)
          return moment(selected.validTill).diff(selected.validFrom, 'days', true)
        }
      }
    },
    {
      name: 'numberOfDaysFromHire',
      label: 'No. of Days From Hire',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => `${value} days`
      }
    },
    {
      name: 'leaveAllowancePercent',
      label: 'Leave Allowance ( % )',
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: 'validFrom',
      label: 'Valid From',
      options: {
        filter: true,
        sort: true,
        customBodyRender: date => date ? moment(date).format('ll') : ''
      }
    },
    {
      name: 'validTill',
      label: 'Valid Till',
      options: {
        filter: true,
        sort: true,
        customBodyRender: date => date ? moment(date).format('ll') : ''
      }
    },
    {
      name: 'dateAdded',
      label: 'Date Applied',
      options: {
        filter: true,
        sort: true,
        customBodyRender: date => date ? moment(date).format('ll') : ''
      }
    },
    {
      name: 'type',
      label: 'Leave Type',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'eligibleEmployees',
      label: 'Eligility Count',
      options: {
        filter: true,
        sort: true,
        customBodyRender: employees => employees ? employees.length : 0
      },
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'stacked',
    selectableRows: 'none',
    viewColumns: false,
    filter: false,
    customToolbar: () => <AddLeaveType openDialog={openNewLeaveTypeDialog} />,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 25, 50, 100],
    onRowClick: (rowData, rowState) => {
      getLeaveTypeById(rowData[0])
    },
    elevation: 0
  };

  return (
    <div className={classes.root}>
      <MUIDataTable
        className={classes.datatable}
        title="Leave Types"
        data={leaveTypes}
        columns={columns}
        options={options}
      />

      <LeaveTypeDialog />
    </div>
  );
};

LeaveTypeList.propTypes = {
  loading: PropTypes.bool,
  openNewLeaveTypeDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  user: AppSelectors.makeSelectCurrentUser(),
  leaveTypes: Selectors.makeSelectLeaveTypes(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLeaveTypeById: (id) => dispatch(Actions.getLeaveTypeById(id)),
    openNewLeaveTypeDialog: () => dispatch(Actions.openNewLeaveTypeDialog()),
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
)(LeaveTypeList);
