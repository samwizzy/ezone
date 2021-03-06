/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Backdrop,
  CircularProgress,
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
  Paper,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import MUIDataTable from 'mui-datatables';
import { Add, Edit } from '@material-ui/icons';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import NoPartyDialog from './components/NoPartyDialog';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listRoot: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    borderRight: `1px solid ${theme.palette.divider}`,
    height: `calc(100vh - 128px)`,
    '& .MuiListSubheader-root': {
      backgroundColor: theme.palette.grey[100],
      padding: theme.spacing(2),
    },
    '& .MuiListItem-root': {
      '& .MuiListItemIcon-root': {
        minWidth: '40px !important',
      },
      '&:hover > .MuiListItemIcon-root': {
        color: theme.palette.primary.main,
      },
      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
    '&:hover': {
      overflowY: 'auto',
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
  button: {
    borderRadius: theme.shape.borderRadius * 5,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const ListItemLink = props => <ListItem button component="a" {...props} />;

const PartyGroupList = props => {
  const classes = useStyles();
  const {
    openEditPartyGroupDialog,
    getSelectedPartyGroupAction,
    partyGroupData,
    openNewPartyGroupDialog,
    loading,
  } = props;

  useEffect(() => { }, []);

  const handleRoute = groupId => {
    const data =
      partyGroupData && partyGroupData.find(group => group.id === groupId);
    getSelectedPartyGroupAction(data);
    props.history.push(`/organization/company/structure/${groupId}`);
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
      label: 'Group Name',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'description',
      label: 'Description',
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
          const data = partyGroupData && partyGroupData.find(group => group.id === value);

          return (
            <div>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                onClick={() => openEditPartyGroupDialog(data)}
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
        customBodyRender: value => (
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
        style={{ marginLeft: 5 }}
        color="primary"
        size="small"
        startIcon={<Add />}
        onClick={() => openNewPartyGroupDialog()}
      >
        New Party Group
      </Button>
    ),
    elevation: 0,
  };

  if (loading) {
    return <LoadingIndicator />
  }

  if (!partyGroupData.length) {
    return (
      <NoPartyDialog
        loading={loading}
        openNewPartyGroupDialog={openNewPartyGroupDialog}
      />
    );
  }

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
                    <IconButton
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => openNewPartyGroupDialog()}
                    >
                      <Add />
                    </IconButton>
                  </div>
                </ListSubheader>
              }
            >
              {partyGroupData.map((data, i) => (
                <ListItemLink
                  key={i}
                  onClick={() => getSelectedPartyGroupAction(data)}
                >
                  <ListItemText primary={data.name} />
                  <ListItemSecondaryAction
                    onClick={() => openEditPartyGroupDialog(data)}
                  >
                    <IconButton variant="outlined" size="small" color="primary">
                      <Edit />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItemLink>
              ))}
            </List>
          </div>
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <MUIDataTable
            className={classes.datatable}
            title="Party Groups"
            data={partyGroupData}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

PartyGroupList.propTypes = {
  openEditPartyGroupDialog: PropTypes.func,
  loading: PropTypes.bool,
  openNewPartyGroupDialog: PropTypes.func,
  partyGroupData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  getSelectedPartyGroupAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  partyGroupData: Selectors.makeSelectPartyGroupData(),
  selectedPartyGroupData: Selectors.makeSelectSelectedPartyGroupData(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewPartyGroupDialog: () => dispatch(Actions.openNewPartyGroupDialog()),
    openEditPartyGroupDialog: evt => dispatch(Actions.openEditPartyGroupDialog(evt)),
    getSelectedPartyGroupAction: evt => dispatch(Actions.getSelectedPartyGroupAction(evt)),
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
)(PartyGroupList);
