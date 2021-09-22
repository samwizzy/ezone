import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  FormControlLabel,
  IconButton,
  Icon,
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import { AddButton } from './AddButton';

const useStyles = makeStyles(theme => ({
  root: {},
  datatable: {
    '& .MuiTableRow-root:hover': {
      cursor: 'pointer',
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
}));

const EmployeeList = props => {
  const classes = useStyles();

  const {
    loading,
    getAllEmployees,
    getPagedEmployees,
    pagedEmployees,
    openNewEmployeeDialog,
    openEditEmployeeDialog,
    openViewEmployeeDialog,
    openConfirmDeleteEmployeeDialog,
  } = props;

  const handlePageChange = (page, limit) => {
    console.log(page, 'page');
    getPagedEmployees({ limit, offset: page });
  };

  console.log(pagedEmployees, 'pagedEmployees users');

  const columns = [
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
      name: 'firstName',
      label: 'First name',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'lastName',
      label: 'Last name',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'emailAddress',
      label: 'Email address',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'phoneNumber',
      label: 'Phone number',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'gender',
      label: 'Gender',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'id',
      label: ' ',
      options: {
        filter: true,
        sort: false,
        customBodyRender: id => {
          return (
            <IconButton
              size="small"
              onClick={() => openConfirmDeleteEmployeeDialog(id)}
            >
              <Icon fontSize="small">delete_outline</Icon>
            </IconButton>
          );
        },
      },
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'stacked',
    selectableRows: 'none',
    filter: false,
    viewColumns: false,
    customToolbar: () => (
      <AddButton openNewEmployeeDialog={openNewEmployeeDialog} />
    ),
    rowsPerPage: pagedEmployees.limit,
    rowsPerPageOptions: [10, 15, 20], // 25, 50, 100
    page: pagedEmployees.page,
    count: pagedEmployees.total,
    serverSide: true,
    onTableChange: (action, tableState) => {
      console.log(action, tableState);
      if (action === 'changePage') {
        console.log('Go to page', tableState.page);
        handlePageChange(tableState.page, tableState.rowsPerPage);
      }
    },
    elevation: 0,
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <React.Fragment>
      <MUIDataTable
        className={classes.datatable}
        title="Users"
        data={pagedEmployees.entities}
        columns={columns}
        options={options}
      />
    </React.Fragment>
  );
};

EmployeeList.propTypes = {
  loading: PropTypes.bool,
  getAllEmployees: PropTypes.array,
  openNewEmployeeDialog: PropTypes.func,
  openEditEmployeeDialog: PropTypes.func,
  openViewEmployeeDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  getAllEmployees: Selectors.makeSelectGetAllEmployees(),
  pagedEmployees: Selectors.makeSelectPagedEmployees(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewEmployeeDialog: () => dispatch(Actions.openNewEmployeeDialog()),
    openEditEmployeeDialog: data =>
      dispatch(Actions.openEditEmployeeDialog(data)),
    openViewEmployeeDialog: data =>
      dispatch(Actions.openViewEmployeeDialog(data)),
    openConfirmDeleteEmployeeDialog: data =>
      dispatch(Actions.openConfirmDeleteEmployeeDialog(data)),
    getPagedEmployees: data => dispatch(Actions.getPagedEmployees(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(EmployeeList);
