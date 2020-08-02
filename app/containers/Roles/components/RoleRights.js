/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  makeStyles,
  AppBar,
  Backdrop,
  Box,
  Button,
  IconButton,
  Checkbox,
  Card, CardHeader, CardContent, CardActions,
  CircularProgress,
  Dialog,
  Grid,
  MenuItem,
  TextField,
  Slide,
  Typography,
  Toolbar,
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import AddIcon from '@material-ui/icons/Add'
import moment from 'moment';
import _ from 'lodash';
import * as Selectors from '../selectors';
import * as Actions from '../actions';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'static',
  },
  title: {
    flexGrow: 1,
  },
  card: {
    "& .MuiCardActions-root": {
      justifyContent: 'flex-end'
    }
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const initialState = {
  rights: [],
  role: null
}

const RoleRights = props => {
  const classes = useStyles();
  const [form, setForm] = React.useState({ ...initialState });

  const {
    loading,
    roles,
    rights,
    right,
    roleRights,
    createRoleRight,
    updateRoleRight,
    getRightsByRoleId,
    openNewRightDialog,
  } = props;

  useEffect(() => {
    // setForm((state, props) => ({ ...props.roleRights }))
  }, [roleRights])

  const handleChange = event => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSelectChange = name => (event, obj) => {
    setForm({ ...form, [name]: obj });
    getRightsByRoleId(obj.id)
  };

  const handleArrSelectChange = name => (event, arr) => {
    setForm({ ...form, [name]: arr });
  };

  const handleCheckChange = (bool, index) => event => {
    const { name, value } = event.target
    const { rights } = form
    rights[index][name] = event.target.checked;
    setForm(_.set({ ...form }, "rights", currentState));
  };

  const canSubmitForm = () => {
    const { rights, role } = form;
    return (
      rights.length > 0 && role
    );
  };

  const handleSubmit = () => {
    createRoleRight(form)
    // : updateRoleRight(form)
  }

  console.log(form, 'form');
  console.log(rights, 'rights');
  console.log(right, 'right by role Id');
  console.log(roleRights, 'roleRights');

  const columns = [
    {
      name: "id",
      label: "Id",
      options: {
        display: 'excluded',
        filter: false,
        sort: false,
      }
    },
    {
      name: "module.moduleName",
      label: "Module Name",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "canview",
      label: "View",
      options: {
        customBodyRender: (canview, tableMeta) => {
          return (
            <IconButton
              onClick={(ev, dispatch) => {
                ev.stopPropagation();
              }}
            >
              <Checkbox name="canview" checked={canview} onChange={handleCheckChange(canview, tableMeta.rowIndex)} />
            </IconButton>
          );
        },
      }
    },
    {
      name: "cancreate",
      label: "Create",
      options: {
        customBodyRender: (cancreate, tableMeta) => {
          return (
            <IconButton
              onClick={(ev, dispatch) => {
                ev.stopPropagation();
              }}
            >
              <Checkbox name="cancreate" checked={cancreate} onChange={handleCheckChange(cancreate, tableMeta.rowIndex)} />
            </IconButton>
          );
        },
      }
    },
    {
      name: "canedit",
      label: "Edit",
      options: {
        customBodyRender: (canedit, tableMeta) => {
          return (
            <IconButton
              onClick={(ev, dispatch) => {
                ev.stopPropagation();
              }}
            >
              <Checkbox name="canedit" checked={canedit} onChange={handleCheckChange(canedit, tableMeta.rowIndex)} />
            </IconButton>
          );

        },
      }
    },
    {
      name: "candelete",
      label: "Delete",
      options: {
        customBodyRender: (candelete, tableMeta) => {
          return (
            <IconButton
              onClick={(ev, dispatch) => {
                ev.stopPropagation();
              }}
            >
              <Checkbox name="candelete" checked={candelete} onChange={handleCheckChange(candelete, tableMeta.rowIndex)} />
            </IconButton>
          );
        },
      }
    }
  ];


  const options = {
    filterType: 'dropdown',
    filter: true,
    responsive: 'stacked',
    selectableRows: 'none',
    customToolbarSelect: (selectedRows, roles) => <CustomToolbar selectedRows={selectedRows} />,
    rowsPerPage: 25,
    rowsPerPageOptions: [25, 50, 100],
    elevation: 0
  };

  return (
    <div>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Card className={classes.card}>
        <CardHeader
          title="New Role"
          subheader="Assign rights on applications to roles"
          action={
            <Button onClick={openNewRightDialog} startIcon={<AddIcon />}>New Right</Button>
          }
        />

        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Autocomplete
                id="combo-box-role"
                name="role"
                size="small"
                options={roles ? roles : []}
                getOptionLabel={option => option.name}
                onChange={handleSelectChange('role')}
                value={form.role ? form.role : null}
                style={{ width: 300 }}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Roles"
                    variant="outlined"
                    placeholder="Search"
                    margin="normal"
                    fullWidth
                  />
                )}
              />

              <Autocomplete
                multiple
                id="tags-rights"
                size="small"
                options={rights ? rights : []}
                getOptionLabel={(option) => option.module && option.module.moduleName}
                onChange={handleArrSelectChange('rights')}
                value={form.rights ? form.rights : []}
                style={{ width: 300 }}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Rights"
                    margin="normal"
                    fullWidth
                    placeholder="Modules"
                  />
                )}
              />

              <Box my={2}>
                <Button
                  onClick={handleSubmit}
                  disabled={!canSubmitForm()}
                  color="primary"
                  variant="outlined"
                >
                  Save
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <MUIDataTable
                className={classes.datatable}
                title="Role Rights"
                data={[]}
                columns={columns}
                options={options}
              />
            </Grid>
          </Grid>
        </CardContent>

        <CardActions>
          <Button onClick={() => { }} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!canSubmitForm()}
            color="primary"
            variant="outlined"
          >
            Save
          </Button>
        </CardActions>
      </Card >
    </div >
  );
};

RoleRights.propTypes = {
  loading: PropTypes.bool,
  updateRoleRight: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  roles: Selectors.makeSelectRoles(),
  rights: Selectors.makeSelectRights(),
  right: Selectors.makeSelectRightsByRoleId(),
  roleRights: Selectors.makeSelectRoleRights(),
});

function mapDispatchToProps(dispatch) {
  return {
    getRightsByRoleId: id => dispatch(Actions.getRightsByRoleId(id)),
    createRoleRight: data => dispatch(Actions.createRoleRight(data)),
    updateRoleRight: data => dispatch(Actions.updateRoleRight(data)),
    openNewRightDialog: data => dispatch(Actions.openNewRightDialog(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(RoleRights);
