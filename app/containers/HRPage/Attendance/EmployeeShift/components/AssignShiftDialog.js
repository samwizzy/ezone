import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withStyles, AppBar, Avatar, Box, Button, Chip, Checkbox, Dialog, DialogActions, DialogContent, Divider, MenuItem, Popover, Slide, Tabs, Tab, Table, TableBody, TableRow, TableCell, Typography, TextField, Toolbar } from '@material-ui/core';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
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
  title: {
    flexGrow: 1,
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

function AssignShiftDialog(props) {
  const classes = useStyles();
  const { closeNewEmployeeShiftDialog, assignShift, assignShiftToParty, shifts, employees, departments, branches, roles, dialog } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState(0);
  const [form, setForm] = React.useState({
    shiftId: '',
    usersId: [],
    partyId: ''
  });

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  React.useEffect(() => {
    if (dialog.type == 'edit') {
      setForm({ ...form })
    }
  }, [dialog])

  const canSubmitForm = () => {
    const { usersId, shiftId, partyId } = form
    return shiftId && partyId || usersId.length > 0
  }

  const handleChange = name => (event, obj) => {
    setForm({ ...form, [name]: obj.id });
  }

  const handleSelectChange = name => (event, obj) => {
    setForm({ ...form, 'usersId': obj.map(o => ({ id: o.id })) })
  }

  const handlePartyChange = name => (event, obj) => {
    console.log(name, "name")
    console.log(obj, "obj")
    setForm({ ...form, [name]: obj.id })
  }

  const handleChipDelete = id => {
    setForm(form => ({ ...form, usersId: form.usersId.filter(user => user.id !== id) }))
  }

  console.log(form, "form")

  const handleSubmit = () => {
    form.usersId.length > 0 ? assignShift(form) : assignShiftToParty(form)
  }

  const selected = employees && _.filter(employees, (employee) => {
    return _.some(form.usersId, { 'id': employee.id });
  })
  const selectedDept = departments && _.find(departments, { 'id': form.partyId })

  console.log(selectedDept, "selectedDept")

  return (
    <div>
      <Dialog
        {...dialog.props}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeNewEmployeeShiftDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
        maxWidth={'sm'}
      >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Assign Shift
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent dividers>
          <Autocomplete
            id="combo-box-demo"
            size="small"
            options={shifts ? shifts : []}
            getOptionLabel={option => option.shiftName}
            onChange={handleChange('shiftId')}
            renderInput={params => (
              <TextField
                {...params}
                label="Shift"
                variant="outlined"
                placeholder="Search"
                margin="normal"
                value={form.shift}
                fullWidth
              />
            )}
          />

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
                    onChange={handleSelectChange('employee')}
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
        </DialogContent>

        <DialogActions>
          <Button onClick={closeNewEmployeeShiftDialog} color="primary">
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


AssignShiftDialog.propTypes = {
  closeNewEmployeeShiftDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dialog: Selectors.makeSelectEmployeeShiftDialog(),
  employees: Selectors.makeSelectEmployees(),
  departments: Selectors.makeSelectDepartments(),
  branches: Selectors.makeSelectBranches(),
  roles: Selectors.makeSelectRoles(),
  shifts: Selectors.makeSelectShifts(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewEmployeeShiftDialog: () => dispatch(Actions.closeNewEmployeeShiftDialog()),
    assignShift: (data) => dispatch(Actions.assignShift(data)),
    assignShiftToParty: (data) => dispatch(Actions.assignShiftToParty(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AssignShiftDialog);