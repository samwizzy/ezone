import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { AppBar, Button, Checkbox, Dialog, DialogActions, DialogContent, FormControl, FormControlLabel, MenuItem, Slide, Typography, TextField, Toolbar } from '@material-ui/core';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import moment from 'moment';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = makeStyles(theme => ({
  root: {},
  table: {
    "& .MuiTableCell-root": {
      border: 0,
      padding: 0,
      display: "inline-block"
    },
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const initialState = {
  title: '',
  message: '',
  category: null,
  employees: [],
  expiryDate: moment().format("YYYY-MM-DDTHH:mm:ss.SSS"),
  notifyAllLocations: true,
  notifyOthers: true,
  disableComments: true,
  type: '',
}

function AddAnnouncementDialog(props) {
  const classes = useStyles();
  const { closeNewAnnouncementDialog, employees, sourcesOfHire, locations, dialog, createAnnouncement } = props;
  const [form, setForm] = useState({ ...initialState });

  console.log(dialog, "dialog checking")

  useEffect(() => {
    if (dialog.type === 'edit' && dialog.data) {
      setForm({ ...dialog.data })
    } else {
      setForm({ ...initialState })
    }
  }, [dialog])

  const canSubmitForm = () => {
    const { title, message, type } = form
    return title.length > 0 && message.length > 0 && type
  }

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  }

  const handleSelectChange = name => (event, arr) => {
    setForm({ ...form, [name]: arr })
  }

  const handleDateChange = name => date => {
    setForm({ ...form, [name]: moment(date).format('YYYY-MM-DDTHH:mm:ss') })
  }

  const handleSubmit = () => {
    createAnnouncement(form)
  }

  console.log(form, "form")
  console.log(dialog, "dialog")
  console.log(sourcesOfHire, "sourcesOfHire")

  return (
    <div className={classes.root}>
      <Dialog
        {...dialog.props}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeNewAnnouncementDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              {dialog.type === 'new' ? 'Add announcement' : 'Edit Announcement'}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent dividers>
          <TextField
            name="title"
            label="Title"
            id="outlined-title"
            fullWidth
            margin="normal"
            variant="outlined"
            size="small"
            value={form.title}
            onChange={handleChange}
          />

          <TextField
            name="message"
            label="Message"
            id="outlined-title"
            fullWidth
            margin="normal"
            variant="outlined"
            multiline
            rows={2}
            rowsMax={3}
            size="small"
            value={form.message}
            onChange={handleChange}
          />

          <Autocomplete
            multiple
            id="employees"
            size="small"
            options={employees}
            disableCloseOnSelect
            getOptionLabel={(option) => option.firstName + ' ' + option.lastName}
            onChange={handleSelectChange('employees')}
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

          <Autocomplete
            multiple
            id="locations"
            size="small"
            options={locations}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            onChange={handleSelectChange('locations')}
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
              <TextField {...params} variant="outlined" label="Locations" placeholder="Locations" margin="normal" />
            )}
          />

          <Autocomplete
            id="announcement-category"
            size="small"
            options={sourcesOfHire}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            onChange={handleSelectChange('category')}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Category" placeholder="Category" margin="normal" />
            )}
          />

          <TextField
            id="type"
            name="type"
            placeholder="Message Type"
            select
            margin="normal"
            variant="outlined"
            size="small"
            label="Announcement Type"
            helperText={!form.type && "Please select a message type"}
            value={form.type}
            onChange={handleChange}
            fullWidth
          >
            {['SMS', 'Email', 'SMS/Email'].map((type, i) =>
              <MenuItem key={i} value={type}>
                {type}
              </MenuItem>
            )}
          </TextField>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              autoOk
              inputVariant="outlined"
              format="dd/MM/yyyy"
              margin="normal"
              fullWidth
              size="small"
              name="expiryDate"
              id="expiry-date"
              label="Expiry Date"
              value={form.expiryDate}
              onChange={handleDateChange('expiryDate')}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>

          <FormControl component="fieldset" fullWidth>
            <FormControlLabel
              control={<Checkbox checked={form.disableComments} onChange={handleChange} name="disableComments" />}
              label="Disable Comments"
            />
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeNewAnnouncementDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!canSubmitForm()} color="primary">
            {dialog.type === 'new' ? 'Save' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


AddAnnouncementDialog.propTypes = {
  closeNewAnnouncementDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dialog: Selectors.makeSelectAnnouncementDialog(),
  employees: Selectors.makeSelectEmployees(),
  sourcesOfHire: Selectors.makeSelectSourcesOfHire(),
  locations: Selectors.makeSelectLocations(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewAnnouncementDialog: () => dispatch(Actions.closeNewAnnouncementDialog()),
    createAnnouncement: (data) => dispatch(Actions.createAnnouncement(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddAnnouncementDialog);
