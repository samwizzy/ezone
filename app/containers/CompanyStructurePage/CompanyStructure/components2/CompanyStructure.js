/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  List,
  ListItem,
  ListItemText,
  Grid,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  IconButton,
} from '@material-ui/core';
import { Create } from '@material-ui/icons';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Add from '@material-ui/icons/Add';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    height: '80%',
    // height: '100vh',
  },
  partyGroupCard: {
    width: '100%',
    height: 80,
  },
  editButton: {
    marginLeft: theme.spacing(2),
  },
  button: {
    borderRadius: '20px',
    margin: theme.spacing(5, 0),
    padding: theme.spacing(1, 15),
  },
}));

const NoPartyGroup = props => {
  const classes = useStyles();
  const { dispatchOpenNewPartyGroupAction } = props;

  return (
    <React.Fragment>
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid item xs={12}>
          <Box>
            <Typography variant="h6">
              You Do Not have company structure
            </Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={() => dispatchOpenNewPartyGroupAction()}
              className={classes.button}
              disableElevation
            >
              <Add /> Create Party Group
            </Button>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

NoPartyGroup.propTypes = {
  dispatchOpenNewPartyGroupAction: PropTypes.func,
};

const ListItemLink = props => <ListItem button component="a" {...props} />;

const CompanyStructure = props => {
  const {
    dispatchGetAllUsersAction,
    selectedPartyGroupData,
    DispatchgetSelectedPartyGroupAction,
    partyGroupData,
    dispatchOpenNewPartyGroupAction,
    dispatchOpenNewPartyAction,
    loading,
  } = props;

  useEffect(() => {
    dispatchGetAllUsersAction();
  }, []);
  const classes = useStyles();

  console.log(partyGroupData, 'partyGroupData');

  if (loading) {
    return <LoadingIndicator />;
  }

  // if (!partyGroupData.length) {
  //   return (
  //     <NoPartyGroup
  //       dispatchOpenNewPartyGroupAction={dispatchOpenNewPartyGroupAction}
  //     />
  //   );
  // }

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Card className={classes.partyGroupCard}>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              This impressive paella is a perfect impressive paella is a perfect
              <span className={classes.editButton}>
                <IconButton>
                  <Create />
                </IconButton>
              </span>
            </Typography>
          </CardContent>
        </Card>
        <Grid item xs={12} md={3} lg={3}>
          <Button
            variant="contained"
            color="primary"
            className={classes.partyButton}
            onClick={() => dispatchOpenNewPartyAction()}
          >
            <Add /> Add New Party
          </Button>
          {selectedPartyGroupData &&
            selectedPartyGroupData.parties.map(party => (
              <List component="nav" aria-label="secondary mailbox folders">
                <ListItemLink
                  href={`/organization/company/structure/party/${
                    selectedPartyGroupData.id
                  }/${party.id}`}
                  key={party.id}
                >
                  <ListItemText primary={party.name} />
                </ListItemLink>
              </List>
            ))}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

CompanyStructure.propTypes = {
  // dispatchGetPartyGroups: PropTypes.func,
  dispatchGetAllUsersAction: PropTypes.func,
  loading: PropTypes.bool,
  dispatchOpenNewPartyGroupAction: PropTypes.func,
  dispatchOpenNewPartyAction: PropTypes.func,
  partyGroupData: PropTypes.oneOfType(PropTypes.array),
  DispatchgetSelectedPartyGroupAction: PropTypes.func,
  selectedPartyGroupData: PropTypes.oneOfType(PropTypes.object, PropTypes.bool),
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  partyGroupData: Selectors.makeSelectPartyGroupData(),
  selectedPartyGroupData: Selectors.makeSelectSelectedPartyGroupData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchOpenNewPartyGroupAction: () =>
      dispatch(Actions.openNewPartyGroupDialog()),
    dispatchOpenNewPartyAction: () => dispatch(Actions.openNewPartyDialog()),
    openNewRoleDialog: () => dispatch(Actions.openNewRoleDialog()),
    DispatchgetSelectedPartyGroupAction: evt =>
      dispatch(Actions.getSelectedPartyGroupAction(evt)),

    // dispatchGetPartyGroups: () => dispatch(Actions.getPartyGroupAction()),
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
)(CompanyStructure);
