import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, MenuItem, Slide, Table, TableBody, TableRow, TableCell, Typography, TextField, Toolbar } from '@material-ui/core';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import moment from 'moment'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import AddCircleIcon from '@material-ui/icons/AddCircle'

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
  expiryDate: moment().format("YYYY-MM-DDTHH:mm:ss.SSS"),
  notifyAllLocations: true,
  notifyOthers: 'true',
  announcementType: '',
}

function AddAnnouncementDialog(props) {
  const classes = useStyles();
  const { closeNewAnnouncementDialog, dialog, createAnnouncement } = props;
  const [form, setForm] = useState({ ...initialState });

  console.log(dialog, "dialog checking")

  useEffect(() => {
    if (dialog.type === 'edit' && dialog.data) {
      setForm({ ...dialog.data })
    } else {
      setForm({ ...form })
    }
  }, [dialog])

  const canSubmitForm = () => {
    const { title, message, announcementType } = form
    return title.length > 0 && message.length > 0 && announcementType
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value });
  }

  const handleDateChange = name => date => {
    setForm({ ...form, [name]: moment(date).format('YYYY-MM-DDTHH:mm:ss') })
  }

  const handleSubmit = () => {
    createAnnouncement(form)
  }

  console.log(form, "form")
  console.log(dialog, "dialog")

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
          {/*
            <Grid item xs={12}>
              <Toolbar style={{paddingLeft: 0}}>
                <Typography variant="h6">Announcement Settings</Typography></Toolbar>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="send-to"
                name="SendTo"
                placeholder="Select Employee"
                select
                margin="normal"
                variant="outlined"
                size="small"
                label="Send to"
                helperText="Please select an employee to send to"
                value={form.sendTo}
                onChange={handleChange}
              >
                <MenuItem key={0} value="3">
                  No record
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Table className={classes.table}>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <TextField
                      name="message"
                      label="Add Employee"
                      id="outlined-title"
                      variant="outlined"
                      size="small"
                      value={form.employee}
                      onChange={handleChange}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton><DeleteOutlinedIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <TextField
                      name="message"
                      label="Add Employee"
                      id="outlined-title"
                      variant="outlined"
                      size="small"
                      value={form.employee}
                      onChange={handleChange}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton><AddCircleIcon /></IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton><DeleteOutlinedIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
            */}
          <TextField
            id="type"
            name="announcementType"
            placeholder="Message Type"
            select
            margin="normal"
            variant="outlined"
            size="small"
            label="Announcement Type"
            helperText={!form.announcementType && "Please select a message type"}
            value={form.announcementType}
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
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewAnnouncementDialog: () => dispatch(Actions.closeNewAnnouncementDialog()),
    createAnnouncement: (data) => dispatch(Actions.createAnnouncement(data)),
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
)(AddAnnouncementDialog);
