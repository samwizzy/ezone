import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { AppBar, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, FormLabel, FormControlLabel, MenuItem, Radio, RadioGroup, Slide, Table, TableBody, TableRow, TableCell, Typography, TextField, Toolbar } from '@material-ui/core';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import moment from 'moment'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {},
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const values = [
  { label: 'Creativity', icon: '' },
  { label: 'Leadership', icon: '' },
  { label: 'Team Player', icon: '' },
  { label: 'Excellence', icon: '' },
  { label: 'Initiative', icon: '' },
  { label: 'Integrity', icon: '' },
  { label: 'Customer Focus', icon: '' },
  { label: 'Growth', icon: '' },
  { label: 'Passion', icon: '' },
  { label: 'Visionary', icon: '' },
];

function RecognitionDialog(props) {
  const classes = useStyles();
  const { closeNewRecognitionDialog, dialog } = props;
  const [form, setForm] = React.useState({
    name: '',
    description: '',
    recognize: '',
    values: '',
  });

  React.useEffect(() => {
    if (dialog.type == 'edit') {
      setForm({ ...form })
    }
  }, [dialog])

  const canSubmitForm = () => {
    const { name, type, validity, from, to, description } = form
    return name.length > 0 && type.length > 0 && validity.length > 0
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value });
  }

  const handleSelectChange = () => { }

  const handleSubmit = () => { }

  return (
    <div>
      <Dialog
        {...dialog.props}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeNewRecognitionDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Add Recognition
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent dividers>
          <TextField
            id="title"
            name="title"
            placeholder="Title"
            fullWidth
            margin="normal"
            variant="outlined"
            size="small"
            label="Title"
            value={form.title}
            onChange={handleChange}
          />

          <TextField
            id="description"
            name="description"
            placeholder="Description"
            fullWidth
            margin="normal"
            variant="outlined"
            multiline
            rows={4}
            size="small"
            label="Description"
            value={form.description}
            onChange={handleChange}
          />

          <Autocomplete
            id="select-employee-to-recognize"
            size="small"
            options={[]}
            getOptionLabel={option => option.label}
            onChange={(evt, value) => handleSelectChange(evt, value)}
            renderInput={params => (
              <TextField
                {...params}
                label="Who to recognize"
                variant="outlined"
                placeholder="Search"
                margin="normal"
                fullWidth
              />
            )}
          />

          <Autocomplete
            id="select-core-values"
            size="small"
            options={values}
            getOptionLabel={option => option.label}
            onChange={(evt, value) => handleSelectChange(evt, value)}
            renderInput={params => (
              <TextField
                {...params}
                label="Core values"
                variant="outlined"
                placeholder="Search"
                margin="normal"
                fullWidth
              />
            )}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={closeNewRecognitionDialog} color="primary">
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


RecognitionDialog.propTypes = {
  closeNewRecognitionDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dialog: Selectors.makeSelectRecognitionDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewRecognitionDialog: () => dispatch(Actions.closeNewRecognitionDialog()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(RecognitionDialog);