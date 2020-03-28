import React, {memo} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, MenuItem, Slide, Typography, TextField } from '@material-ui/core';
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

function AddBranchDialog(props) {
  const classes = useStyles();
  const { closeNewBranchDialog, dialog } = props;
  const [form, setForm] = React.useState({
    name: '',
    description: '',
    head: '',
  });

  console.log(dialog, "dialog checking")

  React.useEffect(() => {
    if(dialog.type == 'edit'){
      setForm({...form})
    }
  }, [dialog])

  const canSubmitForm = () => {
    const {name, description, head } = form
    return name.length > 0 && description.length > 0 && head.length > 0
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
        onClose={closeNewBranchDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Add branch
        </DialogTitle>
        <Divider />

        <DialogContent>
          <form className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <TextField
                    name="name"
                    label="Firstname"
                    id="outlined-title"
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={form.name}
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    name="Description"
                    label="description"
                    id="outlined-title"
                    fullWidth
                    multiline
                    rows="4"
                    rowsMax="4"
                    variant="outlined"
                    size="small"
                    value={form.description}
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="head"
                    name="head"
                    placeholder="Contact person"
                    select
                    fullWidth
                    className={classes.textField}
                    variant="outlined"
                    size="small"
                    label="Contact Person"
                    value={form.head}
                    onChange={handleChange}
                  >
                    <MenuItem key={0} value="1">
                        No record
                    </MenuItem>
                  </TextField>
                </Grid>
            </Grid>
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeNewBranchDialog} color="primary">
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


AddBranchDialog.propTypes = {
  closeNewBranchDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dialog: Selectors.makeSelectBranchDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewBranchDialog: () => dispatch(Actions.closeNewBranchDialog()),
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
)(AddBranchDialog);