import React, {memo} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import {AppBar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, MenuItem, Slide, Table, TableBody, TableRow, TableCell, Typography, TextField, Toolbar} from '@material-ui/core';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import moment from 'moment'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import AddCircleIcon from '@material-ui/icons/AddCircle'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1, 0)
    },
  },
  table: {
    "& .MuiTableCell-root": {
      border: "0 !important",
      padding: 0,
      display: "inline-block"
    },
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AddAnnouncementDialog(props) {
  const classes = useStyles();
  const { closeNewAnnouncementDialog, dialog, createAnnouncement } = props;
  const [form, setForm] = React.useState({
    title: '',
    message: '',
    expiryDate: "2020-05-27",
    notifyAllLocations: true,
    notifyOthers: "true",
    orgId: "ORG-1582035732806",
    type: '',
  });

  console.log(dialog, "dialog checking")

  React.useEffect(() => {
    if(dialog.type == 'edit'){
      setForm({...form})
    }
  }, [dialog])

  const canSubmitForm = () => {
    const {title, message, type } = form
    return title.length > 0 
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({...form, [name]: value});
  }

  const handleSubmit = () => {
    createAnnouncement(form)
  }

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
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Add announcement
            </Typography>
          </Toolbar>
        </AppBar>

        <Divider />

        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
              <TextField
              name="message"
              label="Message"
              id="outlined-title"
              fullWidth
              margin="normal"
              variant="outlined"
              multiline
              rows={10}
              size="small"
              value={form.message}
              onChange={handleChange}
              />
            </Grid>
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
            <Grid item xs={12}>
              <TextField
                id="type"
                name="type"
                placeholder="Message Type"
                select
                margin="normal"
                variant="outlined"
                size="small"
                label="Message Type"
                helperText="Please select a message type"
                value={form.type}
                onChange={handleChange}
              >
                <MenuItem key={0} value="SMS">
                    SMS
                </MenuItem>
                <MenuItem key={1} value="Email">
                    Email
                </MenuItem>
                <MenuItem key={2} value="SMS/Email">
                    SMS/Email
                </MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeNewAnnouncementDialog} color="primary">
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