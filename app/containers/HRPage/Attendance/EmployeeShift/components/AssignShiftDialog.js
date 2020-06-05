import { AppBar, Button, Dialog, DialogActions, DialogContent, MenuItem, Slide, Tab, Table, TableBody, TableCell, TableRow, Tabs, TextField, Toolbar, Typography, withStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';

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

//const employees = [{label: 'Sunday'}, {label: 'Monday'}, {label: 'Tuesday'}, {label: 'Wednesday'}, {label: 'Thursday'}, {label: 'Friday'}];

function AssignShiftDialog(props) {
  const classes = useStyles();
  const { closeNewEmployeeShiftDialog, dialog, employees, assignShift, shifts } = props;
  const [form, setForm] = React.useState({
    userId: [],
    shiftId: '',
  });
  console.log(shifts, "shifts in assign")

  React.useEffect(() => {
    /*
    if(dialog.type == 'edit'){
      setForm({...form})
    }
    */
  }, [dialog])

  const canSubmitForm = () => {
    const {userId, shiftId } = form
    return userId && shiftId
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({...form, [name]: value});
  }

  const handleSelectChange = name => (event) => {
    console.log(name, "name")
    console.log(event, "obj")
    // setForm({...form, [name]: {id: obj.id}});
  }
  const handleSubmit = () => {
    assignShift(form)
  }

  console.log(form, "form")

  return (
    <div>
      <Dialog
        {...dialog.props}
        TransitionComponent={Transition}
        onClose={closeNewEmployeeShiftDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Assign Shift
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent dividers>
          <Table className={classes.table} size="small">
            <TableBody>
              <TableRow>
                <TableCell>
                  <TextField
                    id="shiftId"
                    name="shiftId"
                    placeholder="Shift"
                    select
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    size="small"
                    label="Shift"
                    value={form.shiftId}
                    onChange={handleChange}
                  >
                    {shifts && shifts.map((shift, i) => (
                    <MenuItem key={i} value={shift.id}>
                      {shift.shiftName}
                    </MenuItem>
                    ))}
                  </TextField>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <TextField
                    id="userId"
                    name="userId"
                    placeholder="Employee"
                    select
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    size="small"
                    label="Employee"
                    value={form.userId}
                    onChange={handleChange}
                  >
                    {employees && employees.map((employee, i) => (
                    <MenuItem key={i} value={employee.id}>
                      {employee.firstName} {employee.lastName}
                    </MenuItem>
                    ))}
                  </TextField>

                  <Autocomplete
                    multiple
                    id="tags-employees"
                    size="small"
                    options={employees}
                    getOptionLabel={(option) => option.firstName + ' ' + option.lastName}
                    // defaultValue={[top100Films[13]]}
                    onChange={handleSelectChange('userId')}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Employees"
                        placeholder="Search"
                        margin="normal"
                        fullWidth
                      />
                    )}
                  />
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


AssignShiftDialog.propTypes = {
  closeNewEmployeeShiftDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dialog: Selectors.makeSelectEmployeeShiftDialog(),
  employees: Selectors.makeSelectEmployees(),
  shifts: Selectors.makeSelectShifts(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewEmployeeShiftDialog: () => dispatch(Actions.closeNewEmployeeShiftDialog()),
    assignShift: (data) => dispatch(Actions.assignShift(data)),
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
)(AssignShiftDialog);