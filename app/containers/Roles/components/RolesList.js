/* eslint-disable prettier/prettier */
import React, { Fragment, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Backdrop,
  CircularProgress,
  makeStyles,
  List,
  FormControlLabel,
  Icon,
  Button,
  ButtonGroup,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { Add, Visibility } from '@material-ui/icons';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import MUIDataTable from 'mui-datatables';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  button: {
    margin: "auto",
  },
  datatable: {
    whiteSpace: "nowrap",
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const RolesList = props => {
  const classes = useStyles();

  const {
    loading,
    history,
    match,
    roles,
    openNewRoleDialog,
    openEditRoleDialog,
    openRoleDetailsDialog,
  } = props;

  console.log(roles, "roles")
  console.log(match, "match")

  const columns = [
    {
      name: 'Id',
      label: 'S/N',
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
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
      name: 'description',
      label: 'Status',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'createdAt',
      label: 'Date Created',
      options: {
        filter: true,
        sort: false,
        customBodyRender: date => date ? moment(date).format('ll') : ''
      }
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'scrollMaxHeight',
    selectableRows: 'single',
    customToolbar: () => (
      <ButtonGroup size="small">
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<Add />}
          onClick={() => openNewRoleDialog()}
          disableElevation
        >
          New Role
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<Add />}
          onClick={() => history.push(`${match.path}/new`)}
          disableElevation
        >
          New Role Right
        </Button>
      </ButtonGroup>
    ),
    elevation: 0
  };

  return (
    <React.Fragment>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <MUIDataTable
        className={classes.datatable}
        title="Roles"
        data={roles}
        columns={columns}
        options={options}
      />
    </React.Fragment>
  );
};

RolesList.propTypes = {
  loading: PropTypes.bool,
  openNewRoleDialog: PropTypes.func,
  openEditRoleDialog: PropTypes.func,
  openRoleDetailsDialog: PropTypes.func,
  roles: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  roles: Selectors.makeSelectRoles(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewRoleDialog: () => dispatch(Actions.openNewRoleDialog()),
    openEditRoleDialog: evt => dispatch(Actions.openEditRoleDialog(evt)),
    openRoleDetailsDialog: evt => dispatch(Actions.openRoleDetailsDialog(evt)),
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
)(RolesList);
