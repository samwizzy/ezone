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
import { AssignShift } from '../../components/AddButton';

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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState(0);
  const [form, setForm] = React.useState({
    userId: '',
    shiftId: '',
  });
  console.log(shifts, "shifts in assign")
  
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
    //assignShift();
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

  const handleSelectChange = (event) => {
    setForm({...form, [event.target.name]: {id: event.target.value}});
  }
  const handleSubmit = () => {
    assignShift(form)
  }

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
                    {shifts && shifts.map((shift) => (
                    <MenuItem key={shifts.id} value={shift.id}>
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
                    {employees && employees.map((employee) => (
                    <MenuItem key={employee.id} value={employee.id}>
                      {employee.firstName} {employee.lastName}
                    </MenuItem>
                    ))}
                  </TextField>
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