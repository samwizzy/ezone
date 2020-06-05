import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button, ButtonGroup, TableContainer, Table, TableRow, TableCell, TableBody, TextField, Grid, Paper, Typography } from '@material-ui/core';
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
import {AddAttendance} from '../components/AddButton'
import AddAttendanceDialog from './components/AddAttendanceDialog'

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
  toolbar: theme.mixins.toolbar,
  icon: {
    color: theme.palette.grey[800],
    '&.approved': { color: theme.palette.primary.main},
    '&.inProgress': { color: orange[500]},
    '&.done': { color: green[500]},
  }
}));

function YourCustomRowComponent(props) {
  const { id, createdAt, attended, absent, present } = props;

  return (
    <div>
      <h1>
        {createdAt}
      </h1>
      <div>
        Attended: {attended} <br/>
        Absent: {absent} <br/>
        Present: {present}
      </div>
    </div>
  );
}

const attendanceList = [
  {id: 1, createdAt: '2010-01-01T05:06:07', attended: '75%', absent: 'No', present: 'Yes'},
  {id: 2, createdAt: '2020-08-01T08:19:07', attended: '45%', absent: 'Yes', present: 'Yes'},
]

const AttendanceList = props => {
  const classes = useStyles();
  const { loading, openNewAttendanceDialog, getAttendances, attendances, getAttendanceById } = props;
  console.log(attendances, "attendances")
  
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
      name: 'dateCreated',
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
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        sort: true,
        // customHeadRender: (columnMeta, updateDirection) => (
        //   <th key={2} onClick={() => updateDirection(2)} style={{ cursor: 'pointer' }}>
        //     {columnMeta.name}
        //   </th>
        // )
      },
    },
    {
      name: 'shift',
      label: 'Shift',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'logInTime',
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
    responsive: 'scrollMaxHeight',
    selectableRows: 'none',
    print: false,
    download: true,
    viewColumns: false,
    filter: false,
    customToolbar: () => <AddAttendance openDialog={openNewAttendanceDialog} />,
    rowsPerPage: 10,
    rowsPerPageOptions: [10,25,50,100],
    onRowClick: (rowData, rowState) => {
      getAttendanceById(rowData[0])
    },
    // customRowRender: data => {
    //   const [ id, createdAt, attended, absent, present ] = data;
          
    //   return (
    //     <tr key={createdAt.props.children}>
    //       <td colSpan={4} style={{ paddingTop: "10px"}}>
    //         <YourCustomRowComponent
    //           createdAt={createdAt}
    //           attended={attended}
    //           absent={absent}
    //           present={present}
    //         />
    //       </td>
    //     </tr>
    //   );
    // },
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
            title="Attendance List"
            data={attendanceList}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>

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
  user: AppSelectors.makeSelectCurrentUser(),
  attendances: Selectors.makeSelectAttendance(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAttendances: () => dispatch(Actions.getAttendances()),
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
)(AttendanceList);
