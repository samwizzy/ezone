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

const drawerWidth = '100%';

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
  menuScroll: {
    // position: 'absolute',
    overflow: 'scroll',
    // top: '0px',
    // height: '100%',
    // width: '680px',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      // position: 'fixed',
      display: 'flex',
      flexDirection: 'column',
      width: drawerWidth, // works better without position:fixed
      flexShrink: 0,
      overflowY: 'auto',
      height: `calc(100% - ${200}px)`,
      '& .MuiListSubheader-root': {
        backgroundColor: theme.palette.common.white
      },
      "&::-webkit-scrollbar": {
        width: "6px",
        backgroundColor: "#F5F5F5"
      },
      "&::-webkit-scrollbar-track": {
        "-webkitBoxShadow": "inset 0 0 6px rgba(0,0,0,0.3)",
        borderRadius: "10px",
      },
      "&::-webkit-scrollbar-thumb": {
        borderRadius: "10px",
        "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.5)",
        backgroundColor: theme.palette.primary.main,
      }
    },
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

  if (!partyGroupData.length) {
    return (
      <NoPartyGroup
        dispatchOpenNewPartyGroupAction={dispatchOpenNewPartyGroupAction}
      />
    );
  }

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        {/* <Card className={classes.partyGroupCard}>
          <CardContent>
            <Typography variant="h4" component="h2" color="textSecondary">
              {partyGroupData && partyGroupData[0].name}
              <span className={classes.editButton}>
                <IconButton>
                  <Create />
                </IconButton>
              </span>
            </Typography>
          </CardContent>
        </Card> */}
        <Grid item xs={12} md={3} lg={3}>
          <Button
            variant="contained"
            color="primary"
            className={classes.partyButton}
            onClick={() => dispatchOpenNewPartyGroupAction()}
          >
            <Add /> Create Party Group
          </Button>
          {partyGroupData.map(data => (
            <div>
              <List component="nav">
                <ListItemLink
                  href={`/organization/company/structure/party/${data.id}`}
                  key={data.id}
                  onClick={() => DispatchgetSelectedPartyGroupAction(data)}
                >
                  <ListItemText primary={data.name} />
                </ListItemLink>
              </List>
            </div>
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
