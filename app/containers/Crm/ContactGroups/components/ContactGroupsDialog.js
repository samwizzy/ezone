/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Autocomplete } from '@material-ui/lab';
import {
  Backdrop,
  CircularProgress,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Divider,
  Slide,
  AppBar,
  Toolbar,
  Typography,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
} from '@material-ui/core';
import * as Selectors from '../selectors';
import * as Actions from '../actions';
import LoadingIndicator from '../../../../components/LoadingIndicator';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  textField: {
    margin: theme.spacing(1),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ContactGroupsDialog = props => {
  const classes = useStyles();
  const {
    updateContactGroupAction,
    loading,
    contactGroupsDialog,
    closeNewContactGroupsDialog,
    createNewContactGroupAction,
  } = props;

  const [form, setForm] = React.useState({
    groupName: '',
    groupDescription: '',
    contactIds: [],
  });

  useEffect(() => {
    if (contactGroupsDialog.type === 'edit') {
      setForm({ ...contactGroupsDialog.data });
    }
  }, [contactGroupsDialog.data]);

  const canSubmitForm = () => {
    const { groupName, groupDescription } = form;
    return groupName !== '' && groupDescription !== '';
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div>
      <Dialog
        {...contactGroupsDialog.props}
        onClose={closeNewContactGroupsDialog}
        keepMounted
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6">
              {contactGroupsDialog.type === 'new'
                ? 'Add Contact Groups'
                : 'Edit Contact Groups'}
            </Typography>
          </Toolbar>
        </AppBar>
        <Divider />

        <DialogContent>
          <form className={classes.root}>
            <Table className={classes.table}>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <FormLabel component="legend">Name</FormLabel>
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="groupName"
                      label="Name"
                      id="outlined-groupName"
                      fullWidth
                      variant="outlined"
                      size="small"
                      value={form.groupName}
                      onChange={handleChange}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <FormLabel component="legend">Description</FormLabel>
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="groupDescription"
                      label="Description"
                      id="outlined-Description"
                      fullWidth
                      variant="outlined"
                      size="small"
                      value={form.groupDescription}
                      onChange={handleChange}
                    />
                  </TableCell>
                </TableRow>
                {/* <TableRow>
                  <TableCell>
                    <FormLabel component="legend">Private</FormLabel>
                  </TableCell>
                  <TableCell>
                    <FormControl component="fieldset">
                      <RadioGroup
                        aria-label="gender"
                        name="private"
                        value={form.private}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                  </TableCell>
                </TableRow> */}
              </TableBody>
            </Table>
          </form>
        </DialogContent>

        <DialogActions>
          {contactGroupsDialog.type === 'new' ? (
            <div>
              <Button onClick={closeNewContactGroupsDialog} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() => createNewContactGroupAction(form)}
                disabled={!canSubmitForm()}
                color="primary"
              >
                Save
              </Button>
            </div>
          ) : (
            <div>
              <Button onClick={closeNewContactGroupsDialog} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() => updateContactGroupAction(form)}
                disabled={!canSubmitForm()}
                color="primary"
              >
                Update
              </Button>
            </div>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

ContactGroupsDialog.propTypes = {
  loading: PropTypes.bool,
  contactGroupsDialog: PropTypes.object,
  closeNewContactGroupsDialog: PropTypes.func,
  createNewContactGroupAction: PropTypes.func,
  updateContactGroupAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  contactGroupsDialog: Selectors.makeSelectContactGroupsDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewContactGroupsDialog: () =>
      dispatch(Actions.closeNewContactGroupsDialog()),
    createNewContactGroupAction: evt =>
      dispatch(Actions.createNewContactGroup(evt)),
    updateContactGroupAction: evt => dispatch(Actions.updateContactGroup(evt)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ContactGroupsDialog);
