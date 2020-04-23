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
  FormControlLabel,
  Icon,
  ListItemSecondaryAction,
  IconButton,
  Backdrop,
  CircularProgress,
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

const drawerWidth = '100%';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    height: '80%',
    // height: '100vh',
  },
  button: {
    borderRadius: '20px',
    margin: theme.spacing(5, 0),
    padding: theme.spacing(1, 15),
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    width: drawerWidth, // works better without position:fixed
    flexShrink: 0,
    overflowY: 'auto',
    height: '600px',
    '& .MuiListSubheader-root': {
      backgroundColor: theme.palette.common.white,
    },
    '&::-webkit-scrollbar': {
      width: '6px',
      backgroundColor: '#F5F5F5',
    },
    '&::-webkit-scrollbar-track': {
      '-webkitBoxShadow': 'inset 0 0 6px rgba(0,0,0,0.3)',
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.5)',
      backgroundColor: theme.palette.primary.main,
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  marginButton: {
    margin: theme.spacing(1),
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
      name: 'tag',
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
          const par = selectedPartyGroupData.parties.find(
            part => value === part.id,
          );
          if (value === '') {
            return '';
          }

          return (
            <div>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                className={classes.marginButton}
                // onClick={() => openEditContactDialogAction(par)}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                className={classes.marginButton}
                href={`/organization/company/structure/party/${
                  selectedPartyGroupData.id
                }/${value}`}
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
        size="small"
        startIcon={<Add />}
        onClick={() => dispatchOpenNewPartyAction(selectedPartyGroupData)}
      >
        Add New Party
      </Button>
    ),
  };

  console.log(partyGroupData, 'partyGroupData');
  console.log(loading, 'loading');

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
                    <Button
                      variant="outlined"
                      size="small"
                      color="primary"
                      className={classes.marginButton}
                    >
                      Edit
                    </Button>
                    {/* <IconButton edge="end" aria-label="comments">
                      <Edit />
                    </IconButton> */}
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
  partyGroupData: PropTypes.array,
  // partyGroupData: PropTypes.oneOfType(PropTypes.array, PropTypes.bool),
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
