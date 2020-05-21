import React, {memo} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, MenuItem, Slide, Table, TableBody, TableRow, TableCell, Typography, TextField, Toolbar } from '@material-ui/core';
import * as Selectors from '../../selectors';
import AttachFileIcon from '@material-ui/icons/AttachFile';

import * as Actions from '../../actions';
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1, 0)
    },
  },
  table: {
    "& td": {
      border: 0 
    }
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ApplicantDialog(props) {
  const classes = useStyles();
  const { closeNewApplicantDialog, createApplicant, dialog } = props;
  const [form, setForm] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    gender: ''
  });
  
  console.log(dialog, "dialog checking")
  

  React.useEffect(() => {
    if(dialog.type == 'edit'){
      setForm({...form})
    }
  }, [dialog])

  const canSubmitForm = () => {
    const {firstName, lastName, phoneNumber, email, gender } = form
    return firstName.length > 0 && lastName.length > 0 && email.length > 0 && gender
  }
   

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({...form, [name]: value});
  }

  const handleSelectChange = (event) => {
    setForm({...form, [event.target.name]: {id: event.target.value}});
  }

  const handleImageChange = (event) => {
    setForm({...form, [event.target.name]: {id: event.target.value}});
  }

  const handleSubmit = event => {
    createApplicant(form)
  }

  console.log(form, 'checking form dept...')

  return (
    <div className={classes.root}>
      <Dialog
        {...dialog.props}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeNewApplicantDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Add applicant
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent dividers>
          <Table className={classes.table}>
            <TableRow>
              <TableCell>
                <TextField
                  name="name"
                  label="First Name"
                  id="outlined-title"
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={form.firstName}
                  onChange={handleChange}
                />
              </TableCell>
              <TableCell>
                <TextField
                  name="name"
                  label="Phone Number"
                  id="outlined-title"
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={form.phoneNumber}
                  onChange={handleChange}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <TextField
                  name="name"
                  label="Last Name"
                  id="outlined-title"
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={form.lastName}
                  onChange={handleChange}
                />
              </TableCell>
              <TableCell>
                <TextField
                  name="name"
                  label="Email"
                  id="outlined-title"
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={form.email}
                  onChange={handleChange}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <TextField
                  id="gender"
                  name="gender"
                  placeholder="Gender"
                  select
                  fullWidth
                  className={classes.textField}
                  variant="outlined"
                  size="small"
                  label="Gender"
                  value={form.gender}
                  onChange={handleChange}
                >
                  {['male', 'female'].map((item, i) => 
                    <MenuItem key={i} value={item}>
                      {item}
                    </MenuItem>
                  )}
                </TextField>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Attach Resume/Cv</TableCell>
              <TableCell>
                <FormControl variant="outlined" margin="dense">
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<AttachFileIcon />}
                  >
                    Upload File
                    <input
                      name="attachments"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                      multiple
                    />
                  </Button>
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Attach Cover Letter</TableCell>
              <TableCell>
                <FormControl variant="outlined" margin="dense">
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<AttachFileIcon />}
                  >
                    Upload File
                    <input
                      name="attachments"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                      multiple
                    />
                  </Button>
                </FormControl>
              </TableCell>
            </TableRow>
          </Table>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeNewApplicantDialog} color="primary">
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


ApplicantDialog.propTypes = {
  closeNewApplicantDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dialog: Selectors.makeSelectApplicantDialog(),
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewApplicantDialog: () => dispatch(Actions.closeNewApplicantDialog()),
    createApplicant: (data) => dispatch(Actions.createApplicant(data)),
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
)(ApplicantDialog);