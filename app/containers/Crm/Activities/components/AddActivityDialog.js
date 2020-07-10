import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  TimePicker,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import _ from 'lodash';
import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, MenuItem, Slide, Typography, TextField, Toolbar } from '@material-ui/core';
import * as Selectors from '../selectors';
import * as Actions from '../actions';
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const controllers = ['Schedule', 'Contact', 'ContactGroup', 'Campaigns', 'SocialMedia', 'Leads']

const initialState = {
  action: "CREATE",
  controllerName: "",
  itemName: "",
  moduleName: "CRM_MODULE",
  performedBy: ""
}

function AddActivityDialog(props) {
  const classes = useStyles();
  const { closeNewActivitiesDialog, dialog, createCrmActivity } = props;
  const [form, setForm] = React.useState({ ...initialState });

  React.useEffect(() => {
    if (dialog.type == 'edit') {
      setForm({ ...dialog.data })
    } else {
      setForm({ ...initialState })
    }
  }, [dialog])

  const canSubmitForm = () => {
    const { itemName } = form
    return itemName.length > 0
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value });
  }

  const handleDateChange = (date, formatted, name) => {
    setForm(_.set({ ...form }, name, moment(date).format('YYYY-MM-DD')))
  }

  const handleSubmit = () => {
    createCrmActivity(form)
  }

  console.log(form, 'checking form employee...')

  return (
    <div>
      <Dialog
        {...dialog.props}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeNewActivitiesDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              {dialog.type === 'new' ? 'Create Activity' : 'Update Activity'}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent dividers>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                name="itemName"
                label="Item Name"
                id="outlined-item-name"
                fullWidth
                margin="normal"
                variant="outlined"
                size="small"
                value={form.itemName}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="controller-name"
                name="controllerName"
                placeholder="Select Controller"
                select
                fullWidth
                margin="normal"
                variant="outlined"
                size="small"
                label="Controller"
                value={form.controllerName}
                onChange={handleChange}
              >
                {controllers.map((contrl, i) =>
                  <MenuItem key={i} value={contrl}>
                    {contrl}
                  </MenuItem>
                )}
              </TextField>
            </Grid>

          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeNewActivitiesDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!canSubmitForm()}
            color="primary"
          >
            {dialog.type === 'new' ? 'Save' : 'Update Activity'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


AddActivityDialog.propTypes = {
  closeNewActivitiesDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dialog: Selectors.makeSelectActivitiesDialog()
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewActivitiesDialog: () => dispatch(Actions.closeNewActivitiesDialog()),
    createCrmActivity: () => dispatch(Actions.createCrmActivity()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddActivityDialog);
