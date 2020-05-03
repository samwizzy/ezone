import React, {memo} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, MenuItem, Slide, Typography, TextField, Toolbar } from '@material-ui/core';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1, 0)
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AddShiftDialog(props) {
  const classes = useStyles();
  const { closeNewAttendanceDialog, dialog } = props;
  const [form, setForm] = React.useState({
    title: '',
    sendTo: '',
    messageType: '',
  });

  React.useEffect(() => {
    if(dialog.type == 'edit'){
      setForm({...form})
    }
  }, [dialog])

  const canSubmitForm = () => {
    const {title, messageType, sendTo } = form
    return title.length > 0 && messageType.length > 0 && sendTo.length > 0
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({...form, [name]: value});
  }

  const handleSubmit = () => {
  }

  console.log(form, 'checking form employee...')

  return (
    <div>
      <Dialog
        {...dialog.props}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeNewAttendanceDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Add attendance
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
                  variant="outlined"
                  size="small"
                  value={form.title}
                  onChange={handleChange}
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="send-to"
                  name="sendTo"
                  placeholder="Send To"
                  select
                  fullWidth
                  className={classes.textField}
                  variant="outlined"
                  size="small"
                  label="Send To"
                  value={form.sendTo}
                  onChange={handleChange}
                >
                  <MenuItem key={0} value="1">
                      No record
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="message-type"
                  name="messageType"
                  placeholder="Message Type"
                  select
                  fullWidth
                  className={classes.textField}
                  variant="outlined"
                  size="small"
                  label="Message Type"
                  value={form.messageType}
                  onChange={handleChange}
                >
                  <MenuItem key={0} value="1">
                    No record
                  </MenuItem>
                </TextField>
              </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeNewAttendanceDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!canSubmitForm()} color="primary">
            Next
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


AddShiftDialog.propTypes = {
  closeNewAttendanceDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dialog: Selectors.makeSelectAttendanceDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewAttendanceDialog: () => dispatch(Actions.closeNewAttendanceDialog()),
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
)(AddShiftDialog);