import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { green, orange } from '@material-ui/core/colors'
import { darken } from '@material-ui/core/styles/colorManipulator';
import moment from 'moment'
import _ from 'lodash'
import MUIDataTable from 'mui-datatables'
import * as Actions from './../actions';
import * as Selectors from './../selectors';
import { AddAttendance } from '../components/AddButton'
import AddAttendanceDialog from './components/AddAttendanceDialog'

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
  toolbar: theme.mixins.toolbar,
  icon: {
    color: theme.palette.grey[800],
    '&.approved': { color: theme.palette.primary.main },
    '&.inProgress': { color: orange[500] },
    '&.done': { color: green[500] },
  }
}));

const AttendanceList = props => {
  const classes = useStyles();
  const { loading, history, match, openNewAttendanceDialog, attendances, getAttendanceById } = props;
  const orderedAttendances = _.orderBy(attendances, 'dateCreated', 'desc');
  console.log(attendances, "attendances")

  const handleRoute = id => {
    history.push(`${match.url}/${id}`);
    getAttendanceById(id);
  }

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
      name: 'date',
      label: 'Date',
      options: {
        filter: true,
        sort: true,
        customBodyRender: createdAt => createdAt ? moment(createdAt).format('ll') : ''
      }
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
      name: 'shiftName',
      label: 'Shift',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'loginTime',
      label: 'Log in time',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'logOutTime',
      label: 'Log out time',
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
    print: false,
    viewColumns: false,
    filter: false,
    customToolbar: () => <AddAttendance openDialog={openNewAttendanceDialog} />,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 25, 50, 100],
    onRowClick: (rowData, rowState) => {
      // handleRoute(rowData[0])
    },
    elevation: 0
  };

  return (
    <div className={classes.root}>
      <MUIDataTable
        className={classes.datatable}
        title="Attendance List"
        data={orderedAttendances}
        columns={columns}
        options={options}
      />

      <AddAttendanceDialog />
    </div>
  );
};

AttendanceList.propTypes = {
  loading: PropTypes.bool,
  openNewAttendanceDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  attendances: Selectors.makeSelectAttendances(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAttendanceById: (id) => dispatch(Actions.getAttendanceById(id)),
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
)(AttendanceList);
