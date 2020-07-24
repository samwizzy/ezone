import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withStyles, AppBar, Avatar, Box, Button, Checkbox, Chip, Dialog, DialogActions, DialogContent, Grid, MenuItem, Slide, Popover, Tabs, Tab, Typography, TextField, Toolbar } from '@material-ui/core';
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

const values = [
  { label: 'Creativity', value: 'CREATIVITY', icon: '' },
  { label: 'Leadership', value: 'LEADERSHIP', icon: '' },
  { label: 'Team Player', value: 'TEAM PLAYER', icon: '' },
  { label: 'Excellence', value: 'EXCELLENCE', icon: '' },
  { label: 'Initiative', value: 'INITIATIVE', icon: '' },
  { label: 'Integrity', value: 'INTEGRITY', icon: '' },
  { label: 'Customer Focus', value: 'CUSTOMER FOCUS', icon: '' },
  { label: 'Growth', value: 'GROWTH', icon: '' },
  { label: 'Passion', value: 'PASSION', icon: '' },
  { label: 'Visionary', value: 'VISIONARY', icon: '' },
];

function RecognitionDialog(props) {
  const classes = useStyles();
  const { closeNewRecognitionDialog, createRecognition, dialog, employees, departments, branches, roles } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const [value, setValue] = React.useState(0);
  const [form, setForm] = React.useState({
    title: '',
    values: '',
    description: '',
    branches: [],
    departments: [],
    roles: [],
    employees: []
  });

  React.useEffect(() => {
    if (dialog.type == 'edit') {
      setForm({ ...form })
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
    const { title, values, description, employees, departments, branches } = form
    return title.length > 0 && description.length > 0 && employees.length > 0
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value });
  }

  const handleSelectChange = name => (event, obj) => {
    setForm({ ...form, [name]: obj })
  }

  const handleChipDelete = (name, id) => {
    setForm(form => ({ ...form, [name]: form[name].filter(user => user.id !== id) }))
  }

  const handleSubmit = () => {
    createRecognition(form)
  }

  console.log(form, "recognition form")

  return (
    <div>
      <Dialog
        {...dialog.props}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeNewRecognitionDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Add Recognition
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent dividers>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                id="title"
                name="title"
                placeholder="Title"
                fullWidth
                margin="normal"
                variant="outlined"
                size="small"
                label="Title"
                value={form.title}
                onChange={handleChange}
              />
            </Grid>
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
                        onChange={handleSelectChange('employees')}
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
                        onChange={handleSelectChange('departments')}
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
                        onChange={handleSelectChange('branches')}
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
                        onChange={handleSelectChange('roles')}
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
                {form.employees && form.employees.map((user, i) =>
                  <Chip
                    key={i}
                    avatar={<Avatar>{user.firstName && user.firstName[0].toUpperCase()}</Avatar>}
                    label={user.firstName + ' ' + user.lastName}
                    variant="outlined"
                    onDelete={() => handleChipDelete('employees', user.id)}
                  />
                )}
                {form.departments && form.departments.map((dept, i) =>
                  <Chip
                    key={i}
                    avatar={<Avatar>{dept.name[0].toUpperCase()}</Avatar>}
                    label={dept.name}
                    variant="outlined"
                    onDelete={() => handleChipDelete('departments', dept.id)}
                  />
                )}
                {form.branches && form.branches.map((branch, i) =>
                  <Chip
                    key={i}
                    avatar={<Avatar>{branch.name[0].toUpperCase()}</Avatar>}
                    label={branch.name}
                    variant="outlined"
                    onDelete={() => handleChipDelete('branches', branch.id)}
                  />
                )}
                {form.roles && form.roles.map((role, i) =>
                  <Chip
                    key={i}
                    avatar={<Avatar>{role.name[0].toUpperCase()}</Avatar>}
                    label={role.name}
                    variant="outlined"
                    onDelete={() => handleChipDelete('roles', role.id)}
                  />
                )}
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="values"
                name="values"
                placeholder="Values"
                select
                fullWidth
                variant="outlined"
                margin="normal"
                size="small"
                label="Core Values"
                value={form.values}
                onChange={handleChange}
              >
                <MenuItem key="" value="" disabled>
                  Select core values
                </MenuItem>
                {values.map((val, i) =>
                  <MenuItem key={i} value={val.value}>
                    {val.label}
                  </MenuItem>
                )}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeNewRecognitionDialog} color="primary">
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


RecognitionDialog.propTypes = {
  closeNewRecognitionDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dialog: Selectors.makeSelectRecognitionDialog(),
  employees: Selectors.makeSelectEmployees(),
  departments: Selectors.makeSelectDepartments(),
  branches: Selectors.makeSelectBranches(),
  roles: Selectors.makeSelectRoles(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewRecognitionDialog: () => dispatch(Actions.closeNewRecognitionDialog()),
    createRecognition: (data) => dispatch(Actions.createRecognition(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(RecognitionDialog);
