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
  const { closeNewDepartmentDialog, createDepartment, dialog } = props;
  const [form, setForm] = React.useState({
    mailAlias: "",
    deptName: '',
    deptLead: {id: ''},
  });

  console.log(dialog, "dialog checking")

  React.useEffect(() => {
    if(dialog.type == 'edit'){
      setForm({...form})
    }
  }, [dialog])

  const canSubmitForm = () => {
    const {deptName, deptLead, mailAlias } = form
    return deptName.length > 0 && mailAlias.length > 0 && Object.values(deptLead)[0].length > 0
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
                    name="deptName"
                    label="Department Name"
                    id="outlined-title"
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={form.deptName}
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    name="mailAlias"
                    label="Mail Alias"
                    id="outlined-title"
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={form.mailAlias}
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="dept-lead"
                    name="deptLead"
                    placeholder="Department Lead"
                    select
                    fullWidth
                    className={classes.textField}
                    variant="outlined"
                    size="small"
                    label="Department Lead"
                    value={form.deptLead.id}
                    onChange={handleSelectChange}
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