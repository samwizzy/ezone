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
import {AddLeaveType} from '../components/AddButton'
import LeaveTypeDialog from './components/LeaveTypeDialog'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.common.white
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
    '&.approved': { color: theme.palette.primary.main},
    '&.inProgress': { color: orange[500]},
    '&.done': { color: green[500]},
  }
}));

const shifts = [
  {id: 1, name: 'General', startTime: '2010-01-01T05:06:07', endTime: '2010-01-01T05:06:07', endDate: '2010-01-01T05:06:07'}
]

const LeaveTypeList = props => {
  const classes = useStyles();
  const { loading, openNewLeaveTypeDialog, getLeaveType, getLeaveTypeById, leaveTypes } = props;

  React.useEffect(() => {
  }, []);

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
      name: 'duration',
      label: 'Duration',
      options: {
        filter: true,
        sort: true,
        customBodyRender: createdAt => {
          return (
            <Typography color='textSecondary'>{moment(createdAt).format('ll')}</Typography>
          )
        }
      }
    },
    {
      name: 'days',
      label: 'Days',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => {
          return (
            <Typography color='textSecondary'>{`${value} days`}</Typography>
          )
        }
      }
    },
    {
      name: 'createdAt',
      label: 'Date Applied',
      options: {
        filter: true,
        sort: true,
        customBodyRender: createdAt => {
          return (
            <Typography color='textSecondary'>{moment(createdAt).format('ll')}</Typography>
          )
        }
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
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'scrollMaxHeight',
    selectableRows: 'none',
    print: false,
    download: true,
    viewColumns: false,
    filter: false,
    customToolbar: () => <AddLeaveType openDialog={openNewLeaveTypeDialog} />,
    rowsPerPage: 10,
    rowsPerPageOptions: [10,25,50,100],
    onRowClick: (rowData, rowState) => {
      getLeaveTypeById(rowData[0])
    },
    elevation: 0
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        justify='space-around'
      >
        <Grid item md={12}>
          <MUIDataTable
            className={classes.datatable}
            title="Leave Types"
            data={shifts}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>

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
  leaveTypes: Selectors.makeSelectRecognitions(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLeaveType: () => dispatch(Actions.getLeaveRequest()),
    getLeaveTypeById: (uuid) => dispatch(Actions.getLeaveRequestById(uuid)),
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
