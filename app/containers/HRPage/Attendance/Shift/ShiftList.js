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
import EditSharp from '@material-ui/icons/EditSharp';
import Assignment from '@material-ui/icons/Assignment';
import Person from '@material-ui/icons/Person';
import {AddShift} from '../components/AddButton'
import AddShiftDialog from './components/AddShiftDialog'

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

const ShiftList = props => {
  const classes = useStyles();
  const { loading, openNewAttendanceDialog, getAttendance, getAttendanceById, attendance } = props;

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
      label: 'Shift name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'startTime',
      label: 'Start time',
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
      name: 'endTime',
      label: 'End time',
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
      name: 'endDate',
      label: 'End Date',
      options: {
        filter: true,
        sort: true,
        customBodyRender: createdAt => {
          return (
            <Typography color='textSecondary'>{moment(createdAt).format('ll')}</Typography>
          )
        }
      }
    }
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'scrollMaxHeight',
    selectableRows: 'none',
    print: false,
    download: true,
    viewColumns: false,
    filter: false,
    customToolbar: () => <AddShift openDialog={openNewAttendanceDialog} />,
    rowsPerPage: 10,
    rowsPerPageOptions: [10,25,50,100],
    onRowClick: (rowData, rowState) => {
      getAttendanceById(rowData[0])
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
            title="Shifts"
            data={attendance}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>

      <AddShiftDialog />
    </div>
  );
};

ShiftList.propTypes = {
  loading: PropTypes.bool,
  openNewAttendanceDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  user: AppSelectors.makeSelectCurrentUser(),
  attendance: Selectors.makeSelectAttendance(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAttendance: () => dispatch(Actions.getAttendance()),
    getAttendanceById: (uuid) => dispatch(Actions.getAttendanceById(uuid)),
    openNewAttendanceDialog: () => dispatch(Actions.openNewAttendanceDialog()),
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
)(ShiftList);
