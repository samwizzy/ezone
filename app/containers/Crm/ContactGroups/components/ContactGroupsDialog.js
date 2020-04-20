/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Autocomplete } from '@material-ui/lab';
import {
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
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ContactGroupsDialog = props => {
  const classes = useStyles();
  const { loading, contactGroupsDialog, closeNewContactGroupsDialog } = props;
  const [form, setForm] = React.useState({
    name: '',
    description: '',
    private: '',
  });

  const canSubmitForm = () => {
    return false
  }

  const handleChange = event => {
    const { name, value } = event.target;
    setForm({...form, [name]: value });
  };

  const handleSubmit = () => {}

  console.log(contactGroupsDialog, "contactGroupsDialog")

  return (
    <div>
      <Dialog
        {...contactGroupsDialog.props}
        onClose={closeNewContactGroupsDialog}
        keepMounted
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6">
              Add Contact Groups
            </Typography>
          </Toolbar>
        </AppBar>
        <Divider />

        <DialogContent>
          <form className={classes.root}>
            <Table className={classes.table}>
              <TableBody>
                <TableRow>
                  <TableCell><FormLabel component="legend">Name</FormLabel></TableCell>
                  <TableCell>
                    <TextField
                      name="name"
                      label="Name"
                      id="outlined-title"
                      fullWidth
                      variant="outlined"
                      size="small"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><FormLabel component="legend">Description</FormLabel></TableCell>
                  <TableCell>
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
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><FormLabel component="legend">Private</FormLabel></TableCell>
                  <TableCell>
                    <FormControl component="fieldset">
                      <RadioGroup aria-label="gender" name="private" value={form.private} onChange={handleChange}>
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                      </RadioGroup>
                    </FormControl>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeNewContactGroupsDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!canSubmitForm()}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ContactGroupsDialog.propTypes = {
  loading: PropTypes.bool,
  contactGroupsDialog: PropTypes.object,
  closeNewContactGroupsDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  contactGroupsDialog: Selectors.makeSelectContactGroupsDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewContactGroupsDialog: () => dispatch(Actions.closeNewContactGroupsDialog()),
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
