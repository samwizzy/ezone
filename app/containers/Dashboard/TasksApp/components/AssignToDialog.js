import React, {memo} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, MenuItem, Slide, Typography, TextField } from '@material-ui/core';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: 350,
    '& .MuiTextField-root': {
      margin: theme.spacing(1, 0)
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AssignToDialog(props) {
  const classes = useStyles()
  const { closeAssignToDialog, shareDocument, data, users, files } = props
  const [form, setForm] = React.useState({
    docId: "",
    name: "",
    sharedTo: ""
  })

  React.useEffect(() => {
    if(data.data != null){
      setForm(_.set(form, "docId", data.data.id))
      setForm(_.set(form, "name", data.data.docName))
    }
  }, [data])

  const handleChange = (event) => {
    setForm(_.set({...form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
  }

  const handleSubmit = () => {
    shareDocument(form)
  }

  console.log(data, 'checking shared...')
  console.log(form, 'checking form...')

  return (
    <div>
      <Dialog
        {...data.props}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeAssignToDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Assign Task</DialogTitle>
        <Divider />
        <DialogContent>
          <form className={classes.root}>
            <TextField
              id="select-head"
              name="sharedTo"
              placeholder="Select employee to assign to task"
              select
              fullWidth
              className={classes.textField}
              variant="outlined"
              size="small"
              label="Share To"
              value={form.sharedTo}
              onChange={handleChange}
            >
              {users && users.map(user => (
                <MenuItem key={user.uuId} value={user.uuId}>
                  {user.emailAddress}
                </MenuItem>
              ))}
            </TextField>
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={closeAssignToDialog} color="primary">
            Cancel
          </Button>
          <Button variant="outlined" onClick={handleSubmit} color="primary">
            Share
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


AssignToDialog.propTypes = {
  openAssignToDialog: PropTypes.func,
  closeAssignToDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  data: Selectors.makeSelectAssignTaskDialog(),
  users: Selectors.makeSelectEmployees(),
  files: Selectors.makeSelectFiles(),
});

function mapDispatchToProps(dispatch) {
  return {
    openAssignToDialog: () => dispatch(Actions.openAssignToDialog()),
    closeAssignToDialog: () => dispatch(Actions.closeAssignToDialog()),
    shareDocument: data => dispatch(Actions.shareDocument(data)),
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
)(AssignToDialog);