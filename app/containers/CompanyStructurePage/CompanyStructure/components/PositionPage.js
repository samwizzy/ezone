/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Breadcrumbs,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Divider,
  Grid,
  Paper,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Link,
  TableHead,
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
import saga from '../../saga';
import reducer from '../../reducer';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import EmployeeDialog from './EmployeeDialog';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    '& :hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
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
  table: {
    margin: theme.spacing(1),
  },
  header: {
    padding: theme.spacing(1.5, 0),
  },
  head: {
    textAlign: 'center',
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

const PositionPage = props => {
  useInjectReducer({ key: 'companyStructurePage', reducer });
  useInjectSaga({ key: 'companyStructurePage', saga });

  const {
    dispatchGetAllUsersAction,
    dispatchGetPartyGroups,
    selectedPartyGroupData,
    DispatchgetSelectedPartyGroupAction,
    partyGroupData,
    dispatchOpenNewPartyGroupAction,
    dispatchOpenAddEmployeeToPositionDialogAction,
    openNewRoleDialog,
    loading,
    match,
    allPositions,
  } = props;

  const { params } = match;

  useEffect(() => {
    dispatchGetPartyGroups();
    dispatchGetAllUsersAction();
  }, []);
  const classes = useStyles();

  let party;
  if (partyGroupData) {
    for (let i = 0; i < partyGroupData.length; i++) {
      if (partyGroupData[i].id == params.partyGroupId) {
        for (let k = 0; k < partyGroupData[i].parties.length; k++) {
          if (partyGroupData[i].parties[k].id == params.partyId) {
            for (
              let e = 0;
              e < partyGroupData[i].parties[k].positions.length;
              e++
            ) {
              if (
                partyGroupData[i].parties[k].positions[e].id ==
                params.positionId
              ) {
                party = partyGroupData[i].parties[k].positions[e];
              }
            }
          }
        }
      }
    }
  }

  if (party === undefined) {
    return <LoadingIndicator />;
  }

  if (!partyGroupData.length) {
    return (
      <NoPartyGroup
        dispatchOpenNewPartyGroupAction={dispatchOpenNewPartyGroupAction}
      />
    );
  }

  const columns = [
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
      name: 'id',
      label: 'Employee Name',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          var user;
          if (party && party.employees) {
            user = party.employees.find(u => u.id === value);
          }
          if (value === '') {
            return '';
          }
          return (
            <Typography>
              {user.firstName} {user.lastName}
            </Typography>
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
        size="small"
        startIcon={<Add />}
        onClick={() => dispatchOpenAddEmployeeToPositionDialogAction()}
      >
        Add New Employee
      </Button>
    ),
  };

  // console.log(selectedPartyGroupData, 'position selected value');
  return (
    <React.Fragment>
      <EmployeeDialog params={params} />
      <Grid container spacing={0}>
        <Grid item xs={12} md={12} lg={12}>
          <div className={classes.table}>
            {party && party.employees && (
              <MUIDataTable
                // title={`All ${selectedPartyGroupData.name} Parties`}
                title="All Employees"
                data={party.employees}
                columns={columns}
                options={options}
              />
            )}
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

PositionPage.propTypes = {
  dispatchGetPartyGroups: PropTypes.func,
  dispatchGetAllUsersAction: PropTypes.func,
  loading: PropTypes.bool,
  dispatchOpenNewPartyGroupAction: PropTypes.func,
  dispatchOpenAddEmployeeToPositionDialogAction: PropTypes.func,
  openNewRoleDialog: PropTypes.func,
  partyGroupData: PropTypes.array,
  DispatchgetSelectedPartyGroupAction: PropTypes.func,
  selectedPartyGroupData: PropTypes.object,
  allPositions: PropTypes.object,
  // selectedPartyGroupData: PropTypes.oneOfType(PropTypes.object, PropTypes.bool),
  // allPositions: PropTypes.oneOfType(PropTypes.object, PropTypes.bool),
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  partyGroupData: Selectors.makeSelectPartyGroupData(),
  selectedPartyGroupData: Selectors.makeSelectSelectedPartyGroupData(),
  allPositions: Selectors.makeSelectGetAllPositions(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchOpenAddEmployeeToPositionDialogAction: () =>
      dispatch(Actions.openAddEmployeeToPositionDialog()),
    DispatchgetSelectedPartyGroupAction: evt =>
      dispatch(Actions.getSelectedPartyGroupAction(evt)),
    dispatchGetPartyGroups: () => dispatch(Actions.getPartyGroupAction()),
    dispatchGetAllUsersAction: () => dispatch(Actions.getAllUsers()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(PositionPage);
