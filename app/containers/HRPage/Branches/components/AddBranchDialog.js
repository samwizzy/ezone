import React, {memo} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import {AppBar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, MenuItem, Slide, Typography, TextField, Toolbar } from '@material-ui/core';
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
  const { closeNewBranchDialog, createBranch, getEmployees, employees, employee, getBranches, branches, departments,  dialog } = props;
  const [form, setForm] = React.useState({
    name: '',
    description: '',
    partyHead: {id: ''},
    assistantPartyHead: {id: ''},
    partyId: 1,
    tagId: 1
  });

  console.log(dialog, "dialog checking")

  React.useEffect(() => {
    if(dialog.type == 'edit'){
      setForm({...form})
    }
  }, [dialog])

  const canSubmitForm = () => {
    const {name, description, partyId, partyHead, assistantPartyHead, tag } = form
    return name.length > 0 && partyHead && partyId && assistantPartyHead
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({...form, [name]: value});
  }

  const handleSelectChange = (event) => {
    setForm({...form, [event.target.name]: {id: event.target.value}});
  }

  const handleSubmit = event => {
    createBranch(form)
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
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Add branch
            </Typography>
          </Toolbar>
        </AppBar>
        
        <Divider />

        <DialogContent>
        <form className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <TextField
                    name="name"
                    label="Branch Name"
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
                    name="description"
                    label="Description"
                    id="outlined-title"
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={form.description}
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="partyHead"
                    name="partyHead"
                    placeholder="Branch Lead"
                    select
                    fullWidth
                    className={classes.textField}
                    variant="outlined"
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
                    className={classes.textField}
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
  employees: Selectors.makeSelectEmployees(),
  employee : Selectors.makeSelectEmployee(),
  departments: Selectors.makeSelectDepartmentsByOrgIdApi(),
  branches: Selectors.makeSelectBranches(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewBranchDialog: () => dispatch(Actions.closeNewBranchDialog()),
    createBranch: (data) => dispatch(Actions.createBranch(data)),
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