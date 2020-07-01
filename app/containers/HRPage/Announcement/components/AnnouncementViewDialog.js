import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, MenuItem, Slide, Table, TableBody, TableRow, TableCell, Typography, TextField, Toolbar } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
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

function AnnouncementViewDialog(props) {
  const classes = useStyles();
  const { closeAnnouncementViewDialog, dialog } = props;

  if (!dialog.data) {
    return ''
  }

  return (
    <div className={classes.root}>
      <Dialog
        {...dialog.props}
        TransitionComponent={Transition}
        onClose={closeAnnouncementViewDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle disableTypography>
          <Typography variant="subtitle2">
            {dialog.data.title}
          </Typography>
          <IconButton aria-label="close" className={classes.closeButton} onClick={closeAnnouncementViewDialog}><CloseIcon /></IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Grid container>
            <Grid item xs={12}>
              <DialogContentText>
                <Typography variant="subtitle1">
                  {dialog.data.message}
                </Typography>
              </DialogContentText>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeAnnouncementViewDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


AnnouncementViewDialog.propTypes = {
  closeAnnouncementViewDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dialog: Selectors.makeSelectAnnouncementViewDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeAnnouncementViewDialog: () => dispatch(Actions.closeAnnouncementViewDialog()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AnnouncementViewDialog);