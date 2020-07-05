import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { withStyles, AppBar, Avatar, Box, Button, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormGroup, FormControl, FormLabel, FormControlLabel, Grid, MenuItem, Radio, RadioGroup, Popover, Slide, Tabs, Tab, Typography, TextField, Toolbar } from '@material-ui/core';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import moment from 'moment'
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const durations = ['Days', 'Weeks', 'Months', 'Years'];

const model = {
  name: '',
  type: 'PAID',
  description: '',
  eligibleEmployees: [],
  leaveAllowancePercent: 0,
  gender: 'MALE',
  numberOfDaysFromHire: 0,
  validFrom: moment().format('YYYY-MM-DDTHH:mm:ss.SSS'),
  validTill: moment().format('YYYY-MM-DDTHH:mm:ss.SSS')
}

function AddShiftDialog(props) {
  const classes = useStyles();
  const { closeNewShiftDialog, dialog, employees, departments, branches, roles, createLeaveType } = props;
  const [option, setOption] = React.useState({ policy: false, validity: false })
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const [value, setValue] = React.useState(0);
  const [form, setForm] = React.useState({ ...model });

  React.useEffect(() => {
    if (dialog.type === 'edit') {
      setForm({ ...dialog.data })
    }
  }, [dialog])

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const canSubmitForm = () => {
    const { name, type, validFrom, validTill, description } = form
    return name.length > 0 && type && validFrom && validTill
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value });
  }

  const handleSelectChange = name => (event, array) => {
    setForm({ ...form, [name]: array })
  }

  const handleOptions = ({ target }) => {
    setOption({ ...option, [target.name]: target.checked })
  }

  const handleDateChange = name => date => {
    setForm({ ...form, [name]: moment(date).format('YYYY-MM-DDTHH:mm:ss.SSS') })
  }

  const handlePartyChange = name => (event, obj) => {
    console.log(name, "name")
    console.log(obj, "obj")
    // setForm({ ...form, [name]: obj.id })
  }

  const handleChipDelete = id => {
    setForm(form => ({ ...form, usersId: form.usersId.filter(user => user.id !== id) }))
  }

  const handleSubmit = () => {
    createLeaveType(form)
    setForm({ ...model })
  }

  const selected = employees && _.filter(employees, (employee) => {
    return _.some(form.eligibleEmployees, { 'id': employee.id });
  })
  const selectedDept = departments && _.find(departments, { 'id': form.partyId })

  console.log(form, "leave type form")
  console.log(option, "leave type option")
  console.log(departments, "leave type departments")

  return (
    <div>
      <Dialog
        {...dialog.props}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeNewShiftDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Add Leave Type
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent dividers>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                id="name"
                name="name"
                placeholder="Name"
                fullWidth
                margin="normal"
                variant="outlined"
                size="small"
                label="Name"
                value={form.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="leave-allowance-percent"
                name="leaveAllowancePercent"
                placeholder="Leave Allowance Percent"
                fullWidth
                margin="normal"
                variant="outlined"
                size="small"
                label="Leave Allowance Percent"
                value={form.leaveAllowancePercent}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="type"
                name="type"
                placeholder="Type"
                select
                fullWidth
                variant="outlined"
                margin="normal"
                size="small"
                label="Type"
                value={form.type}
                onChange={handleChange}
              >
                <MenuItem key="" value="" disabled>
                  Select type
                </MenuItem>
                {['PAID', 'UNPAID'].map((type, i) =>
                  <MenuItem key={i} value={type}>
                    {type}
                  </MenuItem>
                )}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Validity</FormLabel>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={option.validity}
                      onChange={handleOptions}
                      color="primary"
                      name="validity"
                    />
                  }
                  label="Validity Date"
                />
              </FormControl>
            </Grid>
            {option.validity &&
              <React.Fragment>
                <Grid item xs={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      autoOk
                      inputVariant="outlined"
                      format="dd/MM/yyyy"
                      margin="normal"
                      fullWidth
                      size="small"
                      name="validFrom"
                      id="valid-from"
                      label="Valid From"
                      value={form.validFrom}
                      onChange={handleDateChange('validFrom')}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      autoOk
                      disablePast
                      inputVariant="outlined"
                      format="dd/MM/yyyy"
                      margin="normal"
                      fullWidth
                      size="small"
                      name="validTill"
                      id="valid-till"
                      label="Valid Till"
                      value={form.validTill}
                      onChange={handleDateChange('validTill')}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </React.Fragment>
            }
            <Grid item xs={12}>
              <TextField
                id="description"
                name="description"
                placeholder="Description"
                fullWidth
                margin="normal"
                variant="outlined"
                multiline
                rows={4}
                size="small"
                label="Description"
                value={form.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={option.policy}
                    onChange={handleOptions}
                    name="policy"
                    color="primary"
                  />
                }
                label="Policy"
              />
            </Grid>

            {option.policy &&
              <React.Fragment>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Entitlement</Typography>
                  <FormLabel component="legend">Based on Date After Hiring</FormLabel>
                  <TextField
                    id="numberOfDaysFromHire"
                    name="numberOfDaysFromHire"
                    placeholder="0"
                    margin="dense"
                    variant="outlined"
                    size="small"
                    label="From"
                    value={form.numberOfDaysFromHire}
                    onChange={handleChange}
                  />
                  <TextField
                    id="duration"
                    name="duration"
                    placeholder="Duration"
                    select
                    style={{ minWidth: 100 }}
                    variant="outlined"
                    margin="dense"
                    size="small"
                    label="Days"
                  // value={form.duration}
                  // onChange={handleChange}
                  >
                    {durations.map((duration, i) =>
                      <MenuItem key={i} value={duration}>
                        {duration}
                      </MenuItem>
                    )}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <FormLabel component="legend">Applicable To</FormLabel>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    id="gender"
                    name="gender"
                    placeholder="Gender"
                    select
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    size="small"
                    label="Gender"
                    value={form.gender}
                    onChange={handleChange}
                  >
                    {['MALE', 'FEMALE', 'BOTH'].map((gender, i) =>
                      <MenuItem key={i} value={gender}>
                        {gender}
                      </MenuItem>
                    )}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="marital-status"
                    name="maritalStatus"
                    placeholder="Marital Status"
                    select
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    size="small"
                    label="Marital Status"
                    // value={form.maritalStatus}
                    onChange={handleChange}
                  >
                    {['Single', 'Married', 'Divorced'].map((status, i) =>
                      <MenuItem key={i} value={status}>
                        {status}
                      </MenuItem>
                    )}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="employee-select"
                    name="usersId"
                    placeholder="Employee"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    size="small"
                    label="Employee"
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
                    {selectedDept &&
                      <Chip
                        key={selectedDept.id}
                        avatar={<Avatar>{selectedDept.name[0].toUpperCase()}</Avatar>}
                        label={selectedDept.name}
                        variant="outlined"
                        onDelete={() => handleChipDelete(selectedDept.id)}
                      />
                    }
                  </div>
                </Grid>
              </React.Fragment>
            }
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => (closeNewShiftDialog, setForm({ ...model }))} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!canSubmitForm()} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


AddShiftDialog.propTypes = {
  closeNewShiftDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dialog: Selectors.makeSelectLeaveTypeDialog(),
  employees: Selectors.makeSelectEmployees(),
  departments: Selectors.makeSelectDepartments(),
  branches: Selectors.makeSelectBranches(),
  roles: Selectors.makeSelectRoles(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewShiftDialog: () => dispatch(Actions.closeNewLeaveTypeDialog()),
    createLeaveType: (data) => dispatch(Actions.createLeaveType(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddShiftDialog);