import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Avatar, Button, TextField, Grid, Paper, Typography } from '@material-ui/core';
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
import { AddHoliday } from '../components/AddButton'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  datatable: {
    '& table': {
      width: '96% !important',
      margin: '4px auto',
    },
    '& tr:hover': {
      cursor: 'pointer'
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
  }
}));


const HolidaysList = props => {
  const classes = useStyles();
  const { loading, openNewHolidayDialog, getHolidays, getHolidayById, holidays } = props;

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
      label: 'Name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'date',
      label: 'Date',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'duration',
      label: 'Duration',
      options: {
        filter: true,
        sort: true,
      },
    }
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'stacked',
    selectableRows: 'none',
    viewColumns: false,
    filter: false,
    customToolbar: () => <AddHoliday openDialog={openNewHolidayDialog} />,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 25, 50, 100],
    onRowClick: (rowData, rowState) => {
      getHolidayById(rowData[0])
    },
    elevation: 0
  };

  return (
    <div className={classes.root}>
      <MUIDataTable
        className={classes.datatable}
        title="Holidays"
        data={holidays}
        columns={columns}
        options={options}
      />
    </div>
  );
};

HolidaysList.propTypes = {
  loading: PropTypes.bool,
  openNewHolidayDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  user: AppSelectors.makeSelectCurrentUser(),
  holidays: Selectors.makeSelectLeaveRequests(),
});

function mapDispatchToProps(dispatch) {
  return {
    getHolidays: () => dispatch(Actions.getLeaveRequest()),
    getHolidayById: (uuid) => dispatch(Actions.getLeaveRequestById(uuid)),
    openNewHolidayDialog: () => dispatch(Actions.openNewHolidayDialog()),
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
)(HolidaysList);
