import React, { Fragment, useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles'
import { compose } from 'redux';
import moment from 'moment';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  withStyles,
  Avatar,
  Box,
  Chip,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Tab,
  Tabs,
  TextField,
  Slide,
  Popover,
} from '@material-ui/core';
import * as AppSelectors from '../../../App/selectors';
import * as Selectors from '../selectors';
import * as PayrollSelectors from '../../selectors';
import * as Actions from '../actions';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  chipsRoot: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  tabsRoot: {
    minWidth: 500,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  tabs: {
    borderLeft: `1px solid ${theme.palette.divider}`,
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexGrow: 1,
    borderBottom: `1px solid ${theme.palette.divider}`,
    ...theme.mixins.toolbar
  },
}));

const AntTabs = withStyles({
  flexContainer: {
    flexDirection: 'column',
  },
  indicator: {
    backgroundColor: '#1890ff',
    left: 0,
    top: 0,
  },
})(Tabs);

const AntTab = withStyles(theme => ({
  root: {
    backgroundColor: 'rgba(26, 136, 225, 0.1)',
    borderRadius: '0px 30px 30px 0px',
    textTransform: 'none',
    minWidth: 92,
    fontWeight: theme.typography.fontWeightRegular,
    padding: theme.spacing(2, 4),
    marginRight: theme.spacing(1),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  wrapper: {
    alignItems: 'flex-start',
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const initialState = {
  name: '',
  value: '',
  inputType: null,
  eligibleEmployees: [],
  partyId: null
};

const types = [
  { label: 'Field', value: 'Field' }
]

const EarningDialog = props => {
  const classes = useStyles(props);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const [value, setValue] = useState(0);
  const [selected, setSelected] = useState([]);
  const [form, setForm] = useState({ ...initialState });

  const { loading, dialog, employees, departments, branches, roles, closeNewEarningDialog, createEarning } = props;

  useEffect(() => {
    if (dialog.type === 'edit' && dialog.data) {
      setForm({ ...dialog.data });
    } else {
      setForm({ ...initialState });
    }
  }, [dialog.data]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = event => {
    const { name, value, type, checked } = event.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSelectChange = name => (event, obj) => {
    setForm({ ...form, [name]: obj })
  };

  const handlePartyChange = name => (event, obj) => {
    setForm({ ...form, [name]: obj ? obj.id : obj })
  };

  const handleSubmit = () => {
    dialog.type === 'new' ? createEarning(form) : '';
  };

  const canSubmitForm = () => {
    const { name, rate, taxType, description } = form;
    return (
      name.length > 0 &&
      inputType &&
      value.length > 0
    );
  };

  console.log(loading, 'loading');
  console.log(form, 'form');
  console.log(dialog, 'form dialog');

  return (
    <div>
      <Dialog
        {...dialog.props}
        onClose={closeNewEarningDialog}
        keepMounted
        TransitionComponent={Transition}
        maxWidth="xs"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-asset-title">
          {dialog.type === 'new' ? 'Create Earning' : 'Edit Earning'}
        </DialogTitle>

        <DialogContent dividers>
          <TextField
            id="allowance-name"
            name="name"
            label="Name"
            variant="outlined"
            value={form.name}
            onChange={handleChange}
            margin="normal"
            size="small"
            fullWidth
          />

          <Autocomplete
            id="allowance-input-type"
            size="small"
            options={types}
            getOptionLabel={option => option.label}
            onChange={handleSelectChange('inputType')}
            value={form.inputType}
            renderInput={params => (
              <TextField
                {...params}
                InputLabelProps={{
                  shrink: false,
                }}
                variant="outlined"
                margin="normal"
                fullWidth
              />
            )}
          />

          <TextField
            id="allowance-value"
            name="value"
            label="Value"
            variant="outlined"
            value={form.value}
            onChange={handleChange}
            margin="normal"
            size="small"
            fullWidth
          />

          <TextField
            id="employee-select"
            name="usersId"
            placeholder="Employee"
            fullWidth
            variant="outlined"
            margin="normal"
            size="small"
            label="Employee, Department, Branch.."
            value={form.employee}
            onClick={handleClick}
          />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <div className={classes.tabsRoot}>
              <AntTabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleTabChange}
                aria-label="ant example"
                className={classes.tabs}
              >
                <AntTab label="Employees" {...a11yProps(0)} />
                <AntTab label="Department" {...a11yProps(1)} />
                <AntTab label="Branch" {...a11yProps(2)} />
                <AntTab label="Roles" {...a11yProps(3)} />
              </AntTabs>
              {value === 0 &&
                <Box px={2} className={classes.toolbar}>
                  <Autocomplete
                    multiple
                    id="employee"
                    size="small"
                    options={employees}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.firstName + ' ' + option.lastName}
                    onChange={handleSelectChange('eligibleEmployees')}
                    value={form.eligibleEmployees}
                    renderOption={(option, { selected }) => (
                      <React.Fragment>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.firstName + ' ' + option.lastName}
                      </React.Fragment>
                    )}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" label="Employees" placeholder="Employees" margin="normal" />
                    )}
                  />
                </Box>
              }
              {value === 1 &&
                <Box px={2} className={classes.toolbar}>
                  <Autocomplete
                    id="checkboxes-tags-demo"
                    size="small"
                    options={departments}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.name}
                    onChange={handlePartyChange('partyId')}
                    renderOption={(option, { selected }) => (
                      <React.Fragment>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.name}
                      </React.Fragment>
                    )}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" label="Department" placeholder="Department" margin="normal" />
                    )}
                  />
                </Box>
              }
              {value === 2 &&
                <Box px={2} className={classes.toolbar}>
                  <Autocomplete
                    id="checkboxes-tags-demo"
                    size="small"
                    options={branches}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.name}
                    onChange={handlePartyChange('partyId')}
                    renderOption={(option, { selected }) => (
                      <React.Fragment>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.name}
                      </React.Fragment>
                    )}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" label="Branch" placeholder="Branch" margin="normal" />
                    )}
                  />
                </Box>
              }
              {value === 3 &&
                <Box px={2} className={classes.toolbar}>
                  <Autocomplete
                    id="checkboxes-tags-demo"
                    size="small"
                    options={roles}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.name}
                    onChange={handlePartyChange('partyId')}
                    renderOption={(option, { selected }) => (
                      <React.Fragment>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.name}
                      </React.Fragment>
                    )}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" label="Roles" placeholder="Roles" margin="normal" />
                    )}
                  />
                </Box>
              }
            </div>
          </Popover>
          <div className={classes.chipsRoot}>
            {selected && selected.map((user, i) =>
              <Chip
                key={i}
                avatar={<Avatar>{user.firstName && user.firstName[0].toUpperCase()}</Avatar>}
                label={user.firstName + ' ' + user.lastName}
                variant="outlined"
                onDelete={() => handleChipDelete(user.id)}
              />
            )}
          </div>


        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleSubmit}
            color="primary"
            disableElevation
            disabled={loading ? loading : !canSubmitForm()}
            endIcon={loading && <CircularProgress size={20} />}
          >
            {dialog.type === 'edit' ? 'Update' : 'Save'}
          </Button>

          <Button
            variant="contained"
            onClick={closeNewEarningDialog}
            disableElevation
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

EarningDialog.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  dialog: Selectors.makeSelectEarningDialog(),
  employees: PayrollSelectors.makeSelectEmployees(),
  departments: PayrollSelectors.makeSelectDepartments(),
  branches: PayrollSelectors.makeSelectBranches(),
  roles: PayrollSelectors.makeSelectRoles(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewEarningDialog: () => dispatch(Actions.closeNewEarningDialog()),
    createEarning: data => dispatch(Actions.createEarning(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(EarningDialog);
