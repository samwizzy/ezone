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
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  makeStyles,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Divider,
  MenuItem,
  Slide,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  FormControlLabel,
  Grid,
  FormControl,
  FormGroup,
  FormLabel,
} from '@material-ui/core';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { Close } from '@material-ui/icons';
import * as Selectors from '../selectors';
import * as Actions from '../actions';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  table: {
    '& .MuiTableCell-body': {
      fontSize: theme.typography.fontSize - 1,
    },
    '& .MuiTableRow-root:last-child': {
      '& .MuiTableCell-root': {
        verticalAlign: 'text-top',
      },
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AssignContactDialog = props => {
  const classes = useStyles();
  const {
    loading,
    assignContactDialog,
    closeNewAssignContactDialog,
    getAllContacts,
    assignContactToGroupAction,
    params,
  } = props;

  const [form, setForm] = React.useState({
    contactIds: [],
    id: '',
  });

  const handleSelectChange = (evt, value) => {
    setForm({ ...form, contactIds: value, id: params.contactId });
  };

  const canSubmitForm = () => {
    const { contactIds } = form;
    return contactIds.length > 0;
  };

  return (
    <div>
      <Dialog
        {...assignContactDialog.props}
        onClose={closeNewAssignContactDialog}
        keepMounted
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6">Assign a Contact</Typography>
          </Toolbar>
        </AppBar>
        <Divider />

        <DialogContent style={{ minWidth: 600 }}>
          <form className={classes.root}>
            <Table className={classes.table}>
              <TableBody>
                <TableRow>
                  <TableCell component="th">
                    <FormLabel component="legend">Contact / Company</FormLabel>
                  </TableCell>
                  <TableCell>
                    <Autocomplete
                      multiple
                      id="checkboxes-tags-demo"
                      options={getAllContacts}
                      disableCloseOnSelect
                      getOptionLabel={option =>
                        `${option.firstName} ${option.lastName}`
                      }
                      onChange={(evt, value) => handleSelectChange(evt, value)}
                      renderOption={(option, { selected }) => (
                        <React.Fragment>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option.firstName} {option.lastName}
                        </React.Fragment>
                      )}
                      style={{ width: '100%' }}
                      renderInput={params => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Companies"
                          placeholder="Favorites"
                        />
                      )}
                    />
                  </TableCell>
                </TableRow>
                {/* <TableRow>
                  <TableCell component="th">
                    <FormLabel component="legend">Assign Group</FormLabel>
                  </TableCell>
                  <TableCell>
                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={form.groups.john}
                              onChange={handleChange}
                              name="john"
                            />
                          }
                          label="John Foundation"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={form.groups.marine}
                              onChange={handleChange}
                              name="marine"
                            />
                          }
                          label="First Marine"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={form.groups.optisoft}
                              onChange={handleChange}
                              name="optisoft"
                            />
                          }
                          label="Optisoft Technology"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={form.groups.jitiful}
                              onChange={handleChange}
                              name="jitiful"
                            />
                          }
                          label="Jitiful Technology"
                        />
                      </FormGroup>
                    </FormControl>
                  </TableCell>
                </TableRow> */}
              </TableBody>
            </Table>
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeNewAssignContactDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => assignContactToGroupAction(form)}
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

AssignContactDialog.propTypes = {
  loading: PropTypes.bool,
  assignContactDialog: PropTypes.object,
  closeNewAssignContactDialog: PropTypes.func,
  assignContactToGroupAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  assignContactDialog: Selectors.makeSelectAssignContactDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewAssignContactDialog: () =>
      dispatch(Actions.closeNewAssignContactDialog()),
    assignContactToGroupAction: evt =>
      dispatch(Actions.assignContactToGroup(evt)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AssignContactDialog);
