/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import EzoneUtils from './../../../../../utils/EzoneUtils';
import {
  makeStyles,
  AppBar,
  Backdrop,
  Button,
  CircularProgress,
  DialogContent,
  DialogActions,
  Dialog,
  Grid,
  Slide,
  TextField,
  Toolbar,
  Typography
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import moment from 'moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'static',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const initialState = {
  name: '',
}

const LeadSourceDialog = props => {
  const classes = useStyles();
  const [form, setForm] = React.useState({ ...initialState });

  const {
    loading,
    dialog,
    createLeadSource,
    updateLeadSource,
    closeNewLeadSourceDialog,
  } = props;

  const handleChange = event => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  const handleSelectChange = name => (event, value) => {
    setForm({ ...form, [name]: value });
  }

  const handleDateChange = name => date => {
    setForm({ ...form, [name]: moment(date).format('YYYY-MM-DDTHH:mm:ss.SSS') });
  }

  const canSubmitForm = () => {
    const { name } = form
    return name.length > 0
  }

  const handleSubmit = () => { }

  React.useEffect(() => {
    if (dialog.type === 'edit') {
      setForm({ ...dialog.data });
    } else {
      setForm({ ...initialState })
    }
  }, [dialog]);

  console.log(form, 'form');

  return (
    <div>
      <Dialog
        {...dialog.props}
        onClose={closeNewLeadSourceDialog}
        keepMounted
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Add source for Social
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent dividers>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                name="name"
                label="Name"
                id="outlined-name"
                fullWidth
                margin="normal"
                variant="outlined"
                size="small"
                value={form.name}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeNewLeadSourceDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!canSubmitForm()}
            color="primary"
          >
            Next
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

LeadSourceDialog.propTypes = {
  loading: PropTypes.bool,
  dialog: PropTypes.object,
  closeNewLeadSourceDialog: PropTypes.func,
  updateLeadSource: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  dialog: Selectors.makeSelectLeadSourceDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    createLeadSource: evt => dispatch(Actions.createLeadSource(evt)),
    updateLeadSource: evt => dispatch(Actions.updateLeadSource(evt)),
    closeNewLeadSourceDialog: () => dispatch(Actions.closeNewLeadSourceDialog()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LeadSourceDialog);
