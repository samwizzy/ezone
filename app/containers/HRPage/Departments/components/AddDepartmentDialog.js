import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import { AppBar, Button, CircularProgress, Dialog, DialogActions, DialogContent, Grid, MenuItem, Slide, Typography, TextField, Toolbar } from '@material-ui/core';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';

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
  partyHead: { id: '' },
  assistantPartyHead: { id: '' },
  partyGroupId: '',
  tagId: 5
}

function AddDepartmentDialog(props) {
  const classes = useStyles();
  const { loading, closeNewDepartmentDialog, createDepartment, partyGroups, employees, dialog } = props;
  const [form, setForm] = useState({ ...initialState });

  console.log(dialog, "dialog checking")


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
    createDepartment(form)
  }

  console.log(form, 'checking form dept...')

  return (
    <div>
      <Dialog
        {...dialog.props}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeNewDepartmentDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Add department
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent dividers>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Department Name"
                id="department-name"
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
                id="partyGroupId"
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
                name="description"
                label="Description"
                id="department-description"
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
                id="department-partyhead"
                name="partyHead"
                placeholder="Department Lead"
                select
                fullWidth
                margin="dense"
                variant="outlined"
                size="small"
                label="Department Lead"
                value={form.partyHead.id}
                onChange={handleSelectChange}
              >
                {employees && employees.length === 0 &&
                  <MenuItem key="" value="">
                    No Employees Record
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
                id="department-assistant-partyhead"
                name="assistantPartyHead"
                placeholder="Assistant Department Lead"
                select
                fullWidth
                margin="dense"
                variant="outlined"
                size="small"
                label="Assistant Department Lead"
                value={form.assistantPartyHead.id}
                onChange={handleSelectChange}
              >
                {employees && employees.length === 0 &&
                  <MenuItem key="" value="">
                    No Employees Record
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
        </DialogContent>

        <DialogActions>
          <Button
            onClick={closeNewDepartmentDialog}
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
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

AddDepartmentDialog.propTypes = {
  closeNewDepartmentDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  dialog: Selectors.makeSelectDeptDialog(),
  employees: Selectors.makeSelectEmployees(),
  partyGroups: Selectors.makeSelectPartyGroups(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewDepartmentDialog: () => dispatch(Actions.closeNewDepartmentDialog()),
    createDepartment: (data) => dispatch(Actions.createDepartment(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddDepartmentDialog);
