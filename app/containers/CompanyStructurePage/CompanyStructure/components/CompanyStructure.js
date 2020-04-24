/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Card, CardContent, CardActions,
  List,
  ListItem,
  ListItemText,
  Grid,
  Button,
  Typography,
  Box,
  FormControlLabel,
  Icon,
  ListItemSecondaryAction,
  IconButton,
  Paper
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import MUIDataTable from 'mui-datatables';
import { Create, Add, Edit } from '@material-ui/icons';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    minHeight: `calc(100vh - 120px)`,
  },
  card: {
    padding: theme.spacing(5),
    "& .MuiCardActions-root": {
      justifyContent: "center"
  }
  },
  button: {
    borderRadius: theme.shape.borderRadius * 5,
  }
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
        <Grid item>
          <Card square className={classes.card}>
            <CardContent>
              <Box my={2}>
                <Typography variant="h6" component="h1" gutterBottom>
                  You have no company structure yet
                </Typography>
              </Box>
            </CardContent>

            <CardActions>
              <Button
                variant="contained"
                color="primary"
                onClick={() => dispatchOpenNewPartyGroupAction()}
                className={classes.button}
                disableElevation
                startIcon={<Add />}
              >
                Create Party Group
              </Button>
            </CardActions>
          </Card>
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
    openEditPartyGroupAction,
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
        customBodyRender: value => (
          <Button
            variant="contained"
            color="primary"
            href={`/organization/company/structure/party/${
              selectedPartyGroupData.id
            }/${value}`}
          >
            View
          </Button>
        ),
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
        onClick={() => dispatchOpenNewPartyAction(selectedPartyGroupData)}
      >
        Add New Party
      </Button>
    ),
  };

  // console.log(partyGroupData, 'partyGroupData');
  // console.log(loading, 'loading');

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
      <Grid container spacing={0}>
        <Grid item xs={12} md={4} lg={3}>
          <Button
            variant="contained"
            color="primary"
            className={classes.partyButton}
            onClick={() => dispatchOpenNewPartyGroupAction()}
          >
            <Add /> Create Party Group
          </Button>
          <div className={classes.paper}>
            {partyGroupData.map(data => (
              <List component="nav" key={data.id}>
                <ListItemLink
                  key={data.id}
                  onClick={() => DispatchgetSelectedPartyGroupAction(data)}
                >
                  <ListItemText primary={data.name} />
                  <ListItemSecondaryAction
                    onClick={() => openEditPartyGroupAction(data)}
                  >
                    <IconButton edge="end" aria-label="comments">
                      <Edit />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItemLink>
              </List>
            ))}
          </div>
        </Grid>
        <Grid item xs={12} md={4} lg={8}>
          {selectedPartyGroupData && selectedPartyGroupData.parties && (
            <MUIDataTable
              title={`All ${selectedPartyGroupData.name} Parties`}
              data={selectedPartyGroupData.parties}
              columns={columns}
              options={options}
            />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

CompanyStructure.propTypes = {
  openEditPartyGroupAction: PropTypes.func,
  dispatchGetAllUsersAction: PropTypes.func,
  loading: PropTypes.bool,
  dispatchOpenNewPartyGroupAction: PropTypes.func,
  dispatchOpenNewPartyAction: PropTypes.func,
  partyGroupData: PropTypes.oneOfType(PropTypes.array, PropTypes.bool),
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
    openEditPartyGroupAction: evt =>
      dispatch(Actions.openEditPartyGroupDialog(evt)),
    dispatchOpenNewPartyAction: evt =>
      dispatch(Actions.openNewPartyDialog(evt)),
    openNewRoleDialog: () => dispatch(Actions.openNewRoleDialog()),
    DispatchgetSelectedPartyGroupAction: evt =>
      dispatch(Actions.getSelectedPartyGroupAction(evt)),
    dispatchGetAllUsersAction: () => dispatch(Actions.getAllUsers()),
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
)(CompanyStructure);
