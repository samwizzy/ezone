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
} from '@material-ui/core';
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
import PartiesDialog from './PartiesDialog';
import PositionDialog from './PositionDialog';

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
    minWidth: 650,
    '& td, th': {
      border: 0,
      '& button': {
        textAlign: 'left',
        width: theme.spacing(30),
      },
      '& div': {
        width: theme.spacing(30),
        color: theme.palette.common.white,
        backgroundColor: theme.palette.primary.main,
        borderRadius: '20px',
        padding: theme.spacing(1, 2),
      },
    },
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

const PartyPage = props => {
  useInjectReducer({ key: 'companyStructurePage', reducer });
  useInjectSaga({ key: 'companyStructurePage', saga });

  const {
    dispatchOpenNewPositionAction,
    dispatchGetAllUsersAction,
    dispatchGetPartyGroups,
    selectedPartyGroupData,
    DispatchgetSelectedPartyGroupAction,
    partyGroupData,
    dispatchOpenNewPartyGroupAction,
    dispatchOpenNewPartiesAction,
    openNewRoleDialog,
    loading,
    match,
    allPositions,
  } = props;

  const { params } = match;

  console.log(params, 'params');

  useEffect(() => {
    dispatchGetPartyGroups();
    dispatchGetAllUsersAction();
  }, []);
  const classes = useStyles();

  console.log(partyGroupData, 'partyGroupData');

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

  // console.log(allPositions, 'allPositions');
  // console.log(party, 'selectedPartyGroupData party');
  // console.log(selectedPartyGroupData, 'selectedPartyGroupData');

  if (!partyGroupData.length) {
    return (
      <NoPartyGroup
        dispatchOpenNewPartyGroupAction={dispatchOpenNewPartyGroupAction}
      />
    );
  }

  return (
    <React.Fragment>
      <PositionDialog params={params} />
      <PartiesDialog params={params} />
      <div>
        <Grid container justify="space-between" className={classes.header}>
          <Grid item>
            <Typography variant="h6">Company Information.</Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              className={classes.partyButton}
              onClick={() => dispatchOpenNewPartyGroupAction()}
            >
              <Add /> Add Party Group
            </Button>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={2} md={2}>
            <Paper className={classes.paper}>
              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                className={classes.list}
              >
                <ListItem
                  button
                  // key={index}
                  onClick={() => DispatchgetSelectedPartyGroupAction(party)}
                >
                  <ListItemText primary={party.name} />
                </ListItem>
              </List>
            </Paper>
          </Grid>
          <Grid item xs={10} md={10}>
            <Paper className={classes.paper}>
              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    {/* Region */}
                    <Typography variant="h6">
                      {selectedPartyGroupData.name}
                    </Typography>
                  </ListSubheader>
                }
                className={classes.root}
              >
                <Divider />
                <ListItem>
                  <Typography variant="h6">Information.</Typography>
                </ListItem>
                <ListItem>
                  <Table
                    className={classes.table}
                    aria-label="simple table"
                    size="small"
                  >
                    <TableBody>
                      {/* {rows.map(row => ( */}
                      <TableRow key={selectedPartyGroupData.id}>
                        <TableCell component="th" scope="row" width="25%">
                          {/* {row.title} */}
                        </TableCell>
                        <TableCell align="left" width="75%">
                          {selectedPartyGroupData.description}
                        </TableCell>
                      </TableRow>
                      {/* ))} */}
                    </TableBody>
                  </Table>
                </ListItem>
              </List>

              <Divider />
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.partyButton}
                  onClick={() => dispatchOpenNewPositionAction()}
                >
                  <Add /> Add New Position
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.partyButton}
                  onClick={() => dispatchOpenNewPartiesAction()}
                >
                  <Add /> Add New Parties
                </Button>
              </Grid>
              <Grid container spacing={1}>
                <Grid container item xs={6} md={6} lg={6}>
                  <Table
                    className={classes.table}
                    aria-label="simple table"
                    size="small"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.head}>
                          All Parties
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {party &&
                        party.parties.map(paty => (
                          <TableRow key={paty.id}>
                            <TableCell
                              component="th"
                              scope="row"
                              width="25%"
                              onClick={() =>
                                DispatchgetSelectedPartyGroupAction(paty)
                              }
                            >
                              <div>{paty.name}</div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </Grid>
                <Grid container item xs={6} md={6} lg={6}>
                  <Table
                    className={classes.table}
                    aria-label="simple table"
                    size="small"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.head}>
                          All Positions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {party &&
                        party.positions.map(position => (
                          <TableRow key={position.id}>
                            <TableCell
                              component="th"
                              scope="row"
                              width="25%"
                              onClick={() =>
                                DispatchgetSelectedPartyGroupAction(position)
                              }
                            >
                              <Link
                                href={`/organization/company/structure/position/${
                                  params.partyGroupId
                                }/${params.partyId}/${position.id}`}
                              >
                                {position.name}
                                {/* <div>{party.name}</div> */}
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
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
    dispatchOpenNewPositionAction: () =>
      dispatch(Actions.openNewPositionDialog()),
    dispatchOpenNewPartiesAction: () =>
      dispatch(Actions.openNewPartiesDialog()),
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
)(PartyPage);
