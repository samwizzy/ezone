import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import { AppBar, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, MenuItem, Slide, Table, TableBody, TableRow, TableCell, Typography, TextField, Toolbar } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import * as Selectors from '../selectors';
import * as Actions from '../actions';
import moment from 'moment'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ScheduleDetailsDialog(props) {
  const classes = useStyles();
  const { closeScheduleDetailsDialog, dialog } = props;

  console.log(dialog, "dialog")

  if (!dialog.data) {
    return ''
  }

  return (
    <div className={classes.root}>
      <Dialog
        {...dialog.props}
        TransitionComponent={Transition}
        onClose={closeScheduleDetailsDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <Typography variant="h6" component="p">
            {dialog.data.title}
          </Typography>
          <IconButton aria-label="close" className={classes.closeButton} onClick={closeScheduleDetailsDialog}><CloseIcon /></IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" color="textPrimary">Description</Typography>
              <Typography variant="body1" color="textSecondary">{dialog.data.description}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Start Date</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" color="textSecondary">
                {moment(dialog.data.startDate).format('llll')}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">End Date</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" color="textSecondary">
                {moment(dialog.data.endDate).format('llll')}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Location</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" color="textSecondary">{dialog.data.location}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Created By</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" color="textSecondary">{dialog.data.createdBy}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Hosted By</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" color="textSecondary">{dialog.data.host}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Participants (Users)</Typography>
            </Grid>
            <Grid item xs={6}>
              {dialog.data.userParticipants.map((user, i) =>
                <Chip key={i} label={user.fullName} variant="outlined" />
              )}
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Participants (Contacts)</Typography>
            </Grid>
            <Grid item xs={6}>
              {dialog.data.contactParticipants.map((contact, i) =>
                <Chip key={i} label={contact.fullName} variant="outlined" />
              )}
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Date Created</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" color="textSecondary">
                {moment(dialog.data.dateCreated).format('ll')}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeScheduleDetailsDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


ScheduleDetailsDialog.propTypes = {
  closeScheduleDetailsDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dialog: Selectors.makeSelectScheduleDetailsDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeScheduleDetailsDialog: () => dispatch(Actions.closeScheduleDetailsDialog()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ScheduleDetailsDialog);
