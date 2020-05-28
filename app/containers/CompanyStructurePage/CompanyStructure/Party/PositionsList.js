/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Backdrop,
  CircularProgress,
  makeStyles,
  Button,
  FormControlLabel,
  Icon,
  Typography,
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Add from '@material-ui/icons/Add';
import { darken } from '@material-ui/core/styles/colorManipulator';
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import PositionDialog from './components/PositionDialog';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
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
  breadcrumbs: {
    padding: theme.spacing(2, 0),
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const PositionsList = props => {
  const classes = useStyles();
  const {
    getAllTagsAction,
    openEditPositionDialogAction,
    openEditPartiesDialogAction,
    dispatchOpenNewPositionAction,
    dispatchGetAllUsersAction,
    dispatchGetPartyGroups,
    getSelectedPosition,
    partyGroupData,
    dispatchOpenNewPartyGroupAction,
    dispatchOpenNewPartiesAction,
    loading,
    positions,
    selectedPosition,
    match,
  } = props;

  const { params } = match;
  // console.log(positions, 'positions from positionlist');
  // console.log(selectedPosition, 'selectedPosition from positionlist');

  useEffect(() => {
    dispatchGetPartyGroups();
    dispatchGetAllUsersAction();
    getAllTagsAction();
  }, []);

  const handleRoute = positionId => {
    // console.log(positions, 'positions handleroute');
    const positionFound =
      positions &&
      positions.find(position => position.id === parseInt(positionId, 10));
    getSelectedPosition(positionFound);
    props.history.push(
      `/organization/company/structure/${params.groupId}/party/${
        params.partyId
      }/position/${positionId}`,
    );
  };

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
      name: 'Id',
      label: 'S/N',
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          if (value === '') {
            return '';
          }
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
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'employees',
      label: 'No of Employees',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => (
          <Typography>{value && value.length}</Typography>
        ),
      },
    },
    {
      name: 'id',
      label: 'Action',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          const selected = positions.find(position => position.id === value);
          return (
            <div>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                onClick={event => (event.stopPropagation(), openEditPositionDialogAction(selected))}
              >
                Edit
              </Button>
            </div>
          );
        },
      },
    },
    {
      name: 'id',
      label: 'Action',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          const selected = positions.find(position => position.id === value);
          return (
            <div>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                onClick={event => (event.stopPropagation(), handleRoute(value))}
              >
                View
              </Button>
            </div>
          );
        },
      },
    },
  ];

  const options = {
    filter: false,
    print: false,
    viewColumns: false,
    filterType: 'checkbox',
    responsive: 'scrollMaxHeight',
    selectableRows: 'none',
    customToolbar: () => (
      <Button
        variant="contained"
        color="primary"
        style={{ marginLeft: 5 }}
        size="small"
        startIcon={<Add />}
        onClick={() => dispatchOpenNewPositionAction()}
      >
        New Position
      </Button>
    ),
    textLabels: {
      body: {
        noMatch: 'Sorry, no matching positions found',
        toolTip: 'Sort',
        columnHeaderTooltip: column => `Sort for ${column.label}`,
      },
    },
    // onRowClick: (rowData, rowState) => {
    //   handleRoute(rowData[0]);
    // },
    elevation: 0,
  };

  return (
    <React.Fragment>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <MUIDataTable
        className={classes.datatable}
        title="All Positions"
        data={positions}
        columns={columns}
        options={options}
      />

      <PositionDialog params={params} />
    </React.Fragment>
  );
};

PositionsList.propTypes = {
  dispatchGetPartyGroups: PropTypes.func,
  dispatchGetAllUsersAction: PropTypes.func,
  loading: PropTypes.bool,
  dispatchOpenNewPartyGroupAction: PropTypes.func,
  dispatchOpenNewPositionAction: PropTypes.func,
  dispatchOpenNewPartiesAction: PropTypes.func,
  openNewRoleDialog: PropTypes.func,
  partyGroupData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  DispatchgetSelectedPartyGroupAction: PropTypes.func,
  selectedPartyGroupData: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  allPositions: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  openEditPartiesDialogAction: PropTypes.func,
  openEditPositionDialogAction: PropTypes.func,
  getAllTagsAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  partyGroupData: Selectors.makeSelectPartyGroupData(),
  selectedPartyGroupData: Selectors.makeSelectSelectedPartyGroupData(),
  allPositions: Selectors.makeSelectGetAllPositions(),
  selectedPosition: Selectors.makeSelectSelectedPosition(),
  allTags: Selectors.makeSelectGetAllTags(),
});

function mapDispatchToProps(dispatch) {
  return {
    openEditPartiesDialogAction: evt =>
      dispatch(Actions.openEditPartiesDialog(evt)),
    openEditPositionDialogAction: evt =>
      dispatch(Actions.openEditPositionDialog(evt)),
    dispatchOpenNewPositionAction: () =>
      dispatch(Actions.openNewPositionDialog()),
    dispatchOpenNewPartiesAction: () =>
      dispatch(Actions.openNewPartiesDialog()),
    DispatchgetSelectedPartyGroupAction: evt =>
      dispatch(Actions.getSelectedPartyGroupAction(evt)),
    getSelectedPosition: evt => dispatch(Actions.getSelectedPosition(evt)),
    dispatchGetPartyGroups: () => dispatch(Actions.getPartyGroupAction()),
    dispatchGetAllUsersAction: () => dispatch(Actions.getAllUsers()),
    getAllTagsAction: () => dispatch(Actions.getAllTags()),
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
)(PositionsList);
