import React, { memo } from 'react';
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

function AddFieldDialog(props) {
  const classes = useStyles();
  const { closeNewBranchDialog, createBranch, getEmployees, employees, employee, getBranches, branches, departments, dialog } = props;
  const [form, setForm] = React.useState({
    name: '',
    description: '',
  });

  console.log(dialog, "dialog checking")

  React.useEffect(() => {
    if (dialog.type == 'edit') {
      setForm({ ...form })
    }
  }, [dialog])

  const canSubmitForm = () => {
    const { name, description, partyId, partyHead, assistantPartyHead, tag } = form
    return name.length > 0 && partyHead && partyId && assistantPartyHead
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value });
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
              Add New Field
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent dividers>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Name"
                id="outlined-name"
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
                id="outlined-description"
                fullWidth
                rows={4}
                multiline
                variant="outlined"
                size="small"
                value={form.description}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeNewBranchDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!canSubmitForm()} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


AddFieldDialog.propTypes = {
  closeNewBranchDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dialog: Selectors.makeSelectBranchDialog(),
  employees: Selectors.makeSelectEmployees(),
  employee: Selectors.makeSelectEmployee(),
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
)(AddFieldDialog);
