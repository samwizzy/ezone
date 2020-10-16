import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import { AppBar, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, MenuItem, Slide, Typography, TextField, Toolbar } from '@material-ui/core';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  root: {},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const initialState = {
  name: '',
  description: '',
  partyHead: { id: '' },
  assistantPartyHead: { id: '' },
  partyGroupId: '',
  tagId: 1
}

function AddBranchDialog(props) {
  const classes = useStyles();
  const { loading, closeNewBranchDialog, createBranch, partyGroups, employees, dialog } = props;
  const [form, setForm] = useState({ ...initialState });

  console.log(dialog, "dialog checking")
  console.log(partyGroups, "partyGroups inside department dialogue");

  useEffect(() => {
    if (dialog.type === 'edit' && dialog.data) {
      setForm({ ...dialog.data })
    } else {
      setForm({ ...initialState })
    }
  }, [dialog])

  const canSubmitForm = () => {
    const { name, description, partyGroupId, partyHead, assistantPartyHead, tag } = form
    return name.length > 0 && partyHead && partyGroupId && assistantPartyHead
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value });
  }

  const handleSelectChange = (event) => {
    setForm({ ...form, [event.target.name]: { id: event.target.value } });
  }

  const handleSubmit = event => {
    createBranch(form)
  }

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
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Add branch
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent dividers>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                id="party-group-id"
                name="partyGroupId"
                placeholder="Party group"
                select
                fullWidth
                margin="dense"
                variant="outlined"
                size="small"
                label="Party group"
                value={form.partyGroupId}
                onChange={handleChange}
              >
                {partyGroups && partyGroups.length === 0 &&
                  <MenuItem key="" value="">
                    No Party Group Record
                  </MenuItem>
                }
                {partyGroups && partyGroups.map((partyGroup) => (
                  <MenuItem key={partyGroup.id} value={partyGroup.id}>
                    {partyGroup.name}
                  </MenuItem>
                ))};
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Branch Name"
                id="branch-name"
                fullWidth
                margin="dense"
                variant="outlined"
                size="small"
                value={form.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                id="branch-description"
                fullWidth
                margin="dense"
                variant="outlined"
                size="small"
                value={form.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="party-head"
                name="partyHead"
                placeholder="Branch Lead"
                select
                fullWidth
                margin="dense"
                variant="outlined"
                size="small"
                label="Branch Lead"
                value={form.partyHead.id}
                onChange={handleSelectChange}
              >
                {employees && employees.length === 0 &&
                  <MenuItem key="" value="">
                    No Employee Record
                  </MenuItem>
                }
                {employees && employees.map((employee) => (
                  <MenuItem key={employee.id} value={employee.id}>
                    {employee.firstName} {employee.lastName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="assistant-party-head"
                name="assistantPartyHead"
                placeholder="Assistant Branch Lead"
                select
                fullWidth
                margin="dense"
                variant="outlined"
                size="small"
                label="Assistant Branch Lead"
                value={form.assistantPartyHead.id}
                onChange={handleSelectChange}
              >
                {employees && employees.length === 0 &&
                  <MenuItem key="" value="">
                    No Employee Record
                  </MenuItem>
                }
                {employees && employees.map((employee) => (
                  <MenuItem key={employee.id} value={employee.id}>
                    {employee.firstName} {employee.lastName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          {/*
            <Grid item xs={12}>
              <TextField
                id="partyHead"
                name="partyHead"
                placeholder="Branch Lead"
                select
                fullWidth
                variant="outlined"
                margin="dense"
                size="small"
                label="Branch Lead"
                value={form.partyHead.id}
                onChange={handleSelectChange}
              >
                {employees.map((employee) => (
                <MenuItem key={employee.id} value={employee.id}>
                    {employee.firstName} {employee.lastName}
                </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="assistantPartyHead"
                name="assistantPartyHead"
                placeholder="Assistant Branch Lead"
                select
                fullWidth
                margin="dense"
                variant="outlined"
                size="small"
                label="Assistant Branch Lead"
                value={form.assistantPartyHead.id}
                onChange={handleSelectChange}
              >
                {employees.map((employee) => (
                <MenuItem key={employee.id} value={employee.id}>
                    {employee.firstName} {employee.lastName}
                </MenuItem>
                ))}
              </TextField>
            </Grid>
                */}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={closeNewBranchDialog}
            color="primary"
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading ? loading : !canSubmitForm()}
            color="primary"
            endIcon={loading && <CircularProgress size={20} />}
          >
            Save
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
  loading: Selectors.makeSelectLoading(),
  dialog: Selectors.makeSelectBranchDialog(),
  employees: Selectors.makeSelectEmployees(),
  partyGroups: Selectors.makeSelectPartyGroups(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewBranchDialog: () => dispatch(Actions.closeNewBranchDialog()),
    createBranch: (data) => dispatch(Actions.createBranch(data)),
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
