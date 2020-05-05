/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Backdrop,
  CircularProgress,
  Card, CardContent, CardActions,
  List,
  ListItem,
  ListItemText,
  ListSubheader, 
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
import { fade, darken } from '@material-ui/core/styles/colorManipulator'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';

const useStyles = makeStyles(theme => ({
  root: { 
    flexGrow: 1 
  },
  cardRoot: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    minHeight: `calc(100vh - 120px)`,
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listRoot: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'hidden',
    borderRight: `1px solid ${theme.palette.divider}`,
    height: `calc(100vh - 128px)`,
    "& .MuiListSubheader-root": {
      backgroundColor: theme.palette.grey[100],
      padding: theme.spacing(2),
    },
    "& .MuiListItem-root": {
      "& .MuiListItemIcon-root": {
        minWidth: "40px !important"
      },
      "&:hover > .MuiListItemIcon-root": {
        color: theme.palette.primary.main
      },
      "&:hover": {
        color: theme.palette.primary.main,
      },
    },
    "&:hover": {
      overflowY: 'auto',
    }
  },
  card: {
    padding: theme.spacing(5),
    "& .MuiCardActions-root": {
      justifyContent: "center"
    }
  },
  datatable: {
    '& .MuiTableRow-root:hover': {
      cursor: 'pointer'
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
  button: {
    borderRadius: theme.shape.borderRadius * 5,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  }
}));

const NoPartyGroup = props => {
  const classes = useStyles();
  const { dispatchOpenNewPartyGroupAction, loading } = props;

  return (
    <React.Fragment>
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.cardRoot}
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
      
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
        
    </React.Fragment>
  );
};

NoPartyGroup.propTypes = {
  dispatchOpenNewPartyGroupAction: PropTypes.func,
};

const ListItemLink = props => <ListItem button component="a" {...props} />;

const CompanyStructure = props => {
  const {
    openEditPartyDialogAction,
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
    // dispatchGetAllUsersAction();
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
                onClick={() => openEditPartyDialogAction(par)}
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
          return (
            <div>
              <Button
                variant="outlined"
                size="small"
                color="primary"
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
        style={{marginLeft: 5}}
        color="primary"
        size="small"
        startIcon={<Add />}
        onClick={() => dispatchOpenNewPartyAction({ partyGroupId: selectedPartyGroupData.id} )}
      >
        New Party
      </Button>
    ),
    elevation: 0
  };

  if (!partyGroupData.length) {
    return (
      <NoPartyGroup
        loading={loading}
        dispatchOpenNewPartyGroupAction={dispatchOpenNewPartyGroupAction}
      />
    );
  }

  // console.log(selectedPartyGroupData, 'selectedPartyGroupData');
  return (
    <React.Fragment>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Grid container>
        <Grid item xs={12} md={4} lg={3}>
          <div className={classes.listRoot}>
            <List 
              component="nav" 
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  <div className={classes.flex}>
                    <Typography variant="h6">Groups</Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => dispatchOpenNewPartyGroupAction()}
                      startIcon={<Add />}
                    >
                      Create Party Group
                    </Button>
                  </div>
                </ListSubheader>
              }
            >
              {partyGroupData.map((data, i) => (
                <ListItemLink key={i} onClick={() => DispatchgetSelectedPartyGroupAction(data)}>
                  <ListItemText primary={data.name} />
                  <ListItemSecondaryAction onClick={() => openEditPartyGroupAction(data)}>
                    <IconButton
                      variant="outlined"
                      size="small"
                      color="primary"
                    >
                      <Edit />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItemLink>
              ))}
            </List>
          </div>
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          {selectedPartyGroupData && selectedPartyGroupData.parties && (
            <MUIDataTable
              className={classes.datatable}
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
  openEditPartyDialogAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  partyGroupData: Selectors.makeSelectPartyGroupData(),
  selectedPartyGroupData: Selectors.makeSelectSelectedPartyGroupData(),
});

function mapDispatchToProps(dispatch) {
  return {
    openEditPartyDialogAction: evt =>
      dispatch(Actions.openEditPartyDialog(evt)),
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
