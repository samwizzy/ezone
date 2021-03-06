import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import EzoneUtils from '../../../../utils/EzoneUtils';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { createStructuredSelector } from 'reselect';
import { green, orange } from '@material-ui/core/colors';
import { darken } from '@material-ui/core/styles/colorManipulator';
import moment from 'moment';
import MUIDataTable from 'mui-datatables';
import * as Actions from './../../actions';
import * as Selectors from './../../selectors';
import * as AppSelectors from '../../../../App/selectors';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  datatable: {
    '& table': {
      width: '96% !important',
      margin: '4px auto',
    },
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

const EmployeeShiftList = props => {
  const classes = useStyles();
  const {
    loading,
    employees,
    shifts,
    employeeShifts,
    openNewEmployeeShiftDialog,
    getUsersByShift,
  } = props;
  const [shift, setShift] = React.useState('');

  const selectUsersByShift = (event, obj) => {
    setShift(obj.id);
    getUsersByShift(obj.id);
  };

  console.log(employeeShifts, 'employeeShifts');

  const usersOnShifts =
    employeeShifts && employeeShifts.length > 0 ? employeeShifts : employees;

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
      name: 'id',
      label: 'Name',
      options: {
        filter: true,
        sort: true,
        customBodyRender: id => {
          const emp = employees && employees.find(e => e.id == id);
          return (
            <span>
              {`${EzoneUtils.toTitleCase(emp.firstName)}
                ${EzoneUtils.toTitleCase(emp.lastName)}`}
            </span>
          );
        },
      },
    },
    {
      name: 'id',
      label: 'Shift',
      options: {
        filter: true,
        sort: true,
        customBodyRender: id => {
          const emp = employees && employees.find(e => e.id == id);
          return (
            emp.workShift && (
              <span>{`${EzoneUtils.toTitleCase(
                emp.workShift.shiftName,
              )}`}</span>
            )
          );
        },
      },
    },
    {
      name: 'id',
      label: 'Duration',
      options: {
        filter: true,
        sort: true,
        customBodyRender: id => {
          const emp = employees && employees.find(e => e.id == id);
          return (
            emp.workShift && (
              <span>{`${EzoneUtils.toTitleCase(emp.workShift.endDate)}`}</span>
            )
          );
        },
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
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 25, 50, 100],
    onRowClick: (rowData, rowState) => {},
    elevation: 0,
  };

  return (
    <div className={classes.root}>
      <MUIDataTable
        className={classes.datatable}
        title="Employee Shifts"
        data={employeeShifts}
        columns={columns}
        options={options}
      />
    </div>
  );
};

EmployeeShiftList.propTypes = {
  loading: PropTypes.bool,
  openNewEmployeeShiftDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  user: AppSelectors.makeSelectCurrentUser(),
  employees: Selectors.makeSelectEmployees(),
  employeeShifts: Selectors.makeSelectEmployeeShifts(),
  shifts: Selectors.makeSelectShifts(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewEmployeeShiftDialog: () =>
      dispatch(Actions.openNewEmployeeShiftDialog()),
    getUsersByShift: id => dispatch(Actions.getUsersByShift(id)),
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
)(EmployeeShiftList);
