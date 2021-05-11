import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { green, orange } from '@material-ui/core/colors'
import { darken } from '@material-ui/core/styles/colorManipulator';
import MUIDataTable from 'mui-datatables'
import * as Actions from './../actions';
import * as Selectors from './../selectors';
import * as AppSelectors from '../../../App/selectors';
import { AddShift } from '../components/AddButton'
import AddShiftDialog from './components/AddShiftDialog'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.common.white
  },
  datatable: {
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

// const shifts = [
//   { id: 1, name: 'General', startTime: '2010-01-01T05:06:07', endTime: '2010-01-01T05:06:07', endDate: '2010-01-01T05:06:07' }
// ]

const ShiftList = props => {
  const classes = useStyles();
  const { loading, getShifts, shifts, openNewShiftDialog } = props;
  console.log(shifts, "shifts in list");

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
      name: 'shiftName',
      label: 'Shift name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'resumptionTime',
      label: 'Resumption time',
      options: {
        filter: true,
        sort: true,

      }
    },
    {
      name: 'closeTime',
      label: 'Close time',
      options: {
        filter: true,
        sort: true,

      }
    },
    {
      name: 'startDate',
      label: 'Start date',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'endDate',
      label: 'End date',
      options: {
        filter: true,
        sort: true,

      }
    }
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'stacked',
    selectableRows: 'none',
    print: false,
    download: true,
    viewColumns: false,
    filter: false,
    customToolbar: () => <AddShift openDialog={openNewShiftDialog} />,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 25, 50, 100],
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
            data={shifts}
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
  openNewShiftDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  user: AppSelectors.makeSelectCurrentUser(),
  shifts: Selectors.makeSelectShifts(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAttendances: () => dispatch(Actions.getAttendances()),
    getShifts: () => dispatch(Actions.getShifts()),
    openNewShiftDialog: () => dispatch(Actions.openNewShiftDialog()),
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
