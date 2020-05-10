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

function AddDepartmentDialog(props) {
  const classes = useStyles();
  const { closeNewDepartmentDialog, createDepartment,  getEmployees, party_tags, PartyTags, employees,  employee, getBranches, branches, departments,  dialog } = props;
  const [form, setForm] = React.useState({
    name: '',
    description: '',
    partyHead: {id: ''},
    assistantPartyHead: {id: ''},
    partyId: '',
    tagId: 5
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
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Add department
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
                    label="Department Name"
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
                    placeholder="Department Lead"
                    select
                    fullWidth
                    className={classes.textField}
                    variant="outlined"
                    size="small"
                    label="Department Lead"
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
                    placeholder="Assistant Department Lead"
                    select
                    fullWidth
                    className={classes.textField}
                    variant="outlined"
                    size="small"
                    label="Assistant Department Lead"
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
                <Grid item xs={12}>
                  <TextField
                    id="partyId"
                    name="partyId"
                    placeholder="Branch"
                    select
                    fullWidth
                    className={classes.textField}
                    variant="outlined"
                    size="small"
                    label="Branch"
                    value={form.partyId}
                    onChange={handleChange}
                  >
                    {branches.map((branch) => (
                        <MenuItem key={branch.id} value={branch.id}>
                            {branch.name}
                        </MenuItem>
                        ))};
                  </TextField>
                </Grid>
            </Grid>
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeNewDepartmentDialog} color="primary">
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


AddDepartmentDialog.propTypes = {
  closeNewDepartmentDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dialog: Selectors.makeSelectDeptDialog(),
  loading: Selectors.makeSelectLoading(),
  employees: Selectors.makeSelectEmployees(),
  employee : Selectors.makeSelectEmployee(),
  departments: Selectors.makeSelectDepartmentsByOrgIdApi(),
  branches: Selectors.makeSelectBranches(),
  party_tags: Selectors.makeSelectPartyTags(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewDepartmentDialog: () => dispatch(Actions.closeNewDepartmentDialog()),
    createDepartment: (data) => dispatch(Actions.createDepartment(data)),
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
)(AddDepartmentDialog);