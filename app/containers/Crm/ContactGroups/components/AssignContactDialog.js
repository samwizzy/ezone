/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Autocomplete } from '@material-ui/lab';
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  makeStyles,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Divider,
  MenuItem,
  Slide,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  FormControlLabel,
  Radio,
  Grid,
  FormControl,
  FormGroup,
  FormLabel,
  RadioGroup,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import * as Selectors from '../selectors';
import * as Actions from '../actions';
import LoadingIndicator from '../../../../components/LoadingIndicator';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AssignContactDialog = props => {
  const classes = useStyles();
  const { loading, assignContactDialog, closeNewAssignContactDialog } = props;
  const [selectedDate, handleDateChange] = React.useState(new Date());

  const [form, setForm] = React.useState({
    contact: '',
    groups: []
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
  }

  const canSubmitForm = () => {
    return false
  }

  return (
    <div>
      <Dialog
        {...assignContactDialog.props}
        onClose={closeNewAssignContactDialog}
        keepMounted
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6">
              Assign a Contact
            </Typography>
          </Toolbar>
        </AppBar>
        <Divider />

        <DialogContent>
          <form className={classes.root}>
            <Table className={classes.table}>
              <TableBody>
                <TableRow>
                  <TableCell><FormLabel component="legend">Contact / Company</FormLabel></TableCell>
                  <TableCell>
                    <TextField
                      id="contact"
                      name="contact"
                      placeholder="Select Contact / Company"
                      select
                      fullWidth
                      className={classes.textField}
                      variant="outlined"
                      size="small"
                      label="Contact / Company"
                      value={form.contact}
                      onChange={handleChange}
                    >
                      <MenuItem key={0} value="3">
                        No record
                      </MenuItem>
                    </TextField>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><FormLabel component="legend">Assign Group</FormLabel></TableCell>
                  <TableCell>
                    <FormControl component="fieldset" className={classes.formControl}>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox checked={form.groups} onChange={handleChange} name="john" />}  
                          label="John Foundation"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={form.groups} onChange={handleChange} name="marine" />}
                          label="First Marine"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={form.groups} onChange={handleChange} name="optisoft" />}
                          label="Optisoft Technology"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={form.groups} onChange={handleChange} name="jitiful" />}
                          label="Jitiful Technology"
                        />
                      </FormGroup>
                    </FormControl>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeNewAssignContactDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!canSubmitForm()}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AssignContactDialog.propTypes = {
  loading: PropTypes.bool,
  assignContactDialog: PropTypes.object,
  closeNewAssignContactDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  assignContactDialog: Selectors.makeSelectAssignContactDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewAssignContactDialog: () => dispatch(Actions.closeNewAssignContactDialog()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AssignContactDialog);
