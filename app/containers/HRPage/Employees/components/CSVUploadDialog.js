import React, {memo} from 'react';
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
import ScheduleIcon from '@material-ui/icons/Schedule'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Slide, Table, TableBody, TableRow, TableCell, Typography, TextField, Toolbar } from '@material-ui/core';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {},
  },
  table: {
    "& td": {
      border: "0 !important"
    }
  },
  button: {
    margin: theme.spacing(1, 0),
  },
  input: {
    display: 'none',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CSVUploadDialog(props) {
  const classes = useStyles();
  const { closeNewLeaveRequestDialog, dialog } = props;
  const [form, setForm] = React.useState({
    csv: []
  });

  React.useEffect(() => {
    if(dialog.type == 'edit'){
      setForm({...form})
    }
  }, [dialog])

  const canSubmitForm = () => {
    const { csv } = form
    return csv.length > 0
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({...form, [name]: value});
  }

  const handleSelectChange = () => {}

  const handleDateChange = () => {}

  const handleSubmit = () => {}

  return (
    <div>
      <Dialog
        {...dialog.props}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeNewLeaveRequestDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
					Upload CSV
        </DialogTitle>

        <DialogContent dividers>
          <Table className={classes.table} size="small">
            <TableBody>
              <TableRow>
                <TableCell>
                  <Button
                    component="label"
                    variant="outlined"
                    color="default"
                    className={classes.button}
                    startIcon={<AttachFileIcon />}
                    disableElevation
                  >
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="contained-button-file"
                      multiple
                      type="file"
                    />
                    Attach a file
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeNewLeaveRequestDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!canSubmitForm()} color="primary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


CSVUploadDialog.propTypes = {
  closeNewLeaveRequestDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dialog: Selectors.makeSelectLeaveRequestDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewLeaveRequestDialog: () => dispatch(Actions.closeNewLeaveRequestDialog()),
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
)(CSVUploadDialog);