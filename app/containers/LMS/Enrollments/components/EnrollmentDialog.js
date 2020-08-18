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
  FormLabel,
  Typography,
  FormControl,
  Grid,
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

const EnrollmentDialog = props => {
  const classes = useStyles();
  const {
    loading,
    dialog,
    closeNewEnrollmentDialog,
    createEnrollment,
    params,
  } = props;

  const [form, setForm] = React.useState({
    user: null,
    course: null,
  });

  const handleChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.value });
  };

  const handleSelectChange = name => (evt, obj) => {
    setForm({ ...form, [name]: obj });
  };

  const canSubmitForm = () => {
    const { user, course } = form;
    return user && course;
  };

  return (
    <div>
      <Dialog
        {...dialog.props}
        onClose={closeNewEnrollmentDialog}
        keepMounted
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">New Enrollment</Typography>
          </Toolbar>
        </AppBar>
        <Divider />

        <DialogContent>
          <Grid container>
            <Grid item xs={12}>
              <Autocomplete
                id="combo-box-user"
                size="small"
                options={[]}
                getOptionLabel={option => option.name}
                getOptionSelected={option => option.name === form.user}
                value={form.user}
                onChange={handleSelectChange('user')}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="User"
                    variant="outlined"
                    placeholder="Search"
                    margin="normal"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                id="combo-box-course"
                size="small"
                options={[]}
                getOptionLabel={option => option.name}
                getOptionSelected={option => option.name === form.course}
                value={form.course}
                onChange={handleSelectChange('course')}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Course to Enrol"
                    variant="outlined"
                    placeholder="Search"
                    margin="normal"
                    fullWidth
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeNewEnrollmentDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => createEnrollment(form)}
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

EnrollmentDialog.propTypes = {
  loading: PropTypes.bool,
  dialog: PropTypes.object,
  closeNewEnrollmentDialog: PropTypes.func,
  createEnrollment: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  dialog: Selectors.makeSelectEnrollmentDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewEnrollmentDialog: () => dispatch(Actions.closeNewEnrollmentDialog()),
    createEnrollment: data => dispatch(Actions.createEnrollment(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(EnrollmentDialog);
