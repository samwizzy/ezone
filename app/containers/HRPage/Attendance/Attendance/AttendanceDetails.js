import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  MuiPickersUtilsProvider,
  DatePicker,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Button, Table, TableRow, TableCell, TableBody, TextField, Grid, Typography } from '@material-ui/core';
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
        textTransform: 'capitalize'
      },
      '& th:nth-child(odd)': {
        backgroundColor: theme.palette.primary.main,
      },
      '& th:nth-child(even)': {
        backgroundColor: darken(theme.palette.primary.main, 0.1),
      },
    },
  },
  table: {
    textAlign: "right",
    "& td": {
      border: "0 !important",
      padding: 0,
      marginLeft: theme.spacing(1),
      display: 'inline-block',
    },
    "& td:last-child": {
      paddingRight: 0
    }
  },
  toolbar: theme.mixins.toolbar,
  icon: {
    color: theme.palette.grey[800],
    '&.approved': { color: theme.palette.primary.main},
    '&.inProgress': { color: orange[500]},
    '&.done': { color: green[500]},
  }
}));

const attendanceList = [
  {id: 1, createdAt: '2010-01-01T05:06:07', attended: '75%', absent: 'No', present: 'Yes'},
  {id: 2, createdAt: '2020-08-01T08:19:07', attended: '45%', absent: 'Yes', present: 'Yes'},
]

const AttendanceDetails = props => {
  const classes = useStyles();
  const { loading, openNewAttendanceDialog, getAttendance, getAttendanceById, attendance } = props;
  const [option, setOption] = React.useState({group: '', year: new Date, month: new Date})

  React.useEffect(() => {
  }, []);

  const handleSelectChange = () => {}
  const handleDateChange = () => {}

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
      name: 'createdAt',
      label: 'Date',
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
      name: 'attended',
      label: 'Attended',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'absent',
      label: 'Absent',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'present',
      label: 'Present',
      options: {
      filter: true,
      sort: true,
      },
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
          <Grid container>
            <Grid item xs={6}>
              <Autocomplete
                id="combo-box-demo"
                size="small"
                options={[]}
                getOptionLabel={option => option.label}
                onChange={(evt, value) => handleSelectChange(evt, value)}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Employee"
                    variant="outlined"
                    placeholder="Search"
                    margin="normal"
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Table className={classes.table} size="small">
                <TableBody>
                  <TableRow>
                    <TableCell align="right">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                          disableFuture
                          views={["year"]}
                          margin="normal"
                          inputVariant="outlined"
                          id="date-picker-dialog"
                          label="Year"
                          size="small"
                          format="yyyy"
                          value={option.year}
                          onChange={handleDateChange}
                        />
                      </MuiPickersUtilsProvider>
                    </TableCell>
                    <TableCell align="right">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                          disableFuture
                          views={["month"]}
                          margin="normal"
                          inputVariant="outlined"
                          id="date-picker-dialog"
                          label="Month"
                          size="small"
                          format="MMM"
                          value={option.month}
                          onChange={handleDateChange}
                        />
                      </MuiPickersUtilsProvider>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={12}>
          <MUIDataTable
            className={classes.datatable}
            title="Attendance List Details"
            data={attendanceList}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>
    </div>
  );
};

AttendanceDetails.propTypes = {
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
)(AttendanceDetails);
