import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { IconButton, Icon } from '@material-ui/core';
import { green, orange } from '@material-ui/core/colors';
import { darken } from '@material-ui/core/styles/colorManipulator';
import moment from 'moment';
import MUIDataTable from 'mui-datatables';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import * as AppSelectors from '../../App/selectors';
import { AddPosition } from '../components/AddButton';
import PositionDialog from './components/PositionDialog';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  datatable: {
    '& tr:hover': {
      cursor: 'auto',
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
  content: {
    flexGrow: 1,
  },
  gridRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: theme.spacing(2, 1),
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    width: 14,
    height: 14,
    color: theme.palette.grey[800],
    '&.approved': { color: theme.palette.primary.main },
    '&.inProgress': { color: orange[500] },
    '&.done': { color: green[500] },
  },
  buttonGroup: {
    marginBottom: theme.spacing(1),
    '& .MuiButtonGroup-root:last-child': {
      marginLeft: '10px',
    },
  },
}));

const PositionList = props => {
  const classes = useStyles();
  const {
    loading,
    openNewPositionDialog,
    openEditPositionDialog,
    positions,
  } = props;

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
      name: 'dateCreated',
      label: 'Created',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => moment(value).format('lll'),
      },
    },
    {
      name: 'description',
      label: 'Description',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'employeeCount',
      label: 'Employees',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'id',
      label: ' ',
      options: {
        filter: true,
        sort: true,
        customBodyRender: id => {
          const selectedPosition = positions.find(p => p.id === id);
          return (
            <IconButton
              size="small"
              onClick={() => openEditPositionDialog(selectedPosition)}
            >
              <Icon>edit</Icon>
            </IconButton>
          );
        },
      },
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'stacked',
    selectableRows: 'single',
    print: false,
    download: true,
    viewColumns: false,
    filter: false,
    customToolbar: () => <AddPosition openDialog={openNewPositionDialog} />,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 25, 50, 100],
    onRowClick: (rowData, rowState) => {},
    elevation: 0,
  };

  console.log(positions, 'get positions');

  return (
    <div className={classes.root}>
      <MUIDataTable
        className={classes.datatable}
        title="Positions"
        data={positions}
        columns={columns}
        options={options}
      />

      <PositionDialog />
    </div>
  );
};

PositionList.propTypes = {
  loading: PropTypes.bool,
  openNewPositionDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  employees: Selectors.makeSelectEmployees(),
  positions: Selectors.makeSelectPositions(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewPositionDialog: () => dispatch(Actions.openNewPositionDialog()),
    openEditPositionDialog: data =>
      dispatch(Actions.openEditPositionDialog(data)),
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
)(PositionList);
