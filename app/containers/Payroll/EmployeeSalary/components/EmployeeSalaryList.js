import React, { memo, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import EzoneUtils from '../../../../utils/EzoneUtils'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { makeStyles, IconButton, Button, Chip, Menu, MenuItem, Tooltip } from '@material-ui/core';
import { CircleLoader } from '../../../../components/LoadingIndicator';
import AddIcon from '@material-ui/icons/Add';
import classNames from 'classnames';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MUIDataTable from 'mui-datatables';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { green } from '@material-ui/core/colors';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import * as PayrollSelectors from '../../selectors';
import { initialState } from './EmployeeSalaryDialog'
import { AddSalary } from './AddButton'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  datatable: {
    '& table': {
      width: '96% !important',
      margin: '4px auto',
    },
    whiteSpace: 'nowrap',
    '& tr:hover': {
      cursor: 'pointer',
    },
    '& tbody': {
      '& td': {
        padding: theme.spacing(1, 2),
      },
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
  status: {
    '&.active': { color: green[500] },
  },
}));

const defEmployeeSalaries = [
  { id: 1, employeeName: 'Joy essien', employeeID: '1075087', department: 'UI/UX', amount: 50000, status: true }
]

const EmployeeSalaryList = props => {
  const classes = useStyles(props);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEmployeeSalary, setSelectedEmployeeSalary] = useState(null);

  const {
    loading,
    history,
    match,
    openNewEmployeeSalaryDialog,
    updateEmployeeSalary,
    openDeleteEmployeeSalaryDialog,
    openEditEmployeeSalaryDialog,
    employeeSalaries,
    payrollSetupData,
    getEmployeeSalaryById,
  } = props;

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedEmployeeSalary(_.find(employeeSalaries, { id }));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleView = () => {
    const { id } = selectedEmployeeSalary;
    getEmployeeSalaryById(id);
    history.push(`${match.url}/${id}`);
    handleClose();
  };

  const handleEditClick = () => {
    openEditEmployeeSalaryDialog(selectedEmployeeSalary);
    handleClose();
  };

  const handleDeleteClick = () => {
    openDeleteEmployeeSalaryDialog(selectedEmployeeSalary);
    handleClose();
  };

  const handleTerminateClick = () => {
    openNewEmployeeSalaryDialog();
    handleClose();
  };

  const orderedEmployeeSalaries = _.orderBy(employeeSalaries, 'dateCreated', 'desc');

  if (loading) {
    return <CircleLoader />;
  }

  const columns = [
    {
      name: 'id',
      label: ' ',
      options: {
        display: 'excluded',
        filter: true,
        sort: false,
      },
    },
    {
      name: 'employeeName',
      label: 'Employee Name ',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'employeeID',
      label: 'Employee ID',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'department',
      label: 'Department',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'amount',
      label: 'Salary Amount',
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
        customBodyRender: value => {
          return value
            ? <Chip label="Active" variant="outlined" icon={<CheckCircleIcon className={classNames(classes.status, { active: value })} />} />
            : <Chip label="Inactive" variant="outlined" icon={<RadioButtonUncheckedIcon />} />
        },
      },
    },
    {
      name: 'id',
      label: ' ',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => (
          <IconButton onClick={event => handleClick(event, value)}>
            <MoreVertIcon />
          </IconButton>
        ),
      },
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'stacked',
    selectableRows: 'none',
    filter: false,
    viewColumns: false,
    customToolbar: () => <AddSalary openDialog={() => history.push(`${match.url}/new`)} />,
    elevation: 0,
  };

  return (
    <div className={classes.root}>
      <MUIDataTable
        className={classes.datatable}
        title="Employee Salary"
        data={defEmployeeSalaries}
        columns={columns}
        options={options}
      />

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleEditClick}>Edit</MenuItem>
        <MenuItem onClick={handleView}>View</MenuItem>
        <MenuItem onClick={handleTerminateClick}>Terminate</MenuItem>
        <MenuItem
          onClick={handleDeleteClick}
          disabled={selectedEmployeeSalary && Boolean(selectedEmployeeSalary.entries.length)}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

EmployeeSalaryList.propTypes = {
  loading: PropTypes.bool,
  openNewEmployeeSalaryDialog: PropTypes.func,
  openEditEmployeeSalaryDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  employeeSalaries: Selectors.makeSelectGetEmployeeSalariesData(),
  payrollSetupData: PayrollSelectors.makeSelectGetPayrollSetupData(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewEmployeeSalaryDialog: () => dispatch(Actions.openNewEmployeeSalaryDialog()),
    updateEmployeeSalary: data => dispatch(Actions.updateEmployeeSalary(data)),
    openDeleteEmployeeSalaryDialog: data => dispatch(Actions.openDeleteEmployeeSalaryDialog(data)),
    openEditEmployeeSalaryDialog: data => dispatch(Actions.openEditEmployeeSalaryDialog(data)),
    getEmployeeSalaryById: data => dispatch(Actions.getEmployeeSalaryById(data)),
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
)(EmployeeSalaryList);
