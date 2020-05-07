import React, {memo} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withStyles, AppBar, Box, Button, Checkbox, Dialog, DialogActions, DialogContent, Divider, MenuItem, Popover, Slide, Tabs, Tab, Table, TableBody, TableRow, TableCell, Typography, TextField, Toolbar } from '@material-ui/core';
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
  table: {
    minWidth: 350,
    "& td": {
      border: "0 !important"
    }
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
  toolbar : { 
    flexGrow: 1,
    borderBottom: `1px solid ${theme.palette.divider}`,
    ...theme.mixins.toolbar
  },
  typography: {
    padding: theme.spacing(2),
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

const employees = [{label: 'Sunday'}, {label: 'Monday'}, {label: 'Tuesday'}, {label: 'Wednesday'}, {label: 'Thursday'}, {label: 'Friday'}];

function HolidayDialog(props) {
  const classes = useStyles();
  const { closeNewEmployeeShiftDialog, dialog } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState(0);
  const [form, setForm] = React.useState({
    employee: '',
    shift: '',
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
    if(dialog.type == 'edit'){
      setForm({...form})
    }
  }, [dialog])

  const canSubmitForm = () => {
    const {employee, shift } = form
    return employee.length > 0 && shift.length > 0
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({...form, [name]: value});
  }

  const handleSelectChange = () => {}

  const handleSubmit = () => {}

  return (
    <div>
      <Dialog
        {...dialog.props}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeNewEmployeeShiftDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              New Holiday
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent dividers>
          <Table className={classes.table} size="small">
            <TableBody>
              <TableRow>
                <TableCell>
                  <TextField
                    id="status"
                    name="status"
                    placeholder="Status"
                    select
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    size="small"
                    label="Status"
                    value={form.shift}
                    onChange={handleChange}
                  >
                    <MenuItem key={0} value="">
                      No record
                    </MenuItem>
                  </TextField>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Autocomplete
                    id="combo-box-demo"
                    size="small"
                    options={employees}
                    getOptionLabel={option => option.label}
                    onChange={(evt, value) => handleSelectChange(evt, value)}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Employee"
                        variant="outlined"
                        placeholder="Search"
                        margin="normal"
                        value={form.employee}
                        fullWidth
                      />
                    )}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <TextField
                    id="employee-select"
                    name="employee"
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
                          getOptionLabel={(option) => option.label}
                          renderOption={(option, { selected }) => (
                            <React.Fragment>
                              <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                              />
                              {option.label}
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
                          multiple
                          id="checkboxes-tags-demo"
                          size="small"
                          options={employees}
                          disableCloseOnSelect
                          getOptionLabel={(option) => option.label}
                          renderOption={(option, { selected }) => (
                            <React.Fragment>
                              <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                              />
                              {option.label}
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
                          multiple
                          id="checkboxes-tags-demo"
                          size="small"
                          options={employees}
                          disableCloseOnSelect
                          getOptionLabel={(option) => option.label}
                          renderOption={(option, { selected }) => (
                            <React.Fragment>
                              <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                              />
                              {option.label}
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
                          multiple
                          id="checkboxes-tags-demo"
                          size="small"
                          options={employees}
                          disableCloseOnSelect
                          getOptionLabel={(option) => option.label}
                          renderOption={(option, { selected }) => (
                            <React.Fragment>
                              <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                              />
                              {option.label}
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
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
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


HolidayDialog.propTypes = {
  closeNewEmployeeShiftDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dialog: Selectors.makeSelectHolidayDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewEmployeeShiftDialog: () => dispatch(Actions.closeNewHolidayDialog()),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HolidayDialog);