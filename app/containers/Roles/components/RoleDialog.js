import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, MenuItem, Slide, Table, TableBody, TableRow, TableCell, Typography, TextField, Toolbar } from '@material-ui/core';
import * as Selectors from '../selectors';
import * as Actions from '../actions';
import moment from 'moment'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import AddCircleIcon from '@material-ui/icons/AddCircle'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const initialState = {
  name: '',
  description: '',
}

function RoleDialog(props) {
  const classes = useStyles();
  const { closeNewRoleDialog, dialog, createRole, updateRole } = props;
  const [form, setForm] = React.useState({
    name: '',
    description: '',
  });

  console.log(dialog, "dialog checking")

  React.useEffect(() => {
    if (dialog.type === 'edit') {
      setForm({ ...form })
    } else {
      setForm({ ...initialState })
    }
  }, [dialog])

  const canSubmitForm = () => {
    const { name, description } = form
    return name.length > 0 && description.length > 0
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value });
  }

  const handleDateChange = name => date => {
    setForm({ ...form, [name]: moment(date).format('YYYY-MM-DDTHH:mm:ss.SSS') })
  }

  const handleSubmit = () => {
    dialog.type === 'new' ?
      createRole(form) : updateRole(form);
    setForm({ ...initialState })
  }

  console.log(form, "form")

  return (
    <div className={classes.root}>
      <Dialog
        {...dialog.props}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeNewRoleDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Add Role
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent dividers>
          <TextField
            name="name"
            label="Name"
            id="outlined-name"
            fullWidth
            margin="normal"
            variant="outlined"
            size="small"
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            name="description"
            label="Description"
            id="outlined-description"
            fullWidth
            margin="normal"
            variant="outlined"
            multiline
            rows={4}
            rowsMax={10}
            size="small"
            value={form.description}
            onChange={handleChange}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={closeNewRoleDialog} color="primary">
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


RoleDialog.propTypes = {
  closeNewRoleDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dialog: Selectors.makeSelectRoleDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewRoleDialog: () => dispatch(Actions.closeNewRoleDialog()),
    createRole: (data) => dispatch(Actions.createRole(data)),
    updateRole: (data) => dispatch(Actions.updateRole(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(RoleDialog);
