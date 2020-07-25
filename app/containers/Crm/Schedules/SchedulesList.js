/* eslint-disable prettier/prettier */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  makeStyles,
  Backdrop,
  CircularProgress,
  FormControlLabel,
  Icon,
  Button,
  Typography,
} from '@material-ui/core';
import { Add, Visibility } from '@material-ui/icons';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import MUIDataTable from 'mui-datatables';
import moment from 'moment';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from './actions';
import * as Selectors from './selectors';
import LoadingIndicator from '../../../components/LoadingIndicator';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  datatable: {
    whiteSpace: "nowrap",
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  }
}));

const SchedulesList = props => {
  const classes = useStyles();

  const {
    loading,
    schedules,
    openNewScheduleDialog,
    openEditScheduleDialog,
    openScheduleDetailsDialog
  } = props;

  if (!schedules) {
    return ''
  }

  const handleScheduleEdit = data => event => {
    event.stopPropagation()
    openEditScheduleDialog(data)
  }

  console.log(schedules, "schedules list list")

  const columns = [
    {
      name: 'id',
      label: ' ',
      options: {
        display: 'excluded',
        filter: true,
      },
    },
    {
      name: 'Id',
      label: 'S/N',
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          return (
            <FormControlLabel
              label={tableMeta.rowIndex + 1}
              control={<Icon />}
            />
          );
        },
      },
    },
    {
      name: 'title',
      label: 'Title',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'createdBy',
      label: 'Created By',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'host',
      label: 'Host',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'location',
      label: 'Location',
      options: {
        filter: true,
        sort: false
      },
    },
    {
      name: 'repeatReminder',
      label: 'Reminder(min.)',
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: 'userParticipants',
      label: 'Participants (Users)',
      options: {
        filter: true,
        sort: false,
        customBodyRender: users => users.length,
      }
    },
    {
      name: 'contactParticipants',
      label: 'Participants (Contacts)',
      options: {
        filter: true,
        sort: false,
        customBodyRender: contacts => contacts.length,
      }
    },
    {
      name: 'startDate',
      label: 'Start Date',
      options: {
        filter: true,
        sort: false,
        customBodyRender: date => date ? moment(date).format('llll') : '',
      }
    },
    {
      name: 'endDate',
      label: 'End Date',
      options: {
        filter: true,
        sort: false,
        customBodyRender: date => date ? moment(date).format('llll') : '',
      }
    },
    {
      name: 'dateCreated',
      label: 'Date Created',
      options: {
        filter: true,
        sort: false,
        customBodyRender: date => date ? moment(date).format('ll') : '',
      }
    },
    {
      name: 'id',
      label: 'Action',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          const data = schedules && schedules.find(schedule => value === schedule.id);
          return (
            <Button
              color="primary"
              onClick={handleScheduleEdit(data)}
            >
              edit
            </Button>
          );
        },
      },
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'scrollMaxHeight',
    selectableRows: 'none',
    customToolbar: () => (
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<Add />}
        onClick={() => openNewScheduleDialog()}
      >
        New
      </Button>
    ),
    onRowClick: (rowData, rowState) => {
      const data = schedules && schedules.find(schedule => schedule.id === rowData[0])
      openScheduleDetailsDialog(data)
    },
    elevation: 0
  };

  return (
    <React.Fragment>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <MUIDataTable
        className={classes.datatable}
        title="Schedules List"
        data={schedules}
        columns={columns}
        options={options}
      />
    </React.Fragment>
  );
};

SchedulesList.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  schedules: Selectors.makeSelectSchedules(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewScheduleDialog: () => dispatch(Actions.openNewScheduleDialog()),
    openEditScheduleDialog: data => dispatch(Actions.openEditScheduleDialog(data)),
    openScheduleDetailsDialog: data => dispatch(Actions.openScheduleDetailsDialog(data)),
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
)(SchedulesList);
