import React, {memo} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import {AppBar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, MenuItem, Slide, Table, TableBody, TableRow, TableCell, Typography, TextField, Toolbar} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import moment from 'moment'
import CloseIcon from '@material-ui/icons/Close'

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
  return (
    <div className={classes.root}>
      <Dialog
        {...dialog.props}
        TransitionComponent={Transition}
        
        onClose={closeAnnouncementViewDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle  disableTypography>
        {dialog.props.data && 
          <Typography variant="h6">
            {dialog.props.data[1]}
          </Typography>
        }
          <IconButton aria-label="close" className={classes.closeButton} onClick={closeAnnouncementViewDialog}><CloseIcon /></IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <DialogContentText>
              {dialog.props.data && 
                <Typography variant="subtitle1">
                {dialog.props.data[1]}
                </Typography>
              }
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
    createRole: (data) => dispatch(Actions.createRole(data)),
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
)(AnnouncementViewDialog);