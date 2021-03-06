/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  Backdrop,
  CircularProgress,
  makeStyles,
  ListItem,
  Grid,
  Button,
  FormControlLabel,
  Icon,
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Add from '@material-ui/icons/Add';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import saga from '../../saga';
import reducer from '../../reducer';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import PartiesDialog from './PartiesDialog';
import PositionDialog from './PositionDialog';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    '& :hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
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
  partyButton: {
    float: 'right',
    marginLeft: '10px',
  },
  header: {
    padding: theme.spacing(1.5, 0),
  },
  head: {
    textAlign: 'center',
  },
  table: {
    margin: theme.spacing(1),
  },
  marginButton: {
    margin: theme.spacing(1),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const NoPartyGroup = props => {
  const classes = useStyles();
  const { dispatchOpenNewPartyGroupAction } = props;

  return (
    <React.Fragment>
      <Grid container justify="space-between" className={classes.header}>
        <Grid item />
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            className={classes.partyButton}
            onClick={() => dispatchOpenNewPartyGroupAction()}
          >
            <Add /> Create Party Group
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

NoPartyGroup.propTypes = {
  dispatchOpenNewPartyGroupAction: PropTypes.func,
};

const PartyPage = props => {
  useInjectReducer({ key: 'companyStructurePage', reducer });
  useInjectSaga({ key: 'companyStructurePage', saga });

  const {
    getAllTagsAction,
    openEditPositionDialogAction,
    openEditPartiesDialogAction,
    dispatchOpenNewPositionAction,
    dispatchGetAllUsersAction,
    dispatchGetPartyGroups,
    partyGroupData,
    dispatchOpenNewPartyGroupAction,
    dispatchOpenNewPartiesAction,
    loading,
    match,
  } = props;

  const { params } = match;

  useEffect(() => {
    dispatchGetPartyGroups();
    dispatchGetAllUsersAction();
    getAllTagsAction();
  }, []);
  const classes = useStyles();

  // if (loading) {
  //   return <LoadingIndicator />;
  // }

  let party;
  if (partyGroupData) {
    for (let i = 0; i < partyGroupData.length; i++) {
      if (partyGroupData[i].id == params.partyGroupId) {
        for (let k = 0; k < partyGroupData[i].parties.length; k++) {
          if (partyGroupData[i].parties[k].id == params.partyId) {
            party = partyGroupData[i].parties[k];
          }
        }
      }
    }
  }

  if (!party) {
    return <LoadingIndicator />;
  }

  if (!partyGroupData.length) {
    return (
      <NoPartyGroup
        dispatchOpenNewPartyGroupAction={dispatchOpenNewPartyGroupAction}
      />
    );
  }

  const columns1 = [
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
      label: 'Party Name',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'tag.name',
      label: 'Tag',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'id',
      label: 'Action',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          const par = party.parties.find(part => value === part.id);
          return (
            <Button
              variant="outlined"
              size="small"
              color="primary"
              className={classes.marginButton}
              onClick={() => openEditPartiesDialogAction(par)}
            >
              Edit
            </Button>
          );
        },
      },
    },
  ];

  const options1 = {
    filter: false,
    print: false,
    viewColumns: false,
    filterType: 'checkbox',
    responsive: 'scrollMaxHeight',
    selectableRows: 'none',
    customToolbar: () => (
      <Button
        variant="contained"
        style={{ marginLeft: 5 }}
        color="primary"
        size="small"
        startIcon={<Add />}
        onClick={() => dispatchOpenNewPartiesAction()}
      >
        New Party
      </Button>
    ),
    elevation: 0,
  };

  const columns2 = [
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
      label: 'Party Name',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'id',
      label: 'Action',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          // if (party && party.positions) {
          const positions = party.positions.find(posi => value === posi.id);
          return (
            <div>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                className={classes.marginButton}
                onClick={() => openEditPositionDialogAction(positions)}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                className={classes.marginButton}
                href={`/organization/company/structure/position/${
                  params.partyGroupId
                }/${params.partyId}/${value}`}
              >
                View
              </Button>
            </div>
          );
          // }
        },
      },
    },
  ];

  const options2 = {
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
    elevation: 0,
  };

  return (
    <React.Fragment>
      <Grid container spacing={0}>
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Grid item xs={12}>
          <div className={classes.table}>
            {party && party.parties && (
              <MUIDataTable
                className={classes.datatable}
                // title={`All ${selectedPartyGroupData.name} Parties`}
                title="All Parties"
                data={party.parties}
                columns={columns1}
                options={options1}
              />
            )}
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.table}>
            {party && party.positions && (
              <MUIDataTable
                className={classes.datatable}
                // title={`All ${selectedPartyGroupData.name} Positions`}
                title="All Positions"
                data={party.positions}
                columns={columns2}
                options={options2}
              />
            )}
          </div>
        </Grid>
      </Grid>

      <PositionDialog params={params} />
      <PartiesDialog params={params} />
    </React.Fragment>
  );
};

PartyPage.propTypes = {
  dispatchGetPartyGroups: PropTypes.func,
  dispatchGetAllUsersAction: PropTypes.func,
  loading: PropTypes.bool,
  dispatchOpenNewPartyGroupAction: PropTypes.func,
  dispatchOpenNewPositionAction: PropTypes.func,
  dispatchOpenNewPartiesAction: PropTypes.func,
  openNewRoleDialog: PropTypes.func,
  // partyGroupData: PropTypes.oneOfType(PropTypes.array),
  partyGroupData: PropTypes.array,
  DispatchgetSelectedPartyGroupAction: PropTypes.func,
  selectedPartyGroupData: PropTypes.object,
  allPositions: PropTypes.object,
  openEditPartiesDialogAction: PropTypes.func,
  openEditPositionDialogAction: PropTypes.func,
  getAllTagsAction: PropTypes.func,
  // selectedPartyGroupData: PropTypes.oneOfType(PropTypes.object, PropTypes.bool),
  // allPositions: PropTypes.oneOfType(PropTypes.object, PropTypes.bool),
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  partyGroupData: Selectors.makeSelectPartyGroupData(),
  selectedPartyGroupData: Selectors.makeSelectSelectedPartyGroupData(),
  allPositions: Selectors.makeSelectGetAllPositions(),
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
  withConnect,
  memo,
)(PartyPage);
