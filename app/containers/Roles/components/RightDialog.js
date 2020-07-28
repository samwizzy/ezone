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
  cancreate: true,
  candelete: true,
  canedit: true,
  canview: true,
  module: {
    moduleName: ''
  },
  orgId: ''
}

function RightDialog(props) {
  const classes = useStyles();
  const { closeNewRightDialog, dialog, createRight, updateRight } = props;
  const [form, setForm] = React.useState({ ...initialState });

  console.log(dialog, "dialog checking")

  React.useEffect(() => {
    if (dialog.type === 'edit') {
      setForm({ ...form })
    } else {
      setForm({ ...initialState })
    }
  }, [dialog])

  const canSubmitForm = () => {
    const { module } = form
    return module.moduleName.length > 0
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, module: { [name]: value } });
  }

  const handleSubmit = () => {
    dialog.type === 'new' ?
      createRight(form) : updateRight(form);
  }

  console.log(form, "form")

  return (
    <div className={classes.root}>
      <Dialog
        {...dialog.props}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeNewRightDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Add Right
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent dividers>
          <TextField
            name="moduleName"
            label="Module Name"
            id="outlined-name"
            fullWidth
            margin="normal"
            variant="outlined"
            size="small"
            value={form.moduleName}
            onChange={handleChange}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={closeNewRightDialog} color="primary">
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


RightDialog.propTypes = {
  closeNewRightDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dialog: Selectors.makeSelectRightDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewRightDialog: () => dispatch(Actions.closeNewRightDialog()),
    createRight: (data) => dispatch(Actions.createRight(data)),
    updateRight: (data) => dispatch(Actions.updateRight(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(RightDialog);
